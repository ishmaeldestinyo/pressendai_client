import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getResult, postResult } from "../api/axiosConfig";
import {
  Select,
  Option,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";

const Meetings = () => {
  const [loading, setLoading] = useState(false);

  const [agenda, setAgenda] = useState("");
  const [userDefaultPassword, setDefaultPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [meetingInvitees, setMeetingInvitees] = useState([]);
  const [topic, setTopic] = useState("");
  const [alternativeHost, setAlternativeHost] = useState([]);
  const [hostVideo, setHostVideo] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [instantBuild, setInstantBuild] = useState(true);
  const [meetingJoinURL, setMeetingJoinURL] = useState("");

  const navigate = useNavigate();

  const formField = [
    {
      name: "Meeting Agenda",
      value: agenda,
      onChange: (e) => setAgenda(e.target.value),
      required: true,
      type: "text",
    },
    {
      name: "Start Time",
      value: startTime,
      onChange: (e) => setStartTime(e.target.value),
      required: false,
      type: "datetime-local",
    },

    {
      name: "Meeting Invitees",
      value: meetingInvitees,
      onChange: (e) => setMeetingInvitees(e.target.value),
      required: false,
      type: "text",
    },
    {
      name: "Meeting Topic",
      value: topic,
      onChange: (e) => setTopic(e.target.value),
      required: false,
      type: "text",
    },
    {
      name: "Alternative Host email",
      value: alternativeHost,
      onChange: (e) => setAlternativeHost(e.target.value),
      required: false,
      type: "text",
    },
    {
      name: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: false,
      type: "password",
    },
    {
      name: "Host Video",
      value: hostVideo,
      onChange: (e) => setHostVideo(e.target.value),
      required: false,
      type: "checkbox",
    },
    {
      name: "Instant Build After Meeting?",
      value: instantBuild,
      onChange: (e) => setInstantBuild(e.target.value),
      required: false,
      type: "checkbox",
    },

    {
      name: "Default Password",
      value: userDefaultPassword,
      onChange: (e) => setDefaultPassword(e.target.value),
      required: false,
      type: "checkbox",
    },
  ];

  // submit new meeting

  const createMeetingHandler = async (e) => {
    e.preventDefault();

    const payload = {
      agenda,
      password,
      alternative_hosts: alternativeHost,
      zoom_user_default_password: userDefaultPassword,
      meeting_invitees: meetingInvitees,
      topic,
      start_time: startTime,
      host_video: hostVideo,
    };

    try {
      const response = await postResult("/api/meetings", payload);

      if (response.status == 201) {
        setMeetingJoinURL(response.data.data?.join_url);
      }
    } catch (error) {
      console.log(error.message)
      if(error.response.data && !error.response.data?.message) {

        if (
          error.response.status == 401
        ) {
          toast.error("Please login to continue...");
          setTimeout(() => {
            navigate("/auth/login", { state: { from: "/meetings" } });
          }, 1000);
          return;
        }
  
        if (
          error.response.status == 401 &&
          error.response.data?.includes("Your current subscription")
        ) {
          toast.error(error.response.data);
          setTimeout(() => {
            navigate("/subscriptions", { state: { from: "/subscriptions" } });
          }, 1000);
          return;
        }
      }
      if (
        error.response.data?.message?.includes("zoom")
      ) {
        toast.error(error.response.data?.message);
        setTimeout(() => {
          navigate("/auth/login", { state: { from: "/meetings" } });
        }, 1000);
        return;
      }
      toast.error(error.response.data?.message);
      return ;
    }
  };
  return (
    <div>
      <div className="md:w-4/5 mx-auto w-full md:pt-5 p-5">
        <div className="text-gray-100 w-fit mx-auto md:flex items-center mt-2 md:text-2xl xl:text-2xl 2xl:text-2xl xs:text-lg sm:text-xl">
          <Link to={"/"}>
            <img
              src="/icon.png"
              className="w-8 h-8 mx-auto md:mx-4 mb-2 md:mb-0"
              alt="Logo"
            />
          </Link>

          <section className="text-center md:text-left">
            <span className="">Host Meetings & Invite AI Agent </span>
            <h2 className="text-sm text-gray-500 font-normal font-sans">
              You are about to host a meeting with AI Agent. Please provide the
              meeting details below.
            </h2>
          </section>
        </div>
      </div>

      {/* Creating meeting */}
      <form
        action=""
        className="w-3/4 mx-auto mt-7 md:w-3/5 pb-7 xl:w-2/5 "
        onSubmit={createMeetingHandler}
        method="post"
      >
        <div className="md:grid grid-cols-12 pt-5 gap-5">
          {formField.map((field, key) => (
            <div
              className={`col-span-6 md:mt-0 ${
                key == 0 ? "mt-0" : field.type == "checkbox" ? "mt-2" : "mt-3.5"
              }`}
            >
              {field.type !== "checkbox" && (
                <Input
                  required={field.required}
                  variant="standard"
                  label={field.name}
                  onChange={field.onChange}
                  value={field.value}
                  type={field.type}
                />
              )}
              {field.type === "checkbox" && (
                <Checkbox
                  defaultChecked={field.value}
                  value={field.value}
                  label={field.name}
                  onChange={field.onChange}
                  name={field.name}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            color="blue"
            className=" capitalize cursor-pointer"
            size="md"
            fullWidth
            role="submit-btn"
          >
            Create meeting
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Meetings;
