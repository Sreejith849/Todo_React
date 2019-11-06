import React, { useState, useEffect } from "react";
import TodoItems from "./todoItems";
import "./todo.css";
import axios from "axios";

function TodoList() {
  const [item, setItem] = useState([]);
  const [error, setError] = useState(false);
  let _inputElement = React.createRef();

  useEffect(() => {
    setError(false);
    try {
      fetch("http://localhost:8010/todo/", {
        method: "get",
        header: new Headers({
          "Content-Type": "application/json",
          Accept: "application"
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setItem(data.todoList);
        });
    } catch (error) {
      setError(true);
    }
  }, []);

  const addItem = async e => {
    if (_inputElement.value !== "") {
      var newItem = {
        name: _inputElement.value,
        _id: Date.now()
      };
    }
    _inputElement.value = "";
    e.preventDefault();

    setError(false);
    try {
      const response = await axios.post("http://localhost:8010/newtodo/", {
        name: newItem.name
      });
      console.log(response);
      setItem([...item, newItem]);
    } catch (error) {
      setError(true);
    }
  };

  const deleteItem = _id => {
    setError(false);
    try {
      fetch("http://localhost:8010/remove", {
        method: "post",
        header: new Headers({
          "Content-Type": "application/json",
          Accept: "application"
        }),
        body: _id
      });
      setItem(item.filter(item => item._id !== _id));
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="todoListMain">
      <div className="header">
        <form onSubmit={addItem}>
          <input
            ref={a => (_inputElement = a)}
            placeholder="Add me to the list"
          ></input>
          <button type="submit">Put On</button>
          {error && (
            <div className="error">
              oh no! It looks like the Demogorgan took this page to the Upside
              Down. Try again &#128523
            </div>
          )}
        </form>
      </div>
      <TodoItems entries={item} delete={deleteItem} />
    </div>
  );
}

export default TodoList;
