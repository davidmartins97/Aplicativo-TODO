import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grow,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  text,
}) => {
  return (
    <Dialog
      TransitionComponent={Grow}
      transitionDuration={{ enter: 300, exit: 200 }}
      open={open}
      onClose={onClose}
      sx={{ borderRadius: '4px' }}
    >
      <DialogTitle>Deletar a seguinte tarefa?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ wordBreak: 'break-word' }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Não</Button>
        <Button onClick={onConfirm} color="error">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
