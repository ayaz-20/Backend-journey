import React from 'react'
import {Link} from 'react-router'



function Register() {
  return (
   <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input
            type='text'
            name='username'
            placeholder='Enter username' />
          <input
            type='text'
            name='email'
            placeholder='Enter email' />
          <input
            type='password'
            name='password'
            placeholder='Enter Password' />
          <button>Register</button>
        </form>
      </div>
    </main>
  )
}

export default Register
