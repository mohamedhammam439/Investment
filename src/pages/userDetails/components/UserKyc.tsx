import createCrudService from '@/api/services/crudService'
import { DataTable } from '@/components/custom/DataTableComp/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/custom/button'
import { useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent } from '@/components/ui/dialog'
const baseURL = import.meta.env.VITE_API_BASE_URL

interface AssetsProps {
  address: any
}
interface KycInfo {
  fullname: string
  // Add other properties as needed
}
const UserKyc: React.FC<AssetsProps> = ({ address }) => {
  // const allServiceUser = createCrudService<any>('user')
  // const { useGetAll } = allServiceUser
  // const { data: allUserData, isLoading } = useGetAll()
  const [kycInfo, setKycInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState()

  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [currentImgSrc, setCurrentImgSrc] = useState('')
  const handleClickOpen = (src) => {
    setCurrentImgSrc(src)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const fetchUserData = async (address: any) => {
    setLoading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
      const response = await axios.get(baseURL + `user/${address}`, config)
      console.log('myRespppppppp', response)
      setKycInfo(response?.data.data?.kyc)
      setActive(response?.data.data?.kyc?.active)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserData(address)
  }, [active])

  const handleKycAction = async (action: string) => {
    try {
      // Include the access token in the request headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { _method: 'PUT' },
        withCredentials: true,
      }
      const res = await axios.post(
        baseURL + `kyc/${kycInfo.id}`,
        {
          active: action,
        },
        config
      )

      console.log('action', action)
      if (action) {
        fetchUserData(address)
      }
    } catch (error) {
      console.error('Error updating user active status:', error)
      // Handle error as needed
    }
  }
  const BASE_URI_IMG = ''
  return (
    <>
    {kycInfo?  <div className='mt-5 flex justify-center'>
        <Card className='p-5'>
          <CardHeader className='mt-3'>
            <CardTitle>
              <span className='font-light'>Full Name :</span> {kycInfo?.fullname}
            </CardTitle>
            <CardTitle>
              <span>International ID :</span> {kycInfo?.international_id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-row justify-between gap-5'>
              <img
                src={`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.face_image}`}
                alt='Face Image'
                className='h-60 w-60'
                onClick={() => handleClickOpen(`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.face_image}`)}
              />
              <img
                src={`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.front_id_image}`}
                alt='front_id_image Image'
                className='h-60 w-60'
                onClick={() => handleClickOpen(`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.front_id_image}`)}
              />
              <img
                src={`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.back_id_image}`}
                alt='back_id_image Image'
                className='h-60 w-60'
                onClick={() => handleClickOpen(`https://ahmedsamir1.s3.eu-central-1.amazonaws.com/${kycInfo?.back_id_image}`)}
              />
            </div>

            <div className='max-w-2/5 mt-14 flex justify-around space-x-2'>
              {active === 'pending' ? (
                <>
                  <Button
                    variant='default'
                    size='lg'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleKycAction('approved')
                    }}
                  >
                    {t('Approve')}
                  </Button>
                  <Button
                    variant='destructive'
                    size='lg'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleKycAction('reject')
                    }}
                  >
                    {t('Reject')}
                  </Button>
                </>
              ) : (
                active
              )}
            </div>
          </CardContent>
        </Card>
      </div>: <div className='flex justify-center mt-16'>There is no Kyc for this user</div>}
     

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className='w-[98vw] md:max-w-2xl'>
        <img src={currentImgSrc} alt="full-width-example" className="full-width-img" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserKyc
