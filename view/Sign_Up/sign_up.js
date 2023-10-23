const signup = ()=>{
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email, password)
    axios.post('http://localhost:5000/auth/signup', {email:email,password:password})
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
}