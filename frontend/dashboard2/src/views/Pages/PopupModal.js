/*eslint-disable*/
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Stack } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container:{
    backgroundColor:"black",  
    color:"white",
    width:"fit-content",
    height:"fit-content",
    maxHeight:"80vh",
    maxWidth:"70vw",
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  // modalContent:{
  //   float:"right"
  // },
  // leftside:{
  //   width:"fit-content",
  //   height:"fit-content",
  //   position:"absolute",
  //   top:0,
  //   bottom:0,
  //   left:0, 
  //   margin: 23,
  //   marginTop: 33,
  //   float: "left",
  //   overflow:"hidden"
  // },
  leftImage:{
    width:"100%",
    height:"100%",
    maxHeight: "80vh",
  },
  // verticalLine:{
  //   borderLeft: "2px solid white",
  //   height: "fit-content",
  //   float:"right",
  //   position: "absolute",
  //   left: "50%",
  //   top: 10,
  // },
  rightside:{
    display:"flex",
    flexDirection:"column"
  },
  rightButtons:{
    marginTop:"auto",
    marginRight:"24px"
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PopupModal = React.forwardRef(function PopupModal(props, ref) {
  const classes = useStyles();
  const [createAlert, setCreateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const {open, setOpen, image ,userName, tweetId, createdAt} = props;

  const handleCreateClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCreateAlert(false);
  };

  const handleDeleteClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteAlert(false);
  };

  return (
    <div ref={ref}>
      <Modal 
        open={open} 
        onBackdropClick={() => setOpen(false)}
        className={classes.mainClass}
      >
        <GridContainer className={classes.container}>
          <GridItem xs={12} sm={6} md={7}>
            <img src={image} alt="..." className={classes.leftImage}/>
          </GridItem>
          {/* <GridItem md={0.1} className={classes.verticalLine}>
          </GridItem> */}
          <GridItem xs={12} sm={6} md={5} className={classes.rightside}>
            <h3 style={{fontFamily:"sans-serif", color:"white"}}>username: {userName}</h3>
            <p style={{fontFamily:"monospace"}}>
              tweet Id : {tweetId}
            </p>
            <p style={{fontFamily:"monospace"}}>
              posted on : {createdAt}
            </p>
            <div className={classes.rightButtons}>
              <Button
                onClick={() => {
                    setOpen(false),
                    setCreateAlert(true)
                    console.log(image.height)}}
                color="success"
                endIcon={<SendIcon />}
                fullWidth
              >
                Generate NST
              </Button>
              <Button 
                color="danger"
                endIcon={<DeleteIcon />}
                onClick={() => {
                  setOpen(false),
                  setDeleteAlert(true)
                }}
                fullWidth
              >
                Delete Image
              </Button>
              <Button 
                onClick={() => setOpen(false)} 
                endIcon={<CloseIcon />} 
                fullWidth>
                Close
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </Modal>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <Snackbar
          open={createAlert} 
          autoHideDuration={3000} 
          onClose={handleCreateClose} 
          anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        >
          <Alert onClose={handleCreateClose} severity="success" sx={{ width: '100%' }}>
            Your art will be created shortly!
          </Alert>
        </Snackbar>

        <Snackbar 
          open={deleteAlert} 
          autoHideDuration={3000} 
          onClose={handleDeleteClose} 
          anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        >
          <Alert onClose={handleDeleteClose} severity="error" sx={{ width: '100%' }}>
            Picture has been deleted.
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
});

export default PopupModal;

PopupModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  image: PropTypes.string,
  userName: PropTypes.string,
  tweetId: PropTypes.string, 
  createdAt: PropTypes.string
};