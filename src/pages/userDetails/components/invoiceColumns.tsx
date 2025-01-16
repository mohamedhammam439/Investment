import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export const InvoiceCoulmns: ColumnDef<any>[] = [
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
    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Status')} />
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
    accessorKey: 'updated_at',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('updated_at')} />
    )},    
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('updated_at')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'img',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Image')} />
    )},
    cell: ({ row }) => {
      const imgUrl = 'https://ahmedsamir1.s3.eu-central-1.amazonaws.com/'
      console.log('====================', imgUrl )
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {/* {row.getValue('img')} */}
            <img
              src={imgUrl + row.getValue('img') || 'https://dummyimage.com/500x500.png'}
              className=' h-10 w-10 rounded-full'
            />
          </span>
        </div>
      )
    },
  },
  //   {
  //     accessorKey: 'status',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='Status' />
  //     ),
  //     cell: ({ row }) => {
  //       return (
  //         <div className='flex space-x-2'>
  //           <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //             {row.getValue('status')}
  //           </span>
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     accessorKey: 'createdAt',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='CreatedAt' />
  //     ),
  //     cell: ({ row }:any) => {
  //       return (
  //         <div className='flex space-x-2'>
  //           <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //             {/* {row.getValue('createdAt')} */}
  //             {moment(row.getValue('createdAt')).format('MMMM Do YYYY, h:mm:ss A')}
  //           </span>
  //         </div>
  //       )
  //     },
  //   },
]
