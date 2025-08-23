import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  return (
    <>
    <Sidebar/>
    <Outlet/>
    </>
  )
}

export default DashboardLayout