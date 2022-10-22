import React from "react";
import { Button, Form } from "react-bootstrap";

const TodoForm = ({placeholder, getTodoList}) => {
  const addTodoItem = () => {
    const titleInput = document.querySelector("#titleInput");
    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInput.value,
      }),
    })
      .then((res) => {
        getTodoList();
        titleInput.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form.Group
      className="mb-3 d-flex justify-content-between"
      controlId="formBasicEmail"
    >
      <Form.Control
        id="titleInput"
        type="text"
        placeholder={placeholder}
      />
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          addTodoItem();
        }}
      >
        +
      </Button>
    </Form.Group>
  );
};

export default TodoForm;
