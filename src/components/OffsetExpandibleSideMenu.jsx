import React from 'react';
import {toast} from 'sonner';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineDataUsage } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuPackagePlus } from "react-icons/lu";
import { Button } from '@material-tailwind/react';
import { Divider } from '@mui/joy';
import { FaUserEdit } from "react-icons/fa";
import { postResult } from '../api/axiosConfig';

const OffsetExpandibleSideMenu = ({ isOpen }) => {


  const navigate = useNavigate();

    const menuItem = [
        {
            name: "My Projects",
            url: '/projects',
            action: () => {},
            icon: <AiOutlineAppstoreAdd size={20}/>
        },
       
        {
            name: "Upgrade Subscription",
            url: '/subscriptions',
            action: () => {},
            icon: <LuPackagePlus   size={20}/>

        },
         {
            name: "My Profile",
            url: '/profile',
            action: () => {},
            icon: <FaUserEdit  size={20}/>
        },
        {
            name: "Logout",
            url: '',
            action: async () => {
              try {
                const response = await postResult('/api/users/logout');
                if(response.status === 204) {
                toast.success(response?.data?.message || 'Logout successful');
                  navigate('/');
                }
              } catch(error) {
                toast.error(error.message || error?.response?.data || 'Oops! Something went wrong!');
              }
            },
            icon: <RiLogoutCircleLine  size={20}/>

        },
    ]
  return (
    <motion.div
    initial={{ opacity: 0, y: '-100%' }}
    animate={{
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : '-100%',
    }}
    transition={{ duration: 0.5 }}
    className="fixed z-50 bottom-16 left-0 p-5 backdrop-blur-sm w-full bg-[#131313]"
  >
    <div className="mb-2">
    <Divider>Menu</Divider>
    </div>
  
      {menuItem && menuItem.length > 0 && menuItem.map((item, i) => (
        <Link to={item.url}>
        <Button key={i} onClick={() => {
          item.url !== '' ? ' ': item.action();
        }} fullWidth type='button' className='flex bg-inherit items-center gap-x-2 capitalize font-medium text-gray-300 offset-title cursor-pointer' >{item.icon} {item.name}</Button>
        </Link>
      ))}
    </motion.div>
  );
};

export default OffsetExpandibleSideMenu;
