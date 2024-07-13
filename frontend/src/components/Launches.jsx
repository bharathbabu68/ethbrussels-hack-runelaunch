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
          tokensClaimed: 50000,
          totalTokens: 150000,
          deadline: '2024-12-31',
          costPerToken: 0.01,
          participants: 1200,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee402', // Example contract address
        },
        {
          name: 'Token2',
          symbol: 'TKN2',
          description: 'Description for Token2',
          tokensAvailable: 500000,
          tokensClaimed: 250000,
          totalTokens: 1000000,
          deadline: '2024-11-30',
          costPerToken: 0.05,
          participants: 850,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee403', // Example contract address
        },
        {
          name: 'Token3',
          symbol: 'TKN3',
          description: 'Description for Token3',
          tokensAvailable: 750000,
          tokensClaimed: 400000,
          totalTokens: 1150000,
          deadline: '2024-10-15',
          costPerToken: 0.03,
          participants: 1100,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee404', // Example contract address
        },
        {
          name: 'Token4',
          symbol: 'TKN4',
          description: 'Description for Token4',
          tokensAvailable: 750000,
          tokensClaimed: 400000,
          totalTokens: 1150000,
          deadline: '2024-10-15',
          costPerToken: 0.03,
          participants: 1100,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee405', // Example contract address
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
    maxWidth: '1200px', // Increased maxWidth for wider display
    width: '100%',
    marginTop: '20px',
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

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Adjusted for three cards per row
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    border: '2px solid white',
    borderRadius: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'left',
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
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
    backgroundColor: 'gray',
    borderRadius: '5px',
  };

  const cardTextStyle = {
    margin: '5px 0',
  };

  const contractLinkStyle = {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const progressBarContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    height: '25px',
    marginTop: '10px',
  };

  const progressBarStyle = (percentage) => ({
    width: `${percentage}%`,
    backgroundColor: 'limegreen',
    height: '100%',
    textAlign: 'center',
    color: 'black',
    lineHeight: '25px', // Center the text vertically
  });

  const buttonStyle = {
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid white',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const CreateButtonStyle = {
    fontSize: '20px',
    backgroundColor: 'limegreen',
    color: 'black',
    padding: '10px 20px',
    border: '2px solid limegreen',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft:"80%"
  };

  const handleContractLinkClick = (contractAddress) => {
    const blockExplorerUrl = `https://explorer.testnet.rootstock.io/address/${contractAddress}`;
    window.open(blockExplorerUrl, '_blank');
  };

  const handleCreateNewLaunch = () => {
    window.location.href='/create-new-launch'
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Active Launches</h1>
          </div>
          <button style={CreateButtonStyle} onClick={handleCreateNewLaunch}>
            Create New Launch
          </button>
          <div style={gridContainerStyle}>
            {launches.map((launch, index) => {
              const percentageClaimed = (launch.tokensClaimed / launch.totalTokens) * 100;
              return (
                <div key={index} style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <h3 style={cardTitleStyle('blue')}>{launch.name}</h3>
                    <span style={cardSymbolStyle}>{launch.symbol}</span>
                  </div>
                  <p style={cardTextStyle}><strong>Description:</strong> {launch.description}</p>
                  <p style={cardTextStyle}><strong>Total Tokens:</strong> {launch.totalTokens}</p>
                  <p style={cardTextStyle}><strong>Tokens Available:</strong> {launch.tokensAvailable}</p>
                  <p style={cardTextStyle}><strong>Tokens Claimed:</strong> {launch.tokensClaimed}</p>
                  <p style={cardTextStyle}><strong>Participants:</strong> {launch.participants}</p>
                  <p style={cardTextStyle}><strong>Deadline:</strong> {launch.deadline}</p>
                  <p style={cardTextStyle}><strong>Cost Per Token:</strong> {launch.costPerToken} ETH</p>
                  <div style={progressBarContainerStyle}>
                    <div style={progressBarStyle(percentageClaimed)}>
                      {`${percentageClaimed.toFixed(2)}% Claimed`}
                    </div>
                  </div>
                  <p style={{ marginTop: '10px' }}>
                    <span
                      style={contractLinkStyle}
                      onClick={() => handleContractLinkClick(launch.contractAddress)}
                    >
                      View Contract Address
                    </span>
                  </p>
                  <button style={buttonStyle}>Purchase Token</button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Launches;
