import list from "../../../assets/image/fi-sr-list 2.svg";
import megaphone from "../../../assets/image/fi-sr-megaphone 1.svg";
import set from "../../../assets/image/Group 25.svg";
import signout from "../../../assets/image/fi-rr-sign-out 1.svg";
import { Link, useHistory } from 'react-router-dom';
import "./sideBar.style.scss"

const SideBar = ({active}) => {
    const history = useHistory()
    const handleLogout = (e) => {

        e.preventDefault()
        window.localStorage.setItem("token", '');
        
        history.push('/login')



    }
    return ( 
        <section className="nav">

              <div className="navList">
                  
            
                <Link to="/admin" className={`${active==='list'?'active':null}`}>
                    <img src={list} alt="List Icon"/>
                    <p>Users</p>

                </Link>
                <Link to="/admin/support" className={`${active==='support'?'active':null}`} >
                    <img src={megaphone} alt="Megaphone Icon"/>
                    <p>Support</p>
                </Link>
                <div className="circle1"></div>
                
                <Link to="/admin/settings" className={`${active==='set'?'active':null}`}>
                    <img src={set} alt="Settigs Icon"/>
                    <p>Settings</p>
                </Link>

                <Link onClick={handleLogout} to="" >
                    <img src={signout} alt="Logout Icon"/>
                    <p>Log Out</p>
                </Link>

                <div className="circle2"></div>

                <div className="circle3"></div>

                
            </div>

            </section>
     );
}
 
export default SideBar;