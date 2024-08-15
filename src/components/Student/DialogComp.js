import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputTextFieldComp from "../InputTextFieldComp";

const DialogComp = React.memo(
  ({ open, handleClose, onSubmit, methodType, student }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const time = new Date().getTime();

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <DialogContentText>
              <InputTextFieldComp
                errors={errors}
                inpName={"Name"}
                pattern={{
                  value: /[a-zA-Z]/,
                  message: "Name is required!",
                }}
                registerForForm={register}
                student={student}
                key={Math.random()}
              />

              <InputTextFieldComp
                errors={errors}
                inpName={"Surname"}
                registerForForm={register}
                student={student}
                key={Math.random()}
              />
              <InputTextFieldComp
                errors={errors}
                inpName={"Age"}
                registerForForm={register}
                student={student}
                key={Math.random()}
                pattern={{ value: /\d/, message: "Age should be number!" }}
              />
              <InputTextFieldComp
                errors={errors}
                inpName={"Group"}
                registerForForm={register}
                student={student}
                key={Math.random()}
                pattern={{
                  value: /^group-\d+$/i,
                  message:
                    "Group name is required and should start with 'group-'!",
                }}
              />

              <InputTextFieldComp
                errors={errors}
                inpName={"Phone"}
                registerForForm={register}
                student={student}
                key={Math.random()}
                pattern={{
                  value: /^\+998\d{9}$/,
                  message:
                    "Phone number must start with +998 and be followed by exactly 9 digits",
                }}
              />
              <input
                type="number"
                className="w-0 h-0"
                {...register("id")}
                value={student?.id ? student?.id : time}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{methodType}</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default DialogComp;
