import React, { useState, useRef } from 'react'
import {
  Button, Checkbox, TextField, Grid2, List, ListItem, ListItemText, IconButton, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack,
  AppBar,
  Toolbar,
  Typography,
  Grow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Box, 
  Collapse,
  FormControlLabel,
  Fade,
  Zoom
} from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete';
import { v4 } from 'uuid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TransitionGroup } from 'react-transition-group';
import ConfirmDialog from './TasksComponents/Dialog';
import TaskItem from './TasksComponents/ListItem';
import TaskInput from './TasksComponents/TaskInput';



function TaskList() {
  interface Task {
    id: string;
    text: string;
    checked: boolean;
  }  

  const [task, setTask] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [input, setInput] = useState('')
  const inputElement = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [toDelete, setToDelete] = useState<Task>({ id: '', text: '', checked: false });

  function handleClick() {
    if (input.trim() !== '') {

      const updatedTask =
        [...task,
        {
          id: v4(),
          text: input,
          checked: false
        }]
      setTask(updatedTask)
      localStorage.setItem('tasks', JSON.stringify(updatedTask))
      setInput('');
      console.log(task[1])
      inputElement.current?.focus()
    }
  }

  const handleDelete = (toDelete: any) => {
    const updatedTask = task.filter((item) => item.id !== toDelete.id);
    setTask(updatedTask);
    localStorage.setItem('tasks', JSON.stringify(updatedTask));
    setOpen(false)
    inputElement.current?.focus()
  }

  // const handleEnter = (event: React.KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleClick();
  //   }
  // }


  const handleOpenDialog = (item: any) => {
    setToDelete(item);
    setOpen(true);
  };

  const handleToggle = (toChange: any) => {
    const updatedTask = task.map((item) =>
      item.id === toChange ?
        { ...item, checked: !item.checked }
        : item
    );
    setTask(updatedTask)
    localStorage.setItem('tasks', JSON.stringify(updatedTask))
  }

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDone(event.target.checked);
  };

  return (
    <>
      <Box component="main" sx={{
        placeItems: 'center',
      }}>
        <>
          <Stack flex='0' width={{ md: '600px', sm: '500px', xs: '90vw' }} paddingTop={{md: '64px', sm: '64px', xs: '60px'}} sx={{
            justifyContent: "center",
          }}>
            <FormControlLabel sx={{color: '#444', fontSize: '1.5rem', padding: 'none'}} control={<Switch size='small' checked={done} onChange={handleSwitch}/>} label={done ? 'exibindo concluídas' : 'ocultando concluidas'}/>
            {done ?
              <List sx={{ bgcolor: 'background', flexWrap: 'wrap', }}>
                <TransitionGroup>
                {task.map((item) => (
                  <Collapse>
                  <TaskItem
                    key={item.id}
                    task={item}
                    onToggle={handleToggle}
                    onDelete={handleOpenDialog}
                    inside={false}
                  />
                  </Collapse>
                ))}
                </TransitionGroup>
              </List>

              :
              <>
              <List sx={{ bgcolor: 'background', flexWrap: 'wrap', }}>
              <TransitionGroup>
              {task.filter(item => { return (item.checked == false)})
               .map((item) => (
                <Collapse>
                <TaskItem
                    key={item.id}
                    task={item}
                    onToggle={handleToggle}
                    onDelete={handleOpenDialog}
                    inside={false}
                  />
                </Collapse>
              ))}
              </TransitionGroup>
              </List>
              {
              task.some(item => item.checked == true) &&
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
              <Typography>Tarefas concluídas</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <TransitionGroup>
              {task.filter(item => { return (item.checked == true)})
               .map((item) => (
                <Collapse>
                  <TaskItem
                    key={item.id}
                    task={item}
                    onToggle={handleToggle}
                    onDelete={handleOpenDialog}
                    inside={true}
                  />
                </Collapse>
              ))}
              </TransitionGroup>
              </AccordionDetails>
            </Accordion>
            }
            </>
            }
          </Stack>
          <TaskInput
            input={input}
            onInputChange={setInput}
            onAddTask={handleClick}
          />
        </>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => handleDelete(toDelete)}
          text={toDelete.text}
        />
      </Box> 
    </>
  )
}

export default TaskList