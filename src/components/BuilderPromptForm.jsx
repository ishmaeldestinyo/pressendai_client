import { toast } from "sonner";
import { CircularProgress, Tooltip } from "@mui/joy";
import { motion } from "motion/react";
import { LuPhoneCall, LuSend } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { useStream } from "../context/StreamContext";
import { FiPhoneCall } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { getResult, postResult } from "../api/axiosConfig";
import { Button, IconButton, Input, Textarea } from "@material-tailwind/react";
import { MdCancel, MdMoreVert, MdWorkspacesOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { retellWebClient } from "../api/retellAiClient";
import { MdWifiCalling3 } from "react-icons/md";
import { FcConferenceCall } from "react-icons/fc";
import { FcEndCall } from "react-icons/fc";
import extractTextFromFile from "../utils/extractTextFromFile";

const BuilderPromptForm = () => {
  const [moreVertOpen, setMoreVertOpen] = useState(false);

  const [projectName, setProjectName] = useState("");

  const [stackUsed, setStackUsed] = useState("");

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [startedCall, setStartedCall] = useState(false);

  const hasRun = useRef(false);

  const [fileText, setFileText] = useState("");

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const { setProjectId, setReader, setOutput, decoder } = useStream();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Call your extract text function
        const text = await extractTextFromFile(file);
        setFileText(text); // Store the extracted text
        toast.info("File successfully read!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const stopAiCall = () => {
    // Warn user about the session ending in 6 minutes
    setTimeout(() => {
      toast.warning(
        "Your AI call session will end in 1 minute. Please wrap up your conversation."
      );
    }, 360000); // 6 minutes (360000 ms)

    // Stop the call in the next 7 minutes (420000 ms)
    setTimeout(() => {
      retellWebClient.stopCall();
      toast.info(
        "Your AI call session has ended. Thank you for using our service!"
      );
    }, 420000); // 7 minutes (420000 ms)
  };

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("Call started");
    });

    if (!hasRun.current) {
      retellWebClient.on("call_ended", async (events) => {
        setStartedCall(false);

        toast.info("Please wait while your product is being built!");

        // Fetch call ID and send it to the backend
        try {
          const result = await postResult(
            "/api/projects/aicall-transcript-builder",
            {
              call_id: localStorage.getItem("callId"),
            }
          );

          if (result.status === 201) {
            navigate(`/projects/${result.data.data?._id}`);
          } else {
            toast.error(result.data);
          }
        } catch (error) {
          const errorMessage = error?.response?.data || "Network Error!";
          toast.error(errorMessage);
        }
      });

      if (startedCall) {
        // Only run this code if AI web call is started

        stopAiCall(); // Trigger AI call stop and warnings
      }
    }

    return () => {
      hasRun.current = true;
    };
  }, []);

  const promptExamples = [
    "AI-Powered Blog Recommender",
    "Smart Chatbot for E-commerce Support",
    "AI-Driven Financial Predictor",
    "Voice-Activated Personal Assistant",
    "AI Content Generator for Blogs",
  ];
  const navigate = useNavigate();

  const handleAICaller = async (e) => {
    e.preventDefault();
    setStartedCall(true);

    try {
      const result = await postResult("/api/projects/ai-create-token");

      if (result.status == 200) {
        localStorage.setItem("callId", result.data.call_id);

        toast.info("Routing You to an AI Agent...");
        await retellWebClient.startCall({
          accessToken: result.data.access_token,
        });
      }
    } catch (error) {
      setStartedCall(false);
      if (error.status == 401 && error?.response?.data == "Unauthorized") {
        toast.error("Please login to continue...");
        setTimeout(function () {
          navigate("/auth/login");
        }, 1000);
      }

      toast.error(
        error?.response?.data ||
          error.message ||
          "An unexpected error occurred."
      );
    }
  };

  const promptIcons = [
    {
      action: () => navigate("/projects"),
      icon: <MdWorkspacesOutline size={24} />,
      name: "Explore Projects",
    },
    {
      action: () => {}, // No action for now
      icon: (
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <GrAttachment size={24} />
        </label>
      ),
      name: "Upload user/project description (PDF/Docs) only",
    },
    {
      action: handleAICaller,
      icon: !startedCall ? (
        <FiPhoneCall size={24} />
      ) : (
        <FcEndCall className="rotate-225" size={24} />
      ),
      name: "AI Agent developer",
    },
    {
      action: () => navigate("/meetings"),
      icon: <FcConferenceCall size={24} />,
      name: "Host/Invite Meetings + AI Developer",
    },
  ];

  const promptHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      if (!prompt) {
        toast.error("Prompt cannot be blank!");
        setLoading(false);
        return;
      }

      if (prompt.length < 10) {
        toast.error("Please vividly describe your project!");
        setLoading(false);
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            prompt: prompt || fileText,
            stack_used: stackUsed,
            name: projectName,
            user_action: "TEXT_PROMPT",
          }),
        }
      );

      if (!response.body) throw new Error("No response body received");

      const reader = response.body.getReader();
      setReader(reader); // Store reader in context

      let isFirstChunk = true;
      let projectId = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decodedText = decoder.decode(value);

        if (isFirstChunk) {
          try {
            const json = JSON.parse(decodedText);
            projectId = json.id;
            setProjectId(projectId); // Save project ID in context
          } catch (error) {
            toast.error(decodedText);
            setTimeout(() => {
              navigate("/auth/login");
            }, 1000);
          }
          isFirstChunk = false;
        } else {
          if (decodedText == "Request failed with status code 422") {
            toast.error(
              "Github repository name already exist, please delete the github repository or rename your prompt"
            );
            return;
          }

          // Navigate only after setting projectId
          navigate(`/app/${projectId}`);
          setOutput((prev) => prev + decodedText);
        }
      }
    } catch (error) {
      console.log(error);

      let err = JSON.parse(error) || error;
      console.log(err);
      toast.error("Please authorize your github account to continue!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);

      setOutput("An error occurred. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={promptHandler}
      className="md:w-3/5 lg:w-3/5 sm:w-4/5 xs:w-4/5 w-10/12 2xl:w-3/5 xl:w-3/5 z-0 mx-auto relative"
    >
      <input
        type="file"
        id="file-upload"
        accept=".pdf, .docx"
        className="hidden"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Show Submit Icon */}
      <section className="absolute z-50 w-fit bottom-5 cursor-pointer right-5">
        <IconButton
          type="submit"
          className="cursor-pointer"
          color={loading ? "light-blue" : "blue"}
          disabled={loading}
          size="md"
        >
          {!loading ? (
            <LuSend size={24} />
          ) : (
            <CircularProgress color="primary" size="sm" />
          )}
        </IconButton>
      </section>

      {/* Settings Icon */}
      <section className="absolute w-fit flex z-50 bottom-4 cursor-pointer left-3">
        <IconButton
          color={moreVertOpen ? "red" : "blue"}
          size="md"
          className="cursor-pointer mr-2"
          onClick={() => setMoreVertOpen(!moreVertOpen)}
        >
          {moreVertOpen ? <MdCancel size={20} /> : <MdMoreVert size={20} />}
        </IconButton>
        <motion.div
          className={`${
            moreVertOpen ? "flex" : "hidden"
          } gap-x-2 justify-evenly opacity-0 items-center`}
          animate={{ opacity: moreVertOpen ? 1 : 0 }}
        >
          {promptIcons &&
            promptIcons.length > 0 &&
            promptIcons.map((item, key) => (
              <Tooltip
                key={key}
                title={
                  startedCall && item.name == "AI Agent developer"
                    ? `There's an ongoing call`
                    : item.name
                }
                placement="top-start"
                arrow
                className={`${moreVertOpen ? "block" : "hidden"}`}
                color="primary"
                size={"md"}
              >
                <IconButton
                  onClick={item.action}
                  type="button"
                  style={{
                    background:
                      startedCall && item.name == "AI Agent developer"
                        ? "white"
                        : "#0085fb",
                  }}
                  disabled={startedCall && item.name == "AI Agent developer"}
                  className={`cursor-pointer ${
                    startedCall && item.name == "AI Agent developer"
                      ? "animate-pulse"
                      : ""
                  }`}
                  color="blue"
                  size="md"
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
        </motion.div>
      </section>

      {/* Social Media */}
      <div className="absolute z-10 bottom-0 w-full">
        <div className="mb-5  md:w-auto w-fit mx-auto md:hidden lg:block xl:block sm:hidden hidden xs:hidden 2xl:block">
          <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl w-fit mx-auto">
            What can I help with?
          </h3>
          <br />
          {promptExamples.map((example, i) => (
            <div
              onClick={() => {
                setPrompt(example);
                setFileText("");
                setStackUsed("");
                setProjectName("");
                setMoreVertOpen(false);
              }}
              className={`inline-block space-x-3 items-center mt-1 rounded-3xl text-3xl mx-2 border border-gray-800 p-1 gap-x-2 `}
              key={i}
            >
              <div className="flex items-center gap-2 text-xs cursor-pointer  text-blue-gray-400 hover:text-blue-gray-800">
                {example}
              </div>
            </div>
          ))}
        </div>
        <Textarea
          onFocus={() => setLoading(false)}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Give a thorough description of your product’s features and the core functionality it must include. "
          style={{ border: "1px solid #666666" }}
          rows={6}
        />
      </div>
      <small className="absolute text-xs top-2  inset-x-0 text-center z-30 w-fit mx-auto">
        By messaging Pressend, you agree to our{" "}
        <Link className="mb-2 text-[#2299fb] hover:transition" to={"/legals"}>
          Terms
        </Link>{" "}
        and have read our{" "}
        <Link className="text-[#2299fb] hover:transition" to={"/legals"}>
          Privacy Policy{" "}
        </Link>
        .
        <br />
        <br />{" "}
        <span className="text-[11px] mt-2  md:font-normal xl:font-normal lg:font-normal font-light text-blue-200 ">
          Beta 2.0 Release
        </span>
        <br />
        <a
          href={`tel:${import.meta.env.VITE_AI_PHONE_NUMBER}`}
          className="text-[11px] md:hidden lg:hidden w-fit mx-auto xl:hidden 2xl:hidden mt-2 flex gap-x-2 items-center md:font-normal xl:font-normal lg:font-normal font-light text-blue-200 "
        >
          <LuPhoneCall />
          {import.meta.env.VITE_AI_PHONE_NUMBER}
        </a>
      </small>
    </form>
  );
};

export default BuilderPromptForm;
