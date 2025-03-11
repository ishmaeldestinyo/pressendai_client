import { IconButton } from '@material-tailwind/react'
import { Button } from '@mui/joy'
import React from 'react'
import { IoFlashOutline } from 'react-icons/io5'
import { Link, useSearchParams } from 'react-router-dom'

const ChooseProduct = () => {

  const builderBtnStyle = {
    fontFamily: 'Inter',
    fontSize: '12px',
    fontWeight: 'normal'
  }
  return (
    <>
      <nav className='flex m:py-4 py-5 md:px-7 px-5 border-b border-gray-900/80 justify-between'>
        <div className=''>
          <Link to={'/'} className="flex items-center gap-x-1">
            <img src='/logo.png' alt='Logo ' className='md:w-44 w-36' />
          </Link>
        </div>
        <div className='cursor-pointer md:block xl:block 2xl:block sm:block xs:block hidden'>
          <Button
          startDecorator={<IoFlashOutline size={20}/> }
            className='capitalize cursor-pointer'
            style={builderBtnStyle}
          >
            What's new?
          </Button>
        </div>
      </nav>
    </>
  )
}

export default ChooseProduct
