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
// import { invoiceVarified, userRoles } from '@/constant/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'
import { SelectComp } from '@/components/custom/SelectItem'

// Define the schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'User name is required' }),
  email: z.string(),
  // .min(1, { message: 'Please enter your email' })
  // .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  phone: z.string({ message: 'Phone is required' }),
  status: z.string({ message: 'Status is required' }),
  money: z.any().optional(),
  verified: z.any().optional(),
})

const invoiceVarified: {
  value: boolean
  label: string
}[] = [
  { value: true, label: 'True' },
  { value: false, label: 'False' },
]

const invoiceStatus: {
  value: string
  label: string
}[] = [
  { value: "admin", label: 'Admin' },
  { value: "viewer", label: 'SuperAdmin' },
  { value: "user", label: 'User' },
]
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
  const { useCreate, useUpdateWithParams } = createCrudService<any>('user')
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdateWithParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const title = modalType === 'Add' ? t('Add New User') : t('Edit User')

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
    } else if (modalType === 'Edit') {
      form.reset(initialData)
      // setFiles([initialData.logo])
    }
  }, [initialData, form, modalType])

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log('submit add user')
    // setLoading(false)
    const moneyValue = values.money ? values.money : 0
    // Create an object to hold all the categorized data
    const formData = { ...values, money: moneyValue, logo: files };

    // Handle modal type logic (Add or Update)
    const submitHandler = modalType === 'Add' ? createUser : updateUser

    // Structure the payload for updating the user, if necessary
    const payload =
      modalType === 'Add' ? formData : { id: initialData.id, data: formData }
    console.log('====================================')
    console.log('form data company', formData)
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
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[98vw] md:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {t('Fill in the Company details below.')}
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
                    <FormLabel>{t('User Name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter User Name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Email')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Email')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Password')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Password')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter phone')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='money'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Money')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter Money')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Status')}</FormLabel>
                    <FormControl>
                    <SelectComp
                          {...field}
                          onValueChange={field.onChange}
                          options={invoiceStatus}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {modalType === 'Add' ? (
                <FormField
                  control={form.control}
                  name='verified'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('verified')}</FormLabel>
                      <FormControl>
                        <SelectComp
                          {...field}
                          onValueChange={field.onChange}
                          options={invoiceVarified}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
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
