export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'action' | 'checkbox' | 'appreciation';
  sortable?: boolean;
  truncate?: number;
  clickable?: boolean;
  sticky?: 'left' | 'right';
  stickyOffset?: string;
  width?: string;
  actionLabel?: string; // dynamic button text
  statusMap?: Record<string, string>; // dynamic badge colors
  appreciationMap?: Record<string, string>; // icons from parent
}

export interface TableFilter {
  key: string;
  label: string;
  options: string[];
}

export interface TableConfig {
  columns: TableColumn[];
  data: any[];
  filters?: TableFilter[];
  pageSizeOptions?: number[];
}
