/*eslint-disable*/
import React from "react";
import { useState,useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
// core components
import Heading from "components/Heading/Heading.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/CardTwitterImages";
import { ImageListItemBar } from "@mui/material";
import "./TwitterImages.css";
import PopupModal from "./PopupModal";

import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";
import Image3 from "assets/img/ex2.jpg";
import Image4 from "assets/img/ex1.jpg";
import Image5 from "assets/img/exwidth.jpg";
import Image6 from "assets/img/sidebar-1.jpg";

export default function UploadedImage() {
  const [ishover, setIsHover] = useState(false); 
  const [open, setOpen] = useState(false);
  const [tweetData, setTweetData] = useState([])
  const [imageUrl,setImageUrl] = useState()
  const [tweetId,setTweetId] = useState()
  const [userName,setUserName] = useState()
  const [createdAt,setCreatedAt] = useState()

  useEffect(()=>{
    fetch("/data/uploaded_images_data",{})
    .then(res => res.json())
    .then(result => {
      setTweetData(JSON.parse(result))
    })
  },[])

  return (
    <div>
      <Heading
        textAlign="center"
        title="Uploaded Images"
        category={
          <span>
            Displays all images uploaded by Admin on the website
          </span>
        }
      />
      {/* <div className="cardImage">
        {tweetData.map((item) => (
          <Card 
            className="cardContent"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>  
              <img src={item.media_url} alt="..." />
              {ishover && (
                <Button 
                  onClick={() => setOpen(true)}
                  color="primary"
                >
                  View
                </Button>
              )}  
            <PopupModal open={open} setOpen={setOpen} image={item.media_url}/>
          </Card>
          
          ))}</div> */}
      {/* <div className="cardImage"> */}
        <ImageList cols={4} rowHeight={200}>
          {tweetData.map((item) => (
            <ImageListItem key={item._id["$oid"]} className="cardContent">
              <img
                width = "250px"
                height = "200px"
                src={item.media_url}
                // src = {`${item.media_url}?w=248&fit=crop&auto=format`}
                // srcSet={`${item.media_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                maxHeight= '200px'
              


              />
              <ImageListItemBar
                
                subtitle={<span>by: {item.user_handle}</span>}
                actionIcon={
                  <Tooltip title="info" placement="top-start">
                    <IconButton
                      onClick = {()=>{
                        setOpen(true),
                        setImageUrl(item.media_url),
                        setCreatedAt(item.created_at),
                        setTweetId(item.tweet_id),
                        setUserName(item.user_handle)
                      }}

                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.user_handle}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
              }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <PopupModal open={open} setOpen={setOpen} image={imageUrl} createdAt ={createdAt} userName ={userName} tweetId ={tweetId}/>
      {/* </div> */}
    </div>
   

  );
}
