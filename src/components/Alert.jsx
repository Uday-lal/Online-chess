"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Alert(props) {
  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Alert;
