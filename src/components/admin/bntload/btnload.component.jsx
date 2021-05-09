const BtnLoad = ({className},color) => {
    return ( 
        <button className={className} style={{display:"flex",alignItems:"center",justifyContent:"center",color:{color}}} > <i className="fas fa-circle-notch fa-spin " style={{color:"white",marginRight:"3px"}} ></i> Loading </button>
     );
}
 
export default BtnLoad;