import React from 'react'
import "../style/form.scss"

function login() {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input
            type='text'
            name='username'
            placeholder='Enter username' />
          <input
            type='password'
            name='password'
            placeholder='Enter Password' />
          <button>Login</button>
        </form>
      </div>
    </main>
  )
}

export default login

