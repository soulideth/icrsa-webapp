import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../Dashboard_Style";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIssuerList } from "../../../features/Connect/Connect";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { LinkApi } from "../../../ApiConnection";
const IssueEdit = ({
  ModalOpen,
  setopenAlertStatus,
  setMessageStatus,
  setalertStatus,
}) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);
  const [formInput, setFormInput] = useState(useSelector(selectIssuerList));
  const [dataLocation, setDataLocation] = useState([]);
  const [dataPriority, setdataPriority] = useState([]);
  const [dataCategory, setdataCategory] = useState([]);
  const [dataStatus, setdataStatus] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState("Error");
  useEffect(() => {
    async function Getdata() {
      axios
        .get(LinkApi + "api/Issue/GetLocation", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setDataLocation(response.data);
        });
      axios
        .get(LinkApi + "api/Issue/GetPriority", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setdataPriority(response.data);
        });
      axios
        .get(LinkApi + "api/Issue/GetCategory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setdataCategory(response.data);
        });
      axios
        .get(LinkApi + "api/Issue/GetStatus", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setdataStatus(response.data);
        });
    }
    Getdata();
    // setGetIDlocation("92");
  }, []);
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
    console.log(formInput);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(LinkApi + "api/Issue/PutIssue/" + formInput.ref, formInput, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessageStatus(
            "your issue ref : " + formInput.ref + " has been updated."
          );
          setalertStatus("success");
          setopenAlertStatus(true);
          ModalOpen(false);

          //window.location.reload();
        } else {
          setMessage("Error code " + response.status);
          setOpenAlert(true);
        }
        // function AlertErrorCode() {
        //   setMessage("Error code " + response.status);
        //   setOpenAlert(true);
        // }
        // response.status === 200 ? window.location.reload() : AlertErrorCode();
      })
      .catch((error) => {
        setMessage(String(error));
        setOpenAlert(true);
        // return error;
      });
  };
  return (
    <Paper className={fixedHeightPaper} style={{ paddingTop: "25px" }}>
      <Card variant="outlined" style={{ overflow: "auto" }}>
        <CardHeader title={"Modify Issue " + formInput.ref} />
        <Collapse in={openAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {Message}
          </Alert>
        </Collapse>
        <CardContent spacing={4}>
          <form onSubmit={handleSubmit}>
            <div style={{ height: "80vh", width: "100%" }}>
              <Grid container alignItems="flex-start" spacing={4}>
                {/*  Right body */}
                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    spacing={2}
                    style={{ border: "0.5px solid lightgrey" }}
                  >
                    <Grid item xs={12}>
                      <Typography align="center">Issue to fill</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="issuer"
                        label="Issuer"
                        variant="outlined"
                        fullWidth
                        value={formInput.issuer}
                        onChange={handleInput}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        // className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Location
                        </InputLabel>
                        <Select
                          name="department"
                          label="Location"
                          id="department"
                          required
                          value={formInput.department}
                          onChange={handleInput}
                        >
                          {dataLocation.map((each) => (
                            <MenuItem
                              key={each.department_id}
                              value={each.department_id}
                            >
                              {each.department_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="issueName"
                        label="Issue Name"
                        variant="outlined"
                        value={formInput.issueName}
                        onChange={handleInput}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={formInput.description}
                        onChange={handleInput}
                        rows={3}
                        multiline
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="timelineFrom"
                        label="Time line Form"
                        type="time"
                        defaultValue={formInput.timelineFrom}
                        Value={formInput.timelineFrom}
                        onChange={handleInput}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="timelineTo"
                        label="Time line To"
                        type="time"
                        defaultValue={formInput.timelineTo}
                        Value={formInput.timelineTo}
                        onChange={handleInput}
                        // defaultValue={date}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="issueDate"
                        label="Issue Date"
                        type="datetime-local"
                        value={formInput.issueDate}
                        onChange={handleInput}
                        // defaultValue={date}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/*  left body */}
                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    spacing={2}
                    style={{ border: "0.5px solid lightgrey" }}
                  >
                    <Grid item xs={12}>
                      <Typography align="center">Helpdesk Use All</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        // className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Priority
                        </InputLabel>
                        <Select
                          name="priority"
                          label="Priority"
                          value={formInput.priority}
                          onChange={handleInput}
                        >
                          {dataPriority.map((each) => (
                            <MenuItem
                              key={each.priority_id}
                              value={each.priority_id}
                            >
                              {each.priority_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        // className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Category
                        </InputLabel>
                        <Select
                          label="Category"
                          name="category"
                          value={formInput.category}
                          onChange={handleInput}
                          required
                        >
                          {dataCategory.map((each) => (
                            <MenuItem
                              key={each.category_id}
                              value={each.category_id}
                            >
                              {each.category_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="actionTaken"
                        label="Action"
                        variant="outlined"
                        value={formInput.actionTaken}
                        onChange={handleInput}
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="resolution"
                        label="Resolution"
                        variant="outlined"
                        value={formInput.resolution}
                        onChange={handleInput}
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="assignedTo"
                        label="Assigned To"
                        value={formInput.assignedTo}
                        onChange={handleInput}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="closeBy"
                        label="Close By"
                        value={formInput.closeBy}
                        onChange={handleInput}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="closeDate"
                        value={formInput.closeDate}
                        onChange={handleInput}
                        label="Close Date"
                        type="datetime-local"
                        // defaultValue={date}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        // className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Priority
                        </InputLabel>
                        <Select
                          name="status"
                          label="Status"
                          value={formInput.status}
                          onChange={handleInput}
                        >
                          {dataStatus.map((each) => (
                            <MenuItem
                              key={each.status_id}
                              value={each.status_id}
                            >
                              {each.status_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        name="closeComment"
                        label="Close Comment"
                        variant="outlined"
                        value={formInput.closeComment}
                        onChange={handleInput}
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    spacing={1}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default IssueEdit;
