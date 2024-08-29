import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentCard from "./Student/StudentCard";
import { useDispatch, useSelector } from "react-redux";
import DialogComp from "./Student/DialogComp";
import { add_new_student } from "../Redux/studentsSlice";

const Students = () => {
  const students = useSelector((state) => state.students);
  const [progress, setProgress] = React.useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [getStudents, setGetStudents] = useState(true);
  const [showModalDialog, setShowModalDialog] = useState(false);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setShowModalDialog(false);
  };
  const onSubmit = (data) => {
    dispatch(add_new_student(data));
    handleCloseModal();
  };

  const handleGetStudents = () => {
    setOpenBackdrop(true);
    const time = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 100);
    setTimeout(() => {
      clearInterval(time);
      setGetStudents(true);
      setOpenBackdrop(false);
    }, 1000);
  };

  useEffect(() => {
    handleGetStudents();
  }, []);
  return (
    <>
      <div>
        <div className="mx-auto flex justify-between my-4 w-full bg-blue-400 p-4  text-black ">
          <span>Students</span>

          <Button
            onClick={() => setShowModalDialog(true)}
            variant="contained"
            color="info"
          >
            Add Student
          </Button>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={() => setOpenBackdrop(false)}
        >
          <CircularProgress variant="determinate" value={progress} />
        </Backdrop>
        <Grid container spacing={4} className="p-4 min-h-screen">
          {getStudents ? (
            students?.map((s, i) => <StudentCard key={i} student={s} />)
          ) : (
            <p className="capitalize w-full h-full mx-auto text-8xl text-white font-bold tracking-wider text-center">
              There should have been student's list
            </p>
          )}
        </Grid>
      </div>
      {showModalDialog && (
        <DialogComp
          open={showModalDialog}
          handleClose={handleCloseModal}
          methodType={"ADD"}
          student={null}
          key={Math.random()}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default Students;

// {/* <AppendNewStudentDialog
//   // handleSubmit={}
//   showModal={showModalDialog}
//   setShowModal={setShowModalDialog}
// /> */}
