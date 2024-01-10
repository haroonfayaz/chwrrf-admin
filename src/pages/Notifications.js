import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import DataTable from "react-data-table-component";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createNotify, getAllNotifications } from "../api";

const Notifications = () => {
  const [notifications, setNotification] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
    date: null,
  });

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.title}</div>,
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
      name: "Date",
      selector: "date",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.date}</div>,
    },
    {
      name: "Updated date",
      selector: "update_date",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.update_date}</div>,
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" || name === "updateDate") {
      setFormData({ ...formData, [name]: value ? new Date(value) : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const fetchNotify = async () => {
    try {
      const eventsData = await getAllNotifications();
      setNotification(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchNotify();
  }, []);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "form data");
    try {
      const response = await createNotify(formData);
      console.log("POST Response:", response);

      fetchNotify();

      setFormData({
        name: "",
        link: "",
        description: "",
        photo:null,
      });
    } catch (error) {
      console.error("POST Error:", error);
    }
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      {!showForm && (
        <React.Fragment>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h3">Notification Details</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
                Add Notification
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
              Notifications
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
                <Grid item xs={12} md={5} lg={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Date"
                        value={formData.date}
                        onChange={(date) =>
                          handleChange({
                            target: { name: "date", value: date },
                          })
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
            
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth>
                    <TextField
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
                <Grid item xs={12}>
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
          data={notifications}
        />
      </div>
    )}
    </>
  );
};

export default Notifications;
