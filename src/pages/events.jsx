import React from 'react';
import { Calendar, Clock, Mail } from 'lucide-react';


export default function Events() {
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      backgroundColor: '#303030',
      color: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        content: '""',
        position: 'absolute',
        inset: '-4px',
        background: 'linear-gradient(45deg, #FFB6C1, #FF69B4, #dd97b2, #jja6C1)',
        filter: 'blur(7px)',
        zIndex: -1,
        animation: 'rotate 2s linear  infinite',
      }} />
      <div style={{
        backgroundColor: '#303030',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        height: '100%',
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '2rem',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in',
        }}>
          🎊 Upcoming Events 🎊
        </h1>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <EventCard
            icon={<Calendar size={40} />}
            title="Coming Soon"
            description="Exciting events are on the horizon!"
          />
          <EventCard
            icon={<Clock size={40} />}
            title="Stay Tuned"
            description="We're working on bringing you amazing experiences."
          />
          <EventCard
            icon={<Mail size={40} />}
            title="Get Notified"
            description="Be the first to know when events are announced."
            
          />
        </div>

        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '2rem',
          animation: 'fadeIn 1.5s ease-in',
        }}>
          We're eagerly waiting for university clubs to reach out. Once they do, this page will be buzzing with exciting events!
        </p>

        <div style={{
          animation: 'spin 2s linear infinite',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #FFB6C1',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          margin: '0 auto',
        }} />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate {
          0% { transform: rotate(-360deg); }
          100% { transform: rotate(1deg); }
        }
      `}</style>
    </div>
  );
}

function EventCard({ icon, title, description }) {
  return (
    <div style={{
      backgroundColor: '#424242',
      borderRadius: '8px',
      padding: '1.5rem',
      width: '220px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ marginBottom: '1rem', color: '#FFB6C1' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>{description}</p>
    </div>
  );
}