import React from "react";
import { Button } from "@mui/material";

function MyTextButton(props) {
  console.log('opppppp', props.className);
  console.log('opppppp2', props.onClick);



  return (
    <Button variant="text" className={props.className} style={props.style} onClick={props.onClick}>
      {props.label}
    </Button>
  );
}
export default MyTextButton;
