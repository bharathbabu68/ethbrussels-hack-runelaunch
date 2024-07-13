import React from 'react';

function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh',
    padding: '20px',
    fontFamily:"Roboto"
  };

  const sectionStyle = {
    maxWidth: '1300px',
    marginTop: '20px',
    width: '100%',
  };

  const titleContainerStyle = {
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '78px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    display: 'inline-block',
    padding: '10px',
  };

  const subTitleStyle = {
    fontSize: '48px',
    backgroundColor: 'limegreen',
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    marginBottom: '0px',
  };

  const subTitle2Style = {
    fontSize: '48px',
    backgroundColor: 'deepskyblue',
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    marginBottom: '0px',
  };

  const subTitle3Style = {
    fontSize: '48px',
    backgroundColor: 'orangered',
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    marginBottom: '0px',
  };

  const subTitle4Style = {
    fontSize: '48px',
    backgroundColor: 'magenta',
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    marginBottom: '0px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    border: '2px solid white',
    borderRadius: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
  };

  const cardTitleStyle = (backgroundColor) => ({
    fontSize: '24px',
    padding: '5px 10px',
    display: 'inline-block',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: backgroundColor,
  });

  const cardNumberStyle = {
    fontSize: '16px',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10px',
    color: 'black',
    backgroundColor: 'white',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  };

  const buttonStyle = {
    fontSize: '32px',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid white',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <div style={titleContainerStyle}>
          <h1 style={titleStyle}>RuneLaunch</h1>
          <div>
            <span style={subTitleStyle}>Launchpad</span>
            <span style={subTitle2Style}>for Runes on Rootstock</span>
          </div>
        </div>
        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={cardTitleStyle('limegreen')}>CREATE RUNES</h3>
              <span style={cardNumberStyle}>1</span>
            </div>
            <p>
              Easily create your own Runes by deploying an ERC-1155 contract on Rootstock. The process is simple and intuitive, allowing you to get started with minimal hassle.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={cardTitleStyle('deepskyblue')}>LIST ON LAUNCHPAD</h3>
              <span style={cardNumberStyle}>2</span>
            </div>
            <p>
              Put your newly created Runes on the RuneLaunch platform for early investment. Set a fixed price and allow others to invest in your project from the start.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={cardTitleStyle('orangered')}>INVEST IN RUNES</h3>
              <span style={cardNumberStyle}>3</span>
            </div>
            <p>
              Explore and invest in promising Runes projects on the RuneLaunch platform. Support innovative projects at their inception and be a part of the growing Runes ecosystem.
            </p>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={cardTitleStyle('magenta')}>TRACK INVESTMENTS</h3>
              <span style={cardNumberStyle}>4</span>
            </div>
            <p>
              Keep track of your investments and monitor the progress of your supported projects. RuneLaunch provides tools to help you stay updated with your portfolio.
            </p>
          </div>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default App;
