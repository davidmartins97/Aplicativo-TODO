import React from 'react';
import { ListItem, Checkbox, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskItemProps {
  task: { id: string; text: string; checked: boolean };
  onToggle: (task: { id: string; text: string; checked: boolean }) => void;
  onDelete: (task: { id: string; text: string; checked: boolean }) => void;
  inside: boolean;  //se o elemento estiver dentro de um bloco a açao secundária é desabilitada
}


const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, inside, }) => {
  return (
    <ListItem
      sx={{ border: '#3f50b5 1px', borderRadius: '4px', marginBottom: '2px' }}
      secondaryAction={
        !inside &&
        <IconButton
          disabled={task.checked}
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(task)}
        >
          <DeleteIcon sx={{ color: task.checked ? 'grey' : '#3f50b5' }} />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={task.checked}
        onChange={() => onToggle(task)}
        sx={{
          '&:hover': { bgcolor: '#ebf1f5' },
          '&:hover + .list-item-text': {
            textDecoration: task.checked ? 'none' : 'underline grey',
          },
        }}
      />
      <ListItemText
        className="list-item-text"
        sx={{
          color: task.checked ? 'grey' : 'black',
          wordBreak: 'break-word',
          '&:hover': { textDecoration: task.checked ? 'none' : 'underline grey' },
        }}
        primary={task.text}
      />
    </ListItem>
  );
};

export default TaskItem;