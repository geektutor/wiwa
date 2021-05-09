import Navbar from '../../nav/Navbar';
import Loader from "../../Loader";
import MobileNav from '../mobileNav/mobileNav.component';
import SideBar from '../sideBar/sideBar.component';
import './user-profile.style.scss'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useFetchAdmin from '../../../hooks/useFetchAdmin';
import BtnLoad from '../bntload/btnload.component';
import ConnectionError from "../../errors/connectionError";
import displayMsg from '../../Message';

const UserProfile = () => {
    const {id} = useParams()
    const [url] = useState(`https://wiwa.herokuapp.com/users/${id}`);
    const {data,error,isPending} = useFetchAdmin(url);
    const [isPendingBtn, setIsPendingBtn] = useState(false);
    const history = useHistory()
  
    
    const handleEnlist = ()=>{
        setIsPendingBtn(true);
        const retrieveToken =  ()=>{
            const token = window.localStorage.getItem("token")
            
            if (!token) {
                history.push('/login')
              }
              else{
                return(token)
                }
          }

        var requestOptions = {
            method:'PUT',
            headers:{
              "Content-Type":"application/json",
              "token":  retrieveToken()
            },
            redirect: 'follow'
          };
      
          fetch(`https://wiwa.herokuapp.com/admin/user/enlist/${data.id}`, requestOptions)
            .then((res)=>{
                console.log(res)
                if (res.status===401) {
                    history.push('/login')
                  }
                  else{
          
                    if (!res.ok) {
                      // error coming back from server
                      throw Error("something went wrong");
                    }
            
                    return res.json();
          
                  }
            })
            .then((result) => {
              console.log(result)
              setIsPendingBtn(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
              } 
              else {
                displayMsg("error", result.message);
              }
      
            })
            .catch((error )=>{ 
                displayMsg("error", error.message);
                console.log(error.message)
                setIsPendingBtn(false);
              
            });
        
    }
    


   

    return ( 
        <div className="overall">
             <Loader close={!isPending}/>
            <Navbar />
            
          
            <SideBar active={'list'}/>
            {data && 
                <div className="coverSection">

                <div className="heading">
                    <p className="text usersname">{data.name}</p>
                    
                </div>

                <section className="second">

                    <div className="firstBlock">
                    <div className="details">
                        <p className="title">User Details</p>
                        <p className="name eachDetail">
                            Name: <span>{data.name}</span>
                        </p>   
                        <p className="email eachDetail">
                            Email: <span>{data.email}</span>
                        </p>

                        <p className="status eachDetail">
                            Status: <span>User</span>
                        </p>

                    </div>
                    <div className="coverall">
                        <div className="actions">
                            {isPendingBtn ? <BtnLoad className={"enlist"}/> :<button onClick={handleEnlist} className="enlist">Enlist User</button> }
                            {/* { isPendingBtn && <button className="btn" style={{display:"flex",alignItems:"center",justifyContent:"center"}} > <i className="fas fa-circle-notch fa-spin " style={{color:"white",marginRight:"3px"}} ></i> Loading </button>}
                            { isPendingBtn === false && <button type="submit" className="btn"> Enlist User </button>}
         */}
                            
                            <button className="delist">Delist User</button>
                            <button className="delete">Make Admin</button>
                            <button className="delete" id="myBtn2">Delete User</button>
                        </div>  
                    </div>
                    

                    </div>

                    
                    <div className="secondBlock">
                        <div className="skill">
                            <p className="title">User Skills</p>

                           
                           { data.skills.length !== 0 
                           ? 
                           <div className="skill-box">
                              { data.skills.map((item)=>{return (<p>{item}</p>)})}
                           </div> : <h5 style={{textAlign:'center',fontSize:'14px',fontWeight:'400'}} >No skill For this user yet</h5>

                           }



                        

                        </div>

                        <div className="small-bio-block">
                            <p className="title">Short Bio</p>
                            <p className="short-bio">
                               {data.shortBio}
                            </p>
                        </div>
                    </div>

                    <div className="thirdBox">
                        <div className="full-bio">
                            <p className="title">Full Bio</p>
                            <p className="long-bio">
                              {data.fullBio}
                            </p>
                        </div>
                    </div>


                </section>

                </div>
            }

            {error && <ConnectionError msg={error}/>}

            <MobileNav/>
            
        </div> 
     );
}
 
export default UserProfile;