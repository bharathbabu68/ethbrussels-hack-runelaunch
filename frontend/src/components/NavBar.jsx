import React from 'react';

function NavBar() {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: '10px 20px',
    borderBottom: '2px solid white',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'orange',
    padding: '5px 10px',
    cursor: 'pointer',
    textDecoration: 'none', // Ensure no underline on the logo link
  };

  const navItemsStyle = {
    display: 'flex',
    gap: '20px',
  };

  const navItemStyle = {
    fontSize: '18px',
    color: 'white', // Set all text to white
    cursor: 'pointer',
    padding: '10px 20px',
    transition: 'color 0.3s', // Smooth color transition
  };

  const navItems = [
    { name: 'Launches', link: 'http://localhost:3001/launches' },
    { name: 'Create Rune', link: 'http://localhost:3000/runes' },
    { name: 'Holdings', link: 'http://localhost:3001/holdings' },
    { name: 'Governance', link: 'http://localhost:3001/governance' },
    { name: 'About', link: 'http://localhost:3001/about' },
  ];

  const handleNavClick = (link) => {
    window.location.replace(link);
  };

  return (
    <nav style={navbarStyle}>
      <a href="/" style={logoStyle}>
        RuneLaunch
      </a>
      <div style={navItemsStyle}>
        {navItems.map((item, index) => (
          <div
            key={index}
            style={navItemStyle}
            onMouseOver={(e) => {
              e.target.style.color = 'black'; // Change text color on hover
              e.target.style.backgroundColor = 'white'; // Background color on hover
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'white'; // Restore text color on mouse out
              e.target.style.backgroundColor = 'transparent'; // Remove background color on mouse out
            }}
            onClick={() => handleNavClick(item.link)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;