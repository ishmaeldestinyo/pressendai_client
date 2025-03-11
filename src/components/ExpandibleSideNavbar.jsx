import React from 'react'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ExpandibleSideNavbar = () => {
  return (
    <div className='flex justify-between md:p-5 px-6 pt-5 items-center'>
      <div className='logo md:w-6 w-6'>
        <Link to={'/'}>
          <img src='/icon.png' alt='Logo' />
        </Link>
      </div>
      <div className='md:pr-3 pr-4 cursor-pointer'>
        <Link to={'/'}>
          <MdDriveFileRenameOutline
            className='hover:text-blue-400 text-gray-200 transition-colors'
            size={24}
          />
        </Link>
      </div>
    </div>
  )
}

export default ExpandibleSideNavbar
