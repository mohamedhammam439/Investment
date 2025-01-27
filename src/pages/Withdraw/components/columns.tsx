import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/custom/button'
import Cookies from 'js-cookie'
import { useState } from 'react'
const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('User')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user') ? row.getValue('user').name : ''}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('User')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user') ? row.getValue('user').email : ''}
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
      <DataTableColumnHeader column={column} title={t('Amount')} />
    )},
    cell: ({ row }:any) => {
      console.log('row', row)
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
    accessorKey: 'Visa_number',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Visa_number')} />
    )},
    cell: ({ row }) => {
      console.log('row', row)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('Visa_number')}
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
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='status' />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('status') }
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('status')} />
    )},
    cell: ({ row }) => {
      const { t } = useTranslation();

      const { id, status } = row.original
      const queryClient: any = useQueryClient()
      console.log('id', id)
      console.log('withdrawStatus', status)

      // Function to handle withdraw approval

      const handleKycAction = async (status: string) => {
        const accessToken = Cookies.get('accessToken')
        try {
          // Include the access token in the request headers
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
          if (status === 'approve') {
            await axios.put(baseURL + `withdraw/${id}`, {status}, config)
          } else {
            await axios.put(
              baseURL + `withdraw/${id}`,
              { status},
              config
            )
          }

          queryClient.invalidateQueries(['withdraw'])
        } catch (error) {
          console.error('Error updating user status status:', error)
          // Handle error as needed
        }
      }
      
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {status === 'pending' ? (
              <>
                <Button
                  variant='default'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleKycAction('approve')
                  }}
                >
                  {t("Approve")}
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleKycAction('reject')
                  }}
                >
                  {t("Reject")}
                </Button>
               
                {/* <Dialog open={isDialogOpen} onOpenChange={()=> setDialogOpen(true)}   >
                  <DialogTrigger asChild>
                  
                  </DialogTrigger> */}
                  {/* <AddReason
                    IsOpen={isDialogOpen}
                    handleClick={(reason: any) =>
                      handleKycAction('reject', reason)
                    }
                    reason={reason}
                    setReason={(reason: string) => setReason(reason)}
                    setDialogOpen={handleCloseModal}
                  /> */}
                {/* </Dialog> */}
              </>
            ) : (
              status
            )}
          </span>
        </div>
      )
    },
  },
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
  //   accessorKey: 'address',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='address' />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {row.getValue('address')}
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
  //     <DataTableColumnHeader column={column} title={t('Logo')} />
  //   )},
  //   cell: ({ row }) => {
  //     return (
  //       <div className='flex space-x-2'>
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //           {/* {row.getValue('img')} */}
  //           <img
  //             src={row.getValue('img') || 'https://dummyimage.com/500x500.png'}
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
