
import "./login.style.scss";
import {Link} from "react-router-dom";
import {  useState } from "react";
import displayMsg from "../../Message";


const LoginAdmin = () => {

    const [open, setOpen] = useState('password')

    const [formInput,setFormInput]  = useState({
      email:'',
      password:''
    })
    const [isPending,setIsPending] = useState(false)
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormInput({...formInput,email:'',password:''})

        setIsPending(true)

        var raw = {
          "email": formInput.email,
          "password": formInput.password 
        };

        var requestOptions = {
          method: 'POST',
          body: JSON.stringify(raw),
          redirect: 'follow'
        };

        fetch("https://wiwa.herokuapp.com/users/login", requestOptions)
          .then((res)=>{
            if (!res.ok) {
              // error coming back from server
              throw Error("something went wrong, check your netowrk");
            }
            return res.json()
          })
          .then((result) => {
            console.log(result)
            setIsPending(false);
            if (result.status === "Success") {

              displayMsg("success", result.message);
            
            } else {
             
              displayMsg("error", result.message);
            }
          })
          .catch((error )=>{ 
            setIsPending(false);
            console.log(error);
            displayMsg("error", error.message);
          });



    }
  
    const handleChange=(event)=>{
        const {value,name} = event.target

        setFormInput ({...formInput,[name]:value})

    }

    const handlePassword=(e)=>{
        e.target.classList.toggle("fa-eye-slash");
        e.target.classList.toggle("fa-eye");
        e.target.classList.contains("fa-eye-slash") ? setOpen("text"): setOpen("password");

    }

    console.log(isPending)

  return (
    <main className="container align-top">
      <form className="login-form" onSubmit={handleSubmit} >
        <div class="signup-text">
          <h3 className="logo">wiwa</h3>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="johndoe@gmail.com"
            name="email" 
            value={formInput.email}   
            onChange={(e)=>{handleChange(e)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <div className="pwd-wrap">
            <input
              type={open}
              id="pwd"
              required
              placeholder="Password"
              minlength="6"
              name="password"
              value={formInput.password}
              onChange={(e)=>{handleChange(e)}}
            />
            <i
            //   onClick={e => handlePasswordType(e)}

              onClick={(e)=>{handlePassword(e)}}
            
              className="fas fa-eye view-pwd"
            ></i>
          </div>
        </div>

        { isPending && <button type="submit" disabled className="btn"> Login ... </button>}
        { isPending===false && <button type="submit" className="btn"> Login </button>}
        <p className="bottom-text" id="forgetpwd">
          <Link to="/admin/forgotpwd"> Forgot Password?</Link>
        </p>

      
      </form>
    
     
    </main>
  );
};

export default LoginAdmin;
