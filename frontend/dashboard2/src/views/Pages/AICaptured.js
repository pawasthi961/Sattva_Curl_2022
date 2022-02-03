/*eslint-disable*/
import React from "react";
import { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/CardTwitterImages";

import "./TwitterImages.css";
import PopupModal from "./PopupModal";

import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";
import Image3 from "assets/img/ex2.jpg";
import Image4 from "assets/img/ex1.jpg";
import Image5 from "assets/img/exwidth.jpg";
import Image6 from "assets/img/sidebar-1.jpg";

export default function AICaptured() {
  const [ishover, setIsHover] = useState(false); 
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Heading
        textAlign="center"
        title="Camera Captured"
        category={
          <span>
            Displays all the images captured by the camera installed in the park.<br /> 
          </span>
        }
      />
          <div className="cardImage">
            <Card 
              className="cardContent"
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}>  
              <img src={Image1} alt="..." />
              {ishover && (
                <Button 
                  onClick={() => setOpen(true)}
                  color="primary"
                >
                  View
                </Button>
              )}  
              <PopupModal open={open} setOpen={setOpen} image={Image3}/>
            </Card>
            <Card 
              className="cardContent"
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}>  
              <img src={Image4} alt="..." />
              {ishover && (
                <Button 
                  onClick={() => setOpen(true)}
                  color="primary"
                >
                  View
                </Button>
              )}  
              <PopupModal open={open} setOpen={setOpen} image={Image3}/>
            </Card>
            <Card>
              <img src={Image2} alt="..." />
            </Card>
            <Card>
              <img src={Image3} alt="..." />
            </Card>
            <Card>
              <img src={Image4} alt="..." />
            </Card>
            <Card>  
            <img src={Image5} alt="..."/>
            </Card>
            <Card>
              <img src={Image6} alt="..." />
            </Card>
          </div>
    </div>
  );
}
