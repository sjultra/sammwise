import React, { useEffect, useState } from "react";
import styles from '../styles/userdetails.module.css'
import { useRouter } from "next/router";
import { getDexiDPAuthenticationURL } from '../comps/authorization/authorization'


const UserDetails = (props) => {
  const router = useRouter();
  // console.log("props.user" + JSON.stringify(props));

  const logout = async () => {
    console.log("logout!");
    await fetch("/api/session/deleteSession",{
      method:"DELETE"
    });
    const dexiDPURL = getDexiDPAuthenticationURL();
    console.log("Before logout redirect"); 
    router.push(dexiDPURL);
  }

  if(props.user === null || props.user === undefined) {
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
            <li><button onClick={logout}>Log Out</button></li>
          </ul>
        </div>
      );
  }
    
}
 
export default UserDetails
