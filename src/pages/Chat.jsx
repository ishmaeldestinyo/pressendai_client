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


const Chat = () => {
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
          console.log(response.data)
          setUser(response.data.user);
        }
      } catch (error) {
        toast.error(error.response.data);
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
    <div className='relative'>
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

        <ExpandibleSideMenu user={user}/>
      </motion.div>

      {/* Profile Image - click to toggle Expandible Side menu */}
      <section
        className={`w-10 h-10 rounded-full fixed bottom-8 left-8 shadow-lg shadow-[#131313] hover:shadow-inner hover:shadow-gray-800 cursor-pointer ${
          open ? 'hidden' : 'block'
        }`}
        onClick={() => setOpen(!open)}
      >
        <img src='avatar.png' alt='' className='' />
      </section>

      {/* Main Component */}
      <main className='contentBody h-[500px] '>
        {/* Feedback Form */}
        <FeedbackForm
          openFeedbackModal={openFeedbackModal}
          setOpenFeedbackModal={setOpenFeedbackModal}
        />
        {/* Feedback icon */}
        <section className='fixed cursor-pointer z-50 bottom-8 right-6'>
          <IconButton
            onClick={() => setOpenFeedbackModal(!openFeedbackModal)}
            color='blue'
            className='cursor-pointer'
          >
            <VscFeedback size={24} />
          </IconButton>
        </section>

          <div className='absolute bottom-10 w-full'>
            <BuilderPromptForm />
          </div>
      </main>
    </div>
  )
}

export default Chat
