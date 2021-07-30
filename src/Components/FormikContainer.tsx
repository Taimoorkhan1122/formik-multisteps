import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import { Formik,Form, FormikConfig, FormikValues, FormikTouched } from "formik";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    },
    '& .MuiStepper-root': {
      padding: '10px'
    }
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(5)
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
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[activeStep]
  const [completed, setCompleted] = useState(false);
  
  
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
interface setTouchedFunc {
  (setTouched: FormikTouched<FormikValues>, shouldValidate?: boolean | undefined) : void
}

  const handleNext = (setTouched: setTouchedFunc) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);    
    setTouched({});
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
          console.log("submitting");

          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          }
        }}>
        {({ isSubmitting, setTouched, validateForm }) => (
          <Form>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={activeStep > index || completed}>
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
              startIcon={
                isSubmitting ? (
                  <CircularProgress size="1rem" color="secondary" />
                ) : null
              }
              type={isLastStep() ? "submit" : "button"}
              onClick={!isLastStep() ? () => handleNext(setTouched) : undefined}
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
