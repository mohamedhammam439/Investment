import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { Button } from '@/components/custom/button'
import axiosInstance from '@/api/interceptors'
import interceptorsJson from '@/api/interceptorsJson'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ConfirmDelModal } from '../Modal/ConfirmDelModal'
import { AddReason } from '../Modal/AddReason'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useTranslation } from "react-i18next";


const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('FullName')} />
    )},
    cell: ({ row }: any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('fullname')}
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
      <DataTableColumnHeader column={column} title={t('Email')} />
    )},
    cell: ({ row }: any) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('user')?row.getValue('user').email : ''}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'international_id',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('NationaLId')} />
    )},
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('international_id')}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'active',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('active')} />
    )},
    cell: ({ row }) => {
      const [isDialogOpen, setDialogOpen] = useState(false)
      const [reason, setReason] = useState('')
      const { t } = useTranslation();

      const { id, active } = row.original
      const queryClient: any = useQueryClient()
      console.log('id', id)
      console.log('kycStatus', active)

      // Function to handle KYC approval

      const handleKycAction = async (active: string) => {
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
          if (active === 'approve') {
            await axios.patch(baseURL + `kyc/${id}`, {active}, config)
          } else {
            await axios.patch(
              baseURL + `kyc/${id}`,
              { active},
              config
            )
          }

          queryClient.invalidateQueries(['kyc'])
        } catch (error) {
          console.error('Error updating user active status:', error)
          // Handle error as needed
        }
      }
      const handleCloseModal = () => {
        setDialogOpen(false)
      }

      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {active === 'pending' ? (
              <>
                <Button
                  variant='default'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleKycAction('approved')
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
              active
            )}
          </span>
        </div>
      )
    },
  },
]
