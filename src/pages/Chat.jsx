import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MdViewSidebar } from "react-icons/md";
import ChooseProduct from "../components/Navbar";
import ExpandibleSideMenu from "../components/ExpandibleSideMenu";
import { useSearchParams } from "react-router-dom";
import BuilderPromptForm from "../components/BuilderPromptForm";
import { IconButton } from "@material-tailwind/react";
import { motion } from "motion/react";
import FeedbackForm from "../components/FeedbackForm";
import { getResult } from "../api/axiosConfig";
import { FaQuestion } from "react-icons/fa";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const [user, setUser] = useState({});

  const hasRun = useRef(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getResult(`/api/users/profile`);
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
        }
      } catch (error) {
        return;
      }
    };

    fetchProfile();
    hasRun.current = true;
  }, []);

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <ChooseProduct />

      {/* Expandible Side Menu */}
      <motion.div
        animate={{ opacity: open ? 1 : 0, transition: "ease-in" }}
        className={`${open ? "block" : "hidden"} w-fit `}
      >
        {/* Close expandible side menu */}
        <div
          className="hide-sidebar absolute left-[222px] cursor-pointer hover:bg-gray-900 transition hover:border-gray-900 z-40 bg-gray-800 top-5 rounded-full p-1 border border-gray-700"
          onClick={() => setOpen(!open)}
        >
          <MdViewSidebar size={24} />
        </div>

        <ExpandibleSideMenu />
      </motion.div>

      {/* Profile Image - click to toggle Expandible Side menu */}
      <section
        className={`w-10 h-10 rounded-full md:hidden block xl:hidden 2xl:hidden sm:hidden lg:hidden fixed top-4 right-6 shadow-lg shadow-[#131313] hover:shadow-inner hover:shadow-gray-800 cursor-pointer ${
          open ? "hidden" : "block"
        }`}
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.avatar_url ? user?.avatar_url : "/avatar.png"}
          className="rounded-full"
        />
      </section>
      <section
        className={`w-10 h-10 z-20 rounded-full md:block lg:block hidden xl:block fixed bottom-6 left-6 shadow-lg shadow-[#131313] hover:shadow-inner hover:shadow-gray-800 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <img
            src={user?.avatar_url ? user?.avatar_url : "/avatar.png"}
            className="w-10 mt-1 h-10 rounded-full"
          />
      </section>

      {/* Main Component */}
      <main className="contentBody h-[500px] ">
        {/* Feedback Form */}
        <FeedbackForm
          openFeedbackModal={openFeedbackModal}
          setOpenFeedbackModal={setOpenFeedbackModal}
        />
        {/* Feedback icon */}
        <section className="fixed cursor-pointer z-50 bottom-6 right-6">
          <IconButton
            onClick={() => setOpenFeedbackModal(!openFeedbackModal)}
            color="blue"
            className="cursor-pointer rounded-full bg-inherit border-2 border-gray-700 shadow-xl"
          >
            <FaQuestion size={24} />
          </IconButton>
        </section>

        <div className="absolute bottom-10 w-full">
          <BuilderPromptForm />
        </div>
      </main>
    </div>
  );
};

export default Chat;
