import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PaginationState, TableAction, TableColumn, TableConfig } from './table.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css',
})
export class DynamicTable {
  @Input() config!: TableConfig;
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() bulkActionClick = new EventEmitter<any[]>();
  @Output() filterChange = new EventEmitter<any>();

  displayData: any[] = [];
  filteredData: any[] = [];
  selectedRows: Set<any> = new Set();
  searchTerm = '';

  pagination: PaginationState = {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  };

  filterValues: { [key: string]: any } = {};
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  readonly Math = Math;

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.initializeTable();
    }
  }

  initializeTable() {
    if (!this.config) return;

    this.filteredData = [...this.config.data];
    this.pagination.pageSize = this.config.pagination?.pageSize || 5;
    this.pagination.totalItems = this.filteredData.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
    this.updateDisplayData();
  }

  updateDisplayData() {
    const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    this.displayData = this.filteredData.slice(start, end);
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  onFilterChange(filterKey: string, value: any) {
    this.filterValues[filterKey] = value;
    this.applyFilters();
    this.filterChange.emit(this.filterValues);
  }

  applyFilters() {
    let data = [...this.config.data];

    // Apply search
    if (this.searchTerm) {
      data = data.filter((row) =>
        this.config.columns.some((col) => {
          const value = this.getCellValue(row, col.key);
          return value?.toString().toLowerCase().includes(this.searchTerm);
        }),
      );
    }

    // Apply filters
    Object.keys(this.filterValues).forEach((key) => {
      const value = this.filterValues[key];
      if (value && value !== '') {
        data = data.filter((row) => {
          const cellValue = this.getCellValue(row, key);
          return cellValue === value || cellValue?.toString().includes(value);
        });
      }
    });

    this.filteredData = data;
    this.pagination.totalItems = this.filteredData.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
    this.pagination.currentPage = 1;
    this.updateDisplayData();
  }

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      const aVal = this.getCellValue(a, column.key);
      const bVal = this.getCellValue(b, column.key);

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updateDisplayData();
  }

  toggleRowSelection(row: any) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.rowSelected.emit(Array.from(this.selectedRows));
  }

  toggleAllRows() {
    if (this.selectedRows.size === this.displayData.length) {
      this.selectedRows.clear();
    } else {
      this.displayData.forEach((row) => this.selectedRows.add(row));
    }
    this.rowSelected.emit(Array.from(this.selectedRows));
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  get allRowsSelected(): boolean {
    return this.displayData.length > 0 && this.selectedRows.size === this.displayData.length;
  }

  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.updateDisplayData();
  }

  onPageSizeChange(size: number) {
    this.pagination.pageSize = size;
    this.pagination.currentPage = 1;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
    this.updateDisplayData();
  }

  getCellValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }

  formatCellValue(row: any, column: TableColumn): string {
    const value = this.getCellValue(row, column.key);

    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }

    return value?.toString() || '-';
  }

  getBadgeColor(value: any, column: TableColumn): string {
    return column.badgeConfig?.colorMap[value] || 'bg-gray-500';
  }

  executeAction(action: TableAction, row: any) {
    action.callback(row);
  }

  shouldShowAction(action: TableAction, row: any): boolean {
    return action.show ? action.show(row) : true;
  }

  onBulkAction() {
    this.bulkActionClick.emit(Array.from(this.selectedRows));
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.pagination.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.pagination.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
