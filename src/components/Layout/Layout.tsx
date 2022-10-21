import React from 'react';
import Sidebar from '../Sidebar/SidebarV2';
import { useGlobalStore } from '@/store/store';
export default function Layout({ children }) {
  const userInfo = useGlobalStore((state) => state.appState.userInfo);

  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen bg-grey-200 relative">
        {children}
      </div>
    </div>
  );
}
