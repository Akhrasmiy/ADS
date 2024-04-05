
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import logo from "./logo/Losts`1.png"

import React, { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';


function Header() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const [userinfo, setuserinfo] = useState({});
    const [status, setstatus] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users/me`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                setuserinfo(response.data.data)
            })
        axios
            .get(`http://localhost:3001/status`, {
                headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
                setstatus(response.data.data)
                console.log(response.data.data)
            })
    }, []);
    localStorage.setItem("src", "")
    return (
        <div className="header">
            <p onClick={() => {
                        { navigate('/payments') }
                    }} style={{ marginRight: 40,marginLeft: 40, textDecoration: 'none', color: 'white' }}>{userinfo?.user?.balance} UZS</p>

            <div className="header-nav">
                <ul className='head-ul'>
                    {/* <Link style={{ marginRight: 40, textDecoration: 'none', color: 'white' }} to="/addelem/topdim">{t("Topib oldim")}</Link> */}
                    <p style={{ marginRight: 40, textDecoration: 'none', color: 'white' }} onClick={() => {
                        { navigate('/') }
                    }}>{t("Home")}</p>
                    <p style={{ marginRight: 40, textDecoration: 'none', color: 'white' }} onClick={() => {
                        { navigate('/profile') }
                    }}>{t("Profile")}</p>
                </ul>
            </div>
        </div>
    );
}

export default Header;
