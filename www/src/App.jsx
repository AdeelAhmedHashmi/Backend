// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
      <form action="">
        <div className="head">
          <h2>User Registeration</h2>
        </div>
        <div className="row">
          <label htmlFor="name">Name: </label>
          <input type="text" />
        </div>
        <div className="row">
          <label htmlFor="fullname">FullName: </label>
          <input type="text" />
        </div>
        <div className="row">
          <label htmlFor="email">Email: </label>
          <input type="text" />
        </div>
        <div className="row">
          <label htmlFor="password">Password: </label>
          <input type="text" />
        </div>
        <div className="row">
          <label htmlFor="avatar">Avatar: </label>
          <input type="text" />
        </div>
        <div className="row">
          <label htmlFor="coverimage">CoverImage[optional] </label>
          <input type="text" />
        </div>
        <div className="row">
          <input type="button" className='btn' value='Register' />
        </div>
      </form>
    </>
  )
}

export default App
