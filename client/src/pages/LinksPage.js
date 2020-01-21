import React,{useState,useContext,useCallback,useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'
import {useMessage} from '../hooks/message.hook'

export const LinksPage = () => {
  const [links,setLinks] = useState([])
  const {loading,request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()

  const fetchLinks = useCallback(async ()=>{
    try{
      const fetched = await request('/api/link', 'GET', null,{autorization: `Bearer ${token}`})
      setLinks(fetched)
    }catch(e){}
  },[token,request])

  useEffect(()=>{
     fetchLinks()
  },[fetchLinks])

  useEffect(()=>{
    message(error)
    clearError()
  },[message,error,clearError])
  
  if(loading){
    return <Loader />
  }

  return (
    <>
     {!loading && <LinksList links={links} />}
    </>
  )
}
