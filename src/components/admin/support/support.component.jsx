import './support.style.scss'

const Support = () => {
    return ( 
        <div className="support">
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>            
                                </tr>
            
                        </thead>
            
                        <tbody>

                            <tr>
                                <td className="first" >1</td>       
                                <td >Ade</td>
                                <td>rajimustapha30@gmail.com</td>
                                <td className="last"><a href=""><button>View Message</button></a></td>
                            </tr>

                            <tr>
                                <td className="first" >2</td>
                                <td >Ade</td>
                                <td>rajimustapha30@gmail.com</td>
                                <td className="last"><a href=""><button>View Message</button></a></td>
                        
                            </tr>

                            <tr>
                                <td className="first" >3</td>
                                <td>Ade</td>
                                <td>rajimustapha30@gmail.com</td>
                                <td className="last"><a href=""><button>View Message</button></a></td>
                            </tr>
            
            
                        </tbody>
                        
                        
                        </table>
                        

                    </div>

                    <div className="page">
                        <p>Select Page:</p>
                        <select className="selector" name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>


          </div>
        </div>
     );
}
 
export default Support;