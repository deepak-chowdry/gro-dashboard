import React from 'react'
import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'

const Header = () => {
    return (
        <div className='h-14 flex items-center justify-center border-b'>
            <div className='flex items-center justify-between w-[95%]'>
                <div className='flex items-center gap-2'>
                    <div className='md:hidden mt-0.5'>
                        <SidebarTrigger />
                    </div>
                    <h1 className='text-lg font-bold'>GRO</h1>
                </div>
                <Button variant="outline" size="sm">Logout</Button>
            </div>
        </div>
    )
}

export default Header