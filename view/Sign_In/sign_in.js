function signin() {
    // alert("ok")
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email, password)
    axios.post('http://localhost:5000/auth/signin', { email: email, password: password })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

    // var obj= {
    //    method : "POST",
    //    headers:{"Access-Control-Allow-Origin": '*' ,
    //    "Content-Type" : "application/json",},
    //    data:{email:email,password:password},
    //    url:'http://localhost:500/auth/signin'
    // }


    //     axios(obj)
    // .then((success)=>{
    //     console.log(success)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

}
