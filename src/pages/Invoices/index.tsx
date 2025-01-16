import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { Button } from '@/components/custom/button'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { memo, useEffect, useState } from 'react'
import { DetailsModal } from './Modal/DetailsModal'
import { DataTable } from '@/components/custom/DataTableComp/data-table'
import { ConfirmDelModal } from './Modal/ConfirmDelModal'
import AddEditModal from './Modal/AddEditModal'
import LanguageDropdown from '@/i18n/LanguageDropdown'
import createCrudService from '@/api/services/crudService'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Invoices() {
  // debugger
  const allServiceUser = createCrudService<any>('invoice')
  const { useGetAll , useGetAllApproved} = allServiceUser
  const { data: allUserData, isLoading } = useGetAll()
  const { data: allUserApproved } = useGetAllApproved()
  const [isAddEditModalOpen, setIsAddEditOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDelModalOpen, setIsDelModalOpen] = useState(false)
  const [selectedTableRow, setSelectedRow] = useState({})
  const [modalType, setModalType] = useState('Add')
  const { t } = useTranslation()
  const [currentLang, setCurrentLang] = useState()
  const { i18n } = useTranslation()
  console.log('====================================')
  console.log(allUserData?.data)
  console.log('====================================')
  const handleCreateTask = () => {
    setSelectedRow({})
    setModalType('Add')
    setIsAddEditOpen(true)
  }
  const handleOpenViewModal = (row: any) => {
    setSelectedRow(row)
    setIsViewModalOpen(true)
  }
  const handleOpenDeleteModal = (row: any) => {
    setSelectedRow(row)
    setIsDelModalOpen(true)
  }
  const handleOpenEditModal = (row: any) => {
    setModalType('Edit')
    setSelectedRow(row)
    setIsAddEditOpen(true)
  }
  const handleCloseModal = () => {
    setIsAddEditOpen(false)
    setIsViewModalOpen(false)
    setIsDelModalOpen(false)
  }
  useEffect(() => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || 'en'
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    setCurrentLang(currentLang)
  }, [i18n.language])

  return (
    <>
      <AddEditModal
        initialData={modalType == 'Add' ? {} : selectedTableRow}
        isOpen={isAddEditModalOpen}
        onClose={() => handleCloseModal()}
        modalType={modalType}
      />
      <DetailsModal
        initialData={selectedTableRow}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
      />
      <ConfirmDelModal
        initialData={selectedTableRow}
        isOpen={isDelModalOpen}
        onClose={handleCloseModal}
      />
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header sticky>
          {/* <Search /> */}
          <div
            className={`${currentLang === 'ar' ? 'mr-auto' : 'ml-auto'} flex items-center space-x-4`}
          >
            <ThemeSwitch />
            <UserNav />
            <LanguageDropdown />
          </div>
        </Layout.Header>

        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div className='w-full'>
              <Tabs defaultValue='pending' className='w-full'>
                <TabsList className='mx-auto flex'>
                  <TabsTrigger className='sm:mx-1 lg:mx-8' value='pending'>
                    {t('Pending')}
                  </TabsTrigger>
                  <TabsTrigger className='sm:mx-1 lg:mx-8' value='approved'>
                    {t('Approved')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='pending'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>
                      {t('Invoices')}
                    </h2>
                  </div>
                  <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <DataTable
                      // handleDel={handleOpenDeleteModal}
                      handleRowClick={handleOpenViewModal}
                      data={allUserData?.data || []}
                      columns={columns}
                      handleEdit={handleOpenEditModal}
                      actionBtn={
                        <>
                          {/* <Button
                    variant={'outline'}
                    onClick={() => handleCreateTask()}
                  >
                    <PlusIcon /> <span className='ms-1'>{t("Add New")}</span>
                  </Button> */}
                        </>
                      }
                      meta={allUserData?.meta}
                      loading={isLoading}
                    />
                  </div>
                </TabsContent>
                <TabsContent value='approved'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>
                      {t('Invoices')}
                    </h2>
                  </div>
                  <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <DataTable
                      // handleDel={handleOpenDeleteModal}
                      handleRowClick={handleOpenViewModal}
                      data={allUserApproved?.data || []}
                      columns={columns}
                      // handleEdit={handleOpenEditModal}
                      actionBtn={
                        <>
                          {/* <Button
                    variant={'outline'}
                    onClick={() => handleCreateTask()}
                  >
                    <PlusIcon /> <span className='ms-1'>{t("Add New")}</span>
                  </Button> */}
                        </>
                      }
                      meta={allUserData?.meta}
                      loading={isLoading}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Layout.Body>
      </Layout>
    </>
  )
}
export default Invoices
