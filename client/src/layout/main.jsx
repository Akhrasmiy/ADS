import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Collapse, IconButton, Link, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import FacebookIcon from '@mui/icons-material/Facebook';
const Main = () => {
  const [adData, setAdData] = useState(null);
  const [loop, setLoop] = useState(true);
  const [errors, seterrors] = useState(false);
  const [status, setstatus] = useState([]);
  const [open4, setOpen4] = React.useState(false);
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);
  const [userinfo, setuserinfo] = React.useState({});

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/users/me`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        setuserinfo(response.data.data)
      })
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/seeads`, { headers: { Authorization: localStorage.getItem("token") } });
        setAdData(response.data.data);
      } catch (error) {
        seterrors(error.response.data.error)
        console.log(error.response.data.error)
      }
    };

    fetchData();
    axios
      .get(`${process.env.REACT_APP_URL}/status`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        setstatus(response.data.data)
        console.log(response.data.data)
      })
  }, []);
  const handleConnect = (id) => {

    axios
      .get(`${process.env.REACT_APP_URL}/status/connect/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(1);
      });
  };
  const handleVideoClick = async () => {
    if (adData) {
      const response = await axios.get(`${process.env.REACT_APP_URL}/seeads/${adData?._id}`, { headers: { Authorization: localStorage.getItem("token") } });
      window.open(adData.link, '_blank');
      window.location.reload()
    }
  };

  const handleClick = (which) => {
    if (which == 1)
      setOpen1(!open1);
    if (which == 2)
      setOpen2(!open2);
    if (which == 4)
      setOpen4(!open4);
  };

  return (
    <main className="main">
      <div className="mainMain" style={{ display: 'flex', justifyContent: 'center' }}>





        <ListItemButton onClick={() => {
          handleClick(1)
        }}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="sayt haqida" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List style={{ display: 'flex', flexWrap: 'wrap' }} component="div" disablePadding>
            <CardContent>
              <Typography sx={{ color: 'yellowgreen', fontSize: 14 }} color="text.secondary" gutterBottom>

              </Typography>
              <Typography variant="h5" fontSize={14} component="div">
                Bu sayt sizga pul ishlash uchun yordam beradi
                reklama videosini ko'ring va video ustiga bosing va pul ishlang
              </Typography>
              <ListItemButton onClick={() => {
                handleClick(2)
              }}>
                <ListItemText primary="Ko'proq" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <List style={{ display: 'flex', flexWrap: 'wrap' }} component="div" disablePadding>
                  <CardContent>

                    <Typography variant="h5" fontSize={14} sx={{ mb: 1.5 }} color="text.f">
                      bu saytda birinchi ikki kunda bepulga reklama koring kiyin esa o'z statusingizga ega bo'ling <br></br>

                    </Typography>
                    <Typography variant="h5" fontSize={14} sx={{ mb: 1.5 }} >
                      Do'stingizni taklig qiling va pul ishlang
                      <p onClick={() => {
                        navigate("/profile")
                      }} style={{ display: "inline", color: "blue" }}> ustiga bosing</p>
                    </Typography>
                  </CardContent>
                </List>
              </Collapse>
            </CardContent>
          </List>
        </Collapse>




        <ListItemButton onClick={() => {
          handleClick(4)
        }}>
          <ListItemIcon>
            <WorkspacePremiumIcon />
          </ListItemIcon>
          <ListItemText primary="status olish" />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List style={{ display: 'flex', flexWrap: 'wrap' }} component="div" disablePadding>
            {
              status.map((st, index) => {
                return <div style={{
                  boxShadow: '1px 2px 9px #000f0f', margin: '1em',
                  padding: '0.5em',
                }} key={index}>
                  <Box sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography sx={{ color: 'yellowgreen', fontSize: 14 }} color="text.secondary" gutterBottom>
                        {st.name}
                      </Typography>
                      <Typography variant="h5" component="div">
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Narxi: {st.price} UZS
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        bir kunda: {st.how_many_ads} reklama ko'ra olasiz
                      </Typography>
                      <Typography variant="body2">
                        har bir ko'rilgan reklama uchun : {st.ads_pay} UZS olasiz

                      </Typography>
                      <Button onClick={() => {
                        handleConnect(st._id)
                      }}>
                        ulanish
                      </Button>
                    </CardContent>
                  </Box></div>
              })
            }
          </List>
        </Collapse>





        <ListItemButton onClick={() => {
          navigate("/profile/#nested-list-subheader")
        }}>
          <ListItemIcon>
            <PriceCheckIcon />
          </ListItemIcon>
          <ListItemText primary="hisobni to'ldirish" />
          <ExpandMore />
        </ListItemButton>


        <ListItemButton onClick={() => {
          navigate("/profile/#nested-list-subheader")
        }}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="pul yichish" />
          <ExpandMore />
        </ListItemButton>
        {!errors ? (
          <Card raised={true}>
            <CardHeader title={`reklama ${userinfo.ads_number} / ${userinfo.status_ads}`} />
            <CardActionArea onClick={handleVideoClick}>
              <CardContent
                component='text'
                values={`name ${adData?.name}`}
              />
              <CardMedia
                component='video'
                loop={loop}
                autoPlay={true}
                onClick={handleVideoClick}
                src={`${process.env.REACT_APP_URL}/ads/video/${adData?._id}`}
              />
              <Link onClick={handleVideoClick} style={{ fontSize: "20px" }} target='_blank' href={`${adData?.link}`}>ko'rish</Link>

            </CardActionArea>
          </Card>
        ) : (<Card raised={true}>
          <CardHeader title={`reklama ${userinfo.ads_number} / ${userinfo.status_ads}`} />

          <CardHeader title={errors} />

        </Card>)}



      </div><div style={{display:'flex',justifyContent:'center'}}>
      
      <Tooltip  onClick={()=>{
        window.open("https://t.me/sayt_pulbor");
      }} title="telegran kanal">
        <IconButton>
          <ChatIcon />
        </IconButton>
      </Tooltip>
      <Tooltip onClick={()=>{
        window.open("https://t.me/guruh_pulbor");
      }} title="telegram group">
        <IconButton>
          <GroupsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip onClick={()=>{
        window.open("https://t.me/pulbor_admin");
      }} title="manager">
        <IconButton>
        
          <ManageAccountsIcon />
        </IconButton>
      </Tooltip>
      </div>
    </main>
  );
};

export default Main;
