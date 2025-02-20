import { TodoItem } from "@/app/Type/homepageType";
import { useEffect, useState } from "react";

const useHomeIndex = () => {
  //local state
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  //function
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  //useEffect local storagee
  useEffect(() => {
    // ดึง
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      //
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    // เก็บ
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return {
    newTodo,
    todos,
    setNewTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEdit,
    toggleTodo,
  };
};

export default useHomeIndex;
