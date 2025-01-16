import createCrudService from '@/api/services/crudService';
import { DataTable } from '@/components/custom/DataTableComp/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { InvoiceCoulmns } from './invoiceColumns';
const baseURL = import.meta.env.VITE_API_BASE_URL

interface AssetsProps { address: any}
const UserInvoice: React.FC<AssetsProps> = ({ address }) => {
  // const allServiceUser = createCrudService<any>('user')
  // const { useGetAll } = allServiceUser
  // const { data: allUserData, isLoading } = useGetAll()
  const [invoiceInfo, setInvoiceInfo] = useState([]);
  const [loading, setLoading] = useState(false);


  const { t } = useTranslation()
  
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
        setInvoiceInfo(response?.data.data?.invoice)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }}
      fetchUserData(address)
  },[])
  return (
    <>
     <div className='mt-5'>
     <DataTable
          data={invoiceInfo || []}
          columns={InvoiceCoulmns}
          meta={{}}
          loading={loading}
          handleRowClick={(row: any) => console.log(row)}
        />
      </div>
  

  
  </>
  )
}

export default UserInvoice
