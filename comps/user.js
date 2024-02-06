
import React from "react";
import { useState,useEffect } from "react";
import UserDetails from "./userdetails";
import styles from '../styles/userdetails.module.css'


const User = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/getUserData");
      if(response.ok){
        const userJSON = await response.json();
        setUserData(userJSON);
        sessionStorage.setItem('userData', JSON.stringify(userJSON));
      }
      else {
        setUserData(null);
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    fetchUserData(); 
  },[])

  return (
    <div className={styles.app}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
          <img src="user-data.png" id={styles.icon}/>
          {isDropdownVisible && <UserDetails user={userData}/>}
    </div>
  );
}
 
export default User
