const AdminBtn = ({isAdmin,handleAdmin,handleUnadmin}) => {

    let handler;
    let text;

    if (isAdmin) {
        handler = handleUnadmin
        text = 'Unadmin'
        
    }
    else{
        handler= handleAdmin
        text = 'Make Admin'
        
    }


    return ( 
        <button className="delete" onClick={handler} id="myBtn2">{text}</button>
     );
}
 
export default AdminBtn;