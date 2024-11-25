import React, { useState, useRef, useEffect } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 } from 'uuid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TransitionGroup } from 'react-transition-group';



function TaskList() {
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [input, setInput] = useState('')
  const inputElement = useRef()
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [toDelete, setToDelete] = useState({ id: null, text: null, checked: null });

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
      inputElement.current.focus()
    }
  }

  const handleDelete = (toDelete: any) => {
    const updatedTask = task.filter((item) => item.id !== toDelete.id);
    setTask(updatedTask);
    localStorage.setItem('tasks', JSON.stringify(updatedTask));
    setOpen(false)
    inputElement.current.focus()
  }

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  }


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
                  <ListItem
                    sx={{ border: '#3f50b5 1px', borderRadius: '4px', marginBottom: '2px' }}
                    key={item.id}
                    secondaryAction={
                      <IconButton disabled={item.checked ? true : false} edge="end" aria-label="delete" onClick={() => handleOpenDialog(item)}>
                        <DeleteIcon sx={{ color: item.checked ? 'grey' : '#3f50b5' }} />
                      </IconButton>
                    }
                  >

                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                    />
                    <ListItemText sx={{ color: item.checked ? 'grey' : 'black', wordBreak: 'break-word' }} id={item.id} primary={item.text} />
                  </ListItem>
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
                <ListItem
                  sx={{ border: '#3f50b5 1px', borderRadius: '4px', marginBottom: '2px' }}
                  key={item.id}
                  secondaryAction={
                    <IconButton disabled={item.checked ? true : false} edge="end" aria-label="delete" onClick={() => handleOpenDialog(item)}>
                      <DeleteIcon sx={{ color: item.checked ? 'grey' : '#3f50b5' }} />
                    </IconButton>
                  }
                >

                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    onChange={() => handleToggle(item.id)}
                  />
                  <ListItemText sx={{ color: item.checked ? 'grey' : 'black', wordBreak: 'break-word' }} id={item.id} primary={item.text} />
                </ListItem>
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
                <ListItem
                  sx={{ border: '#3f50b5 1px', borderRadius: '4px', marginBottom: '2px' }}
                  key={item.id}
                >

                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    onChange={() => handleToggle(item.id)}
                  />
                  <ListItemText sx={{ color: item.checked ? 'grey' : 'black', wordBreak: 'break-word' }} id={item.id} primary={item.text} />
                </ListItem>
                </Collapse>
              ))}
              </TransitionGroup>
              </AccordionDetails>
            </Accordion>
            }
            </>
            }
          </Stack>
          <Box alignSelf='flex-end' margin={{ xs: '10px', sm: '20px' }} width={{ md: '500px', sm: '400px', xs: '80vw' }}
            sx={{
              justifyContent: "center",
            }}>
            <TextField fullWidth label="Escreva a tarefa aqui" variant="outlined" inputRef={inputElement} value={input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
              }} onKeyDown={handleEnter}
            />
            <Button fullWidth variant="contained" color='success' onClick={handleClick} sx={{ marginTop: '10px' }}>
              Criar tarefa
            </Button>
          </Box>
        </>
        <>
          <Dialog
            TransitionComponent={Grow} // Adicionando a transição
            transitionDuration={{ enter: 300, exit: 200 }} // Tempo da transição
            open={open}
            onClose={() => setOpen(false)}
            color='success'
            sx={{ borderRadius: '4px', }}
          >
            <DialogTitle id={toDelete.id}>
              {"Deletar a seguinte tarefa?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ wordBreak: 'break-word' }} id={toDelete.id}>
                {toDelete.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Não</Button>
              <Button onClick={() => handleDelete(toDelete)} color='error' >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </Box> 
    </>
  )
}

export default TaskList