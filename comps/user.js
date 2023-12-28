
import React from "react";
import { useState,useEffect } from "react";
import UserDetails from "./userdetails";
import { getUserData} from "./authorization/middleware";
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
    console.log("Fetch user Data");
    try {
     
      const response = await getUserData();
      // console.log("user.js UserData Response: " + JSON.stringify(response));
      setUserData(response);
     
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
