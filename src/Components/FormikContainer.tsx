import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import { Formik,Form, FormikConfig, FormikValues } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Personal Info", "Contact Details", "Security"];
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  name: String,
  email: String,
  age: number,
  password: String,
  confirmPass: String,
  
}

export default function FormikContainer({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[activeStep]

  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Formik
        {...props}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setActiveStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed}>
                  <StepButton
                    onClick={handleStep(index)}
                    // completed={completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {currentChild}
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                variant="contained"
                color="primary"
                className={classes.button}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={isSubmitting}>
              {isLastStep() ? "Submit" : "Next"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
