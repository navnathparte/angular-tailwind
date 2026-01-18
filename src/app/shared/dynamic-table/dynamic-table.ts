import { Component, Input, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableConfig, TableColumn } from './table.interface';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.html',
})
export class DynamicTable {
  @Input({ required: true }) config!: TableConfig;
  @Output() actionClick = new EventEmitter<any>();

  constructor() {
    effect(() => {
      const total = Math.ceil(this.filtered().length / this.rowsPerPage());
      if (this.page() > total && total > 0) {
        this.page.set(total);
      }
    });
  }

  search = signal('');
  page = signal(1);
  rowsPerPage = signal(5);
  filters = signal<any>({});

  modalOpen = signal(false);
  modalTitle = signal('');
  modalContent = signal('');

  updateFilter(key: string, value: any) {
    this.filters.update((f) => ({ ...f, [key]: value }));
    this.page.set(1);
  }

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.rowsPerPage())));

  truncate(text: string, words: number) {
    if (!text) return '';
    return text.split(' ').slice(0, words).join(' ') + '...';
  }

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  openModal(title: string, content: string) {
    this.modalTitle.set(title);
    this.modalContent.set(content);
    this.modalOpen.set(true);
  }

  filtered = computed(() => {
    const searchVal = this.search().toLowerCase();
    const filterVals = this.filters();

    return this.config.data.filter((row) => {
      const matchesSearch = Object.values(row).join('').toLowerCase().includes(searchVal);
      const matchesFilters = Object.keys(filterVals).every(
        (key) => !filterVals[key] || row[key] === filterVals[key],
      );
      return matchesSearch && matchesFilters;
    });
  });

  paginated = computed(() => {
    const start = (this.page() - 1) * this.rowsPerPage();
    return this.filtered().slice(start, start + this.rowsPerPage());
  });
}
