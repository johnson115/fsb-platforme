import React, { useState } from 'react';
import { Home, PenSquare, Calendar, MessageSquare, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <div className={`Drawer ${isOpen ? 'open' : ''}`}>
        <button className="drawer-toggle" onClick={toggleDrawer}>
          <Menu size={24} />
        </button>
        <nav>
          <ul>
            {[
              { icon: <Home size={20} />, text: 'Home', dir: "/" },
              { icon: <PenSquare size={20} />, text: 'New post', dir: "/CreateNewPost" },
              { icon: <Calendar size={20} />, text: 'Events', dir: "/AvailbleEvents" },
              { icon: <MessageSquare size={20} />, text: 'Feedback', dir: "/WriteFeedback" },
            ].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.dir}
                  className="links"
                  activeClassName="active"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Drawer;