import { Route, Routes, useSearchParams, useNavigate } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat'
import Error404 from './pages/Error404'
import { useEffect, useState, useRef } from 'react'
import { Toaster, toast } from 'sonner'
import RegisterUser from './pages/RegisterUser'
import UserLogin from './pages/UserLogin'
import ResetPasswordRequest from './pages/ResetPasswordRequest'
import ResetPasswordSubmit from './pages/ResetPasswordSubmit'
import Subscription from './pages/Subscription'
import BillingUsage from './pages/BillingUsage'
import ProjectDetail from './pages/ProjectDetail'
import EditProject from './pages/EditProject'
import PreviewProject from './pages/PreviewProject'
import NewBuild from './pages/NewBuild'
import ListProjects from './pages/ListProjects'
import AccountVerification from './pages/AccountVerification'
import Meetings from './pages/Meetings'
import UserProfile from './pages/UserProfile'
import Legals from './pages/Legals'
import { StreamProvider } from './context/StreamContext'

function App () {
  const hasRun = useRef()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const [connected, setConnected] = useState(navigator.onLine)

  useEffect(() => {
    if (!hasRun.current) {
      const token = searchParams.get('trxref')
      if (token) {
        toast.success('Your subscription is being processed shortly.')
        navigate('/')
      }

    }

    return () => {
      hasRun.current = true;
    }
  }, [])

  // Handle online/offline state
  useEffect(() => {
    const handleOnline = () => {
      setConnected(true)
      toast.info(
        'You’re now online! Enjoy full access to all of our features and services.'
      )
    }

    const handleOffline = () => {
      setConnected(false)
      toast.error(
        "It looks like you're currently offline. To access all of our services, please connect to the internet."
      )
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <StreamProvider>

      <Toaster closeButton richColors />
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/auth' element={<RegisterUser />} />
        <Route path='/auth/login' element={<UserLogin />} />
        <Route path='/auth/reset-password' element={<ResetPasswordRequest />} />
        <Route path='/auth/confirm' element={<AccountVerification />} />
        <Route path='/projects' element={<ListProjects />} />
        <Route path='/projects/:id/edit' element={<EditProject />} />
        <Route path='/projects/:id/preview' element={<PreviewProject />} />
        <Route path='/app/:id' element={<NewBuild />} />
        <Route path='/meetings' element={<Meetings />} />
        <Route path='/legals' element={<Legals />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/billing-usage' element={<BillingUsage />} />
        <Route path='/projects/:id' element={<ProjectDetail />} />
        <Route
          path='/auth/reset-password/confirm'
          element={<ResetPasswordSubmit />}
        />
        <Route path='/auth' element={<RegisterUser />} />

        <Route path='/subscriptions' element={<Subscription />} />
        <Route path='/subscriptions/list' element={<BillingUsage />} />
        
        <Route path='*' element={<Error404 />} />
      </Routes>
    </StreamProvider>
  )
}

export default App
