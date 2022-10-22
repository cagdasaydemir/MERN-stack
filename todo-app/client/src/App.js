import "./App.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import List from "./components/List";
import MyContainer from "./components/MyContainer";
import TodoForm from "./components/TodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = () =>{
    fetch("http://localhost:8000/todo").then(res =>{
      return res.json();
    }).then((data)=>{
      setTodoList(data);
    }).catch((err) =>{
      console.log(err);
    });
  };
  
  useEffect(()=>{
    getTodoList();
  },[])

  return (
    <Container className="pt-5">
      <h3 className="text-center">Todo List</h3>
      <hr/>
      <MyContainer>
        <TodoForm placeholder="Lütfen bir iş giriniz" getTodoList={getTodoList}/>
      </MyContainer>
      <MyContainer>
        <List todoList={todoList} getTodoList={getTodoList}/>
      </MyContainer>
    </Container>
  );
}

export default App;
