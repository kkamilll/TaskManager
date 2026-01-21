import React, { useEffect, useState, useContext } from 'react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  // Funkcja obsługująca kliknięcie w menu
  const handleClick = (route) => {
    // Jeśli kliknięto "logout" (zabezpieczenie przed różnymi wariantami)
    if (route?.toLowerCase().includes('logout')) {
      handleLogout();
      return;
    }

    navigate(route);
  };

  // Funkcja wylogowania
  const handleLogout = () => {
    localStorage.clear(); // usuwa wszystko z localStorage
    clearUser(); // usuwa użytkownika z kontekstu
    navigate('/login'); // przekierowanie na stronę logowania
  };

  // Ustawienie menu w zależności od roli użytkownika
  useEffect(() => {
    if (user) {
      setSideMenuData(user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      
      {/* Sekcja profilu */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || ''}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>

        {user?.role === 'admin' && (
          <div className="text-[10px] font-medium bg-blue-600 text-white px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">{user?.name || ''}</h5>
        <p className="text-[12px] text-gray-500">{user?.email || ''}</p>
      </div>

      {/* Lista przycisków menu */}
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] text-gray-900
            py-3 px-6 mb-1 cursor-pointer transition
            ${
              activeMenu === item.label
                ? 'bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-blue-600 font-medium'
                : 'hover:bg-gray-100'
            }`}
        >
          {/* Ikona */}
          <item.icon className="text-xl text-gray-700" />
          
          {/* Tekst */}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
