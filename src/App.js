import "./App.css";
import TodoItem from "./components/TodoItem";
import { useState } from "react";


function App() {
  const [items, setitems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (title && description) {
      const todoItem = {
        id: items.length,
        title,
        description,
        state: "todo",
      };
      setitems([...items, todoItem]);
      setTitle("");
      setDescription("");
    }
  };

  const style = {
    todo: "todo",
    active: "active",
    complete: "complete",
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const dropToActive = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("item");
    const tempTodo = items.filter((item) => item.id != data);
    let newItem = items.filter((item) => item.id == data)[0];
    newItem.state = "active";
    setitems([...tempTodo, newItem]);
  };

  const dropToTodo = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("item");
    const tempTodo = items.filter((item) => item.id != data);
    let newItem = items.filter((item) => item.id == data)[0];
    newItem.state = "todo";
    setitems([...tempTodo, newItem]);
  };

  const dropToComplete = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("item");
    const tempTodo = items.filter((item) => item.id != data);
    let newItem = items.filter((item) => item.id == data)[0];
    newItem.state = "complete";
    setitems([...tempTodo, newItem]);
  };

  return (
    <div className="App">
      <div className="top">
        <input
          type="text"
          placeholder="Title"
          className="form__field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="form__field desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleClick} className="add" >
          ADD TODO
        </button>
        <div className='info'>
        <h4>Todo: {items.filter((item) => item.state === "todo").length}</h4>
        <h4>
          Active: {items.filter((item) => item.state === "active").length}
        </h4>
        <h4>
          Completed: {items.filter((item) => item.state === "complete").length}
        </h4>
        </div>
      </div>
      <div className="bottom">
        <div className="left" onDragOver={allowDrop} onDrop={dropToTodo}>
          <p className='title'>TO DO</p>
          {items
            .filter((item) => item.state === "todo")
            .map(({ id, title, description }) => (
              <TodoItem
                key={id}
                id={id}
                title={title}
                description={description}
                style={style.todo}
              />
            ))}
        </div>
        <div className="middle" onDragOver={allowDrop} onDrop={dropToActive}>
          <p className='title'>ACTIVE</p>
          {items
            .filter((item) => item.state === "active")
            .map(({ id, title, description, state }) => (
              <TodoItem
                key={id}
                id={id}
                title={title}
                description={description}
                style={style.active}
              />
            ))}
        </div>
        <div className="right" onDragOver={allowDrop} onDrop={dropToComplete}>
          <p className='title'>COMPLETED</p>
          {items
            .filter((item) => item.state === "complete")
            .map(({ id, title, description, state }) => (
              <TodoItem
                key={id}
                id={id}
                title={title}
                description={description}
                style={style.complete}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
