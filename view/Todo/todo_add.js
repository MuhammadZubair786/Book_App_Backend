const add_todo =()=>{
    var numb = document.getElementById('todo_numb').value
    var data = document.getElementById('todo_data').value
    console.log(numb,data)
    axios.post('http://localhost:5000/todo/addTodo', {todo_number:numb,todo_data:data})
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

}