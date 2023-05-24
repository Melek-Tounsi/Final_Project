import React from 'react';
import MyLogo from './mylogo.png';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "black", height: "80px", alignItems: "center" }}>
        <div>
          <img src={MyLogo} alt='logo' height={'60px'} width={'180px'} />
        </div>
        <div style={{ justifyContent: "space-around", display: "flex", flexDirection: "row" }}>
          <a href='/' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>Home</a>
          <a href='/Carmarks' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>Marks</a>
          <a href='/Novelties' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>Novelties</a>
          <a href='/' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>AboutUs</a>
        </div>
        {isLoggedIn ? (
          <div>
            <span style={{marginRight:"20px", color:"white", fontSize:"20px"}}>{username}</span>
            <a href='/' onClick={onLogout} style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>Logout</a>
            <a href='/Cart' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}><img src='https://static.vecteezy.com/ti/vecteur-libre/p3/3479597-shopping-chariot-icon-pour-transporter-des-marchandises-en-magasin-gratuit-vectoriel.jpg' alt='cart' height="50px" width="50px" /></a >
          </div>
        ) : (
          <div>
            <a href='/Register' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>Register</a >
            <a href='/Login' style={{ marginRight: "40px", textDecoration: "none", fontSize: "20px", color: "white" }}>LogIn</a >
          </div>
        )}
      </div>
    );
  };

export default Navbar;
