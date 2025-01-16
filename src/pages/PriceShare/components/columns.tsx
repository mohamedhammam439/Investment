import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'
import moment from 'moment';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'price',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('price')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('price')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'desc',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('desc')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('desc')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'expire_date',
    
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('expire_date')} />
    )},
    cell: ({ row }:any) => {
      const expire_date = moment(row.getValue('expire_date')).add(2, 'hours').toDate();
        
        const expireDate = moment(expire_date).format('YYYY-MM-DD HH:mm:ss')
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {expireDate}
          </span>
        </div>
      )
    },
  },{
    accessorKey: 'expire_date',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Editable')} />
    )},
    cell: ({ row }:any) => {
      // const expireDate = row.getValue('expire_date')
      const expire_date = moment(row.getValue('expire_date')).add(2, 'hours').toDate();
      const currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
      const expireDate = moment(expire_date).format('YYYY-MM-DD HH:mm:ss')
      console.log('expireDate', expireDate)
      console.log('currentDate', currentDate)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {/* {expireDate < currentDate ? '' : 'Edit'} */}
          {expireDate < currentDate ? '' : 'Edit'}
          </span>
        </div>
      )
    },
  },
  
]
