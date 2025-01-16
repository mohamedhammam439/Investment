import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t('Share Name')} />
          )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'availableShare',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t('available Share')} />
          )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('availableShare')}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'period',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //       <DataTableColumnHeader column={column} title={t('period')} />
  //         )},
  //   cell: ({ row }:any) => {
  //     console.log('row', row)
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('period')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
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
  },
  {
    accessorKey: 'sold',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('sold')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('sold')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'dividendDistributed',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('dividendDistributed')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('dividendDistributed')}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'expireDate',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('expireDate')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('expireDate')}
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
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('status')}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('status')} />
  //   )},
  //   cell: ({ row }) => {
  //     let isVerified = row.getValue('status')
  //     const queryClient = useQueryClient()
  //     console.log('row', row)
      
  //       const updateUserActiveStatus = async (newActiveStatus: boolean) => {
  //         try {
  //           const config = {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Accept: 'application/json',
  //             },
  //             withCredentials: true,
  //           };
        
  //           // Make the API call to update the user's active status with the correct structure
  //           await axios.put( baseURL + `devoelper/${row.original.id}`, 
  //             { status: newActiveStatus }, 
  //             config
  //           );
        
  //           // If the update is successful, invalidate the 'user' queries
  //           queryClient.invalidateQueries({ queryKey: ['devoelper'] });
  //         } catch (error) {
  //           console.error('Error updating user active status:', error);
  //           // Handle error as needed
  //         }
  //       };
      
  //       // Function to toggle the active status
  //       const toggleActiveStatus = (e) => {
  //         e.stopPropagation();
  //         const newActiveStatus = !isVerified;
  //         console.log('newActiveStatus', newActiveStatus)
  //         const booleanNewActiveStatus = Boolean(newActiveStatus);
  //         // Call the function to update the user's active status
  //         updateUserActiveStatus(booleanNewActiveStatus);
  //       };

  //     return (
  //       <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
  //         <label className='relative inline-flex cursor-pointer items-center'>
  //           <input
  //             onChange={toggleActiveStatus}
  //             type='checkbox'
  //             checked={isVerified ? true : false}
  //             className='peer sr-only'
  //           />
  //           <div
  //             className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700`}
  //           ></div>
  //         </label>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: 'categories',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='categories' />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {(row.getValue('categories') as string[])?.map((c) => c + '-')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'website',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='website' />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('website')}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  
  // {
  //   accessorKey: 'img',
  //   header: ({ column }) => {
  //     const { t } = useTranslation();
  //     return (
  //     <DataTableColumnHeader column={column} title={t('Image')} />
  //   )},
  //   cell: ({ row }) => {
  //     const imgUrl = 'https://ahmedsamir1.s3.eu-central-1.amazonaws.com/'
  //     console.log('====================', imgUrl )
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {/* {row.getValue('img')} */}
  //           <img
  //             src={imgUrl + row.getValue('img') || 'https://dummyimage.com/500x500.png'}
  //             className=' h-10 w-10 rounded-full'
  //           />
  //         </span>
  //       </div>
  //     )
  //   },
  // },

  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue('status')
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && (
  //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Priority' />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue('priority')
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && (
  //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => (
  //     <div>
  //       <DataTableRowActions row={row} />,
  //     </div>
  //   ),
  // },
]
