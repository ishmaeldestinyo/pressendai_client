import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResult } from "../api/axiosConfig";
import { CircularProgress } from "@mui/joy";

function PreviewProject() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData]  = useState([]);

  if (!id) {
    navigate(-1);
  }

  const hasRun = useRef();

  useEffect(() => {

    const fetchProjectPreview = async id => {

      setLoading(true)

      try {
        
        const response = await getResult(`/api/projects/${id}/preview`);

        if(response.status == 200) {
          setData(response.data?.data);
          setLoading(false)
        }

      } catch (error) {
        console.log("Error occurred fetching preview", error);
      } finally {
        setLoading(false)
      }

    }



    if(!hasRun.current) {
      fetchProjectPreview(id);
    }

    hasRun.current = true;
  }, [id]);


  if(loading) {
    return <CircularProgress/>
  }

  if(!loading && data.length == 0) {
    return <div className="flex items-center justify-center text-gray-400 h-screen">No project found</div>
  }

  return <div>PreviewProject</div>;
}

export default PreviewProject;
