import React from "react";
import "./loader.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Backdrop } from "@mui/material";

export default function Loader(props) {
  return (
    <Backdrop
    sx={{ zIndex: 9999 }}
    open={true}
  >
    <CircularProgress size={props.size} />
  </Backdrop>
  );
}
