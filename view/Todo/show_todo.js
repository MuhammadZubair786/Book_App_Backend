const show_todo = () => {
    console.log("show todo")
    axios.post('http://localhost:5000/todo/getTodo')
        .then((res) => {
            console.log(res.data.data)
            var todo = res.data.data
            todo.map((v, i) => {
                // console.log("Data Number :",i,"Todo Data :",v)
                document.getElementById('todo_data').innerHTML += `
        <h1 >  <b style='color:orange;font-weight:bold;font-size:25px'>Todo Number : ${v.todo_number}
        <b style='color:blue;font-weight:bold;font-size:25px'>Todo Data : ${v.todo_data}</b>
        <button onclick='edit(this)' id=${v._id}>Edit</button>
        <button onclick='delete_todo(this)' id=${v._id}>Delete</button>
        </h1>
        <br><br>
        `
            })

        })
        .catch((err) => console.log(err));
}


const edit = (e) => {
    console.log(e.id)
    axios.post('http://localhost:5000/todo/getspecfic', { todo_number: e.id })
        .then((res) => {
            console.log(res.data.data.todo_data)
            var todo_data = res.data.data.todo_data
            var todo_id = res.data.data._id
            document.getElementById('btn_call').style.display = 'inline'
            document.getElementById('txt').style.display = 'inline'

            document.getElementById('txt').value = todo_data
            // console.log(todo_id)
            // var update_data = document.getElementById('txt').value
            // console.log(update_data)
            document.getElementById('txt').focus()

            var obj = {
                todo_data : todo_data,
                todo_id : todo_id,
                todo_number:res.data.data.todo_number
            }

            localStorage.setItem('select_mongo_data',JSON.stringify(obj))

        })
        .catch((err)=>{
            console.log(err)
        })
       

}


const save = ()=>{
    var data  = JSON.parse(localStorage.getItem('select_mongo_data'))
    console.log(data)
    var update_data = document.getElementById('txt').value
    console.log(update_data)
    if(update_data==''){
        alert("Plz Enter Value For Updation")
    }
    else{
          axios.post('http://localhost:5000/todo/updateSpecficTodo', { _id: data.todo_id,todo_data :  update_data })
                .then((res) => { 
                    console.log(res) 
                    alert(res.data.message)
                    document.getElementById('btn_call').style.display = 'none'
                    document.getElementById('txt').style.display = 'none'
                    window.location.reload()

                })
                .catch((err) => { console.log(err) })

    }


}


const delete_todo  = (e)=>{
    console.log(e.id)
    axios.post('http://localhost:5000/todo/getspecfic', { todo_number: e.id })
    .then((res) => {
        console.log(res.data.data.todo_data)
        axios.post('http://localhost:5000/todo/deleteSpecficTodo',{_id:e.id})
        .then((response)=>{
            
            console.log(response)
            alert(response.data.message)
            window.location.reload()}
        )
        .catch((err)=>{console.log(err)})



    
    
    })
    .catch((err)=>{
        console.log(err)
    })

}

