/*eslint-disable*/
import React, { useEffect } from "react";

// @material-ui/core components
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import SellIcon from '@mui/icons-material/Sell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import Danger from "components/Typography/Danger.js";
import Muted from "components/Typography/Muted.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// react plugin for creating charts
import ChartistGraph from "react-chartist";

import {
  pieChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import stylesChart from "assets/jss/material-dashboard-pro-react/views/chartsStyle.js";
import Timeline from "@material-ui/icons/Timeline";

//for responsive charts
import { 
  ResponsiveContainer, 
  LineChart, 
  BarChart,
  Bar,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend, 
  Label, 
  Tooltip } 
  from 'recharts';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'serif',
      'Neonderthaw',
      'Dongle',
      'Roboto Slab'
    ].join(','),
  },
});

//for most popular artwork
import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";
import Image3 from "assets/img/ex2.jpg";
import Image4 from "assets/img/ex1.jpg";
import Image5 from "assets/img/sidebar-2.jpg";
import Image6 from "assets/img/sidebar-1.jpg";

const useStyles = makeStyles(styles);
const useStylesCharts = makeStyles(stylesChart);

const useStylesArtwork = makeStyles((theme) => ({

  container:{
    maxWidth:"1500px",
    maxHeight:"390px",
    display:"flex",
    flexDirection:"row",
    overflow:"auto"
  },
  imageCard:{
    border: "1px solid whitesmoke",
    width: "fit-content",
    maxWidth: "550px",
    height: "fit-content",
    backgroundColor:"white",
    borderRadius: "3px",
    margin:"10px"
  },
  images:{
    width:"100%",
    height:"100%",
    maxHeight:"250px",
    minHeight:"250px",
    maxWidth:"310px",
    minWidth:"230px",
    margin:"10px",
    border:"1px solid white",
    borderRadius:"5px"
  }
}));

//data for charts
const lineData = [
  {
    name:'Jan',
    UploadedImages: 1000,
    CameraCaptured: 500,
    TwitterMentions: 600
  },
  {
    name:"Feb",
    UploadedImages: 1200,
    CameraCaptured: 300,
    TwitterMentions: 900
  },
  {
    name:"Mar",
    UploadedImages: 500,
    CameraCaptured: 200,
    TwitterMentions: 700
  },
  {
    name:"Apr",
    UploadedImages: 1000,
    CameraCaptured: 500,
    TwitterMentions: 600
  },
  {
    name:"May",
    UploadedImages: 300,
    CameraCaptured: 900,
    TwitterMentions: 1600
  },
  {
    name:"Jun",
    UploadedImages: 100,
    CameraCaptured: 400,
    TwitterMentions: 900
  },
  {
    name:"Jul",
    UploadedImages: 1000,
    CameraCaptured: 500,
    TwitterMentions: 600
  },
  {
    name:"Aug",
    UploadedImages: 100,
    CameraCaptured: 550,
    TwitterMentions: 760
  },
  {
    name:"Sep",
    UploadedImages: 140,
    CameraCaptured: 506,
    TwitterMentions: 1260
  },
  {
    name:"Oct",
    UploadedImages: 1000,
    CameraCaptured: 500,
    TwitterMentions: 600
  },
  {
    name:"Nov",
    UploadedImages: 1070,
    CameraCaptured: 550,
    TwitterMentions: 1380
  },
  {
    name:"Dec",
    UploadedImages: 100,
    CameraCaptured: 50,
    TwitterMentions: 1930
  }
];

const saleData = [
  {
    name:'Week 1',
    RevenueGenerated: 1000,
  },
  {
    name:'Week 2',
    RevenueGenerated: 2000,
  },
  {
    name:'Week 3',
    RevenueGenerated: 1300,
  },
  {
    name:'Week 4',
    RevenueGenerated: 1200,
  },
];



