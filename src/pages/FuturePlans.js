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
import { createFuturePlan, deletePlan, getAllFuturePlans } from "../api";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  } from "@mui/material";

const FuturePlans = () => {
  const [plans, setPlan] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [dId, setDId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
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
      name: "Description",
      selector: "description",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.description}</div>,
    },
    {
      name: "Link",
      selector: "link",
      sortable: true,
      justifyContent: "center",
      cell: (row) => <div> {row.link}</div>,
    },

    {
      name: "Action",
      selector: "action",
      justifyContent: "center",
      cell: (row) => (
        <div>
          <IconButton
            color="primary"
            onClick={() => this.editShift(row)}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOpen(row.id)}
            aria-label="delete"
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
        //          minHeight: '70px', // override the row height
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

  const fetchPlans = async () => {
    try {
      const eventsData = await getAllFuturePlans();
      setPlan(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formdata");
    try {
      const response = await createFuturePlan(formData);

      console.log("Create Event Response:", response);
      getAllFuturePlans();
      setFormData({
        name: "",
        link: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deletePlan(id);

      fetchPlans();
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
        <DialogTitle id="alert-dialog-title">{"Delete Future Program?"}</DialogTitle>
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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h3">Future Plan Details</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
              >
                Add Plan
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
              Future PLans
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
            data={plans}
          />
        </div>
      )}
    </>
  );
};

export default FuturePlans;
