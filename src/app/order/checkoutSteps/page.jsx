"use client"
import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

import checkoutSteps from "./checkoutSteps.css";

export default function CheckoutSteps (activeStep) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    }
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep.activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep.activeStep === index ? true : false}
            completed={activeStep.activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep.activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};


