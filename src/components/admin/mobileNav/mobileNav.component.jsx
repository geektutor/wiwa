import "./mobileNav.style.scss"
import list from "../../../assets/image/fi-sr-list 2.svg";
import megaphone from "../../../assets/image/fi-sr-megaphone 1.svg";
import set from "../../../assets/image/Group 25.svg";
import signout from "../../../assets/image/fi-rr-sign-out 1.svg";
import { Link, useHistory } from 'react-router-dom';


const MobileNav = () => {
    const history = useHistory()
    const handleLogout = (e) => {

        e.preventDefault()
        window.localStorage.setItem("token", '');
        
        history.push('/login')



    }
    return ( 
        <div className="mobileNav">
            <div className="navList">
                <Link to="/admin">
                    <img src={list} alt="List Icon"/>
                    <p>Users</p>

                </Link>
                <Link to="/admin/support" className="line">
                    <img src={megaphone} alt="Megaphone Icon"/>
                    <p>Support</p>
                </Link>
                <div className="circle1"></div>
                
                <Link to="/admin/settings" className="line2">
                    <img src={set} alt="Settigs Icon"/>
                    <p>Settings</p>
                </Link>
                <Link onClick={handleLogout} to="">
                    <img src={signout} alt="Logout Icon"/>
                    <p>Log Out</p>
                </Link>

            
            </div>
        </div>

     );
}
 
export default MobileNav;