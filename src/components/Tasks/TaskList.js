import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  toggleTaskCompletion,
} from "../../redux/slices/tasksSlice";
import {
  List,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Paper,
  Fab,
} from "@mui/material";
import AddTaskDialog from "./AddTaskDialog";
import AddIcon from "@mui/icons-material/Add";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Container
        maxWidth="md"
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
      <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 8,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            position: "relative",
          }}
        >
        <Grid item xs={12}>
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!isLoading && !error && (
            <>
              {tasks.length === 0 ? (
                <Typography
                  variant="body1"
                  align="center"
                  color="textSecondary"
                  sx={{ py: 3 }}
                >
                  No tasks yet. Add one to get started!
                </Typography>
              ) : (
                <List >
                  {" "}
                  {/* Attach ref to the List */}
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onToggleComplete={toggleTaskCompletion}
                    />
                  ))}
                </List>
              )}
            </>
          )}
        </Grid>
      </Paper>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenAddDialog}
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>

      {/* Add Task Dialog (button is removed) */}
      <AddTaskDialog
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Container>
  );
};

export default TaskList;
