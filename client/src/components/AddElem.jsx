import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';
import Button from "@mui/material/Button";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Header from '../layout/header';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, CardContent, FormControl, FormGroup, Grid, TextField, Typography } from '@mui/material';
const { Option } = Select;
const Addelem = () => {
    const [userinfo, setuserinfo] = useState({});
    const [status, setstatus] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/users/me`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                setuserinfo(response.data.data)
            })
        axios
            .get(`${process.env.REACT_APP_URL}/status`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                setstatus(response.data.data)
                console.log(response.data.data)
            })
    }, []);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios
            .post(`${process.env.REACT_APP_URL}/responseStatus/`, data, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(1);
            });
    };
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get("summa")<50000){
            alert("minimal pul yichish 50000")
        }
        axios
            .post(`${process.env.REACT_APP_URL}/response`, data, {
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
    const handleClick = (which) => {
        if (which == 1)
            setOpen1(!open1);
        if (which == 2)
            setOpen2(!open2);
        if (which == 3)
            setOpen3(!open3);
        if (which == 4)
            setOpen4(!open4);
        if (which == 5)
            setOpen5(!open5);
    };
    const handleConnect = (id) => {

        axios
            .get(`${process.env.REACT_APP_URL}/status/connect/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                // window.location.reload()
            })
            .catch((error) => {
                console.log(1);
            });
    };

    return (
        <>
        <Header/>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", }}>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            profile
                        </ListSubheader>
                    }
                >

                    <ListItemButton onClick={() => {
                        handleClick(1)
                    }}>
                        <ListItemIcon>
                            <PermIdentityIcon />
                        </ListItemIcon>
                        <ListItemText primary="shaxsiy ma'lumotlaringiz" />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                ID: {userinfo?.user?._id}<br /><br />
                                ism: {userinfo?.user?.first_name} {userinfo?.user?.last_name}<br /><br />
                                balansingiz: {userinfo?.user?.balance} UZS<br /><br />
                                Emailingiz: {userinfo?.user?.email}<br /><br />
                                sizning statusingiz: {userinfo?.status_name}<br /><br />
                                bugungi ko'rgan reklamalaringiz soni: {userinfo?.ads_number}<br /><br />
                                bugun ko'ra oladigan reklamalaringiz soni: {userinfo?.status_ads}<br /><br />
                                ruyhatdan o'tgan vaqtigiz: {String(userinfo?.user?.created_at).split("T")[0]}<br /><br />
                                taklif qilgan do'stlariz soni: {userinfo?.user?.suggest_people}<br /><br />

                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {
                        handleClick(2)
                    }}>
                        <ListItemIcon>
                            <PriceCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="hisobni to'ldirish" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} display='flex' justifyContent='center' sm={12}>
                                        <div>
                                            <p>screen shotni kirit</p>
                                            <p>karta raqam {process.env.REACT_APP_CARD}</p>
                                            <TextField
                                                required
                                                style={{ maxWidth: "300px" }}
                                                fullWidth
                                                id="img"
                                                label="screen shotni kiriting"
                                                name="img"
                                                type="file"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                style={{ maxWidth: "300px", display: 'block' }}

                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                yuborish
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>

                            </Box>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {
                        handleClick(3)
                    }}>
                        <ListItemIcon>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText primary="pul yichish" />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Box component="form" noValidate onSubmit={handleSubmit2} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="card_number"
                                            required
                                            fullWidth
                                            id="card_number"
                                            label="karta raqamni kiriting"
                                            autoFocus
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            type='number'
                                            fullWidth
                                            id="summa"
                                            label="pul miqdori"
                                            name="summa"
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    yuborish
                                </Button>
                            </Box>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {
                        handleClick(5)
                    }}>
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="do'stimni taklif qilish" />
                        {open5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Box component="form" style={{ alignItems: 'center' }} noValidate onSubmit={handleSubmit2} sx={{ mt: 3 }}>
                                <div>
                                    <FormGroup row>
                                        <TextField style={{ width: "75%", marginLeft: '20px' }} variant="outlined"
                                            disabled
                                            defaultValue={`${process.env.REACT_APP_URL_F}/regester?taklif=${userinfo?.user?._id}`} />
                                        <Button onClick={() => { navigator.clipboard.writeText(`${process.env.REACT_APP_URL_F}/regester?taklif=${userinfo?.user?._id}`) }} disableElevation>
                                            <ListItemIcon>
                                                <ContentCopyIcon />
                                            </ListItemIcon>
                                        </Button>
                                    </FormGroup>
                                </div>
                            </Box>
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
                </List></div>
        </>);
}

export default Addelem