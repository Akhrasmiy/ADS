import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Modal, NativeSelect, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const columns = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "user_id", headerName: "user id", width: 130 },
  { field: "full_name", headerName: "full name", width: 130 },
  { field: "card_number", headerName: "card number", width: 200 },
  { field: "summa", headerName: "summa", width: 180 },

  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    width: 160,
  },
];

const Admin = () => {
  const [personName, setPersonName] = React.useState([]);
  const navigate = useNavigate();
  const [openm, setOpenm] = React.useState(false);
  const [row, setrow] = React.useState({});
  const [statuss, setstatuss] = React.useState([]);
  const [rows, setrows] = React.useState([]);
  const handleOpen = () => setOpenm(true);
  const handlemClose = () => setOpenm(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/users`).then((res) => [
      // console.log(res.data.data)
      setrows(res.data.data),
    ]);
    axios
      .get(`${process.env.REACT_APP_URL}/response`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => [
        // console.log(res.data.data)
        setrows(res.data.data),
      ]);
    axios.get(`${process.env.REACT_APP_URL}/status`).then((res) => {
      console.log(res.data.data);
      setstatuss(res.data.data);
    });
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRowClick = (params) => {
    handleOpen();
    setrow(params.row);
    console.log(params.row); // Qatorga bosinganda ma'lumotlarni ko'rish
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_URL}/response/${row.id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(1);
      });
  };
  const handleSubmit2 = () => {
    axios
      .delete(`${process.env.REACT_APP_URL}/response/${row.id}`, {
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
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value);
    setPersonName(value);
  };
  return (
    <main className="mai6n">
      <Modal
        open={openm}
        onClose={handlemClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
                     id:{row.id} <br/>
                    balance:{row.balance} <br/>
                    firstName:{row.first_name} <br/>
                    status:{row.statusName}
                </Box> */}
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            id : {row.id}
            <br />
            karta raqam : {row.card_number}
            <br />
            foydalanuvchi ismi : {row.full_name}
            <br />
            pul miqdori : {row.summa}
            <br />
            foydalanuvchi emaili : {row.email}
            <br />
            foydalanuvchi id : {row.user_id}
            <br />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              bajarildi
            </Button>
          </Grid>

          <Button
            type="button"
            onClick={handleSubmit2}
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            bekor qilindi
          </Button>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <p
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    foydalanuvchilar
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p
                    onClick={() => {
                      navigate("/admin/response");
                    }}
                  >
                    pul yichishga so'rovlar
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p
                    onClick={() => {
                      navigate("/admin/status");
                    }}
                  >
                    status
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p
                    onClick={() => {
                      navigate("/admin/ads");
                    }}
                  >
                    reklama
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p
                    onClick={() => {
                      navigate("/admin/userresponse");
                    }}
                  >
                    pul to'landi so'rovlar
                  </p>
                </MenuItem>
              </Menu>
            </div>
            <Grid container justifyContent="center">
              <Grid align="center" item>
                Pul yichish uchun so'rovlar
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
      </div>
    </main>
  );
};

export default Admin;
