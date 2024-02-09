import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import DataTable from "react-data-table-component";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../eventApi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [dId, setDId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    photo: null,
  });
  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const columns = [
    {
      name: "Title",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.title}</div>,
    },

    {
      name: "Link",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.link}</div>,
    },
    {
      name: "Description",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.description}</div>,
    },

    {
      name: "Action",
      justifyContent: "center",
      cell: (row) => (
        <div>
          <IconButton
            color="primary"
            aria-label="Edit"
            onClick={() => handleGetUpdate(row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => handleOpen(row.id)}
            size="large"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        minHeight: "65px",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#5773ff",
        fontSize: "14px",
        color: "white",
        paddingLeft: "16px", // override the cell padding for data cells
        paddingRight: "auto",
        "&:hover div": {
          backgroundColor: "transparent",
          color: "white !important",
        },
        div: {
          color: "white !important",
        },
        span: {
          color: "white !important",
        },
      },
    },
    cells: {
      style: {
        paddingLeft: "2px", // override the cell padding for data cells
        paddingRight: "2px",
        pointer: "cursor",
        justifyContent: "center",
        textAlign: "center",
      },
    },
  };
  const fetchEvents = async () => {
    try {
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "form data");
  
    try {
      let response;
      if (edit) {
        formData.id = updateId;
        response = await updateEvent(updateId,formData);
      } else {
        response = await createEvent(formData);
      }

      fetchEvents();

      setFormData({
        title: "",
        link: "",
        description: "",
        photo: null,
      });
      setShowForm(false);
      setEdit(false);
    } catch (error) {
      console.error("POST Error:", error);
    }
  };
  const handleGetUpdate = async (eventId) => {
    console.log(eventId);
    try {
      const response = await getEvent(eventId, formData);
      console.log("Update Response:", response);
      setFormData({
        title: response.title,
        link: response.link,
        description: response.description,
        photo: response.photopath,
      });
      setShowForm(true);
      setUpdateId(eventId);
      setEdit(true)
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDelete = async (dId) => {
    try {
      await deleteEvent(dId);

      fetchEvents();
      setOpen(false);
    } catch (error) {
      console.error(`Error deleting event with ID ${dId}:`, error);
    }
  };
  const handleOpen = (discountId) => {
    setOpen(true);
    setDId(discountId);
  };
  const handleClose = () => {
    setOpen(false);
    setDId(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(dId)}>Yes</Button>
        </DialogActions>
      </Dialog>
      {!showForm && (
        <React.Fragment>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h3">Event Details</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
                Add Event
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 4 }} />
        </React.Fragment>
      )}
      {showForm && (
        <React.Fragment>
          <Typography variant="h3" gutterBottom style={{ margin: "10px" }}>
            <div style={{}}>
              Events
              <Button
                variant="contained"
                style={{ float: "right" }}
                color="primary"
                onClick={() => setShowForm(false)}
              >
                Back
              </Button>
            </div>
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <div style={{ display: "flex" }}>
            {" "}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <p style={{ margin: "10px", fontSize: "24px" }}>
                    Complete the following details.
                  </p>
                </Grid>

                <Grid item xs={12} md={5} lg={5}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="title"
                      label="Title"
                      autoComplete="name"
                      type="text"
                      variant="outlined"
                      value={formData.title}
                      onChange={handleChange}
                      aria-describedby="component-error-text"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="link"
                      label="Link"
                      autoComplete="link"
                      type="text"
                      variant="outlined"
                      value={formData.link}
                      onChange={handleChange}
                      aria-describedby="component-error-text"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={10} lg={10}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="description"
                      label="Description"
                      autoComplete="description"
                      type="text"
                      variant="outlined"
                      value={formData.description}
                      onChange={handleChange}
                      aria-describedby="component-error-text"
                      multiline
                      rows={4}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <FormControl>
                    <input
                      name="photo"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{
                        fontSize: "14px",
                        border: "none",
                        outline: "none",
                        borderRadius: "10px",
                        backgroundColor: "#5773FF",
                        padding: "10px",
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Button type="submit" variant="contained" color="primary">
                    {edit?"Update":"Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </React.Fragment>
      )}
      {!showForm && (
        <div className="ms-invoice-table table-responsive mt-2">
          <DataTable
            columns={columns}
            customStyles={customStyles}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
            data={events}
          />
        </div>
      )}
    </>
  );
};

export default Events;
