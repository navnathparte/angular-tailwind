export interface TableColumn {
  key: string;
  header: string;
  type?: 'text' | 'number' | 'date' | 'badge' | 'actions' | 'custom' | 'icons';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  customTemplate?: string; // Template reference name
  formatter?: (value: any, row: any) => string;
  badgeConfig?: {
    colorMap: { [key: string]: string };
  };
  iconConfig?: {
    icons: string[]; // Array of icon classes or emojis
  };
}

export interface TableAction {
  label: string;
  icon?: string;
  color?: string;
  callback: (row: any) => void;
  show?: (row: any) => boolean;
}

export interface TableConfig {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  selectable?: boolean;
  pagination?: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions?: number[];
  };
  filters?: {
    enabled: boolean;
    filters: TableFilter[];
  };
  showSearch?: boolean;
  bulkActions?: boolean;
  stickyHeader?: boolean;
}

export interface TableFilter {
  key: string;
  label: string;
  type: 'dropdown' | 'text' | 'date';
  options?: { label: string; value: any }[];
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
