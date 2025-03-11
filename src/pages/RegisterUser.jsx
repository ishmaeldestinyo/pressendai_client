import { toast } from 'sonner'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import axiosInstance from '../api/axiosConfig'
import { MdMarkEmailRead } from 'react-icons/md'
import { Button, Divider, Input, Tooltip } from '@mui/joy'
import { IoCall, IoFingerPrintOutline } from 'react-icons/io5'
import { FaGithub, FaSalesforce, FaUser } from 'react-icons/fa'
import { IconButton, Typography } from '@material-tailwind/react'
import SocialAuth from '../components/SocialAuth'

function RegisterUser () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const nameRegex = /[ A-Za-z ]+$/;

  const phoneNumberRegex = /^[0-9]+$/;

  const formFields = [
    {
      name: 'name',
      type: 'text',
      onChange: e => {
        if(!nameRegex.test(e.target.value)) {
          toast.error("Name must be letters only")
          return ;
        }

        setName(e.target.value)
        setLoading(false)
      },
      minLength: '',
      onFocus: e => {},
      onBlur: () => {},
      value: name,
      icon: <FaUser size={24} />
    },
    {
      name: 'Email',
      type: 'email',
      value: email,
      onChange: e => {
        setEmail(e.target.value)
        setLoading(false)
      },
      minLength: '',
      onFocus: () => setLoading(false),
      onBlur: () => {},
      icon: <MdMarkEmailRead size={24} />
    },
    {
      name: 'Phone number',
      type: 'text',
      value: phoneNumber,
      minLength: 10,
      onFocus: () => setLoading(false),
      onChange: e => {
        if(!phoneNumberRegex.test(e.target.value)) {
          toast.error("Phone number field requires numbers")
          return ;
        }
        // must start with +234 for NG, +1 for US, +44 for UK, +81 for Japan, etc.
        // and must have at least one digit after the country code, and must be exactly 10 digits long
        const countryCodeRegWithPlusAndDigitAndExact10Digits = /^\+[0-9]{1,3}\d{10}$/;
        if(!countryCodeRegWithPlusAndDigitAndExact10Digits.test(e.target.value)) {
          toast.error("Phone number must start with country code, eg. +234 for NG, +1 for US, +44 for UK, +81 for Japan, etc.")
          return ; 
        }
        
        setPhoneNumber(e.target.value), setLoading(false)
      },
      onBlur: () => {},
      icon: <IoCall size={24} />
    },
    {
      name: 'Password',
      type: 'password',
      value: password,
      onChange: e => {
        setPassword(e.target.value), setLoading(false)
      },
      minLength: 6,
      onFocus: () => setLoading(false),
      onBlur: () => {},
      icon: <IoFingerPrintOutline size={24} />
    }
  ]
  const [loading, setLoading] = useState(false)

  const handleUserRegistration = async e => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email,
      password,
      fullname: name,
      phone_number: phoneNumber,
    }
    try {
      const response = await axiosInstance.post(
        '/api/users',
        payload,
        {headers: {'Content-Type': 'application/json'}}
      );

      if(response.status == 201) {
        toast.success(response.data?.message);
        setLoading(false);
        setTimeout(() => {
          navigate("/")
        }, 1000)
      }

    } catch (error) {

      const errorMessage = error?.response?.data || "Network Error!";

      toast.error(errorMessage)
      setLoading(false)
    }
  }

  
  return (
    <div>
      <form
        className='w-full md:block sm:block xl:grid lg:grid 2xl:grid grid-cols-12 h-screen'
        onSubmit={handleUserRegistration}
        method='post'
      >
        <div className=' hidden lg:block xl:block 2xl:block col-span-7 overflow-hidden relative'>
          <img
            src='/hero.jpg'
            alt=''
            className='w-full h-full max-h-screen object-cover object-center'
          />
        </div>
        <div className='col-span-5 bg-gray-900/25'>
          <section className='md:flex justify-center items-center min-h-screen w-full p-6'>
            <div className='md:w-3/5 xs:w-4/5 sm:w-3/4 mx-auto'>
              <div className='logo md:w-6 mx-auto mb-6 w-6'>
                <Link to={'/'}>
                  <img src='/icon.png' alt='Logo' />
                </Link>
              </div>
              <Divider>
                <div className='text-gray-100'>Create account</div>
              </Divider>
              <Typography
                as={'h1'}
                className='font-normal text-gray-400 md:w-11/12 mx-auto w-fit text-sm mt-2'
              >
                Seamlessly authenticate to create and manage your projects
              </Typography>
              <div className='my-5'>
                {formFields &&
                  formFields.length > 0 &&
                  formFields.map((field, key) => (
                    <div className='md:my-3.5 my-3.5' key={key}>
                      <Input
                        sx={{
                          background: '#131313',
                          color: '#6E6E6E',
                          border: '1px solid #4A4A4A'
                        }}
                        endDecorator={field.icon}
                        type={field.type}
                        minLength={field.minLength}
                        value={field.value}
                        placeholder={`Your ${field.name}`}
                        onChange={field.onChange}
                        onFocus={field.onFocus}
                        onBlur={field.onBlur}
                      />
                    </div>
                  ))}
                <Button
                  loading={loading}
                  role='button'
                  type='submit'
                  color='primary'
                  fullWidth
                >
                  Submit
                </Button>
              </div>
              <Divider>Or Continue with</Divider>

               <SocialAuth/>

              <div className='flex text-sm mt-4 text-center justify-between'>
                <div className=''>
                  Already have an account?{' '}
                  <Link to={'/auth/login'} className='text-[#2299fb]'>
                    Login
                  </Link>
                </div>
                <div className=''>
                  Forgot password?{' '}
                  <Link to={'/auth/reset-password'} className='text-[#2299fb]'>
                    Reset
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}

export default RegisterUser
