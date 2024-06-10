import { createContext, useContext } from "react";

export interface TodoProps {
    id: number,
    todo: string,
    completed: boolean,
}

interface TodoContextProps {
    todos: TodoProps[],
    addTodo: (todo: TodoProps) => void,
    updateTodo: (id: number, todo: TodoProps) => void,
    deleteTodo: (id: number) => void,
    toggleTodo: (id: number) => void,
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const useTodo = () => {
    const todoContext = useContext(TodoContext);
    if (!todoContext)
        throw new Error("useTodo must be used within a TodoProvider");

    return todoContext;
}

export const TodoProvider = TodoContext.Provider;