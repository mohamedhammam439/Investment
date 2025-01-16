import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export const SharesCoulmns: ColumnDef<any>[] = [
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Amount')} />
    )},
    cell: ({ row }: any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('amount')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'num_unite',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('num_unite')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('num_unite')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('profit')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('profit')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('status')} />
    )},    
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('status')? 'True' : 'False'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'start_subscrip',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('start_subscrip')} />
    )},    
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('start_subscrip')}
          </span>
        </div>
      )
    },
  },
 
]
