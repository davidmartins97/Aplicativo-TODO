import React, { useState, useRef } from 'react'
import { Button, Checkbox, TextField, Grid2, List, ListItem, ListItemText, IconButton, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 } from 'uuid'

function App() {
  const valorInicial = []
  const [task, setTask] = useState(valorInicial)
  const [input, setInput] = useState('')
  const inputElement = useRef()
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState({id: null, text: null, checked: null }); 
    
  

  function handleClick() {
    input && task.text !== ''  && setTask(
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
    }}

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
        
    

  
  return (
    <>
      
      <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background'}}>
        {task.map((item) => (
          <ListItem
          key={item.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDialog(item)}>
              <DeleteIcon color='primary'/>
            </IconButton>
          }
        >
        
          <Checkbox 
            edge="start"
            checked={item.checked}
            onChange={() => handleToggle(item.id)}
          />
          <ListItemText id={item.id} primary={item.text}/>
        </ListItem>
        ))}
      </List>
        <Grid2 sx={{ width: '100%', maxWidth: 360, bgcolor: 'background'}}>
          
          <TextField fullWidth label="Escreva a tarefa aqui" variant="outlined" inputRef={inputElement} value={input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInput(event.target.value);
            }} onKeyDown={handleEnter}
          />
        </Grid2>
        <br />
      </div>
      <div>
        <Button fullWidth variant="contained" color='success' onClick={handleClick}>
          Criar tarefa
        </Button>
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