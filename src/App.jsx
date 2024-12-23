import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import {Header, Footer} from "./components/index"
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
      authService.getCurrentUser()
    .then((userData) => {
      userData ? dispatch(login({userData})) : dispatch(logout())
    })
    .finally(() => setLoading(false))
    }
  , [])

  return !loading ? (
      <div className='min-h-screen min-w-screen flex-col flex-wrap content-between'>
          <Header />
          

          <main>
            <Outlet />
          </main>
          <Footer />
      </div>
  ) 
  
  : (<div>Loading</div>)
}

export default App
