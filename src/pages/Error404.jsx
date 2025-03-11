import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className='md:min-h-screen flex justify-center md:w-96 mx-auto w-48 items-center'>
      <div className=''>
        <img src='/error404.svg' alt='Page Not Found' className='' />
        <section className='mx-auto w-fit'>
          <Typography as={"h2"} className='mb-2 font-normal'>Whoops! It seems you are accessing the wrong page!</Typography>
         <div className="w-fit mx-auto">
         <Link target='_self' to={'/'}>
            <Button color='blue'>Back to Homepage</Button>
          </Link>
         </div>
        </section>
      </div>
    </div>
  )
}

export default Error404
