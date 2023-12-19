import React, { useEffect, useState } from "react";
import styles from '../styles/userdetails.module.css'

const UserDetails = (props) => {
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
            <li>{props.user.userName}</li>
            <li>{props.user.userEmail}</li>
            <li>{props.user.rand}</li>
            {/* <li><button>LogOut</button></li> */}
          </ul>
        </div>
      );
  }
    
}
 
export default UserDetails
