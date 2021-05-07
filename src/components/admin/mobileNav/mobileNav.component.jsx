import "./mobileNav.style.scss"
import list from "../../../assets/image/fi-sr-list 2.svg";
import megaphone from "../../../assets/image/fi-sr-megaphone 1.svg";
import set from "../../../assets/image/Group 25.svg";
import signout from "../../../assets/image/fi-rr-sign-out 1.svg";
import { Link } from 'react-router-dom';


const MobileNav = () => {
    return ( 
        <div class="mobileNav">
            <div class="navList">
                <Link to="/admin/users">
                    <img src={list} alt="List Icon"/>
                    <p>Users</p>

                </Link>
                <Link to="/admin/support" class="line">
                    <img src={megaphone} alt="Megaphone Icon"/>
                    <p>Support</p>
                </Link>
                <div class="circle1"></div>
                
                <Link to="/admin/settings" class="line2">
                    <img src={set} alt="Settigs Icon"/>
                    <p>Settings</p>
                </Link>
                <Link to="">
                    <img src={signout} alt="Logout Icon"/>
                    <p>Log Out</p>
                </Link>

            
            </div>
        </div>

     );
}
 
export default MobileNav;