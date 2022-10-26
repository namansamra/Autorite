import React, { useState } from 'react';
import {
  RiDvdFill as EpfoIcon,
  RiQuestionFill as QuestionIcon,
  RiLayoutGridFill as HomeIcon,
  RiLogoutBoxFill as LogoutIcon,
  RiGroupFill as PersonIcon,
  RiSettingsFill as SettingsIcon,
} from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { useGlobalStore } from '@/store/store';
import {
  Dashboard,
  Login,
  MyAccount,
  Setting,
  SignUp,
} from '@/navigation/path';
import { FiPhoneCall } from 'react-icons/fi';
import { userLogout } from '@/services/common';

export const sideBarLinks = [
  {
    name: 'Dashboard',
    link: Dashboard,
    icon: <HomeIcon className="h-[14px] w-[14px]" />,
    activeIndex: 0,
  },
  {
    name: 'My Account',
    link: MyAccount,
    icon: <PersonIcon className="h-[14px] w-[14px]" />,
    activeIndex: 1,
  },
  {
    name: 'Settings',
    link: Setting,
    icon: <SettingsIcon className="h-[14px] w-[14px]" />,
    activeIndex: 3,
  },
  {
    name: 'Log out',
    link: Login,
    icon: <LogoutIcon className="h-[14px] w-[14px]" />,
    activeIndex: 4,
  },
];

export const drawerWidth = 200;
function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userInfo, resetStore, refreshToken] = useGlobalStore((state) => [
    state.appState.userInfo,
    state.actions.resetStore,
    state.appState.auth.refresh.token,
  ]);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await userLogout({ refreshToken });
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      localStorage.clear();
      history.push('/login');
    }
  };

  return (
    <div className="sticky top-0 flex h-screen flex-col justify-between bg-[#F7FAFC] w-[70px] overflow-visible hover:w-[250px] transition-[width] duration-500">
      <div className="menu-container">
        <div className="flex h-32 items-center justify-center px-2">
          <img src={'/vite.svg'} className="h-20 w-20" />
        </div>
        <div className="flex flex-col">
          {sideBarLinks.map((menuItem, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-center justify-start gap-3 py-3 ${
                selectedIndex === index ? 'bg-primary-50' : ''
              }`}
              onClick={() => {
                setSelectedIndex(index);
                if (menuItem.name === 'Log out') {
                  handleLogout();
                } else {
                  history.push(menuItem.link);
                }
              }}
            >
              <div className="h-[30px] min-w-[30px] bg-primary-300 text-white rounded-xl flex items-center justify-center mr-2 ml-5">
                {menuItem.icon}
              </div>

              <div className="text-sm font-medium leading-4 text-grey-00 width-full">
                {menuItem.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex cursor-pointer items-center justify-start gap-3 py-3 mb-10 hover:bg-primary-50`}
        onClick={() => {}}
      >
        <div className="h-[30px] min-w-[30px] bg-primary-300 text-white rounded-xl flex items-center justify-center mr-2 ml-5">
          <FiPhoneCall className="h-[14px] w-[14px]" />
        </div>

        <div className="text-sm font-medium leading-4 text-grey-00 width-full">
          Contact Us
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
