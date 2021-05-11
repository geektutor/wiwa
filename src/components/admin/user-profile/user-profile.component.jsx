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
import AdminBtn from '../adminBtn/adminBtn.component';

const UserProfile = () => {
    const {id} = useParams()
    const [url] = useState(`https://wiwa.herokuapp.com/admin/users/${id}`);
    const {data,error,isPending} = useFetchAdmin(url);
    const [isPendingBtn, setIsPendingBtn] = useState(false);
    const [isPendingDel, setIsPendingDel] = useState(false);
    const [isPendingAd, setIsPendingAd] = useState(false);
    const [isPendingDelist, setIsPendingDelist] = useState(false);
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
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    refresh_token: localStorage.getItem("refToken"),
                  },
                  redirect: "follow",
                })
                  .then(response => response.json())
                  .then(result => {
                    window.localStorage.setItem("token", result.data.token);
                    retrieveToken();
                    console.log(retrieveToken());
                  })
                  .catch(error => console.log("error", error));
              } else {
                console.log(res);
                return res.json();
              }
            })
            .then((result) => {
              console.log(result)
              setIsPendingBtn(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
                setTimeout(()=>{
                    // history.go(0)

                },1000)
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

    const handleDelist = ()=>{
        setIsPendingDelist(true);
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
      
          fetch(`https://wiwa.herokuapp.com/admin/user/delist/${data.id}`, requestOptions)
            .then((res)=>{
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    refresh_token: localStorage.getItem("refToken"),
                  },
                  redirect: "follow",
                })
                  .then(response => response.json())
                  .then(result => {
                    window.localStorage.setItem("token", result.data.token);
                    retrieveToken();
                    console.log(retrieveToken());
                  })
                  .catch(error => console.log("error", error));
              } else {
                console.log(res);
                return res.json();
              }
            })
            .then((result) => {
              console.log(result)
              setIsPendingDelist(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
                setTimeout(()=>{
                    history.go(0)
                },1000)
              } 
              else {
                displayMsg("error", result.message);
              }
      
            })
            .catch((error )=>{ 
                displayMsg("error", error.message);
                console.log(error.message)
                setIsPendingDelist(false);
              
            });
        
    }

    const handleAdmin = ()=>{
        setIsPendingAd(true);
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
      
          fetch(`https://wiwa.herokuapp.com/admin/user/make-admin/60949a80ad92e33f486fc068`, requestOptions)
            .then((res)=>{
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    refresh_token: localStorage.getItem("refToken"),
                  },
                  redirect: "follow",
                })
                  .then(response => response.json())
                  .then(result => {
                    window.localStorage.setItem("token", result.data.token);
                    retrieveToken();
                    console.log(retrieveToken());
                  })
                  .catch(error => console.log("error", error));
              } else {
                console.log(res);
                return res.json();
              }
            })
            .then((result) => {
              console.log(result)
              setIsPendingAd(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
                setTimeout(()=>{
                    history.go(0)
                },2000)
              } 
              else {
                displayMsg("error", result.message);
              }
      
            })
            .catch((error )=>{ 
                displayMsg("error", error.message);
                console.log(error.message)
                setIsPendingAd(false);
              
            });
        
    }

    const handleUnadmin = ()=>{
        setIsPendingAd(true);
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
      
          fetch(`https://wiwa.herokuapp.com/admin/user/remove-admin/60949a80ad92e33f486fc068`, requestOptions)
            .then((res)=>{
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    refresh_token: localStorage.getItem("refToken"),
                  },
                  redirect: "follow",
                })
                  .then(response => response.json())
                  .then(result => {
                    window.localStorage.setItem("token", result.data.token);
                    retrieveToken();
                    console.log(retrieveToken());
                  })
                  .catch(error => console.log("error", error));
              } else {
                console.log(res);
                return res.json();
              }
            })
            .then((result) => {
              console.log(result)
              setIsPendingAd(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
                setTimeout(()=>{
                    history.go(0)
                },2000)
              } 
              else {
                displayMsg("error", result.message);
              }
      
            })
            .catch((error )=>{ 
                displayMsg("error", error.message);
                console.log(error.message)
                setIsPendingAd(false);
              
            });
        
    }

    const handleDelete = ()=>{
        setIsPendingDel(true);
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
            method:'DELETE',
            headers:{
              "Content-Type":"application/json",
              "token":  retrieveToken()
            },
            redirect: 'follow'
          };
      
          fetch(`https://wiwa.herokuapp.com/users/delete/${data.id}`, requestOptions)
            .then((res)=>{
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://wiwa.herokuapp.com/users/refresh-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    refresh_token: localStorage.getItem("refToken"),
                  },
                  redirect: "follow",
                })
                  .then(response => response.json())
                  .then(result => {
                    window.localStorage.setItem("token", result.data.token);
                    retrieveToken();
                    console.log(retrieveToken());
                  })
                  .catch(error => console.log("error", error));
              } else {
                console.log(res);
                return res.json();
              }
            })
            .then((result) => {
              console.log(result)
              setIsPendingDel(false);
              if (result.status === "Success") {
                displayMsg("success", result.message);
                setTimeout(()=>{
                    history.push('/admin')
                },2000)
                
              } 
              else {
                displayMsg("error", result.message);
              }
      
            })
            .catch((error )=>{ 
                displayMsg("error", error.message);
                console.log(error.message)
                setIsPendingDel(false);
              
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
                            Permission: <span>{data.isAdmin ? 'Admin' : 'User'}</span>
                        </p>

                        <p className="status eachDetail">
                            Status: <span>{data.active ? 'Enlisted' : 'Delisted'}</span>
                        </p>

                    </div>
                    <div className="coverall">
                        <div className="actions">
                            {isPendingBtn ? <BtnLoad className={"enlist"} color={'white'}/> : <button onClick={handleEnlist} className="enlist">Enlist User</button> }
                                  
                            
                            {isPendingDelist ? <BtnLoad className={"delist"} color={'white'}/> : <button className="delist" onClick={handleDelist} id="myBtn2">Delist User</button> }
                            
                            {isPendingAd ? <BtnLoad className={"delete"} color={'white'}/> :  <AdminBtn isAdmin={data.isAdmin} handleAdmin={handleAdmin} handleUnadmin={handleUnadmin}/>}
                           
                            {isPendingDel ? <BtnLoad className={"delete"} color={'white'}/> : <button className="delete" onClick={handleDelete} id="myBtn2">Delete User</button> }
                           
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