import createCrudService from '@/api/services/crudService';
import { DataTable } from '@/components/custom/DataTableComp/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SharesCoulmns } from './sharesColumns';
import { DetailsModal } from '../Modal/DetailsModal';
const baseURL = import.meta.env.VITE_API_BASE_URL

interface AssetsProps { address: any}
const UserShares: React.FC<AssetsProps> = ({ address }) => {
  // const allServiceUser = createCrudService<any>('user')
  // const { useGetAll } = allServiceUser
  // const { data: allUserData, isLoading } = useGetAll()
  const [sharesInfo, setSharesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTableRow, setSelectedRow] = useState({})
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const { t } = useTranslation()
  const handleOpenViewModal = (row: any) => {
    setSelectedRow(row)
    setIsViewModalOpen(true)
  }
  const handleCloseModal = () => {
    // setIsAddEditOpen(false)
    setIsViewModalOpen(false)
    // setIsDelModalOpen(false)
  }
  useEffect(() => {
    const fetchUserData = async (address: any) => {
      setLoading(true)
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
        const response = await axios.get(
          baseURL + `user/${address}`,
          config
        )
        console.log('myRespppppppp', response)
        setSharesInfo(response?.data.data?.share)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }}
      fetchUserData(address)
  },[])
  return (
    <>
     <div className='mt-5'>
     <DetailsModal
        initialData={selectedTableRow}
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
      />
     <DataTable
          data={sharesInfo || []}
          columns={SharesCoulmns}
          meta={{}}
          loading={loading}
          handleRowClick={handleOpenViewModal}
        />
      </div>
  

  
  </>
  )
}

export default UserShares
