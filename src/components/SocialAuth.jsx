import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button, Tooltip } from '@mui/joy'
import { SiZoom } from "react-icons/si";

const SocialAuth = () => {
  const thirdPartyAuth = [
    {
      icon: <FcGoogle size={24} />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`
      },
      name: 'Google'
    },
    {
      icon: <FaGithub size={24} />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/github`
      },
      name: 'Github'
    },
    {
      icon: <SiZoom size={24} />,
      action: () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/api/meetings/zoom`
      },
      name: ''
    },
  ]

  return (
    <div className='flex mt-1 justify-center gap-3'>
      {thirdPartyAuth &&
        thirdPartyAuth.length > 0 &&
        thirdPartyAuth.map((auth, key) => (
          <div key={key} className='mt-2 cursor-pointer'>
            <Tooltip color='primary' title={auth.name} arrow placement='bottom'>
              <Button
              startDecorator={auth.icon}
                onClick={auth.action}
                sx={{background: auth.name == 'Salesforce'
                  ? 'blue'
                  : auth.name == 'Google'
                  ? 'white'
                  : auth.name == 'Github'
                  ? '#131313'
                  : 'primary', color:  auth.name == 'Salesforce'
                  ? 'blue'
                  : auth.name == 'Google'
                  ? '#131313'
                  : auth.name == 'Github'
                  ? 'whitesmoke'
                  : 'primary'}}
                className='cursor-pointer'
              >
                {auth.name}
              </Button>
            </Tooltip>
          </div>
        ))}
    </div>
  )
}

export default SocialAuth
