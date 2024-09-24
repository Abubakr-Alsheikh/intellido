import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import * as api from "../../services/api";
import gsap from "gsap";

const TaskSuggestionBox = ({ tasks, lastMesssage }) => {
  const [hiddenTasks, setHiddenTasks] = useState([]); // State to track hidden tasks

  const handleAcceptTask = async (taskIndex) => {
    try {
      const task = tasks[taskIndex];
      await api.createTask(task);
      console.log("Task created successfully!");
      setHiddenTasks([...hiddenTasks, taskIndex]); // Hide the accepted task
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCancelTask = (taskIndex) => {
    setHiddenTasks([...hiddenTasks, taskIndex]); // Hide the canceled task
  };

  const taskBoxRef = useRef(null);

  useEffect(() => {
    if (taskBoxRef.current && tasks.length > 0) {
      gsap.fromTo(
        taskBoxRef.current.children, // Target children of the Card
        { opacity: 0, y: 20 }, // Start hidden and slightly below
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1, // <-- This creates the one-by-one effect
          ease: "power1.out",
        }
      );
    }
  }, [tasks]); // Animate when tasks change


  return (
    <Card ref={taskBoxRef} elevation={3} sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        {tasks.map(
          (task, index) =>
            // Only render if the task is not hidden
            !hiddenTasks.includes(index) && (
              <Box key={index}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }} >
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    {task.title}
                  </Typography>
                  {lastMesssage && (
                    <>
                      <Tooltip title="Accept Task">
                        <IconButton
                          color="success"
                          onClick={() => handleAcceptTask(index)}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          color="error"
                          onClick={() => handleCancelTask(index)}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>
                {task.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {task.description}
                  </Typography>
                )}
                {index < tasks.length - 1 && <Divider />}
              </Box>
            )
        )}
      </CardContent>
    </Card>
  );
};

export default TaskSuggestionBox;
