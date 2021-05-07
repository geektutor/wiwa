const ErrorModal = () => {
    return ( 
        <div id="myModal3" className="modal">
            <div className="modal-content">
                <span  onclick="closeModal3()" className="close">&times;</span>
                
                <h3 className="errorh" style="text-align: center;color: red;margin-top: 20px;">Error</h3>
                <p className="errorm" style="text-align: center; margin-top: 20px;"></p>
                
                
            </div>
        </div>
     );
}
 
export default ErrorModal;