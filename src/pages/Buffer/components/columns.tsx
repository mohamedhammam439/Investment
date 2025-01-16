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
    accessorKey: 'name',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Name')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name') }
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'user',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('Email')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('user') ? row.getValue('user').email : ''}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'project',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('project')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('project') ? row.getValue('project').title : ''}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'price',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('price')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('price')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'number_of_unit',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('number_of_unit')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('number_of_unit')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'price_unit',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('price_unit')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('price_unit')}
  //         </span>
  //       </div>
  //     )
  //   },
  // }, {
  //   accessorKey: 'sold',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('sold')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('sold')}
  //         </span>
  //       </div>
  //     )
  //   },
  // }, {
  //   accessorKey: 'percentage',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('percentage')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('percentage')}
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
      <DataTableColumnHeader column={column} title={t('perday')} />
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
  },{
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
  },
   {
    accessorKey: 'sizeWalltes',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('sizeWalltes')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('sizeWalltes')}
          </span>
        </div>
      )
    },
  }, {
    accessorKey: 'expire_date',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('expire_date')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('expire_date')}
          </span>
        </div>
      )
    },
  }, {
    accessorKey: 'statusApp',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('statusApp')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('statusApp')}
          </span>
        </div>
      )
    },
  },
  //  {
  //   accessorKey: 'profitDistributed',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('profitDistributed')} />
  //   )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('profitDistributed')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
]
