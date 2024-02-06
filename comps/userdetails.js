import Link from 'next/link'
import styles from '../styles/userdetails.module.css'
import { useRouter } from "next/router";

const UserDetails = (props) => {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/session/deleteSession",{
      method:"DELETE"
    });
    // const dexiDPURL = getLoginLink();
    router.push("/");
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
            <li><Link href="/dashboard" legacyBehavior><a>Dashboard</a></Link></li>
            <li><button onClick={logout}>Log Out</button></li>
          </ul>
        </div>
      );
  }
    
}
 
export default UserDetails
