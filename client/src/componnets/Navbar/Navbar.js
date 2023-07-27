import React from 'react';
import logo from '../../logo.jpg';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <img src={logo} alt="Logo" className= {styles["logo"]} />
      
    </nav>
  );
};

export default Navbar;
