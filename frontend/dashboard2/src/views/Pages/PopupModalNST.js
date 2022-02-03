/*eslint-disable*/
import React from "react";
import { useState ,useEffect,useRef} from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";

import styled from "styled-components";
import { create } from "ipfs-http-client";

import { makeStyles } from "@material-ui/core/styles";
const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");
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
  const {url ,open, setOpen, image ,userName, tweetId, createdAt} = props;
  const [imageData64, setImageData64] = useState(5)


  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // console.log(blockchain);
  const data = useSelector((state) => state.data);
  // console.log(data);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [NFTS, setNFTS] = useState([]);

  const elementRef = useRef();
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
  const name = "Sattva #0002";
  const description = "Created by Sattva to make nature Sovereign";

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result; 
        setImageData64(base64data)
        // console.log(base64data)
        // console.log(imageData64)
        resolve(base64data);
      }
    });
  }

  const mint = (_uri) => {
    blockchain.smartContract.methods
      .mint(blockchain.account, _uri)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setStatus("Error");
      })
      .then((receipt) => {
        console.log(receipt);
        setLoading(false);
        setStatus("NFT was minted successfully");
      })
  };

  const createMetaDataAndMint = async (_name, _des, _imgbuffer) => {
    setLoading(true);
    setStatus("Uploading to IPFS");
    
    try {
      console.log(await _imgbuffer)
      const addedImage = await ipfsClient.add(await _imgbuffer);

      const metaDataObj = {
        name: _name,
        description: _des,
        image: ipfsBaseUrl + addedImage.path,
      };
      const addMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
      console.log(ipfsBaseUrl + addMetaData.path);
      mint(ipfsBaseUrl + addMetaData.path);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setStatus("Error");
    }
  };

  const startMintingProcess = () => {
    dispatch(connect())
    createMetaDataAndMint(name, description, getImageData());


  };

  const getImageData = async () => {
    // console.log(elementRef);
    // console.log(elementRef.current)
    const url = image
    const imageData =  await getBase64FromUrl(url);
    // console.log(imageData)
    const buffer = Buffer(imageData.split(",")[1], "base64");
    return buffer;

    // const canvasEl = elementRef.current;
    // let dataUrl = canvasEl.toDataURL("image/png");
    
    // console.log(dataUrl);
 
   
  };

  const fetchMetatDataForNFTS = () => {
    setNFTS([]);
    console.log(data.error);
    data.allTokens.forEach(nft => {
      fetch(nft.uri)
        .then((response) => response.json())
        .then((metaData) => {
          setNFTS((prevState) => [
            ...prevState,
            { id: nft.id, metaData: metaData },
          ]);
        
        
        });
    });
  };

  



  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(() => {
    fetchMetatDataForNFTS();
  }, [data.allTokens]);

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
            <h3 style={{fontFamily:"sans-serif", color:"white"}}>{userName}</h3>
            <p style={{fontFamily:"monospace"}}>
              source : {tweetId}
            </p>
            <p style={{fontFamily:"monospace"}}>
              posted on : {createdAt}
            </p>
            <p style={{fontFamily:"monospace"}}>
              style name : color
            </p>
            <div className={classes.rightButtons}>
              <Button
                onClick={() => {
                    startMintingProcess()
                    console.log(image.height)}}
                color="success"
                endIcon={<SendIcon />}
                fullWidth
              >
                MINT
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
      {/* <Stack spacing={4} sx={{ width: '100%' }}>
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
      </Stack> */}
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