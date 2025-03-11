import React, { useState } from 'react'
import { MdCancel, MdViewSidebar } from 'react-icons/md'
import { IconButton, Textarea } from '@material-tailwind/react'
import { motion } from 'motion/react'
import { Divider } from '@mui/joy'
import { LuSend } from 'react-icons/lu'
import { toast } from 'sonner'
import { postResult } from '../api/axiosConfig'

function FeedbackForm({openFeedbackModal, setOpenFeedbackModal}) {

  const [feedback, setFeedback] = useState('');

  const [loading, setLoading] = useState(false);


  const submitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await postResult('/api/feedbacks', {feedback, ref: null,})


      if(result.status == 201) {

        toast.success(result.data);
      } else {
      toast.error(result.data)

      }

    }catch(error) {
      const errorMessage = error?.response?.data || "Network Error!";

      toast.error(errorMessage)
      setLoading(false)
    }
  }
  return (
    <div>
      <motion.div
          animate={{ opacity: openFeedbackModal ? 1 : 0 }}
          className='md:w-96 bg-[#131313] z-10   mx-auto w-4/5 shadow-sm shadow-gray-900 rounded-xl p-5 absolute right-5 bottom-32 '
        >
          <MdCancel
            onClick={() => setOpenFeedbackModal(!openFeedbackModal)}
            className='cursor-pointer text-red-300 hover:text-red-600 transition-colors justify-end flex'
          />
          <Divider>Feedback Form</Divider>
          <form onSubmit={submitFeedback} className='md:mt-5 mt-4 relative'>
            <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder='Your feedback is really helpful?' rows={6} />
            <section className='absolute z-10 bottom-5 cursor-pointer right-5'>
              <IconButton
                type='submit'
                className='cursor-pointer'
                color='blue'
                size='md'
              >
                <LuSend size={24} />
              </IconButton>
            </section>
          </form>
        </motion.div>

    </div>
  )
}

export default FeedbackForm