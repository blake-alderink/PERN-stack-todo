
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [formData, setFormData] = useState('hello');
  const [responseData, setResponseData] = useState('waiting for response');
  const [todos, setTodos] = useState([]);

  //value of the input is equal to the formData value, and on change of the value, onChangeHandler is run which sets the value to whatever is inisde the input?

const deleteTodo = async (id) => {
axios.delete(`http://localhost:8000/todos/${id}`)
.then(res=>{
  console.log(res)
  getTodos()})
.catch(err=>console.log(err));
}

const getTodos = async () => {
  axios.get('http://localhost:8000/todos').then(res => {
    setTodos(res.data)
    console.log(res)
  }).catch(err => {
    console.log(err);
  });
}


const onSubmitHandler = async (e) => {
  e.preventDefault();
  axios.post('http://localhost:8000/todos', {
    description: formData
  }).then(res => {
setResponseData('response sent and received!')
console.log(res.data)
getTodos();
  }).catch(err => {
    console.log(err);
  })
}

const onChangeHandler = (e) => {
  e.preventDefault();
  setFormData(e.target.value);
  console.log(formData);
}

useEffect(() => {
getTodos();
}, [])



  return (
    <div>
     <form onSubmit={onSubmitHandler}>
      <input onChange={onChangeHandler} value={formData}/>
      
     <button>Submit</button>
     </form>
     <h1>
      {responseData}
     </h1>
     <div>
      {todos.map(todo => {
       return (<div><h3>{todo.description}</h3><button onClick={() => deleteTodo(todo.todo_id)}>Delete</button></div>)
      })}
     </div>
     <h4>this is bottom</h4>
    </div>
  );
}

export default App;
