import React, { useEffect, useRef, useState } from 'react'
import ExpandibleSideNavbar from './ExpandibleSideNavbar'
import OffsetExpandibleSideMenu from './OffsetExpandibleSideMenu'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import { MdMoreVert } from 'react-icons/md'
import { FaEdit, FaShareAlt, FaTimes, FaTrash } from 'react-icons/fa'
import { CircularProgress, Divider } from '@mui/joy'
import { LuGithub, LuGlobe } from 'react-icons/lu'
import {motion} from 'motion/react';
import { getResult } from '../api/axiosConfig'
import {toast} from 'sonner';

const ExpandibleSideMenu = () => {
  const [offsetMenuOpen, setOffsetMenuOpen] = useState(false)

  // const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) { // Only parse if userData exists and is not null
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);
  

  // Last 7d, yesterday, Last 2wk, Last month, 90d ago, on scroll down, show more
  const projects = [
    {
      name: 'My project name',
      prompt: 'My prompt name',
      stack_used: 'This is the stack used',
      file_structure: [
        {
          ref: 'This is the ref',
          name: 'this is one file name',
          url: 'this is the url',
          link_ref: ['This is the file linked to url', 'file 2'],
          deprecated: true
        }
      ],
      github_url: 'github url',
      deployment: {
        url: 'url',
        ref: 'the ref',
        created_at: 'today',
        updated_at: 'today',
        provider: 'Koyeb'
      },
      built_in_domain: 'this is the inbuilt domain',
      custom_domain: {
        ref: 'This is the custom domain',
        id: 'domain id'
      },
      status: 'ACTIVE',
      prompt_method: 'DEFAULT',
      owner: '4848388384838',
    },
    {
      name: 'My project name',
      prompt: 'My prompt name',
      stack_used: 'This is the stack used',
      file_structure: [
        {
          ref: 'This is the ref',
          name: 'this is one file name',
          url: 'this is the url',
          link_ref: ['This is the file linked to url', 'file 2'],
          deprecated: true
        }
      ],
      github_url: 'github url',
      deployment: {
        url: 'url',
        ref: 'the ref',
        created_at: 'today',
        updated_at: 'today',
        provider: 'Koyeb'
      },
      built_in_domain: 'this is the inbuilt domain',
      custom_domain: {
        ref: 'This is the custom domain',
        id: 'domain id'
      },
      status: 'ACTIVE',
      prompt_method: 'DEFAULT',
      owner: '4848388384838',
    },
    {
      name: 'My project name',
      prompt: 'My prompt name',
      stack_used: 'This is the stack used',
      file_structure: [
        {
          ref: 'This is the ref',
          name: 'this is one file name',
          url: 'this is the url',
          link_ref: ['This is the file linked to url', 'file 2'],
          deprecated: true
        }
      ],
      github_url: 'github url',
      deployment: {
        url: 'url',
        ref: 'the ref',
        created_at: 'today',
        updated_at: 'today',
        provider: 'Koyeb'
      },
      built_in_domain: 'this is the inbuilt domain',
      custom_domain: {
        ref: 'This is the custom domain',
        id: 'domain id'
      },
      status: 'ACTIVE',
      prompt_method: 'DEFAULT',
      owner: '4848388384838',
    },
  ]

  const [hovered, setHovered] = useState(false);

  const [hoveredIndex, setHovererIndex] = useState(null);


  const projectActionItem = [
    {
      name: "Share",
      action: () => {},
      icon: <FaShareAlt/>
    },
    {
      name: 'Browse',
      action: () => {},
      icon: <LuGlobe/>
    },
    {
      name: 'Github',
      action: () => {},
      icon: <LuGithub/>
    },
    {
      name: 'Update',
      action: () => {},
      icon: <FaEdit/>
    },
    {
      name: 'Delete',
      action: () => {},
      icon: <FaTrash/>
    },

  ]

  const [itemOpen, setItemOpen] = useState(false);

  return (
    <div
      className={`backdrop-blur-sm min-h-screen  overflow-y-auto w-60 z-30 absolute top-0 bottom-0 border-r border-gray-800 `}
    >
      <ExpandibleSideNavbar />
      <section className="pl-3 pr-1.5">
        <Divider>Recent</Divider>
        <br/>

      {projects.map( (project, key) => (
        <Typography onMouseEnter={() => {
          setHovered(true)
          setHovererIndex(key);
        }} onMouseLeave={() => {
          setHovered(false)
          setHovererIndex(null);
        }} key={key} fullWidth className={` text-sm relative my-0.5 border-b border-gray-900/45 bg-inherit cursor-pointer flex justify-between items-center`}>
          <span className="">{project.prompt}</span>
          <IconButton onClick={() => setItemOpen(!itemOpen)} className={`bg-inherit cursor-pointer rounded-full ${hovered && hoveredIndex == key ? 'opacity-100': 'opacity-0'}`}>
            {itemOpen ? <FaTimes color='red' size={20}/> : <MdMoreVert size={18}/>}
          </IconButton>
            <motion.div animate={{opacity: itemOpen && hoveredIndex == key ? 1 : 0}} className={`project-item-action ${itemOpen && hoveredIndex == key ? 'block': 'hidden'} capitalize absolute top-0 right-10`}>
              {projectActionItem && projectActionItem.length > 0 && projectActionItem.map( (item, i) => (
                <div key={i} className='flex hover:text-blue-400 transition justify-start gap-2 text-gray-300 items-center my-2'>{item.icon} {item.name}</div>
              ))}
            </motion.div>
        </Typography>
      ))}
      </section>
      {offsetMenuOpen && <OffsetExpandibleSideMenu isOpen={offsetMenuOpen} />}
      {/* User profile */}
      <div
        className={`flex  z-30  pt-2 justify-between ${
          !offsetMenuOpen ? 'border-t border-gray-800/95' : ''
        } gap-0 bottom-3 absolute inset-x-4`}
      >
        <div className='w-fit cursor-pointer'>
          <img
            src={user?.avatar_url ?? '/avatar.png'}
            alt='profile picture'
            className='w-10 mt-1 h-10 rounded-full'
          />
        </div>
        <div className='w-auto items-center'>
          <div className='flex justify-between'>
            <div className='hold-profile-details'>
              <p>{user?.fullname || 'Pressender'}</p>
              <span className='text-xs -mt-1 text-gray-400'>
                {user?.email && user.email.split("@")[0].substring(0, 5)+'**'+user.email.split("@")[1].substring(1,)}
              </span>
            </div>
            <div className=' mt-1 hover:text-blue-500 transition cursor-pointer m'>
              <IconButton
                onClick={() => setOffsetMenuOpen(!offsetMenuOpen)}
                className='cursor-pointer bg-inherit rounded-full'
              >
                {!offsetMenuOpen ? (
                  <MdMoreVert size={20} />
                ) : (
                  <FaTimes style={{ color: 'red' }} size={18} />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpandibleSideMenu
