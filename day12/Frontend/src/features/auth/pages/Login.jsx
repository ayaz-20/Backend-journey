import {useState} from 'react'
import "../style/form.scss"
import{Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Login =()=>{
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const {handleLogin, loading}=useAuth()
  const navigate = useNavigate()

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

   function handleSubmit(e){
    e.preventDefault()
    
    handleLogin(username,password)
    .then(res=>{
      console.log(res)
      navigate('/')
    })
  }

   return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>{setusername(e.target.value)}}
            type='text'
            name='username'
            placeholder='Enter username' />
          <input
          onInput={(e)=>{setpassword(e.target.value)}}
            type='password'
            name='password'
            placeholder='Enter Password' />
          <button>Login</button>
        </form>
         <p>Don't have an account? <Link className='toggleAuthform' to="/register">Register</Link></p>
      </div>
    </main>
  )


}




export default Login

