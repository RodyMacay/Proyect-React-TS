import { UseAuth } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const {loading,isAuthenticated} = UseAuth()
  console.log(loading,isAuthenticated)
  if (loading) return <h1>Loading...</h1>
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />
  return <Outlet/>
}

export default ProtectedRoute