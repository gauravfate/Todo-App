import { useEffect, useState } from "react"
import { TodoProps, TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";


function App() {
    const [todos, setTodo] = useState<TodoProps[]>([]);

    const addTodo = (todo: TodoProps) => {
        setTodo([...todos, todo])
    }

    const updateTodo = (id: number, updatedTodo: TodoProps) => {
        setTodo(todos.map(todo => todo.id === id ? updatedTodo : todo))
    }

    const deleteTodo = (id: number) => {
        setTodo(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodo(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }

    useEffect(()=>{
        const storedItems = localStorage.getItem('todos');
        if(storedItems){
            const parsedTodos:TodoProps[] = JSON.parse(storedItems);
            if (parsedTodos && parsedTodos.length > 0) {
                setTodo(parsedTodos);
            }
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('todos' ,JSON.stringify(todos))
    },[todos])

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id}
                                className='w-full'
                            >
                                <TodoItem todo={todo} />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    )
}

export default App
