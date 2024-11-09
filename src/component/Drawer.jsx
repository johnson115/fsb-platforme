import React, { useState, useEffect } from 'react';
import { Home, PenSquare, Calendar, MessageSquare, Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    

  };

  const menuItems = [
    { icon: <Home size={20} />, text: 'Home', dir: "/" },
    { icon: <PenSquare size={20} />, text: 'New post', dir: "/CreateNewPost" },
    { icon: <Calendar size={20} />, text: 'Events', dir: "/AvailbleEvents" },
    { icon: <MessageSquare size={20} />, text: 'Feedback', dir: "/WriteFeedback" },
  ];

  return (
    <div className="container">
      <div className={`Drawer ${isOpen ? 'open' : ''}`}>
        <button className="drawer-toggle" onClick={toggleDrawer}>
          {isOpen ? <X size={24} /> : <Menu size={24} sx={{marginBottom:'4px'}} /> }
        </button>
        
        <nav>
          <h3 style={{color:'#FFB6C1' , textAlign:'center' , fontFamily:"'Raleway', sans-serif"}} > 👨‍🎓👩‍🎓 <br /> Welcome to your anonymous university<br /> (only FSB Students !) </h3>
          <ul> 
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.dir}
                  className={({ isActive }) => `links ${isActive ? 'active' : ''}`}
                  onClick={() => isMobile && setIsOpen(false) }
                >
                  
                  <div className={isOpen ? 'iconsOpening' : "drawersIcon"}>{item.icon}</div>
                  {(isOpen || !isMobile) && <span>{item.text}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`main-content ${isOpen && isMobile ? 'drawer-open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;