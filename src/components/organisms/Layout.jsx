import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-80 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;