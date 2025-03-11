import React from 'react'
import { Link } from 'react-router-dom'

function Legals() {
  return (
    <div className='md:flex lg:flex xl:flex 2xl:flex sm:block justify-between md:w-full'>
        <div className='md:w-4/5 mx-auto w-full md:pt-5 p-5'>
          <div className='text-gray-100 flex items-center mt-2 md:text-2xl xl:text-2xl 2xl:text-2xl xs:text-lg sm:text-xl'>
            <Link to={"/"}>
            <img src='/icon.png' className='w-8 h-8 m-2' alt='Logo' />
            </Link>

            <section className=''>
              <span className=''>Terms and Conditions</span>
              <h2 className='text-sm text-gray-500 font-normal font-sans'>
                These terms bind our users and 'WE' (Pressend)
              </h2>
            </section>
          </div>
        </div>
        {/* Terms and condition */}
        {/* privacy policy */}
    </div>
  )
}

export default Legals