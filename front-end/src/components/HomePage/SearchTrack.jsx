/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-08 12:08:20
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-12 17:18:02
 * @FilePath: /front-end/src/components/HomePage/SearchTrack.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { getTrackByName, getTrackByArtist,addTrackToList } from "../../api/track";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function SearchTrack() {
  const [trackList, setTrackList] = React.useState([]);
  const [searchByName, setSearchByName] = React.useState("");
  const [searchByArtist, setSearchByArtist] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [addopen, setAddOpen] = React.useState(false);
  const [track, setTrack] = React.useState({});
  const [listName, setListName] = React.useState("");
  const[toastOpen,setToastOpen] = React.useState(false);
  const[trackDetailOpen,setTrackDetailOpen] = React.useState(false);
  
  const handleTrackDetailOpen = () => {
    setTrackDetailOpen(true);
  };

  const handleTrackDetailClose = () => {
    setTrackDetailOpen(false);
  };

  const handleToastOpen = () => {
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const openTrackDialog = (track) => {
    setTrack(track)
    setAddOpen(true);
  }
  const closeTrackDialog = () => {
    setAddOpen(false);
    addTrackToList({listName:listName,track:track})
    .then((res) => {
        if(res.data.code === 200){
          handleToastOpen();
          setMessage(res.data.msg);
        } else{
          setMessage(res.data.msg);
          handleClickOpen();
        }

      })
      .catch((error) => {
        setMessage(error.response.data.msg);
        handleClickOpen();
      });

  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchByName = () => {
    getTrackByName(searchByName)
      .then((res) => {
        var filteredList = res.data.data.filter(function(value, index, arr){
            return value.visibility !== false;
        });
        setTrackList(filteredList);
      })
      .catch((error) => {
        setMessage(error.response.data.msg);
        handleClickOpen();
      });
      setSearchByName("");
  };
  const handleSearchByArtist = () => {
    getTrackByArtist(searchByArtist)
      .then((res) => {
        setTrackList(res.data.data);
      })
      .catch((error) => {
        setMessage(error.response.data.msg);
        handleClickOpen();
      });
      setSearchByArtist("");
  };

  const OnSearchByNameChange = (event) => {
    setSearchByName(event.target.value);
  };
  const OnSearchByArtistChange = (event) => {
    setSearchByArtist(event.target.value);
  };

  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mb: 3,
          mt: 2,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Track By Track Name"
          inputProps={{ "aria-label": "search tracks" }}
          onChange={OnSearchByNameChange}
          value = {searchByName}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            handleSearchByName();
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          mb: 3,
          mt: 0,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Track By Artist Name"
          inputProps={{ "aria-label": "search tracks" }}
          onChange={OnSearchByArtistChange}
          value = {searchByArtist}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            handleSearchByArtist();
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Search Track
      </Typography>
      <Table size="large" sx={{ flexGrow: 1, mb: 7 }}>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: 'bold' }}>Track Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Artist Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Album</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} >Add To List</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">On Youtube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackList.map((track) => (
            <TableRow key={track.track_id}>
              <TableCell onClick={()=>{setTrack(track);handleTrackDetailOpen()}}>{track.track_title}</TableCell>
              <TableCell>{track.artist_name}</TableCell>
              <TableCell>{track.track_duration}</TableCell>
              <TableCell>{track.album_title}</TableCell>
              <TableCell><Button variant="text" onClick={()=>{openTrackDialog(track)}}>+</Button></TableCell>
              <TableCell align="right"><Link variant="text" href={"https://www.youtube.com/results?search_query="+track.track_title} target="_blank">Check</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={addopen} onClose={handleClose}>
        <DialogTitle>Add to a List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a valid list name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event)=>{setListName(event.target.value)}}
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setAddOpen(false);}}>Cancel</Button>
          <Button onClick={closeTrackDialog}>Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
          Add to list Successfully
        </Alert>
      </Snackbar>

      <Dialog
        open={trackDetailOpen}
        onClose={handleTrackDetailClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {track.track_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Artist Name: " +track.artist_name}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {"Duration: "+track.track_duration}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {"Album: "+track.album_title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrackDetailClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}
