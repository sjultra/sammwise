import '../styles/globals.css'
import '../comps/layout'
import Layout from '../comps/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {getDexiDPAuthenticationURL} from '../comps/authorization/authorization'
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // Check authentication status when the page loads
    fetch('/api/auth/login')
      .then((response) => {
        console.log()
        if (!response.ok) {
          console.log("Not logged in!");
          // Redirect to login page if not authenticated
          const loginUrl = getDexiDPAuthenticationURL();
          router.push(loginUrl);
        }
        else {
          console.log("logged in");
        }
      })
      .catch((error) => {
        console.error('Error checking authentication status:', error);
        // Handle error appropriately
      });
  }, []);

  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )
}
// Changes test
export default MyApp
