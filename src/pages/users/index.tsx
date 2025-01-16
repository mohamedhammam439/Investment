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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import axios, { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

function Users() {
  // debugger

  const allServiceUser = createCrudService<any>('user')
  const { useGetAll } = allServiceUser
  const { data: allUserData, isLoading } = useGetAll()
  const [isAddEditModalOpen, setIsAddEditOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDelModalOpen, setIsDelModalOpen] = useState(false)
  const [selectedTableRow, setSelectedRow] = useState({})
  const [modalType, setModalType] = useState('Add')
  const [currentLang, setCurrentLang] = useState()
  const { i18n } = useTranslation()

  const { t } = useTranslation()
  const navigate = useNavigate();

  const status = Cookies.get('status')
  type searchResult = {
    data: any
    meta: any
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<searchResult>(
    {} as searchResult
  )
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()


  const handleSearch = async (event) => {
    const term = event.target.value
    setSearchTerm(term)

    if (term.trim() !== '') {
      setLoading(true)
      try {
        const response = await axios.post(
          'https://smartinvestment.tech/api/user-serach',
          { search: term },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
            withCredentials: true,
          }
        )
        console.log('response', response.data)
        setSearchResults(response.data)
        // queryClient.invalidateQueries({ queryKey: ['user'] });
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
      setLoading(false)
    } else {
      setSearchResults({} as searchResult)
    }
  }

  console.log('searchResults', searchResults?.data)
  console.log('====================================')
  // console.log("all users",allUserData?.data?.data)
  console.log('all users', allUserData)
  console.log('====================================')
  const handleCreateTask = () => {
    setSelectedRow({})
    setModalType('Add')
    setIsAddEditOpen(true)
  }
  const handleOpenViewModal = (row: any) => {
    console.log('row from func', row)
    navigate(`/user/${row.id}`);
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
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                {t('Users')}
              </h2>
            </div>
          </div>
          <div className='flex justify-center'>
            {' '}
            <Input
              className='h-8 w-[150px] lg:w-[250px]'
              placeholder={t('search Users...')}
              onChange={handleSearch}
            />
          </div>

          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              loading={isLoading}
              data={
                searchResults?.data?.length > 0
                  ? searchResults?.data
                  : allUserData?.data || []
              }
              meta={
                searchResults?.data?.length > 0
                  ? searchResults?.meta
                  : allUserData?.meta || []
              }
              handleDel={status=== 'viewer' ? '' : handleOpenDeleteModal}
              handleRowClick={handleOpenViewModal}
              columns={columns as any}
              handleEdit={handleOpenEditModal}
              actionBtn={
                <>
                  <Button
                    variant={'outline'}
                    onClick={() => handleCreateTask()}
                  >
                    <PlusIcon /> <span className='ms-1'>{t('Add New')}</span>
                  </Button>
                </>
              }
            />
          </div>
        </Layout.Body>
      </Layout>
    </>
  )
}
export default Users
