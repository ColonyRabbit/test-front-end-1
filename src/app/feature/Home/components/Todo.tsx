"use client";
import React from "react";
import useHomeIndex from "../hooks/useHomeIndex";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const Todo = () => {
  // hooks
  const {
    newTodo,
    todos,
    setNewTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEdit,
    toggleTodo,
  } = useHomeIndex();

  return (
    <div>
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
