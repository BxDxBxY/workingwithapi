import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const InputTextFieldComp = ({
  registerForForm,
  student,
  inpName,
  pattern,
  errors,
}) => {
  //   const {
  //     register,
  //     formState: { errors },
  //   } = useForm();
  console.log(errors);
  const lowInpName = inpName.toLowerCase();
  return (
    <>
      <TextField
        required
        margin="dense"
        id={inpName}
        name={inpName}
        label={`${inpName} of the Student`}
        type={lowInpName === "age" ? "number" : "text"}
        fullWidth
        variant="standard"
        placeholder={`Student's ${inpName}`}
        defaultValue={
          student?.[lowInpName]
            ? student?.[lowInpName]
            : lowInpName === "phone"
            ? "+998"
            : lowInpName === "group"
            ? "Group-"
            : ""
        }
        {...registerForForm(lowInpName, {
          required: `${lowInpName} is required!`,
          pattern: pattern,
        })}
        // {...register(lowInpName, {
        //   required: `${student?.[lowInpName]} is required!"`,
        //   pattern: {
        //     value: /^\+998\d{9}$/,
        //     message:
        //       "Phone number must start with +998 and be followed by exactly 9 digits",
        //   },
        // })}
      />
      {errors?.[lowInpName] && (
        <span className="text-red-400">{errors?.[lowInpName]?.message}</span>
      )}
    </>
  );
};

export default InputTextFieldComp;
