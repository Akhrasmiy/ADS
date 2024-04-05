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
import {
  Grid,
  Modal,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
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
  { field: "_id", headerName: "ID", width: 220 },
  { field: "name", headerName: "name", width: 130 },
  { field: "how_many_see", headerName: "how many people see", width: 200 },
  {
    field: "video",
    headerName: "video",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${process.env.REACT_APP_URL}/ads/videos/${params.row.id}`,
  },
  { field: "active", headerName: "active", width: 100 },
];

const Admin = () => {
  const [personName, setPersonName] = React.useState([]);
  const navigate = useNavigate();
  const [openm, setOpenm] = React.useState(false);
  const [openm2, setOpenm2] = React.useState(false);
  const [row, setrow] = React.useState({});
  const [statuss, setstatuss] = React.useState([]);
  const [rows, setrows] = React.useState([]);
  const handleOpen = () => setOpenm(true);
  const handlemClose = () => setOpenm(false);
  const handleOpen2 = () => setOpenm2(true);
  const handlemClose2 = () => setOpenm2(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/ads`).then((res) => {
      setstatuss(res.data.data);
    });
  }, []);
  console.log(statuss);
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
    const data = new FormData(event.currentTarget);
    axios
      .post(`${process.env.REACT_APP_URL}/ads/`, data, {
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
    axios
      .put(`${process.env.REACT_APP_URL}/ads/${row._id}`, data, {
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
        <Box sx={style} component="form" onSubmit={handleSubmit2} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                defaultValue={row.name}
                label="reklama nomi"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="how_many_people"
                type="number"
                disabled
                defaultValue={row.how_many_see}
                label="nechta user buni ko'rdi"
                name="price"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="link"
                label="link"
                defaultValue={row.link}
                name="link"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={row.active}
                name="active"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="active"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="disactive"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href={`${process.env.REACT_APP_URL}/ads/video/${row.id}`}>
                videosi
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            saqlash
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
                Reklama
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        open={openm2}
        onClose={handlemClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="reklama nomi"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="link"
                label="link"
                name="link"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="video"
                label="video"
                name="video"
                type="file"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            saqlash
          </Button>
        </Box>
      </Modal>
      <Button
        variant="contained"
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={handleOpen2}
      >
        reklama qo'shish
      </Button>
      <div style={{}}>
        <DataGrid
          rows={statuss}
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
