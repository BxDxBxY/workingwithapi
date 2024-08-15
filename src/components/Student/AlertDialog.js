import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const AlertDialog = ({ name, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {name} student?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>NO</Button>
        <Button onClick={handleClose} autoFocus>
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
