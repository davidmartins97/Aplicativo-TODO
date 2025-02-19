// TaskInput.tsx
import React, { useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface TaskInputProps {
    input: string;
    onInputChange: (value: string) => void;
    onAddTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
    input,
    onInputChange,
    onAddTask,
}) => {
    const inputElement = useRef<HTMLInputElement>(null);

    return (
        <Box alignSelf='flex-end' margin={{ xs: '10px', sm: '20px' }} width={{ md: '500px', sm: '400px', xs: '80vw' }}
            sx={{
                justifyContent: "center",
            }}>
            <TextField
                fullWidth
                label="Escreva a tarefa aqui"
                variant="outlined"
                inputRef={inputElement}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAddTask()}
            />
            <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={onAddTask}
                sx={{ marginTop: '10px' }}
            >
                Criar tarefa
            </Button>
        </Box>
    );
};

export default TaskInput;
