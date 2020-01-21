import React,{useContext,useCallback,useState,useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Particles} from '../components/Particles'
 

export const TestPage = () => {
  const [test,setTest] = useState('')  
  const {request} = useHttp()
  const {token} = useContext(AuthContext)
  const getTest = useCallback(async ()=>{
    try{
      const testMes = await request('/api/test', 'GET', null,{autorization: `Bearer ${token}`})
      setTest(testMes)
    }catch(e){
      return (
      <p>{e.message}</p>
      )
    }
  },[request,token])
  useEffect(()=>{
    getTest()
  },[getTest]) 
console.log(test)
  return (
    <>
     <div>
     <p>My name: {test.name} {test.sName}</p>
     <p>{test.text1}</p>
     <p>{test.text2}</p>
     <p>{test.text3}</p>
     </div>
     <Particles />
    </>
  )
}

