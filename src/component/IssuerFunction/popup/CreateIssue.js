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
import clsx from "clsx";
import useStyles from "../../Dashboard_Style";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import { format } from "date-fns";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { LinkApi } from "../../../ApiConnection";
import { useHistory } from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function CreateIssue({
  ModalOpen,
  setopenAlertStatus,
  setMessageStatus,
  setalertStatus,
}) {
  const currentDate =
    format(new Date(), "yyyy-MM-dd") + "T" + format(new Date(), "HH:mm:ss");
  const currentTime = format(new Date(), "HH:mm:ss");
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);
  const [dataLocation, setDataLocation] = useState([]);
  //  const [getIDlocation, setGetIDlocation] = useState("");
  const [dataPriority, setdataPriority] = useState([]);
  //  const [getIDPriority, setGetIDPriority] = useState("");
  const [dataCategory, setdataCategory] = useState([]);
  // const [getIDCategory, setGetIDCategory] = useState("");

  const [formInput, setFormInput] = useState({
    ref: 0,
    status: "1",
    issueName: "",
    issueDate: currentDate,
    issuer: "",
    department: "",
    description: "",
    priority: "",
    assignedTo: "",
    bookby: "",
    closeBy: "",
    closeDate: currentDate,
    category: "",
    actionTaken: "",
    resolution: "",
    closeComment: "",
    timelineFrom: currentDate,
    timelineTo: currentDate,
    bookingdate: currentDate,
  });
  const [openAlertErr, setOpenAlertErr] = useState(false);
  const [openAlertSuccess, setopenAlertSuccess] = useState(false);
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
    }
    Getdata();
    // setGetIDlocation("92");
    //console.log(window.location.origin);
  }, []);
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
    console.log(formInput);
  };
  const history = useHistory();
  //Summit
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(LinkApi + "api/Issue/PostIssue", formInput, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        setMessageStatus("your issue log with ref : " + response.data.ref);
        setalertStatus("success");
        setopenAlertStatus(true);
        setMessage("your issue log with ref : " + response.data.ref);
        setopenAlertSuccess(true);
        //ModalOpen(false);
        //window.location.reload();
        setFormInput({
          ...formInput,
          ref: 0,
          status: "1",
          issueName: "",
          issueDate: currentDate,
          issuer: "",
          description: "",
          assignedTo: "",
          bookby: "",
          closeBy: "",
          closeDate: currentDate,
          resolution: "",
          closeComment: "",
          timelineFrom: currentDate,
          timelineTo: currentDate,
        });
      })
      .catch((error) => {
        //alert();
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          setMessage(String(error));
          setOpenAlertErr(true);
        }
        // return error;
      });
  };
  useEffect(() => {
    console.log(formInput);
  }, [formInput]);
  return (
    <Paper className={fixedHeightPaper} style={{ paddingTop: "25px" }}>
      <Card variant="outlined" style={{ overflow: "auto" }}>
        <CardHeader title="Create Issue" />
        <Collapse in={openAlertErr}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlertErr(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {Message}
          </Alert>
        </Collapse>
        <Collapse in={openAlertSuccess}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenAlertSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {Message}
          </Alert>
        </Collapse>
        <CardContent>
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
                        <Autocomplete
                          name="department"
                          options={dataLocation}
                          getOptionLabel={(option) => option.department_name}
                          Value={formInput.department}
                          onChange={(evt, InputValue) => {
                            try {
                              setFormInput({
                                ...formInput,
                                department:
                                  InputValue[Object.keys(InputValue)[0]],
                              });
                            } catch (error) {
                              setFormInput({
                                ...formInput,
                                department: "",
                              });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Location"
                              variant="outlined"
                            />
                          )}
                        />
                        {/* <InputLabel id="demo-simple-select-outlined-label">
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
                        </Select> */}
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
                    {/* <Grid item xs={12} md={6}>
                      <TextField
                        name="timelineFrom"
                        label="Time line Form"
                        type="time"
                        value={formInput.timelineFrom}
                        onChange={handleInput}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={12} md={6}>
                        <KeyboardTimePicker
                          name="timelineFrom"
                          variant="outlined"
                          label="Time line Form"
                          value={formInput.timelineFrom}
                          required
                          ampm={false}
                          onChange={(data) => {
                            if (data != "" && data != null) {
                              setFormInput({
                                ...formInput,
                                timelineFrom: format(
                                  data,
                                  "yyyy-MM-dd HH:mm:ss"
                                ),
                              });
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    {/* <Grid item xs={12} md={6}>
                      <TextField
                        name="timelineTo"
                        label="Time line To"
                        type="time"
                        value={formInput.timelineTo}
                        onChange={handleInput}
                        // defaultValue={date}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={12} md={6}>
                        <KeyboardTimePicker
                          name="timelineTo"
                          variant="outlined"
                          label="ime line To"
                          value={formInput.timelineTo}
                          required
                          ampm={false}
                          onChange={(data) => {
                            if (data != "" && data != null) {
                              setFormInput({
                                ...formInput,
                                timelineTo: format(data, "yyyy-MM-dd HH:mm:ss"),
                              });
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    {/* <Grid item xs={12} md={12}>
                      <TextField
                        name="issueDate"
                        label="Issue Date"
                        type="datetime-local"
                        value={formInput.issueDate}
                        onChange={handleInput}
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={12} md={12}>
                        <KeyboardDatePicker
                          name="issueDate"
                          disableToolbar
                          variant="inline"
                          format="dd-MM-yyyy"
                          margin="normal"
                          label="Issue Date"
                          value={formInput.issueDate}
                          required
                          onChange={(data) => {
                            if (data != "" && data != null) {
                              setFormInput({
                                ...formInput,
                                issueDate: format(data, "yyyy-MM-dd HH:mm:ss"),
                              });
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
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
                        <Autocomplete
                          name="priority"
                          options={dataPriority}
                          getOptionLabel={(option) => option.priority_name}
                          Value={formInput.priority}
                          required
                          onChange={(evt, InputValue) => {
                            try {
                              setFormInput({
                                ...formInput,
                                priority:
                                  InputValue[Object.keys(InputValue)[0]],
                              });
                            } catch (error) {
                              setFormInput({
                                ...formInput,
                                priority: "",
                              });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Priority"
                              variant="outlined"
                            />
                          )}
                        />
                        {/* <InputLabel id="demo-simple-select-outlined-label">
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
                        </Select> */}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        // className={classes.formControl}
                      >
                        <Autocomplete
                          name="category"
                          options={dataCategory}
                          getOptionLabel={(option) => option.category_name}
                          Value={formInput.category}
                          required
                          onChange={(evt, InputValue) => {
                            try {
                              setFormInput({
                                ...formInput,
                                category:
                                  InputValue[Object.keys(InputValue)[0]],
                              });
                            } catch (error) {
                              setFormInput({
                                ...formInput,
                                category: "",
                              });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Category"
                              variant="outlined"
                            />
                          )}
                        />
                        {/* <InputLabel id="demo-simple-select-outlined-label">
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
                        </Select> */}
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

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={12} md={12}>
                        {/* <TextField
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
                      /> */}
                        <KeyboardDatePicker
                          name="closeDate"
                          disableToolbar
                          variant="inline"
                          format="dd-MM-yyyy"
                          margin="normal"
                          label="Close Date"
                          value={formInput.closeDate}
                          required
                          onChange={(data) => {
                            if (data != "" && data != null) {
                              setFormInput({
                                ...formInput,
                                closeDate: format(data, "yyyy-MM-dd HH:mm:ss"),
                              });
                            }
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

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
                    startIcon={<SaveIcon />}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default CreateIssue;
