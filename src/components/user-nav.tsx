import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import createCrudService from '@/api/services/crudService'

export function UserNav() {
  const { logout } = useContext(AuthContext)

  const allServiceUser = createCrudService<any>('me')
  const { useGetAll } = allServiceUser
  const { data: allUserData, isLoading } = useGetAll()

  console.log('My profile', allUserData)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{allUserData?.data?.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
            {allUserData?.data?.email}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
            {allUserData?.data?.status === "viewer" ? "Super Admin" : allUserData?.data?.status}
            </p>
          </div>
        </DropdownMenuLabel>
      
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
