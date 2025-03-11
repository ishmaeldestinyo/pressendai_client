import { toast } from 'sonner'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import axiosInstance from '../api/axiosConfig'
import { MdFormatListNumbered, MdMarkEmailRead } from 'react-icons/md'
import { Button, Divider, Input, Tooltip } from '@mui/joy'
import { IoCall, IoFingerPrintOutline } from 'react-icons/io5'
import { FaGithub, FaSalesforce, FaUser } from 'react-icons/fa'
import { IconButton, Typography } from '@material-tailwind/react'

function ResetPasswordSubmit () {
  const [otp, setOTP] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setToken(searchParams.get('token'))
  }, [])

  const formFields = [
    {
      name: 'Password',
      type: 'password',
      value: password,
      onChange: e => {
        setPassword(e.target.value)
        setLoading(false)
      },
      minLength: '',
      onFocus: () => setLoading(false),
      onBlur: () => {},
      icon: <IoFingerPrintOutline size={24} />
    }
  ]
  const [loading, setLoading] = useState(false)

  const handleResetPasswordSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      password,
    }
    try {
      const response = await axiosInstance.put(
        `/api/users/password-reset/submit?token=${token ?? otp}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.status == 200) {
        toast.success(response.data?.message)
        setLoading(false)
        setTimeout(() => {
          navigate('/auth/login', { replace: true })
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error?.response?.data?.message ?? 'Network Error!'

      toast.error(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        className='w-full md:block min-h-screen mx-auto sm:block xl:grid lg:grid 2xl:grid grid-cols-12 h-screen'
        onSubmit={handleResetPasswordSubmit}
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
                <div className='text-gray-100'>Confirm Reset Password Form</div>
              </Divider>
              <Typography
                as={'h1'}
                className='font-normal text-gray-400 md:w-11/12 mx-auto w-fit text-sm mt-2'
              >
                Enter your new password to successfully reset your password
              </Typography>
              <div className='my-5'>
                {!token && (
                  <Input
                    sx={{
                      background: '#131313',
                      color: '#6E6E6E',
                      border: '1px solid #4A4A4A'
                    }}
                    endDecorator={<MdFormatListNumbered />}
                    type={'text'}
                    minLength={4}
                    value={otp}
                    placeholder={`Your OTP`}
                    onChange={e => setOTP(e.target.value)}
                    onFocus={e => setLoading(false)}
                  />
                )}
                {formFields &&
                  formFields.length > 0 &&
                  formFields.map((field, key) => (
                    <div className={`md:my-3.5 my-3.5`} key={key}>
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
                        placeholder={`New ${field.name}`}
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
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordSubmit
