import React from 'react';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Dashboard</h1>
      <p style={styles.paragraph}>This is your dashboard where you can see an overview of your activities.</p>
      {/* Add additional sections like stats, recent activities, etc. */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
};



export default Dashboard;
