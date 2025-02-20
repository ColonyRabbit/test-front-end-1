"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

// define todo item interface
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const HomeIndex = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

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
  //useEffect
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
  return (
    <div>
      <h1>Todolist</h1>
      <div className="flex">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
          value={newTodo}
          placeholder="เพิ่ม todo"
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <Button onClick={handleAddTodo} className="bg-blue-600 text-white">
          เพิ่ม
        </Button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <div className="flex justify-between items-center" key={todo.id}>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />

              <p className={todo.completed ? "text-red-600 line-through" : ""}>
                {index + 1}. {todo.title}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="min-w-6 bg-blue-600"
                onClick={() => handleEdit(todo.id)}
              >
                แก้ไข
              </Button>
              <Button
                className="min-w-6 bg-red-600"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ลบ
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeIndex;
