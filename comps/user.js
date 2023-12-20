
import React from "react";
import { useState,useEffect } from "react";
import UserDetails from "./userdetails";
import { getUserData} from "./authorization/middleware";

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
      console.log("get session api");
      //const resp = await fetch('api/auth/session');
      const response = getUserData();
      console.log("Response: " + JSON.stringify(response));
      // const result = await response.json();
      // console.log("Result: " + JSON.stringify(result));

      // setUserData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // const fetchUserData = async () => {
  //   console.log("Fetch user Data");
  //   try {
  //     console.log("get session api");
  //     // const resp = await fetch('api/auth/session');
  //     const response = await fetch('api/userData');
  //     console.log("Response: " + JSON.stringify(response));
  //     const result = await response.json();
  //     console.log("Result: " + JSON.stringify(result));

  //     setUserData(result);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  useEffect(()=>{
    fetchUserData(); 
  },[])

  return (
    <div className="App">
      <header className="header">
        <div
          className="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src="user-data.png" style={{height:25, width:25}}/>
          {isDropdownVisible && <UserDetails user={userData}/>}
        </div>
      </header>
    </div>
  );
}
 
export default User
