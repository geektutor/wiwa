import { useState } from 'react';
import { useHistory } from 'react-router';
import useFetchAdmin from '../../../hooks/useFetchAdmin';
import ConnectionError from '../../errors/connectionError';
import Loader from '../../Loader';
import displayMsg from '../../Message';
import Navbar from '../../nav/Navbar';
import BtnLoad from '../bntload/btnload.component';
import MobileNav from '../mobileNav/mobileNav.component';
import SideBar from '../sideBar/sideBar.component';
import './settings.style.scss'

const Settings = () => {

    const [url] = useState("https://tcn-ccg-dt.herokuapp.com/admin/keys");
    const {data,error,isPending} = useFetchAdmin(url);
    const[openAffirm,setOpenAffirm]= useState(false)
    const[isPendingAdd,setIsPendingAdd] =useState(false)
    const[isPendingDel,setIsPendingDel] =useState(false)
    const [addKey,setAddKey] = useState('')
    const history = useHistory()
    const [deleteID,setDeleteID] = useState(null)

    const retrieveToken =  ()=>{
        const token = window.localStorage.getItem("token")
        
        if (!token) {
            history.push('/login')
          }
          else{
            return(token)
            }
      }
  
  
 
    const handleSubmit=(e)=>{
        e.preventDefault();
      
        setIsPendingAdd(true)
    
        var raw = {
          "key": addKey
        };

       
    
     
        var requestOptions = {
          method: 'POST',
          body: JSON.stringify(raw),
          headers:{
            "Content-Type":"application/json",
            'token': retrieveToken()
          },
          redirect: 'follow'
        };
    
        fetch("https://tcn-ccg-dt.herokuapp.com/admin/keys/create", requestOptions)
          .then((res)=>{
            if (res.status === 403) {
              history.push("/login");
            } else if (res.status === 401) {
              
              return fetch("https://tcn-ccg-dt.herokuapp.com/users/refresh-token", {
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
            setIsPendingAdd(false);
    
            if (result.status === "Success") {
              displayMsg("success", "Added Successfully");
              history.go(0)
            } 
            else {
              displayMsg("error", result.message);
            }
    
          })
          .catch((error )=>{ 
            setIsPendingAdd(false);
            displayMsg("error", error.message);
          });
    
      }
    
      const handleChange=(event)=>{
        setAddKey(event.target.value)
        
      }
    
  

      
     const handleAffirm=(id)=>{
         console.log(id)
         setDeleteID(id)
        setOpenAffirm(!openAffirm)
    }

    const handleDelete=(id)=>{

        setIsPendingDel(true)

        console.log(id,'delete')

        var requestOptions = {
            method:'DELETE',
            headers:{
              "Content-Type":"application/json",
              "token":  retrieveToken()
            },
            redirect: 'follow'
          };
      
          fetch(`https://tcn-ccg-dt.herokuapp.com/admin/keys/delete/${id}`, requestOptions)
            .then((res)=>{
              if (res.status === 403) {
                history.push("/login");
              } else if (res.status === 401) {
                
                return fetch("https://tcn-ccg-dt.herokuapp.com/users/refresh-token", {
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
              setIsPendingDel(false)
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
                setIsPendingDel(true)
            });



    }


    return ( 
        <div className="overall">
            <Loader close={!isPending}/>
            <Navbar/>
            <SideBar active={'set'}/>

            {data && 
                    <div className="coverSection">

                    <div className="heading">
                        <p className="text usersname">Settings</p>
                        
                    </div>

                    <section className="second">
                        
                        <div className="secondBlock">

                        <div className="question">
                                <p className="title">Question</p>
                                <p className="text">
                                    Who is the leader of your group
                                </p>
                                
                                  
                            </div>

                            
                            <div className="answers">
                                <p className="title">Answers</p>

                                <div className="ans-box">
                                    {data.map((item)=>{
                                        return(
                                            <div className="ans" key={item.id}> <span>{item.key}</span>  <i onClick={()=>{handleAffirm(`${item.id}`)}} className="fas fa-times"></i> </div>
                                        )
                                    })}
                               
                                </div>

                                <form onSubmit={handleSubmit} className="addAnswer">
                                    <input onChange={(e)=>{handleChange(e)}} type="text" name="name" placeholder="Add Answer"/>
                                    { isPendingAdd ? <button type="submit"> <i className="fas fa-circle-notch fa-spin"></i> </button> : <button type="submit"> <i className="fas fa-plus"></i></button> }
                                </form>


                            

                            </div>

                        
                        </div>




                    </section>

                    <div className={`${openAffirm?'open':'closed'} modal`}  >
                            <div className="modal-content">
                                <span  onClick={handleAffirm }className="close">&times;</span>
                            
                                <h3>Warning</h3>
                                
                                <form action="">
                                

                                <p>Are you sure you want to delete this answer?</p>
                                
                                {isPendingDel ? <BtnLoad color={'#dd5500'} className={'btn'}/> : <button onClick={()=>{ handleDelete(deleteID)}} >Delete</button>}

                            

                                </form>
                            </div>
                    </div>


                    </div>

            }

            {error && <ConnectionError />}

            
            <MobileNav/>

        </div> 
     );
}
 
export default Settings;