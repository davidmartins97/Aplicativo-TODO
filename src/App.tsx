import React, { useState, useRef } from 'react'
import { Button, Checkbox, TextField, Grid2, List, ListItem, ListItemText, IconButton, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 } from 'uuid'

function App() {
  const valorInicial = []
  const [task, setTask] = useState(valorInicial)
  const [input, setInput] = useState('')
  const inputElement = useRef()
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState({ id: null, text: null, checked: null });



  function handleClick() {
    input && task.text !== '' && setTask(
      [...task,
      {
        id: v4(),
        text: input,
        checked: false
      }
      ]
    );
    setInput('');
    console.log(task)
    inputElement.current.focus()
  }

  const handleDelete = (toDelete: any) => {
    const updatedTask = task.filter((item) => item.id !== toDelete.id);
    setTask(updatedTask);
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
    setTask((task) => task.map((item) =>
      item.id === toChange ?
        { ...item, checked: !item.checked }
        : item
    )
    );
  }
  const handleCheck = () => {
    
  }



  return (
    <>
      <div>
        <Stack flex='1' sx={{
          width: '100%',
          justifyContent: "center",
        }}>
          
          <List sx={{  bgcolor: 'background', flexWrap: 'wrap'}}>
            {task.map((item) => (
              <ListItem
                sx={{border: '#3f50b5 1px', borderRadius: '4px', marginBottom: '2px' }}
                key={item.id}
                secondaryAction={
                  <IconButton disabled={item.checked ? true : false} edge="end" aria-label="delete" onClick={() => handleOpenDialog(item)}>
                    <DeleteIcon sx={{color: item.checked ? 'grey' : '#3f50b5'}}/>
                  </IconButton>
                }
              >

                <Checkbox
                  edge="start"
                  checked={item.checked}
                  onChange={() => handleToggle(item.id)}
                />
                <ListItemText sx={{color: item.checked ? 'grey' : 'black'}} id={item.id} primary={item.text} />
              </ListItem>
            ))}
          </List>
          </Stack>
          <Stack alignItems='flex-end' margin='20px'>
          <TextField fullWidth label="Escreva a tarefa aqui" variant="outlined" inputRef={inputElement} value={input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInput(event.target.value);
            }} onKeyDown={handleEnter}
          />
          <Button fullWidth variant="contained" color='success' onClick={handleClick} sx={{ marginTop: '10px'}}>
            Criar tarefa
          </Button>
          </Stack>
        
        
      </div>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle id={toDelete.id}>
            {"Deletar a seguinte tarefa?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={toDelete.id}>
              {toDelete.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Não</Button>
            <Button onClick={() => handleDelete(toDelete)} autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default App