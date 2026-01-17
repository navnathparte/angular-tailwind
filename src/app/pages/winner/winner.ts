import { Component } from '@angular/core';
import { TableConfig } from '../../shared/dynamic-table/table.interface';
import { DynamicTable } from '../../shared/dynamic-table/dynamic-table';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-winner',
  imports: [DynamicTable],
  templateUrl: './winner.html',
  styleUrl: './winner.css',
})
export class Winner {
  tableConfig: TableConfig = {
    columns: [
      {
        key: 'employeeName',
        header: 'Employee Name',
        sortable: true,
        filterable: true,
      },
      {
        key: 'grade',
        header: 'Grade',
        sortable: true,
        align: 'center',
      },
      {
        key: 'function',
        header: 'Function',
        sortable: true,
      },
      {
        key: 'account',
        header: 'Account',
        sortable: true,
      },
      {
        key: 'process',
        header: 'Process',
        sortable: true,
      },
      {
        key: 'supervisorName',
        header: 'Supervisor Name',
      },
      {
        key: 'nominationDate',
        header: 'Nomination Date',
        type: 'date',
        sortable: true,
      },
      {
        key: 'nominatorRemark',
        header: 'Nominator Remark',
        formatter: (value) => (value.length > 50 ? value.substring(0, 50) + '...' : value),
      },
      {
        key: 'evaluatorRemark',
        header: 'Evaluator Remark',
        formatter: (value) => value || '-',
      },
      {
        key: 'appreciation',
        header: 'Appreciation',
        type: 'icons',
        iconConfig: {
          icons: ['🏆', '🎁'],
        },
        align: 'center',
      },
      {
        key: 'status',
        header: 'Status',
        type: 'badge',
        badgeConfig: {
          colorMap: {
            Pending: 'bg-orange-500',
            Approved: 'bg-green-500',
            Rejected: 'bg-red-500',
          },
        },
        align: 'center',
      },
    ],
    data: [
      {
        id: '76766',
        employeeName: 'Mayuri Indave (76766)',
        grade: '13',
        function: 'Clinical Document Management',
        account: 'ADVANCED UROLOGY INSTITUTE',
        process: 'PVS',
        supervisorName: 'Yogesh Raul',
        nominatorName: '',
        nominationDate: '2026-01-13',
        nominatorRemark:
          'She has achieved a productivity of 143 % with 99.94% quality and also contributed in automation project.',
        evaluatorRemark: '-',
        selectorRemark: '-',
        appreciation: ['🏆', '🎁'],
        status: 'Pending',
      },
      {
        id: '54330',
        employeeName: 'Akshay Borhade (54330)',
        grade: '11',
        function: 'Clinical Document Management',
        account: 'WellMed',
        process: 'STACKS',
        supervisorName: 'Pooja Jawale',
        nominatorName: '',
        nominationDate: '2026-01-13',
        nominatorRemark: 'Akshay has achieved a productivity of 178.62% with 100% quality.',
        evaluatorRemark: 'The nomination is verified and approved as per policy',
        selectorRemark: '-',
        appreciation: ['🏆', '🎁'],
        status: 'Pending',
      },
      {
        id: '52113',
        employeeName: 'Anuj Jaiswar (52113)',
        grade: '11',
        function: 'Clinical Document Management',
        account: 'WellMed',
        process: 'STACKS',
        supervisorName: 'Pooja Jawale',
        nominatorName: '',
        nominationDate: '2026-01-13',
        nominatorRemark: 'Anuj has achieved a productivity of 107.7% with 100% quality.',
        evaluatorRemark: 'The nomination is verified and approved as per policy',
        selectorRemark: '-',
        appreciation: ['🏆', '🎁'],
        status: 'Pending',
      },
    ],
    actions: [
      {
        label: 'Selection',
        color: 'bg-blue-600 text-white hover:bg-blue-700',
        callback: (row) => this.handleSelection(row),
      },
    ],
    selectable: true,
    pagination: {
      enabled: true,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 50],
    },
    filters: {
      enabled: true,
      filters: [
        {
          key: 'function',
          label: 'Select Function',
          type: 'dropdown',
          options: [
            { label: 'Clinical Document Management', value: 'Clinical Document Management' },
          ],
        },
        {
          key: 'account',
          label: 'Select Account',
          type: 'dropdown',
          options: [
            { label: 'WellMed', value: 'WellMed' },
            { label: 'ADVANCED UROLOGY INSTITUTE', value: 'ADVANCED UROLOGY INSTITUTE' },
          ],
        },
        {
          key: 'process',
          label: 'Select Process',
          type: 'dropdown',
          options: [
            { label: 'STACKS', value: 'STACKS' },
            { label: 'PVS', value: 'PVS' },
          ],
        },
        {
          key: 'supervisorName',
          label: 'Select Manager',
          type: 'dropdown',
          options: [
            { label: 'Yogesh Raul', value: 'Yogesh Raul' },
            { label: 'Pooja Jawale', value: 'Pooja Jawale' },
          ],
        },
      ],
    },
    showSearch: true,
    bulkActions: true,
  };

  onRowsSelected(rows: any[]) {
    console.log('Selected rows:', rows);
  }

  onBulkAction(rows: any[]) {
    console.log('Bulk action on:', rows);
  }

  onFilterChange(filters: any) {
    console.log('Filters changed:', filters);
  }

  handleSelection(row: any) {
    console.log('Selection action for:', row);
  }
}
