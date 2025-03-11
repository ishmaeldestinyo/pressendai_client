import axiosConfig from '../api/axiosConfig'
import React, { useEffect, useState } from 'react'

function useAPICall (url, method, payload, headerConfig = {}) {
  /**
   * @param description methods - POST, GET, DELETE, PUT, PATCH,
   */
  const allowedMethods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT'
  }

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = null
        setLoading(true)

        switch (method) {
          case allowedMethods.DELETE:
            // process deleted
            result = await axiosConfig.delete(url, { ...payload })
            setResponse(result.data)
            setLoading(true)
            break
          case allowedMethods.POST:
            // process post
            result = await axiosConfig.post(
              url,
              { payload },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
            setResponse(result.data)
            setLoading(true)
            break
          case allowedMethods.PUT:
            // process PUT
            result = await axiosConfig.put(url, {...payload}, headerConfig)
            setResponse(result.data)
            setLoading(true)
            break

          case allowedMethods.PATCH:
            // process PUT
            result = await axiosConfig.patch(url, {...payload}, headerConfig)
            setResponse(result.data)
            setLoading(true)
            break

          default:
            // process GET
            result = await axiosConfig.get(url, headerConfig)
            setResponse(result.data)
            break
        }
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }

    fetchData();
    
  }, [url])

  return {
    response,
    loading,
    error
  }
}

export default useAPICall
