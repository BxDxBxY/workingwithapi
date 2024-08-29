import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  add_new_student,
  delete_student,
  update_student,
} from "../../Redux/studentsSlice";
import AlertDialog from "./AlertDialog";
import DialogComp from "./DialogComp";
import { useForm } from "react-hook-form";

const StudentCard = ({ student }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(delete_student(student));
  };
  const handleUpdate = useCallback(() => {
    setOpenModal(true);
  }, []);
  const randImg = useMemo(
    () =>
      `https://picsum.photos/${Math.floor(Math.random() * 1000)}/${Math.floor(
        Math.random() * 1000
      )}`,
    []
  );
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCloseConfirmDialog = (e) => {
    if (e.target.innerText === "YES") {
      handleDelete();
      setOpenConfirmDialog(false);
    } else {
      setOpenConfirmDialog(false);
    }
  };
  const onSubmit = (data) => {
    dispatch(update_student(data));
    handleClose();
  };
  return (
    <>
      <Grid item xs={3} className="cursor-pointer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 160 }} image={randImg} title="img" />
          <CardContent>
            <Typography
              className={`${
                student?.complete ? "bg-emerald-600" : " bg-pink-700"
              } text-white px-2 py-1 rounded-md`}
              gutterBottom
              variant="h5"
              component="h5"
            >
              {student?.name} {student?.surname[0]}.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Age: </b> {student?.age} <br />
              <b>Group: </b>
              {student?.group}
              <br />
              <b>Phone:</b> {student?.phone}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              variant="contained"
              color="success"
              onClick={handleUpdate}
            >
              Change
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="error"
              onClick={() => setOpenConfirmDialog(true)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {openModal && (
        <>
          <DialogComp
            student={student}
            handleClose={handleClose}
            open={openModal}
            onSubmit={onSubmit}
            methodType={"Update"}
          />
        </>
      )}
      {openConfirmDialog && (
        <AlertDialog
          open={openConfirmDialog}
          handleClose={handleCloseConfirmDialog}
          name={student.name}
        />
      )}
    </>
  );
};

export default StudentCard;
