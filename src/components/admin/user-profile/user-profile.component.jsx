import Navbar from '../../nav/Navbar';
import Loader from "../../Loader";
import MobileNav from '../mobileNav/mobileNav.component';
import SideBar from '../sideBar/sideBar.component';
import './user-profile.style.scss'
import { useState } from 'react';

const UserProfile = () => {
    const [isLoading,setIsLoading]=useState(true)

    setTimeout(()=>{
        setIsLoading(false)
    },500)
    
    return ( 
        <div className="overall">
            <Loader close={!isLoading} />
            <Navbar />
          
            <SideBar active={'list'}/>

            <div className="coverSection">

            <div className="heading">
                <p className="text usersname">Raji Mustapha</p>
                
            </div>

            <section className="second">

                <div className="firstBlock">
                <div className="details">
                    <p className="title">User Details</p>
                    <p className="name eachDetail">
                        Name: <span>Raji Mustapha Ademola</span>
                    </p>   
                    <p className="email eachDetail">
                        Email: <span>rajimustapha30@gmail.com</span>
                    </p>

                    <p className="status eachDetail">
                        Status: <span>User</span>
                    </p>

                </div>
                <div className="coverall">
                    <div className="actions">
                        <button className="enlist">Enlist User</button>
                        <button className="delist">Delist User</button>
                        <button className="delete">Make Admin</button>
                        <button className="delete" id="myBtn2">Delete User</button>
                    </div>  
                </div>
                

                </div>

                
                <div className="secondBlock">
                    <div className="skill">
                        <p className="title">User Skills</p>

                        <div className="skill-box">
                            <p>Html</p>
                            <p>Css</p>
                            <p>JavaScript</p>
                            <p>NodeJs</p>
                            <p>Bootstrap</p>
                            <p>Content Writing</p>
                            <p>Tailwind</p>
                            <p>React js</p>
                            <p>Angular js</p>
                        </div>


                    

                    </div>

                    <div className="small-bio-block">
                        <p className="title">Short Bio</p>
                        <p className="short-bio">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ipsam optio, odit dignissimos eius, voluptatem eos architecto sapiente enim repellendus temporibus quisquam ex? Facilis dolorum quia fugiat quod enim nemo ut, minus corrupti asperiores facere nesciunt ratione expedita, a harum assumenda cum, fuga temporibus nostrum possimus earum quae alias provident.
                        </p>
                    </div>
                </div>

                <div className="thirdBox">
                    <div className="full-bio">
                        <p className="title">Full Bio</p>
                        <p className="long-bio">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate obcaecati quam incidunt fuga maxime, eaque odio voluptatibus enim consectetur libero dignissimos. Explicabo nemo similique labore ad, itaque illum dicta, nisi temporibus ullam, eius quisquam fuga eligendi provident nihil! Consequuntur saepe ratione quibusdam voluptatum sapiente, unde explicabo a ducimus quae nam tempore perspiciatis, aliquam odit atque quidem numquam similique consectetur quia reiciendis corrupti. Ut sequi excepturi sit quaerat alias nemo maxime molestiae, optio iusto cum non corrupti ea nobis assumenda nulla eius, quae quasi vitae laudantium veritatis voluptatem esse? Eligendi, fugiat? Modi, rem? Dolorem iusto unde, culpa hic atque assumenda natus.
                        </p>
                    </div>
                </div>


            </section>

       

            </div>
        
            <MobileNav/>
            
        </div> 
     );
}
 
export default UserProfile;