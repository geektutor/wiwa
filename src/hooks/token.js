
const retrieveToken =()=>{
    const token = window.localStorage.getItem("token")
    // const history = useHistory();

    if (!token) {
        history.push('/login')
      }
      else{
        return(token)
      }
}

export default retrieveToken;