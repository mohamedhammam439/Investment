import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('user')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user')?.email }
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'buffer',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('buffer')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('buffer')?.name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('amount')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('amount') }
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'num_unite',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('num_unit')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('num_unite')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: 'peryears',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('perdays')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('peryears')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t('type')} />
      )
    },
    cell: ({ row }: any) => {
      console.log('row', row);
  
      // Transform the type value based on the conditions
      const typeValue = row.getValue('type');
      let displayValue;
  
      switch (typeValue) {
        case 'rent':
          displayValue = 'Trade';
          break;
        case 'sell':
          displayValue = 'exchange';
          break;
        case 'stocks':
          displayValue = 'Stocks';
          break;
        default:
          displayValue = typeValue; // Use the original value if no match
      }
  
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {displayValue}
          </span>
        </div>
      );
    },
  }, {
    accessorKey: 'profit',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('profit')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('profit')}
          </span>
        </div>
      )
    },
  }, {
    accessorKey: 'finsh_quarter',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('finsh_quarter')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('finsh_quarter')}
          </span>
        </div>
      )
    },
  }, {
    accessorKey: 'start_subscrip',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('start_subscrip')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('start_subscrip')}
          </span>
        </div>
      )
    },
  }, {
    accessorKey: 'end_subscrip',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('end_subscrip')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('end_subscrip')}
          </span>
        </div>
      )
    },
  }, 
]
