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

// Define the schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }).optional(),
  status: z.string().nonempty({ message: 'status is required' }).optional(),
  expireDate: z.string().nonempty({ message: 'expireDate is required' }).optional(),
 
  availableShare: z.any().optional(),
  period: z.any().optional(),
  price: z.any().optional(),
  profit: z.any().optional(),
  sold: z.any().optional(),
  dividendDistributed: z.any().optional(),
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
  const { useCreate, useUpdateWithParams } = createCrudService<any>('shares')
 
  const { mutate: createUser } = useCreate()
  const { mutate: updateUser } = useUpdateWithParams()

  const navigate = useNavigate()
  const { t } = useTranslation()

 

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [filesName, setFilesName] = useState<any[]>([])
  const title =
    modalType === 'Add' ? t('Add New Share') : t('Edit Share')
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
                name='availableShare'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('availableShare')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter availableShare')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='period'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('period')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('Enter period')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              /> <FormField
              control={form.control}
              name='profit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profit')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('Enter profit')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> <FormField
            control={form.control}
            name='dividendDistributed'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('dividendDistributed')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('Enter dividendDistributed')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> <FormField
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
        /> 
        <FormField
        control={form.control}
        name='expireDate'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('expireDate')}</FormLabel>
            <FormControl>
              <Input placeholder={t('Enter expireDate')} {...field} />
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
            <FormLabel>{t('status')}</FormLabel>
            <FormControl>
              <Input placeholder={t('Enter status')} {...field} />
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
