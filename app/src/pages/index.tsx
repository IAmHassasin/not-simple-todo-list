import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    status: 'To Do' | 'In Progress' | 'Done';
    // Add other relevant properties if your backend provides them
}

const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3000/v1';
const API_BASE_URL = '/task';

const KanbanTodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Check!', API_ENDPOINT + API_BASE_URL);
            const response = await axios.get<Task[]>(API_ENDPOINT + API_BASE_URL);
            // Assuming your backend returns all tasks and you need to categorize them
            const categorizedTasks = response.data.map(task => ({
                ...task,
                status: task.status || 'To Do', // Default status if not provided
            }));
            setTasks(categorizedTasks);
        } catch (err: any) {
            setError('Failed to fetch tasks.');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAddTask = async (status: 'To Do' | 'In Progress' | 'Done') => {
        if (newTaskTitle.trim()) {
            try {
                const response = await axios.post<Task>(API_BASE_URL, { title: newTaskTitle });
                setTasks(prevTasks => [...prevTasks, { ...response.data, status }]);
                setNewTaskTitle('');
            } catch (err: any) {
                setError('Failed to add task.');
                console.error('Error adding task:', err);
            }
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (err: any) {
            setError('Failed to delete task.');
            console.error('Error deleting task:', err);
        }
    };

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const taskId = parseInt(draggableId);
        const newStatus = destination.droppableId as 'To Do' | 'In Progress' | 'Done';

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );

        // In a real application, you would likely want to send an API request here
        // to update the task's status on the backend.
        console.log(`Task ${taskId} moved from ${source.droppableId} to ${destination.droppableId}`);
    };

    const getTasksByStatus = (status: string | 'To Do' | 'In Progress' | 'Done') => {
        return tasks.filter(task => task.status === status);
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={styles.container}>
                {['To Do', 'In Progress', 'Done'].map(status => (
                    <div key={status} style={styles.column}>
                        <div style={styles.columnHeader}>
                            <h2 style={styles.columnTitle}>{status}</h2>
                            {status === 'To Do' && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="New task title"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && newTaskTitle.trim()) {
                                                handleAddTask(status);
                                            }
                                        }}
                                        style={styles.newTaskInput}
                                    />
                                    <button onClick={() => handleAddTask(status)} style={styles.addTaskBtn}>
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        <Droppable droppableId={status}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={styles.taskList}
                                >
                                    {getTasksByStatus(status).map((task, index) => (
                                        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={provided.draggableProps.style}
                                                    className="task-card" // Add a class for potential global styling
                                                    // style={styles.taskCard}
                                                >
                                                    <div style={styles.taskTitle}>{task.title}</div>
                                                    <div style={styles.taskActions}>
                                                        {/* You might want an edit button here in a real app */}
                                                        <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteBtn}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '20px',
        padding: '20px',
        overflowX: 'auto',
    } as React.CSSProperties,
    column: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        width: '300px',
        minWidth: '300px',
    } as React.CSSProperties,
    columnHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        paddingBottom: '8px',
        borderBottom: '1px solid #eee',
    } as React.CSSProperties,
    columnTitle: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '1.2em',
    } as React.CSSProperties,
    taskList: {
        minHeight: '50px',
    } as React.CSSProperties,
    taskCard: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'grab',
    } as React.CSSProperties,
    taskTitle: {
        fontSize: '1em',
        color: '#555',
        marginBottom: '5px',
    } as React.CSSProperties,
    taskActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    } as React.CSSProperties,
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: '#dc3545',
        cursor: 'pointer',
        fontSize: '0.8em',
        marginLeft: '10px',
    } as React.CSSProperties,
    addTaskBtn: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '0.9em',
        marginLeft: '10px',
    } as React.CSSProperties,
    newTaskInput: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '0.9em',
    } as React.CSSProperties,
};

export default KanbanTodoList;