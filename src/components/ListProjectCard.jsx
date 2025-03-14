import {
  IconButton
} from "@material-tailwind/react";
import { CircularProgress, Tooltip } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { deleteResult, getResult } from "../api/axiosConfig";
import { FiEdit } from "react-icons/fi";
import {toast} from 'sonner'
import { RiDeleteBin6Line } from "react-icons/ri";

function ListProjectCard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const navigate = useNavigate();

  // Fetching the projects data when page or limit changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Set loading state to true when fetching
      try {
        const response = await getResult(
          `/api/projects?page=${page}&limit=${limit}`
        );
        setProjects(response.data.data);
        setTotalPages(Math.ceil(response.data.totalItems / limit)); // Set total pages from the API response
      } catch (error) {
        if (error.status === 401) {
          navigate("/auth/login", { state: { from: "/projects" } });
        }
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchProjects();
  }, [page, limit]); // Re-fetch when either page or limit changes

  const deleteProjectHandler = async (projectId) => {
    try {
      const response = await deleteResult(`/api/projects/${projectId}`);
      if(response.status == 410) {
        toast.success(response.data.message)
      }
    } catch(error) {
      toast.error(error?.response?.data?.message || error.message);

    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <div className="relative flex flex-col w-11/12 mx-auto p-2 rounded-lg text-gray-700 bg-transparent">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-transparent rounded-none bg-clip-border">
          <div className="flex items-center justify-between gap-8 mb-8">
            <div>
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal relaxed text-gray-300">
                Project list
              </h5>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                See information about all projects
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <Link
                to="/"
                className="flex select-none cursor-pointer items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                <IoChatbubbles />
                New Chat
              </Link>
            </div>
          </div>
         
        </div>
        <div className="p-6 px-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  Name
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  Status
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <div className="w-fit mx-auto">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Loop over projects and display them */}
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    <CircularProgress size="sm" />
                  </td>
                </tr>
              ) : (
                projects.map((project, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal relaxed text-gray-300">
                            {project?.name.slice(0, 30) ?? project?.prompt?.slice(0, 30)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="w-max">
                        <div
                          className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-${
                            project.status === "ACTIVE" ? "green" : "text-gray-100"
                          }-900 uppercase rounded-md select-none whitespace-nowrap bg-${
                            project.status === "ACTIVE" ? "green" : "text-gray-100"
                          }-500/20`}
                        >
                          <span>{project.status}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="w-fit mx-auto flex justify-start gap-x-10">
                        <Tooltip arrow color="primary" placement="right-start" title="Delete">
                        <IconButton role="button" type="button" onClick={() => {
                          deleteProjectHandler(project?._id);
                        }} className="cursor-pointer bg-inherit rounded-full">
                          <RiDeleteBin6Line size={20} className="hover:text-red-700 text-gray-300" />
                        </IconButton>
                        </Tooltip>
                        <Tooltip arrow color="primary"  placement="right-start" title="Edit">
                        <IconButton role="button" type="button" onClick={() => {
                          navigate(`/projects/${project?._id}/edit`);
                        }} className="cursor-pointer bg-inherit rounded-full">
                          <FiEdit size={20} className="hover:text-orange-400 text-gray-300" />
                        </IconButton>
                        </Tooltip>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal relaxed text-gray-300">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="select-none rounded-lg border border-gray-700 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-400 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="select-none rounded-lg border border-gray-700 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-400 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProjectCard;
