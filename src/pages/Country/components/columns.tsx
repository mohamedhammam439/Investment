import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/custom/DataTableComp/data-table-column-header'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
const baseURL = import.meta.env.VITE_API_BASE_URL

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Name')} />
    )},
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('status')} />
    )},
    cell: ({ row }) => {
      let isVerified = row.getValue('status')
      const queryClient = useQueryClient()
      console.log('row', row)
      
        const updateUserActiveStatus = async (newActiveStatus: boolean) => {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              withCredentials: true,
            };
        
            // Make the API call to update the user's active status with the correct structure
            await axios.put( baseURL + `country/${row.original.id}`, 
              { status: newActiveStatus }, 
              config
            );
        
            // If the update is successful, invalidate the 'user' queries
            queryClient.invalidateQueries({ queryKey: ['country'] });
          } catch (error) {
            console.error('Error updating user active status:', error);
            // Handle error as needed
          }
        };
      
        // Function to toggle the active status
        const toggleActiveStatus = (e) => {
          e.stopPropagation();
          const newActiveStatus = !isVerified;
          console.log('newActiveStatus', newActiveStatus)
          const booleanNewActiveStatus = Boolean(newActiveStatus);
          // Call the function to update the user's active status
          updateUserActiveStatus(booleanNewActiveStatus);
        };

      return (
        <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
          <label className='relative inline-flex cursor-pointer items-center'>
            <input
              onChange={toggleActiveStatus}
              type='checkbox'
              checked={isVerified ? true : false}
              className='peer sr-only'
            />
            <div
              className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700`}
            ></div>
          </label>
        </div>
      )
    },
  },
  {
    accessorKey: 'img',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
      <DataTableColumnHeader column={column} title={t('Logo')} />
    )},
    cell: ({ row }) => {
      const imgUrl = 'https://ahmedsamir1.s3.eu-central-1.amazonaws.com/'
     return (
       <div className='flex space-x-2'>
         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
           {/* {row.getValue('img')} */}
           <img
              src={imgUrl + row.getValue('img') || 'https://dummyimage.com/500x500.png'}
             className=' h-10 w-10 rounded-full'
           />
         </span>
       </div>
     )
   },
  },
  // {
  //   accessorKey: 'descriptionEn',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='English Description' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('descriptionEn')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'descriptionAr',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Arabic Description' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('descriptionAr')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'website',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Website' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('website')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'addressEn',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='English Address' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('addressEn')}
  //       </span>
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: 'addressAr',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Arabic Address' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex space-x-2'>
  //       <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
  //         {row.getValue('addressAr')}
  //       </span>
  //     </div>
  //   ),
  // },
  
  
]
