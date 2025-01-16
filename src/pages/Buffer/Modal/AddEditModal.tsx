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
import { Datepicker } from 'flowbite-react'
import 'react-datepicker/dist/react-datepicker.css'
import Cookies from 'js-cookie'

// Define the schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }),
  asiangmanet: z.any().optional(),
  // price: z.any().optional(),
  // number_of_unit: z.any().optional(),
  // price_unit: z.any().optional(),
  // sold: z.any().optional(),
  percentage: z.any().optional(),
  peryears: z.any().optional(),
  type: z.string().nonempty({ message: 'type is required' }),
  sizeWalltes: z.string().nonempty({ message: 'sizeWalltes is required' }),
  // expire_date: z
  //   .date()
  //   .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
  //     message: 'expire_date is required',
  //   }).optional(),
  // profitDistributed: z.any().optional(),
  statusApp: z.string().optional(),
  active: z.any().optional(),
  country_id: z.number().optional(),
  // project_wallte_id: z.number().optional(),
})

interface AddEditModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: any
  modalType?: string
}

const invoiceVarified: {
  value: boolean
  label: string
}[] = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
]
const invoiceType: {
  value: string
  label: string
}[] = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'rent', label: 'Trade' },
  { value: 'sell', label: 'exchange' },
]

const walletType: {
  value: string
  label: string
}[] = [
  { value: 'Titanic', label: 'Titanic' },
  { value: 'Teeny-Weeny', label: 'Teeny-Weeny' },
]
const StatusApp: {
  value: string
  label: string
}[] = [
  { value: 'pending', label: 'pending' },
  { value: 'active', label: 'active' },
]
const Daytype: {
  value: string
  label: string
}[] = [
  { value: '7', label: '7 Days' },
  { value: '30', label: '30 Days' },
]

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  initialData = {},
  modalType,
}) => {
  const { useCreate, useUpdateWithParams, useUpdate } =
    createCrudService<any>('buffer')
  const { useGetAll: useGetAllCountries } =
    createCrudService<any>('country-assignment')
  const { useGetAll } = createCrudService<any>('project-assignment')
  const { useGetAll: useGetAllAdmins } = createCrudService<any>('devoelper-assignment')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdateWithParams()
  // const { mutate: updateUser } = useUpdate()
  const { data: AllCountries, isLoading } = useGetAllCountries()
  const { data: AllWallets } = useGetAll()
  const { data: AllAdminsData } = useGetAllAdmins()
  console.log('AllCountries', AllCountries)
  console.log('AllWallets', AllWallets)
  console.log('AllAdminsData', AllAdminsData)
  const adminIdCookies = Cookies.get('adminIdCookies')

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [countryId, setCountryId] = useState(33)
  const [walletId, setWalletId] = useState(1)
    const [adminId, setAdminId] = useState(1)
  
  console.log('countryId', countryId)
  console.log('walletId', walletId)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [filesName, setFilesName] = useState<any[]>([])

  const title = modalType === 'Add' ? t('Add New Buffer') : t('Edit Buffer')
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const defaultValues = useMemo(
    () => (modalType === 'Add' ? {} : initialData),
    [initialData, modalType]
  )
  console.log('initialData', initialData)
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
    let expire_date: Date | null = null;
    const today = new Date(); 
     if (values.peryears) { 
      const peryears = Number(values.peryears); 
      expire_date = new Date(today) as Date | null;
      expire_date?.setDate(today.getDate() + peryears);
     }
    //  Create an object to hold all the categorized data
    const formData = {
      ...values,
      price: 1,
      number_of_unit: 1,
      price_unit:1,
      sold: 1,
      profitDistributed: 1,
      expire_date: expire_date?.toISOString() ?? '',
      asiangmanet: adminId ? adminId : adminIdCookies,
      country_id: countryId ,
      project_wallte_id: 37,
    }
    // const formDataEdite = {
    //   ...values,
    //   price: 1,
    //   number_of_unit: 1,
    //   price_unit:1,
    //   sold: 1,
    //   profitDistributed: 1,
    //   expire_date: expire_date?.toISOString() ?? '',
    //   asiangmanet: initialData.asiangmanet,
    //   country_id: countryId ,
    //   project_wallte_id: 37,
    // }
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
            {t('Fill in the hare details below.')}
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='asiangmanet'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Trade Types')}</FormLabel>
                    <FormControl>
                    <SelectComp
                        defaultValue={initialData.asiangmanet}
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
{/* 
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('price')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter price')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='number_of_unit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('number_of_unit')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter number_of_unit')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price_unit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('price_unit')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter price_unit')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='sold'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sold')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter sold')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name='percentage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('percentage')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter percentage')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='peryears'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('perdays')}</FormLabel>
                    <FormControl>
                    <SelectComp {...field} 
                      defaultValue={initialData.peryears?.toString()} 
                      onValueChange={field.onChange} 
                      options={Daytype} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('type')}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        defaultValue={initialData.type}
                        onValueChange={field.onChange}
                        options={invoiceType}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='sizeWalltes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sizeWalltes')}</FormLabel>
                    <FormControl>
                    <SelectComp
                                             {...field}
                                             defaultValue={initialData.sizeWalltes}
                                             onValueChange={field.onChange}
                                             options={walletType}
                                           />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              {/* <FormField
                control={form.control}
                name='profitDistributed'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profitDistributed')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter profitDistributed')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name='statusApp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('statusApp')}</FormLabel>
                    <FormControl>
                    <SelectComp
                        {...field}
                       
                        onValueChange={field.onChange}
                        options={StatusApp}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='active'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('active')}</FormLabel>
                    <FormControl>
                      <SelectComp
                        {...field}
                        defaultValue={initialData.active ? 'True' : 'False'}
                        onValueChange={field.onChange}
                        options={invoiceVarified}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name='project_wallte_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Project Wallet')}</FormLabel>
                    <FormControl>
                      <SelectComp
                        defaultValue={initialData.project_wallte_id}
                        onValueChange={(value) => setWalletId(Number(value))}
                        placeholder={t('Select Wallets')}
                        options={AllWallets?.data?.map((wallet) => ({
                          value: wallet.id?.toString(),
                          label: wallet.title,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name='country_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Country')}</FormLabel>
                    <FormControl>
                      <SelectComp
                        defaultValue={countryId}
                        onValueChange={(value) => setCountryId(Number(value))}
                        placeholder={t('Select Country')}
                        options={AllCountries?.data?.map((country) => ({
                          value: country.id?.toString(),
                          label: country.name,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
