import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar'
import MobileSidebar from '../components/ui/MobileSidebar'
import Navbar from '../components/ui/Navbar'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
