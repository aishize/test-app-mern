import React,{useState,useEffect,useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [link,setLink] = useState('')
  const {request,error,clearError} = useHttp()
  const message = useMessage()

  useEffect(()=>{
    window.M.updateTextFields()
  },[])

  useEffect(()=>{
    message(error)
    clearError()
  },[error,message,clearError])

  const pressHandler = async event => {
    if (event.key === 'Enter'){
      try{
        const data = await request('/api/link/generate','POST',{from: link},{autorization: `Bearer ${auth.token}`})
        console.log(data.link._id)
        history.push(`/detail/${data.link._id}`)
      }catch(e){}
    }
  }
  return (
    <div className="row">
     <h1>Create Page</h1>
     <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
      <div className="input-field">
       <input placeholder="enter link"
            id="link"
            type="text"
            value = {link}
            onChange = {e => setLink(e.target.value)}
            onKeyPress = {pressHandler}
            />
       <label htmlFor="link">enter link</label>
      </div>
     </div>
    </div>
  )
}
