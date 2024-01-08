import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import dayjs from "dayjs";
import { IconButton, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import DataTable from "react-data-table-component";
import { getAllEvents, createEvent, updateEvent } from "../api";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; // Import the PhotoCamera icon for a visual cue

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    photo: null,
  });
  const fileInputRef = useRef(null);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.name}</div>,
    },

    {
      name: "Link",
      selector: "link",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.link}</div>,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.description}</div>,
    },

    {
      name: "Action",
      selector: "id",
      justifyContent: "center",
      cell: (row) => (
        <div>
          <IconButton color="primary" aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => handleDelete(row.id)}
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "form data");
    try {
      const response = await createEvent(formData);
      console.log("POST Response:", response);

      fetchEvents();

      setFormData({
        name: "",
        link: "",
        description: "",
      });
    } catch (error) {
      console.error("POST Error:", error);
    }
  };
  const handleUpdate = async (eventId) => {
    try {
      const response = await updateEvent(eventId, formData);
      console.log("Update Response:", response);

      fetchEvents();

      setFormData({
        name: "",
        link: "",
        description: "",
      });
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
  };
  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  return (
    <>
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
                <Grid xs={12} md={12} lg={12}>
                  <p style={{ margin: "10px", fontSize: "24px" }}>
                    Complete the following details.
                  </p>
                </Grid>

                <Grid item xs={12} md={5} lg={5}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="name"
                      label="Title"
                      autoComplete="name"
                      type="text"
                      variant="outlined"
                      value={formData.name}
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
                      onChange={handleChange}
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
                    Submit
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
