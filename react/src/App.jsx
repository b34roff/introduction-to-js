import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Charger les todos du localStorage au montage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos([
        { text: "Cliquez sur un todo pour le supprimer", checked: false },
      ]);
    }
  }, []);

  // Sauvegarder dans localStorage quand todos change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  // Gérer l'ajout d'un nouveau todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.length >= 2) {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo("");
    }
  };

  // Gérer le clic sur un todo
  const handleTodoClick = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].checked) {
      newTodos.splice(index, 1);
    } else {
      newTodos[index].checked = true;
    }
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>To Do des ESGI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="À faire"
          autoComplete="off"
          minLength={2}
        />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => handleTodoClick(index)}
            className={todo.checked ? "checked" : ""}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
