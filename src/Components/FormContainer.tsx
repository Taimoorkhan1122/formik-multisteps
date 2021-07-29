import { TextField } from '@material-ui/core';
import { ErrorMessage, Field } from 'formik';
import FormikContainer from './FormikContainer';
import * as yup from 'yup';
const FormContainer = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPass: yup.string().required(),
  });
    return (
      <FormikContainer
        initialValues={schema}
        onSubmit={(values) => {
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
      </FormikContainer>
    );
}

export default FormContainer;
