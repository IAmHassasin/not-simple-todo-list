import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Paper,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import shadows from "@mui/material/styles/shadows";

type TaskStatus = "ToDo" | "InProgress" | "Done" | "Cancelled";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:3000/v1";
const API_BASE_URL = "/task";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [newTask, setNewTask] = useState<{
    title: string;
    status: TaskStatus;
  }>({
    title: "",
    status: "ToDo",
  });

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    setSelectedRows(selectionModel as number[]);
  };

  const handleOpen = () => setOpen(true); // Open modal
  const handleClose = () => setOpen(false); // Close modal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (newTask.title.trim()) {
      try {
        const response = await axios.post<Task>(API_ENDPOINT + API_BASE_URL, {
          title: newTask.title,
          status: newTask.status,
        });
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            ...response.data,
            createdAt: new Date(response.data.createdAt).toLocaleString(),
            updatedAt: new Date(response.data.updatedAt).toLocaleString(),
          },
        ]);
        setNewTask({ title: "", status: "ToDo" });
        handleClose(); // Close modal after adding task
      } catch (err: any) {
        setError("Failed to add task.");
        console.error("Error adding task:", err);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 130 },
    { field: "updatedAt", headerName: "Updated At", width: 130 },
    {
      field: "status",
      headerName: "Task status",
      width: 150,
      renderCell: (params) => {
        const statusColors = {
          ToDo: "default",
          InProgress: "info",
          Done: "success",
          Cancelled: "error",
        };
        const getAvatarIcon = (status: string) => {
          switch (status) {
            case "InProgress":
              return <DirectionsRunIcon />;
            case "Done":
              return <CheckBoxIcon />;
            case "Cancelled":
              return <DisabledByDefaultIcon />;
            default:
              return <CheckBoxOutlineBlankIcon />;
          }
        };
        return (
          <Chip
            label={params.value}
            color={
              statusColors[params.value as keyof typeof statusColors] as
                | "default"
                | "info"
                | "success"
                | "error"
            }
            variant="filled"
            deleteIcon={getAvatarIcon(params.value)}
            onDelete={() => {}}
            size="medium"
          />
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Task[]>(API_ENDPOINT + API_BASE_URL);
      const categorizedTasks = response.data.map((task) => ({
        ...task,
        status: task.status || "ToDo",
        createdAt: new Date(task.createdAt).toLocaleString(),
        updatedAt: new Date(task.updatedAt).toLocaleString(),
      }));
      setTasks(categorizedTasks);
    } catch (err: any) {
      setError("Failed to fetch tasks.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteTask = async (ids: number[]) => {
    for (const id of ids) {
      try {
        await axios.delete(`${API_ENDPOINT + API_BASE_URL}/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (err: any) {
        setError("Failed to delete task.");
        console.error("Error deleting task:", err);
      }
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Paper sx={{ height: 400, width: "100%", boxShadow: 'none' }}>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen} // Open modal
          sx={{ marginRight: 2 }}
        >
          Add Task
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleDeleteTask(selectedRows)}
          sx={{ marginRight: 2 }}
        >
          Delete Task
        </Button>
      </Grid>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          disableRowSelectionOnClick
        />
      </div>
      {/* Modal for adding a task */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            select
            fullWidth
            margin="normal"
          >
            <MenuItem value="ToDo">To Do</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TodoList;
