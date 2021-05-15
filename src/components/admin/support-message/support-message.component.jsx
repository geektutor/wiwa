import { useState } from 'react';
import { useParams } from 'react-router';
import useFetchAdmin from '../../../hooks/useFetchAdmin';
import ConnectionError from '../../errors/connectionError';
import Loader from '../../Loader';
import Navbar from '../../nav/Navbar';
import MobileNav from '../mobileNav/mobileNav.component'
import SideBar from '../sideBar/sideBar.component';
import './support-message.style.scss'

const SupportMessage = () => {
    const {id} = useParams()
    const [url] = useState(`https://wiwa.herokuapp.com/admin/feedback/${id}`);
    const {data,error,isPending} = useFetchAdmin(url);
    console.log(data)

    return ( 
       
        <div className="overall">

            <Loader close={!isPending}/>

           <Navbar />
          
          <SideBar active={'support'}/>
          {data && 

               <div className="coverSection">

<div className="heading">
      <p className="text usersname">Support Message</p>
      
  </div>

  <section className="second">

      <div className="firstBlock">
      <div className="details">
          <p className="title">User Details</p>
          <p className="name eachDetail">
              Email: <span>{data.email}</span>
          </p>   
          <p className="email eachDetail">
              Title: <span>{data.title}</span>
          </p>

      </div>
     
      

      </div>

      
     
      <div className="thirdBox">
          <div className="full-bio">
              <p className="title">Complaint</p>
              <p className="long-bio">
                 {data.message}
              </p>
          </div>
      </div>


  </section>



</div>

          }

            {error && <ConnectionError />}


         
          <MobileNav/>

          
            
        </div> 
     );
}
 
export default SupportMessage;