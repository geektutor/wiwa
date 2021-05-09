import Navbar from '../../nav/Navbar'
import './support.style.scss'
import SideBar from '../sideBar/sideBar.component';
import MobileNav from '../mobileNav/mobileNav.component';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';
import { useState } from 'react';
import useFetchAdmin from '../../../hooks/useFetchAdmin';
import ConnectionError from '../../errors/connectionError';

const Support = () => {
    const [url] = useState("https://wiwa.herokuapp.com/admin/feedback");
    const {data,error,isPending} = useFetchAdmin(url);
    console.log(data)
    return ( 
        <div className="overall">
            <Loader close={!isPending} />
            <Navbar/>

            <SideBar active={'support'}/>

            {data && 
                <div className="coverSection">
                <div className="heading">
                    <p className="text"> <span className="nama"></span>Support</p>
                    <form action="" className="searchUser">
                        <input type="text" name="name" placeholder="Search Name"/>
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="cover">
                        <div className="overFlow" >
                            <table>
                            <thead>
                
                                    <tr>

                                        <th>S/N</th>
                                        <th>Email</th>
                                        <th>Title</th>
                                        <th>Action</th>            
                                    </tr>
                
                            </thead>
                
                            <tbody>

                            {data.map((eachData)=>{
                              return(

                                <tr key={eachData.id}>
                                  <td className="first">{data.indexOf(eachData) + 1}</td>       
                                  <td >{eachData.user}</td>
                                  <td >{eachData.title}</td>
                                  <td className="last"><Link to={`/admin/supportmessage/${eachData.id}`}><button>View User</button></Link></td>
                                </tr>

                              )})}

                              
                            </tbody>
                            
                            
                            </table>
                            

                        </div>

                        {/* <div className="page">
                            <p>Select Page:</p>
                            <select className="selector" name="" id="">
                                <option value="">1</option>
                                <option value="">2</option>
                            </select>
                        </div> */}


            </div>
            
            </div>
            }

            {error && <ConnectionError />}


            
            <MobileNav/>

           
            
        </div>
     );
}
 
export default Support;