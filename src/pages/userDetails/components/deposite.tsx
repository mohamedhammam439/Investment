import createCrudService from '@/api/services/crudService';
import { DataTable } from '@/components/custom/DataTableComp/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { DepositeColumns } from './depositeColumns';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const baseURL = import.meta.env.VITE_API_BASE_URL

interface AssetsProps { address: any}
const UserDeposite: React.FC<AssetsProps> = ({ address }) => {
  // const allServiceUser = createCrudService<any>('user')
  // const { useGetAll } = allServiceUser
  // const { data: allUserData, isLoading } = useGetAll()
  const [depositeInfo, setDepositeInfo] = useState([]);
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
        setDepositeInfo(response?.data.data?.deposite)
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
          data={depositeInfo || []}
          columns={DepositeColumns}
          meta={{}}
          loading={loading}
          handleRowClick={(row: any) => console.log(row)}
        />
      </div>
  

  
  </>
  )
}

export default UserDeposite
