import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFetchAdmin from '../../../hooks/useFetchAdmin';
import ConnectionError from '../../errors/connectionError';
import Loader from '../../Loader';
import displayMsg from '../../Message';
import Navbar from '../../nav/Navbar'
import MobileNav from '../mobileNav/mobileNav.component';
import SideBar from '../sideBar/sideBar.component';
import './user-list.style.scss'

const UserList = () => {

  const [url] = useState("https://wiwa.herokuapp.com/admin/users");
  let {data,error,isPending} = useFetchAdmin(url);
  const [isSearch,setIsSearch]= useState(false)
  const[data2,setData2] = useState(null);
  const [search,setSearch] = useState('')
  const history = useHistory()

 
  const retrieveToken = () => {
    const token = window.localStorage.getItem("token");
  
    if (!token) {
      history.push("/login");
    } else {
      return token;
    }
  }


  const handleSubmit = (e)=>{
    e.preventDefault()
      setIsSearch(true)
      const searchUrl = `https://wiwa.herokuapp.com/users/search/${search}`;
      
      fetch(searchUrl)
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
      .then((response)=>{
        setIsSearch(false)
    
          if (response.data.length===0) {
            displayMsg("error","No match found")
            setData2(data)
          }
          else{
            setData2(response.data)  
          }

        
       
      })


      
  }

  useEffect(()=>{
    if (data) {
      setData2(data)
    }
  },[data])

  

    return ( 
        <div className="overall">
          <Loader close={!isPending}/>
          <Loader close={!isSearch}/>
          <Navbar />

          <SideBar active={'list'}/>

         
          {data2 && 
             <div className="coverSection">

<div className="heading">
    <p className="text"> <span className="nama"></span>User List</p>
    <form onSubmit={handleSubmit} className="searchUser">
          <input required onChange={(e)=>{setSearch(e.target.value)}}  type="text" name="name" placeholder="Search Name"/>
          <button type="submit"><i className="fas fa-search"></i></button>
      </form>
</div>
<div className="cover">
    <div className="overFlow" >
          <table>
            <thead>

                  <tr>

                      <th>S/N</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Action</th>            
                  </tr>

            </thead>

            <tbody>
              { data2.map((eachData)=>{
                  return(

                    <tr key={eachData.id}>
                      <td className="first">{data2.indexOf(eachData) + 1}</td>       
                      <td >{eachData.name}</td>
                      <td>{eachData.username}</td>
                      <td>{eachData.email}</td>
                      <td className="last"><Link to={`/admin/userprofile/${eachData.username}`}><button>View User</button></Link></td>
                    </tr>

                  )})
              }

             

              

             
            </tbody>
          
            
          </table>
          

      </div>

   

    </div>

</div>
         
         }


          {error && <ConnectionError msg={error}/>}


          
          <MobileNav/>


            
        </div>
     );
}
 
export default UserList
