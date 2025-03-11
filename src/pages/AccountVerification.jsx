import { toast } from "sonner";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../api/axiosConfig";
import { MdFormatListNumbered, MdMarkEmailRead } from "react-icons/md";
import { Button, Divider, Input, Tooltip } from "@mui/joy";
import { IoCall, IoFingerPrintOutline } from "react-icons/io5";
import {
  FaGithub,
  FaGoodreads,
  FaMarkdown,
  FaSalesforce,
  FaUser,
} from "react-icons/fa";
import { IconButton, Typography } from "@material-tailwind/react";
import { MdCancel, MdDone, MdOutlineDone } from "react-icons/md";

function AccountConfirmationPage() {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const hasRun = useRef();

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, []);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchParams.get("token")) {
      return navigate("/auth/login");
    }

    const handleAccountConfirmation = async (e) => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          `/api/users/confirm/?token=${searchParams.get("token")}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status == 200) {
          let msg = response.data?.message || response.data;
          setMessage(msg || "Invalid or Expired token");
          toast.success(msg);
          setLoading(false);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        }
      } catch (error) {
        const errorMessage = error?.response?.data ?? "Network Error!";
        setMessage(errorMessage || "Invalid or Expired token");

        toast.error(errorMessage);
        setLoading(false);
      }
    };

    if(!hasRun.current) {
        handleAccountConfirmation();
    }

    return () => {
        hasRun.current = true;
    }
  }, []);

  if (searchParams.get("token")) {
    return (
      <div>
        <div
          className="w-full md:block min-h-screen mx-auto sm:block xl:grid lg:grid 2xl:grid grid-cols-12 h-screen"
          method="post"
        >
          <div className="col-span-12 bg-gray-900/25">
            <section className="md:flex justify-center items-center min-h-screen w-full p-6">
              <div className="md:w-2/5 xs:w-4/5 sm:w-3/4 mx-auto">
                <div className="logo p-2 rounded-full mx-auto border border-gray-800 mb-6 w-fit h-fit">
                  <MdDone
                    fontSize="32"
                    color="primary"
                    sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
                  />
                </div>
                <Divider>
                  <div className="text-gray-100">{message}</div>
                </Divider>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountConfirmationPage;
