import React, { useEffect, useRef, useState } from "react";
import ExpandibleSideNavbar from "./ExpandibleSideNavbar";
import OffsetExpandibleSideMenu from "./OffsetExpandibleSideMenu";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { MdMoreVert } from "react-icons/md";
import { FaEdit, FaShareAlt, FaTimes, FaTrash } from "react-icons/fa";
import { CircularProgress, Divider } from "@mui/joy";
import { LuGithub, LuGlobe } from "react-icons/lu";
import { motion } from "motion/react";
import { getResult } from "../api/axiosConfig";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ExpandibleSideMenu = () => {
  const [offsetMenuOpen, setOffsetMenuOpen] = useState(false);

  const [projects, setProjects] = useState([]);

  const [user, setUser] = useState({});

  const hasRun = useRef(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getResult(`/api/projects`);
        if (response.status == 200) {
          setProjects(response.data.data);
        }
      } catch (error) {
        toast.error(error.response.data);
        return;
      }
    };

    return () => {
      if (!hasRun.current) {
        fetchProjects();
      }
      hasRun.current = true;
    };
  }, []);

  const [hovered, setHovered] = useState(false);
  const [hoveredIndex, setHovererIndex] = useState(null);

  const projectActionItem = [
    { name: "Share", action: () => {}, icon: <FaShareAlt /> },
    { name: "Browse", action: () => {}, icon: <LuGlobe /> },
    { name: "Github", action: () => {}, icon: <LuGithub /> },
    { name: "Update", action: () => {}, icon: <FaEdit /> },
    { name: "Delete", action: () => {}, icon: <FaTrash /> },
  ];

  const [itemOpen, setItemOpen] = useState(false);

  return (
    <div className="backdrop-blur-sm min-h-screen w-60 z-30 absolute top-0 bottom-0 border-r border-gray-800">
      <ExpandibleSideNavbar />
      <section className="pl-3 pr-1.5 flex flex-col">
        <Divider>Recent</Divider>
        <br />

        {/* Projects List Section */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 150px)" }} // Adjust height to ensure profile/footer is visible
        >
          {!projects && (
            <div className="text-sm text-gray-500 w-fit mx-auto my-3">
              No project found
            </div>
          )}
          {projects &&
            projects.length > 0 &&
            projects.map((project, key) => (
              <Link
                to={`/projects/${project._id}`}
                onMouseEnter={() => {
                  setHovered(true);
                  setHovererIndex(key);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                  setHovererIndex(null);
                }}
                key={key}
                fullWidth
                className="text-sm relative my-0.5 border-y border-transparent hover:border-gray-900/45 bg-inherit cursor-pointer flex justify-between items-center"
              >
                <span className="text-gray-300 font-normal">
                  {project?.prompt?.length > 30
                    ? `${project.prompt?.slice(0, 30)}...`
                    : project?.prompt}
                </span>
                <IconButton
                  onClick={() => setItemOpen(!itemOpen)}
                  className={`bg-inherit cursor-pointer rounded-full ${
                    hovered && hoveredIndex == key ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {itemOpen ? (
                    <FaTimes color="red" size={20} />
                  ) : (
                    <MdMoreVert size={18} />
                  )}
                </IconButton>
                <motion.div
                  animate={{ opacity: itemOpen && hoveredIndex == key ? 1 : 0 }}
                  className={`project-item-action ${
                    itemOpen && hoveredIndex == key ? "block" : "hidden"
                  } capitalize absolute top-0 right-10`}
                >
                  {projectActionItem.map((item, i) => (
                    <div
                      key={i}
                      className="flex hover:text-blue-400 transition justify-start gap-2 text-gray-300 items-center my-2"
                    >
                      {item.icon} {item.name}
                    </div>
                  ))}
                </motion.div>
              </Link>
            ))}
        </div>
      </section>

      {offsetMenuOpen && <OffsetExpandibleSideMenu isOpen={offsetMenuOpen} />}

      {/* User profile */}
      <div
        className={`flex bg-[#131313] z-30 pt-2 justify-between ${
          !offsetMenuOpen ? "border-t border-gray-900/95" : ""
        } gap-0 bottom-3 absolute inset-x-0 px-3`}
      >
        <div className="w-fit cursor-pointer">
          <img
            src={user?.avatar_url ?? "/avatar.png"}
            alt="profile picture"
            className="w-10 mt-1 h-10 rounded-full"
          />
        </div>
        <div className="w-auto items-center">
          <div className="flex justify-between">
            <div className="hold-profile-details">
              <p>{user?.fullname || "Pressender"}</p>
              <span className="text-xs -mt-1 text-gray-400">
                {user?.email &&
                  user.email.split("@")[0].substring(0, 5) +
                    "**" +
                    user.email.split("@")[1].substring(1)}
              </span>
            </div>
            <div className=" mt-1 hover:text-blue-500 transition cursor-pointer m">
              <IconButton
                onClick={() => setOffsetMenuOpen(!offsetMenuOpen)}
                className="cursor-pointer bg-inherit rounded-full"
              >
                {!offsetMenuOpen ? (
                  <MdMoreVert size={20} />
                ) : (
                  <FaTimes style={{ color: "red" }} size={18} />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandibleSideMenu;
