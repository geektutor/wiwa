import { useState } from 'react';
import Navbar from '../../nav/Navbar';
import MobileNav from '../mobileNav/mobileNav.component';
import SideBar from '../sideBar/sideBar.component';
import './settings.style.scss'

const Settings = () => {

    const[openForm,setOpenForm] = useState(false)
    const[openAffirm,setOpenAffirm]= useState(false)

     const handleOpen=()=>{       
         setOpenForm(!openForm)
     }

     const handleAffirm=(id)=>{
         console.log(id)
        setOpenAffirm(!openAffirm)
    }


    return ( 
        <div className="overall">
            <Navbar/>
            <SideBar active={'set'}/>

            <div className="coverSection">

                <div className="heading">
                    <p className="text usersname">Settings</p>
                    
                </div>

                <section className="second">
                    
                    <div className="secondBlock">

                    <div className="question">
                            <p className="title">Question</p>
                            <p className="text">
                                Who is the leader of your group in Christian Church Of God Mission
                            </p>
                            
                                <button className="edit" onClick={handleOpen} >Edit</button>
                            
                        </div>

                        
                        <div className="answers">
                            <p className="title">Answers</p>

                            <div className="ans-box">
                                <div className="ans"> <span>Tope</span>  <i onClick={()=>{handleAffirm('123')}} className="fas fa-times"></i> </div>
                                <div className="ans"> <span>Sodiq</span> <i onClick={()=>{handleAffirm('1235')}} className="fas fa-times"></i> </div>
                                <div className="ans"> <span>Musty</span> <i onClick={()=>{handleAffirm('12356')}} className="fas fa-times"></i> </div>
                                <div className="ans"> <span>Ade</span> <i className="fas fa-times"></i> </div>
                                <div className="ans"> <span>Muqit</span> <i className="fas fa-times"></i> </div>
                                <div className="ans"> <span>Kanipee</span> <i className="fas fa-times"></i> </div>
                                
                            </div>

                            <form action="" className="addAnswer">
                                <input type="text" name="name" placeholder="Add Answer"/>
                                <button type="submit"><i className="fas fa-search"></i></button>
                            </form>


                        

                        </div>

                    
                    </div>

                


                </section>


                <div className={`${openForm?'open':'closed'} modal`} onClick={handleOpen} >
                        <div className="modal-content">
                            <span  onClick={handleOpen }className="close">&times;</span>
                        
                            <h3>Edit Question</h3>
                            
                            <form action="">
                            
            
                            <div className="group">
                                <label >Question</label>
                                <input type="text"  /> 
                            
                            </div>
                            <button type="submit">Edit</button>
            
                        
            
                            </form>
                        </div>
                </div>
                
                <div className={`${openAffirm?'open':'closed'} modal`} onClick={handleAffirm } >
                        <div className="modal-content">
                            <span  onClick={handleAffirm }className="close">&times;</span>
                        
                            <h3>Warning</h3>
                            
                            <form action="">
                            
            
                            <p>Are you sure you want to delete this answer?</p>
                            <button >Delete</button>
            
                        
            
                            </form>
                        </div>
                </div>
                

            </div>
        
            <MobileNav/>

        </div> 
     );
}
 
export default Settings;