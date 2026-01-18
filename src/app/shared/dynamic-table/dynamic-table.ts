import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
  SimpleChanges,
} from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']?.currentValue?.data) {
      this.loading.set(false);
    }
  }

  search = signal('');
  page = signal(1);
  rowsPerPage = signal(5);
  filters = signal<any>({});
  loading = signal(true);

  modalOpen = signal(false);
  modalTitle = signal('');
  modalContent = signal('');
  columnsExpanded = signal(false);
  expandedGroups = signal<Record<string, boolean>>({});

  groupColors: Record<string, string> = {
    employeeDetails: 'bg-amber-50',
    remarksGroup: 'bg-blue-50',
  };

  getGroupColor(col: any) {
    return this.groupColors[col.group || ''] || 'bg-white';
  }

  toggleGroup(group: string) {
    this.expandedGroups.update((g) => ({
      ...g,
      [group]: !g[group],
    }));
  }

  toggleColumns() {
    this.columnsExpanded.update((v) => !v);
  }

  visibleColumns = computed(() =>
    this.config.columns.filter((col) => {
      if (!col.expandable) return true;

      const groupState = this.expandedGroups()[col.group || ''];
      return groupState === true;
    }),
  );

  updateFilter(key: string, value: any) {
    this.filters.update((f) => ({ ...f, [key]: value }));
    this.page.set(1);
  }

  refreshTable() {
    this.search.set('');
    this.filters.set({});
    this.page.set(1);
  }

  startRecord = computed(() =>
    this.filtered().length === 0 ? 0 : (this.page() - 1) * this.rowsPerPage() + 1,
  );

  endRecord = computed(() => Math.min(this.page() * this.rowsPerPage(), this.filtered().length));

  functionOptions = computed(() =>
    [...new Set(this.config?.data?.map((d) => d.function))].filter(Boolean),
  );

  accountOptions = computed(() =>
    [...new Set(this.config?.data?.map((d) => d.account))].filter(Boolean),
  );

  processOptions = computed(() =>
    [...new Set(this.config?.data?.map((d) => d.process))].filter(Boolean),
  );

  supervisorOptions = computed(() =>
    [...new Set(this.config?.data?.map((d) => d.supervisor))].filter(Boolean),
  );

  tableAutoHeight = computed(() => {
    const rows = this.filtered().length;
    return rows < this.rowsPerPage();
  });

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
