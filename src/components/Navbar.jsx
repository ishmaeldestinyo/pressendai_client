import { IconButton } from "@material-tailwind/react";
import { Button, Tooltip } from "@mui/joy";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoFlashOutline, IoPerson } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { Link, useSearchParams } from "react-router-dom";

const ChooseProduct = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const builderBtnStyle = {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: "normal",
  };
  return (
    <>
      <nav className="flex m:py-4 py-5 md:px-7 px-5 border-b border-gray-900/80 justify-between">
        <div className="">
          <Link to={"/"} className="flex items-center gap-x-1">
            <img src="/logo.png" alt="Logo " className="md:w-44 w-36" />
          </Link>
        </div>
        <div className="cursor-pointer md:flex items-center justify-evenly xl:flex lg:flex gap-x-4 2xl:flex sm:block xs:block hidden">
          {/* <div
            className=""
            onClick={() => {
              navigator.clipboard
                .writeText(import.meta.env.VITE_AI_PHONE_NUMBER)
                .then(() => {
                  setCopySuccess(true);
                  setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
                })
                .catch(() => {
                  setCopySuccess(false); // Handle clipboard copy failure if needed
                });
            }}
          >
            <Tooltip
              title={
                <div>Prerequisites: Must have subscribed for VOIP caller</div>
              }
              arrow
              placement="left-end"
              color="primary"
            >
              <Button className="flex gap-x-2 items-center">
                <LuPhoneCall />
                {import.meta.env.VITE_AI_PHONE_NUMBER}
              </Button>
            </Tooltip>
          </div>
          {copySuccess && (
            <span className="text-green-400 ml-2 text-[10.30px]">Copied!</span>
          )} */}

          <div className="">
            <Link to={"/auth/login"}>
              <Button
                startDecorator={<IoPerson size={20} />}
                className="capitalize cursor-pointer"
                style={builderBtnStyle}
              >
                Login/Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ChooseProduct;