export default function Dashboard() {
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'X-API-KEY': '7488cd0607df40db8b0f4e3f6534946b'}
    };
    
    fetch('https://testnets-api.opensea.io/api/v1/events?account_address=0x8d4853afA22F9766EfB91307708184Cf40033419&only_opensea=false&offset=0&limit=20', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  },[])
  const classes = useStyles();
  const classesCharts = useStylesCharts();
  const classesArtwork = useStylesArtwork();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>
                  <AddPhotoAlternateIcon style={{fontSize: 50}}/>
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontWeight:"normal"}}>
                Total NST images Generated
              </p>
              <h3 className={classes.cardTitle}>1.1K</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Muted>
                  <Update />
                </Muted>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{fontFamily:"Roboto", fontSize:"13px", fontWeight:"normal"}}>
                  Refresh
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                {/* <i className="fab fa-twitter" /> */}
                <Icon>
                  <UploadIcon />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontWeight:"normal"}}>
                Total images uploaded to OpenSea
              </p>
              <h3 className={classes.cardTitle}>350</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Muted>
                  <Update style={{color:"grey"}}/>
                </Muted>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{fontFamily:"Roboto", fontSize:"13px", fontWeight:"normal"}}>
                  Refresh
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>
                  <SellIcon />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontWeight:"normal"}}> 
                Number of images sold on OpenSea
              </p>
              <h3 className={classes.cardTitle}>230</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Muted>
                  <Update style={{color:"grey"}}/>
                </Muted>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{fontFamily:"Roboto", fontSize:"13px", fontWeight:"normal"}}>
                  Refresh
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon fontSize="large">
                  <AttachMoneyIcon />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontWeight:"normal"}}>
                Revenue Generated on OpenSea
              </p>
              <h3 className={classes.cardTitle}>$1,200</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Muted>
                  <Update style={{color:"grey"}}/>
                </Muted>
                <a href="#pablo" onClick={(e) => e.preventDefault()} style={{fontFamily:"Roboto", fontSize:"13px", fontWeight:"normal"}}>
                  Refresh
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Sale made this month{" "}
                <small>- distribution on weekly basis</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ThemeProvider theme={theme}>
                <ResponsiveContainer width="100%" aspect={1.55}>
                  <LineChart 
                    data={saleData}
                    width={500}
                    height={300}
                    margin={{top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      interval={'preserveStartEnd'} 
                      margin={{bottom: 30}}
                      tick={{stroke: 'black', strokeWidth: 0.5}} >
                      <Label 
                        value="Weeks" 
                        position="insideBottom"
                        offset={-5}
                        fontFamily="Roboto Slab"
                      />
                    </XAxis>
                    <YAxis tick={{stroke: 'black', strokeWidth: 0.5}} label={{ value: 'Revenue Generated', angle: -90, position: 'insideLeft', fontFamily:"Roboto Slab", marginBottom: "10px"}} />
                    <Tooltip 
                      contentStyle={{ border:"1px solid #CCCCCC", borderRadius:"5px"}}
                      labelStyle={{fontSize:"17px", fontWeight:"bold"}} 
                      itemStyle={{fontSize:"15px"}} />
                    <Legend 
                      verticalAlign="top"
                      align="right" 
                      iconType="circle"
                      height={30}
                      wrapperStyle={{
                        fontFamily:"sans-serif", 
                        position: "relative", 
                        bottom: "325px",
                        left: "50px"}} 
                    />
                    <Line 
                      dataKey="RevenueGenerated" 
                      stroke="#60B764" 
                      strokeWidth={4}
                      dot={{ fill: '#60B764', stroke: '#60B764', strokeWidth: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Total images collected
              </h4>
            </CardHeader>
            <CardBody style={{ height: "240px" }}>
              <ChartistGraph
                data={pieChart.data}
                type="Pie"
                options={pieChart.options}
              />
            </CardBody>
            <CardFooter
              stats
              className={classesCharts.cardFooter}
              style={{ fontFamily: "sans-serif", fontSize: "14px"}}
            >
              <h6 className={classesCharts.legendTitle}>
                Distribution Parameters
              </h6>
              <i className={"fas fa-circle " + classesCharts.info} /> Uploaded
              Images{` `}
              <i className={"fas fa-circle " + classesCharts.warning} /> Camera
              Captured
              {` `}
              <br />
              <i className={"fas fa-circle " + classesCharts.danger} /> Twitter
              Mentions
              {` `}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Images Collected{" "}
                <small>- distribution on monthly basis</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ThemeProvider theme={theme}>
                <ResponsiveContainer width="100%" aspect={3}>
                  <BarChart 
                    data={lineData}
                    width={500}
                    height={300}
                    margin={{top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      interval={'preserveStartEnd'} 
                      margin={{bottom: 30}}
                      tick={{stroke: 'black', strokeWidth: 0.5}} >
                      <Label 
                        value="Months" 
                        position="insideBottom"
                        offset={-5}
                        fontFamily="Roboto Slab"
                      />
                    </XAxis>
                    <YAxis tick={{stroke: 'black', strokeWidth: 0.5}} label={{ value: 'Images Collected', angle: -90, position: 'insideLeft', fontFamily:"Roboto Slab", marginBottom: "10px"}} />
                    <Tooltip 
                      contentStyle={{ border:"1px solid #CCCCCC", borderRadius:"5px"}}
                      labelStyle={{fontSize:"17px", fontWeight:"bold"}} 
                      itemStyle={{fontSize:"15px"}} />
                    <Legend 
                      verticalAlign="top"
                      align="right" 
                      iconType="circle"
                      height={30}
                      wrapperStyle={{
                        fontFamily:"sans-serif", 
                        position: "relative", 
                        bottom: "310px", 
                        left: "50px"}} 
                    />
                    <Bar 
                      dataKey="UploadedImages" 
                      fill="#00BCD4"
                    />
                    <Bar 
                      dataKey="CameraCaptured" 
                      fill="#F05B4F" 
                    />
                    <Bar 
                      dataKey="TwitterMentions" 
                      fill="#F4C63D"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Sale made in a year{" "}
                <small>- distribution on monthly basis</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ThemeProvider theme={theme}>
                <ResponsiveContainer width="100%" aspect={3}>
                  <LineChart 
                    data={lineData}
                    width={500}
                    height={300}
                    margin={{top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      interval={'preserveStartEnd'} 
                      margin={{bottom: 30}}
                      tick={{stroke: 'black', strokeWidth: 0.5}} >
                      <Label 
                        value="Months" 
                        position="insideBottom"
                        offset={-5}
                        fontFamily="Roboto Slab"
                      />
                    </XAxis>
                    <YAxis tick={{stroke: 'black', strokeWidth: 0.5}} label={{ value: 'Revenue Generated', angle: -90, position: 'insideLeft', fontFamily:"Roboto Slab", marginBottom: "10px"}} />
                    <Tooltip 
                      contentStyle={{ border:"1px solid #CCCCCC", borderRadius:"5px"}}
                      labelStyle={{fontSize:"17px", fontWeight:"bold"}} 
                      itemStyle={{fontSize:"15px"}} />
                    <Legend 
                      verticalAlign="top"
                      align="right" 
                      iconType="circle"
                      height={30}
                      wrapperStyle={{
                        fontFamily:"sans-serif", 
                        position: "relative", 
                        bottom: "310px",
                        left: "50px"}} 
                    />
                    <Line 
                      dataKey="UploadedImages" 
                      stroke="#60B764" 
                      strokeWidth={4}
                      dot={{ fill: '#60B764', stroke: '#60B764', strokeWidth: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Images recorded in all three modes
                <small>- in the given month</small>
              </h4>
            </CardHeader>
            <CardBody style={{ height: "350px" }}>
              <ChartistGraph
                data={colouredLinesChart.data}
                type="Line"
                options={colouredLinesChart.options}
                listener={colouredLinesChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
      <h3 style={{ fontFamily: "Roboto Slab" }}>In-Demand Artwork</h3>
      <br />
      <div className={classesArtwork.container}>
        <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://lh3.googleusercontent.com/pJL83DNcFkeA7O_T95bkPqzZazj_E1OjIPuroIozSvhLwQPE-kfSHIOJTWphmlKzX1CmSGPamH4WnBP1gPEw3tmmv5FktE2k_GzCDVM=w600" alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              Name of the Image
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div>
        <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/0xf99b526ee3d969971c6cc734d1ea4c7ed22c51d4/58"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://lh3.googleusercontent.com/C-8DFOIB8GceOSNWXH7YOR1ZTHUC1GCYwK0qw-7mfT0ymHBY9AC8C_TNOZCs63Scg_Tc6lqq4hs9QyUHkaHo_q43e_UCqMuis3pChQ=w600" alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/0xf99b526ee3d969971c6cc734d1ea4c7ed22c51d4/58"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              NFT Name
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div>
        <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/mumbai/0x22303da2c3fd2b8d6013fb93dfe883497163376e/1"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://lh3.googleusercontent.com/fdAqpejoMVDSfB7WnuJ6H_Wxr3g9mLvO7_E35ze8a0Vn8j8nOJ_Cl4g9ucmTcP6UATVAvFCE92HuK723JJThGSu4AcprXOize4J39g=w600" alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/mumbai/0x22303da2c3fd2b8d6013fb93dfe883497163376e/1"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              Sattva #0001
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div>
        {/* <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Image4} alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              Name of the Image
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div>
        <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Image5} alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              Name of the Image
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div>
        <div className={classesArtwork.imageCard}>
          <a
            href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Image6} alt="..." className={classesArtwork.images} />
          </a>
          <h4 className={classes.cardProductTitle}>
            <a
              href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
              target="_blank"
              rel="noreferrer"
              style={{fontFamily:"Roboto Slab"}}
            >
              Name of the Image
            </a>
          </h4>
          <h4 className={classes.cardProductDesciprion} style={{fontFamily:"Roboto Slab", color:"black", fontWeight:"bold"}}>Current Price</h4>
        </div> */}
        {/* <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image1} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image2} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image3} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image3} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image3} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image3} alt="..." className={classesArtwork.images}/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <img src={Image3} alt="..." className={classesArtwork.images}/>
          </GridItem>
        </GridContainer> */}
      </div>
    </div>
  );
}

{/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
