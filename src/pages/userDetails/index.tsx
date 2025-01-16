import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useTranslation } from 'react-i18next'
import LanguageDropdown from '@/i18n/LanguageDropdown'
import { useParams } from 'react-router-dom'
import UserDeposite from './components/deposite'
import UserWithdraw from './components/withdraw'
import UserInvoice from './components/UserInvoice'
import UserKyc from './components/UserKyc'
import UserShares from './components/shares'
import UserBuffer from './components/buffers'

export default function UserDetails() {
  const { t } = useTranslation()
  const { id: address } = useParams()
 

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          <ThemeSwitch />
          <UserNav />
          <LanguageDropdown />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
      <div className="w-full">
      <Tabs defaultValue='invoice' className='w-full'>
          <TabsList className='flex mx-auto'>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='invoice'>{t("Invoice")}</TabsTrigger>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='kyc'>{t("Kyc")}</TabsTrigger>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='deposite'>{t("Deposite")}</TabsTrigger>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='withdraw'>{t("Withdraw")}</TabsTrigger>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='shares'>{t("Shares")}</TabsTrigger>
          <TabsTrigger className='sm:mx-1 lg:mx-8' value='buffers'>{t("Buffers")}</TabsTrigger>
          </TabsList>


          <TabsContent value='invoice'>
               <UserInvoice address={address} />
          </TabsContent>
          <TabsContent value='deposite'>
              <UserDeposite address={address} />
            </TabsContent> 
            <TabsContent value='withdraw'>
            <UserWithdraw address={address} />
          </TabsContent>
          <TabsContent value='kyc'>
              <UserKyc address={address} />
            </TabsContent> 
            <TabsContent value='shares'>
              <UserShares address={address} />
            </TabsContent> 
            <TabsContent value='buffers'>
              <UserBuffer address={address} />
            </TabsContent> 
         
         


        </Tabs>
      </div>
      
      </Layout.Body>
    </Layout>
 
  )
}
