import { TextField } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import FormikContainer from "./FormikContainer";
import * as yup from "yup";
const FormContainer = () => {
  const schema = yup.object().shape({
    name: yup.string().max(12, "max 12 characters").required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email("Invalid Email").required(),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("No password provided.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "at least one letter and one number"
      ),
    confirmPass: yup
      .string()
      .required("please confirm passwords")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  // const validation = (values) => {
  //   const errors = {};
  //   if(Array.from(values).length === 0){
  //     errors.
  //   }
  // }
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

  return (
    <FormikContainer
      initialValues={{
        name: "",
        age: 0,
        email: "",
        password: "",
        confirmPass: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await sleep(3000)
        console.log(values);
        
      }}>
      <div>
        <div>
          <Field
            name="name"
            type="text"
            as={TextField}
            label="Name"
            fullWidth
          />
          <ErrorMessage
            name="name"
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
        <div>
          <Field
            name="age"
            type="number"
            as={TextField}
            label="Age"
            fullWidth
          />
          <ErrorMessage
            name="age"
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
      </div>
      <div>
        <Field
          name="email"
          type="email"
          as={TextField}
          label="email"
          fullWidth
        />
        <ErrorMessage
          name="email"
          render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
        />
      </div>
      <div>
        <div>
          <Field
            name="password"
            type="password"
            as={TextField}
            label="password"
            fullWidth
          />
          <ErrorMessage
            name="password"
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
        <div>
          <Field
            name="confirmPass"
            type="password"
            as={TextField}
            label="Confirm Password"
            fullWidth
          />
          <ErrorMessage
            name="confirmPass"
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
      </div>
    </FormikContainer>
  );
};

export default FormContainer;
