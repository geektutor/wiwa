import Loader from '../../Loader';
import Navbar from '../../nav/Navbar';
import MobileNav from '../mobileNav/mobileNav.component'
import SideBar from '../sideBar/sideBar.component';
import './support-profile.style.scss'

const SupportProfile = () => {
    const [isLoading,setIsLoading]=useState(true)

    setTimeout(()=>{
        setIsLoading(false)
    },1000)
    return ( 
       
        <div className="overall">

            <Loader close={!isLoading}/>

           <Navbar />
          
          <SideBar active={'support'}/>

          <div className="coverSection">

          <div className="heading">
                <p className="text usersname">Support Profile</p>
                
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
               
                

                </div>

                
               
                <div className="thirdBox">
                    <div className="full-bio">
                        <p className="title">Complaint</p>
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
 
export default SupportProfile;