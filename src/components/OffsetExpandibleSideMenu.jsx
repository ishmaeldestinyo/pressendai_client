import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineDataUsage } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuPackagePlus } from "react-icons/lu";
import { Button } from '@material-tailwind/react';
import { Divider } from '@mui/joy';
import { FaUserEdit } from "react-icons/fa";

const OffsetExpandibleSideMenu = ({ isOpen }) => {

    const menuItem = [
        {
            name: "My Projects",
            url: '/projects',
            icon: <AiOutlineAppstoreAdd size={20}/>
        },
       
        {
            name: "Upgrade Subscription",
            url: '/subscriptions',
            icon: <LuPackagePlus   size={20}/>

        },
         {
            name: "My Profile",
            url: '/profile',
            icon: <FaUserEdit  size={20}/>
        },
        {
            name: "Logout",
            url: '',
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
        <Button key={i} fullWidth type='button' className='flex bg-inherit items-center gap-x-2 capitalize font-medium text-gray-300 offset-title cursor-pointer' >{item.icon} {item.name}</Button>
        </Link>
      ))}
    </motion.div>
  );
};

export default OffsetExpandibleSideMenu;
