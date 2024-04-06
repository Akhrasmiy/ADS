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
import { Box, CardContent, FormControl, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const { Option } = Select;
const Payments = () => {
    const [userinfo, setuserinfo] = useState([]);
    const [status, setstatus] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/users/me`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                setuserinfo(response.data.data.payments)
            })
    }, []);

    return (
        <>
            <Header />
            
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", }}>

                <div style={{ height: 400 }}>
                    
                    <TableContainer component={Paper}>
                    <h3 style={{textAlign:'center'}}>Payments</h3>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">summa</TableCell>
                                    <TableCell align="center">sana</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userinfo?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.el.summa}</TableCell>
                                        <TableCell  align="center">{(new Date(row.el.created_at)).toISOString().slice(0, 10)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>);
}

export default Payments