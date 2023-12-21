import React, { useEffect, useState } from "react";
import styles from '../styles/userdetails.module.css'

const UserDetails = (props) => {


  console.log("props.user" + JSON.stringify(props));

  if(props.user === null) {
    return (
        <div className={styles.dropdown}>
          <ul>
            <li>&nbsp;</li>
            <li>User not logged in</li>
            <li>&nbsp;</li>
          </ul>
        </div>
    )
  }
  else {
    return (
        <div className={styles.dropdown}>
          <ul>
            <li>{props.user.name}</li>
            <li>{props.user.email}</li>
            <li><button>Log Out</button></li>
            {/* <li><button>LogOut</button></li> */}
          </ul>
        </div>
      );
  }
    
}
 
export default UserDetails
