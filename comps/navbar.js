import Link from 'next/link'
import Image from 'next/image'
import User from './user'

const Navbar = () => {
    return (
        <nav>
            <div className = "logo">
                <Image src = "/logo.png" width = {77} height = {77}/>
            </div>
            <User></User>
            <Link href="/" legacyBehavior><a>Home</a></Link>
            <Link href="/about" legacyBehavior><a>About</a></Link>
            <Link href="/assessment" legacyBehavior><a>Assessment</a></Link>
            <Link href="/results" legacyBehavior><a>Results</a></Link>
        </nav>
      );
}
 
export default Navbar
