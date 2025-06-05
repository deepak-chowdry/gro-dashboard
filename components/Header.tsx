import React from 'react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <div className='h-14 flex items-center justify-center shadow border-b'>
            <div className='flex items-center justify-between w-[95%]'>
                <h1 className='text-lg font-bold'>GRO</h1>
                <Button variant="outline" size="sm">Logout</Button>
            </div>
        </div>
    )
}

export default Header