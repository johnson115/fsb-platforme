import React from 'react';
import { Home, PenSquare, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Drawer = ({ children }) => {
  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          width: '250px',
          height: '100vh',
          backgroundColor: 'var(--secondary-color)',
          position: 'fixed',
          top: 0,
          left: 0,
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <nav style={{ padding: '2rem 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { icon: <Home size={20} />, text: 'Home' },
              { icon: <PenSquare size={20} />, text: 'New post' },
              { icon: <Calendar size={20} />, text: 'Events' },
              { icon: <MessageSquare size={20} />, text: 'Feedback' },
            ].map((item, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <Link
                  to="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.25rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--main-color)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {item.icon}
                  <span style={{ marginLeft: '0.5rem' }}>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div style={{ marginLeft: '250px', flexGrow: 1, padding: '1rem' }}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;