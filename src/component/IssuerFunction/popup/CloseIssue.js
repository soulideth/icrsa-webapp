import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GavelRoundedIcon from "@material-ui/icons/GavelRounded";
import axios from "axios";
import { selectIssuerList } from "../../../features/Connect/Connect";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { LinkApi } from "../../../ApiConnection";
import { useHistory } from "react-router";
const openAlert = ({
  ModalOpen,
  setopenAlertStatus,
  setMessageStatus,
  setalertStatus,
}) => {
  const currentDate =
    format(new Date(), "yyyy-MM-dd") + "T" + format(new Date(), "HH:mm:ss");
  const [formInput, setFormInput] = useState(useSelector(selectIssuerList));
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
    console.log(formInput);
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(LinkApi + "api/Issue/PostCloseIssue/", formInput, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessageStatus(
            "your issue ref : " + formInput.ref + " has been Closed."
          );
          setalertStatus("success");
          setopenAlertStatus(true);
          ModalOpen(false);

          //window.location.reload();
        } else {
          setMessageStatus("Error code " + response.status);
          setalertStatus("error");
          setopenAlertStatus(true);
          ModalOpen(false);
        }
        //window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          setMessageStatus(String(error));
          setalertStatus("error");
          setopenAlertStatus(true);
          ModalOpen(false);
        }
        // return error;
      });
  };
  useEffect(() => {
    console.log(
      format(new Date(), "yyyy-MM-dd") + "T" + format(new Date(), "hh:mm:ss")
    );
    setFormInput({ ...formInput, closeDate: currentDate });
  }, []);
  return (
    <Paper style={{ paddingTop: "25px" }}>
      <Card variant="outlined" style={{ overflow: "auto" }}>
        <CardHeader
          title={"Do you want to close issue ref : " + formInput.ref + " ?"}
        />
        <CardContent spacing={4}>
          <form onSubmit={handleSubmit}>
            <div>
              <Grid item xs={12} sm={12}>
                <Grid
                  container
                  spacing={2}
                  style={{ border: "0.5px solid lightgrey" }}
                >
                  <Grid item xs={12}>
                    <Typography align="center">Detail Close</Typography>
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
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="closeDate"
                      value={formInput.closeDate}
                      //defaultValue={currentDate}
                      onChange={handleInput}
                      label="Close Date"
                      type="datetime-local"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
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

              <Grid tem xs={12} sm={12} style={{ paddingTop: "15px" }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      spacing={1}
                      startIcon={<GavelRoundedIcon />}
                    >
                      Close Issue
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CloseIssue;
