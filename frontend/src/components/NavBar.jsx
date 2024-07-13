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
    backgroundColor: 'white',
    padding: '5px 10px',
    cursor: 'pointer',
    textDecoration: 'none', // Ensure no underline on the logo link
  };

  const navItemsStyle = {
    display: 'flex',
    gap: '20px',
  };

  const navItemStyle = (backgroundColor) => ({
    fontSize: '18px',
    color: 'black',
    backgroundColor: backgroundColor,
    cursor: 'pointer',
    padding: '10px 20px',
    transition: 'background-color 0.3s',
  });

  const navItemHoverStyle = (backgroundColor) => ({
    ...navItemStyle(backgroundColor),
    color: 'white',
    border: '2px solid white',
  });

  const navItems = [
    { name: 'Launches', color: 'limegreen' },
    { name: 'Holdings', color: 'deepskyblue' },
    { name: 'Staking', color: 'gold' },
    { name: 'Governance', color: 'orange' },
    { name: 'About', color: 'magenta' },
  ];

  return (
    <nav style={navbarStyle}>
      <a href="/" style={logoStyle}>
        Runelaunch
      </a>
      <div style={navItemsStyle}>
        {navItems.map((item, index) => (
          <div
            key={index}
            style={navItemStyle(item.color)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = item.color;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = item.color;
              e.target.style.color = 'black';
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
