import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

function Launches() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {

      const data = [
        {
          name: 'Token1',
          symbol: 'TKN1',
          description: 'Description for Token1',
          tokensAvailable: 100000,
          deadline: '2024-12-31',
          costPerToken: 0.01,
        },
        {
          name: 'Token2',
          symbol: 'TKN2',
          description: 'Description for Token2',
          tokensAvailable: 500000,
          deadline: '2024-11-30',
          costPerToken: 0.05,
        },
      ];
      setLaunches(data);
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh',
    padding: '20px',
  };

  const sectionStyle = {
    maxWidth: '900px',
    marginTop: '20px',
    width: '100%',
  };

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    display: 'inline-block',
    padding: '10px 20px',
  };

  const cardContainerStyle = {
    marginBottom: '20px',
  };

  const cardStyle = {
    border: '2px solid white',
    borderRadius: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    marginBottom: '20px',
  };

  const cardTitleStyle = (backgroundColor) => ({
    fontSize: '24px',
    padding: '5px 10px',
    display: 'inline-block',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: backgroundColor,
  });

  const cardSymbolStyle = {
    fontSize: '18px',
    padding: '5px 10px',
    color: 'white',
  };

  const cardTextStyle = {
    margin: '10px 0',
  };

  const buttonStyle = {
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid white',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <>
    <NavBar/>
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <div style={titleContainerStyle}>
          <h1 style={titleStyle}>Active Launches</h1>
        </div>
        {launches.map((launch, index) => (
          <div key={index} style={cardContainerStyle}>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={cardTitleStyle('limegreen')}>{launch.name}</h3>
                <span style={cardSymbolStyle}>{launch.symbol}</span>
              </div>
              <p style={cardTextStyle}>{launch.description}</p>
              <p style={cardTextStyle}>Tokens Available: {launch.tokensAvailable}</p>
              <p style={cardTextStyle}>Deadline: {launch.deadline}</p>
              <p style={cardTextStyle}>Cost Per Token: {launch.costPerToken} ETH</p>
              <button style={buttonStyle}>Claim</button>
            </div>
          </div>
        ))}
      </section>
    </div>
    </>
  );
}

export default Launches;
