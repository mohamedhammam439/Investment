import React, { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import Previews from '@/components/custom/ImgFilesDND'
import MultiSelect from '@/components/MultiSelect'
import createCrudService from '@/api/services/crudService'
import { companyCategories } from '@/constant/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'
import { SelectComp } from '@/components/custom/SelectItem'
import axios from 'axios'
import Cookies from 'js-cookie'

// Define the schema
const formSchema = z.object({
  title: z.string().nonempty({ message: 'title is required' }),
  desc: z.string().nonempty({ message: 'description is required' }),
  address: z.string().nonempty({ message: 'address is required' }),
  img: z.any().optional(),
  // filenames: z.any().optional(),
  admin_id: z.any(),
})

interface AddEditModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const { useCreate, useUpdateWithParams } = createCrudService<any>('project')
  const { useGetAllAdmins } = createCrudService<any>(
    'user-admin-for-assignment'
  )
  // const { useGetAllAdmins } = createCrudService<any>('user')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdateWithParams()
  const { data: AllAdminsData, isLoading } = useGetAllAdmins()
  console.log('AllAdminsData', AllAdminsData)
  const adminIdCookies = Cookies.get('adminIdCookies')
console.log('adminIdCookies from project', adminIdCookies)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [adminId, setAdminId] = useState(1)
  console.log('adminId', adminId)

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [filesName, setFilesName] = useState<any[]>([])
  const title =
    modalType === 'Add' ? t('Add New Project') : t('Edit Project')
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const defaultValues = useMemo(
    () => (modalType === 'Add' ? {} : initialData),
    [initialData, modalType]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  useEffect(() => {
    if (modalType === 'Add') {
      form.reset({})
      form.reset({})
      setFiles([])
      setFilesName([])
    } else if (modalType === 'Edit') {
      form.reset(initialData)
      // setFiles([initialData.img])
    }
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    // Create an object to hold all the categorized data
    const formData = {
      ...values,
      img: files,
      filenames: filesName,
      admin_id: adminId ? adminId : adminIdCookies,
    }
    // Handle modal type logic (Add or Update)
    const submitHandler = modalType === 'Add' ? createUser : updateUser

    // Structure the payload for updating the user, if necessary
    const payload =
      modalType === 'Add' ? formData : { id: initialData.id, data: formData }
    console.log('====================================')
    console.log('payload devoelper', payload)
    console.log('====================================')
    try {
      await submitHandler(payload, {
        onSuccess: () => {
          setLoading(false)
          onClose()
        },
        onError: () => {
          setLoading(false)
        },
      })
    } catch (error) {
      setLoading(false)
      console.error('Error submitting form:', error)
    }
  }

  const handleFilesChange = useCallback((newFiles: any[]) => {
    setFiles(newFiles)
    setFilesName(newFiles)
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFilesName(selectedFiles)
  }

  // const handelAdminUser = async () => {
  //   try {
  //     const response = await axios.post(baseURL + 'user-admin-for-assignment', null, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Accept: '*/*',
  //       },
  //       withCredentials: true,
  //     });
  //     console.log("response", response);
  //     // setAdmins(response?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   handelAdminUser()
  // },[])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {t('Fill in the share details below.')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='my-5 px-4'
          >
            <div className='grid h-[300px] grid-cols-1 gap-y-4 overflow-x-hidden overflow-y-scroll px-2 md:w-auto md:grid-cols-2 md:gap-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Title')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Title')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='desc'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Description')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Description')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('address')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter address')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='admin_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Admin')}</FormLabel>
                    <FormControl>
                      <SelectComp
                        defaultValue={adminId}
                        onValueChange={(value) => setAdminId(Number(value))}
                        placeholder={t('Select admins')}
                        options={AllAdminsData?.data.map((user) => ({
                          value: user.id,
                          label: user.name,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3>img</h3>
              <Previews
                initialFiles={files}
                onFilesChange={(e) => setFiles(e)}
              />
           {/* <h3>file names</h3> */}
              {/*<FormField
                control={form.control}
                name='filenames'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('filenames')}</FormLabel>
                    <FormControl>
                      {' '}
                      <Input
                        type='file'
                        multiple
                        onChange={(e) => {
                          handleFileInputChange(e)
                          field.onChange(e)
                        }}
                      />{' '}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <Previews
                initialFiles={filesName}
                onFilesChange={(e) => setFilesName(e)}
              /> */}
            </div>

            <div className='col-span-full mt-10 flex items-center justify-center space-x-4 md:justify-between md:px-8'>
              <Button
                size='lg'
                variant='default'
                type='submit'
                disabled={loading}
              >
                {loading ? t('Submitting...') : t('Submit')}
              </Button>
              <Button
                type='button'
                size='lg'
                variant='outline'
                onClick={onClose}
              >
                {t('Cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditModal
