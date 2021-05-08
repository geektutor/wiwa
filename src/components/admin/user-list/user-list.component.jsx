import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const {data,error,isPending} = useFetchAdmin(url);
  
  const [search,setSearch] = useState('')
  // const [state,setState] = useState(null)
  // {data ? setState(data) : setState(null)}
  console.log(data)


  const handleSubmit = (e)=>{
    e.preventDefault()
      console.log(search)
      const filtered = data.filter((item)=>{
        return( item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.username.toLowerCase().includes(search.toLowerCase()) )
      })
    
      if (filtered.length !== 0) {
        console.log(filtered)
      
      }
      else{
        console.log('Empty')
        displayMsg("error", "User doesn't exist");
      }
  }

  

    return ( 
        <div className="overall">
          <Loader close={!isPending}/>
          <Navbar />

          <SideBar active={'list'}/>

          {data && 
             <div className="coverSection">

<div className="heading">
    <p className="text"> <span className="nama"></span>User List</p>
    <form onSubmit={handleSubmit} className="searchUser">
          <input onChange={(e)=>{setSearch(e.target.value)}}  type="text" name="name" placeholder="Search Name"/>
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
              { data.map((eachData)=>{
                  return(

                    <tr key={eachData.id}>
                      <td className="first">{data.indexOf(eachData) + 1}</td>       
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

          {error && <ConnectionError />}


          
          <MobileNav/>


            
        </div>
     );
}
 
export default UserList
