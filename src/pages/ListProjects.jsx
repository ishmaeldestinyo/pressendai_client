import React, { useEffect, useRef, useState } from 'react'
import { MdViewSidebar } from 'react-icons/md'
import ChooseProduct from '../components/Navbar'
import ExpandibleSideMenu from '../components/ExpandibleSideMenu'
import { useSearchParams } from 'react-router-dom'
import { VscFeedback } from 'react-icons/vsc'
import BuilderPromptForm from '../components/BuilderPromptForm'
import { IconButton } from '@material-tailwind/react'
import { motion } from 'motion/react'
import FeedbackForm from '../components/FeedbackForm'
import {toast} from 'sonner';
import { getResult } from '../api/axiosConfig'
import { FaQuestion } from 'react-icons/fa'
import ListProjectCard from '../components/ListProjectCard'


const ListProjects = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useSearchParams()
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  const [user, setUser] = useState({});

  const hasRun = useRef(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getResult(`/api/users/profile`);
        if(response.status == 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        return ;
      }
    }

    return () => {
      if(!hasRun.current) {
        fetchProfile()
      }
      hasRun.current = true;
    }
  }, [])
  
  return (
    <div className='relative h-screen w-full'>
      {/* Navigation Bar */}
      <ChooseProduct />

      {/* Expandible Side Menu */}
      <motion.div animate={{opacity: open ? 1 : 0, transition: "ease-in"}} className={`${open ? 'block' : 'hidden'} w-fit `}>
        {/* Close expandible side menu */}
        <div
          className='hide-sidebar absolute left-[222px] cursor-pointer hover:bg-gray-900 transition hover:border-gray-900 z-40 bg-gray-800 top-5 rounded-full p-1 border border-gray-700'
          onClick={() => setOpen(!open)}
        >
          <MdViewSidebar size={24} />
        </div>

        <ExpandibleSideMenu/>
      </motion.div>

      {/* Profile Image - click to toggle Expandible Side menu */}
      <section
        className={`w-10 h-10 rounded-full md:hidden block xl:hidden 2xl:hidden sm:hidden lg:hidden fixed top-4 right-6 shadow-lg shadow-[#131313] hover:shadow-inner hover:shadow-gray-800 cursor-pointer ${
          open ? 'hidden' : 'block'
        }`}
        onClick={() => setOpen(!open)}
      >
        <img src={user?.avatar_url || '/avatar.png'} alt='' className='rounded-full' />
      </section>
      <section
        className={`w-10 h-10 rounded-full md:block hidden xl:block 2xl:block sm:block lg:block fixed bottom-6 left-6 shadow-lg shadow-[#131313] hover:shadow-inner hover:shadow-gray-800 cursor-pointer ${
          open ? 'hidden' : 'block'
        }`}
        onClick={() => setOpen(!open)}
      >
        <img src={user?.avatar_url ?? '/avatar.png'} alt='' className='rounded-full' />
      </section>
        {/* Main Component */}
        <ListProjectCard/>
    </div>
  )
}

export default ListProjects
