import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";

const List = ({ todoList, getTodoList }) => {
  const completeTask = (taskId) => {
    fetch("http://localhost:8000/todo/" + taskId, {
      method: "PATCH",
    })
      .then((res) => {
        getTodoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTask = (taskId) => {
    fetch("http://localhost:8000/todo/" + taskId, {
      method: "DELETE",
    })
      .then((res) => {
        getTodoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ListGroup defaultActiveKey="#link1">
      {todoList?.map((todo) => {
        return (
          <ListGroup.Item className="d-flex" active={todo.isCompleted}>
            <Form.Check
              className="me-3"
              checked={todo.isCompleted}
              type="checkbox"
              id={`default`}
              onChange={() => {
                completeTask(todo._id);
              }}
            />
            {todo.title}
            <Button
              className="ms-auto"
              variant="danger"
              size="sm"
              onClick={() => {
                deleteTask(todo._id);
              }}
            >
              Sil
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default List;
