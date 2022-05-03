import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "../Dashboard_Style";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { LinkApi } from "../../ApiConnection";
import { format } from "date-fns";
import { useHistory } from "react-router";
export const Home = () => {
  const dateToday = format(new Date(), "dd MMMM, yyyy");
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);
  const [chartdata, setchartdata] = useState({});
  const [pieChartdata, setpieChartdata] = useState({});
  const [countStatusDetail, setCountStatusDetail] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const history = useHistory();
  const getData = async () => {
    try {
      const IssueCount = await axios
        .get(LinkApi + `api/Issue/GetIssueCount`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            history.push("/login");
          }
        });
      setchartdata({
        // labels: IssueCount.data.map((e) => format(new Date(e.issueDate),"yyyy-MM-dd")),
        labels: Object.keys(IssueCount.data),
        datasets: [
          {
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            label: "Issue Count ",
            borderWidth: 1,
            //data: IssueCount.data.map((e) => e.countIssue),
            data: Object.values(IssueCount.data),
          },
        ],
      });
      // const CountCategory = await axios.get(
      //   LinkApi + `api/Issue/GetCountCategory`, {
      //    headers: {
      //      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      //    },
      //  }
      // );
      // setpieChartdata({
      //   // labels: IssueCount.data.map((e) => format(new Date(e.issueDate),"yyyy-MM-dd")),
      //   labels: Object.keys(CountCategory.data),
      //   datasets: [
      //     {
      //       backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)',
      // ],
      //       label: "Issue Count",
      //       borderWidth: 1,
      //       //data: IssueCount.data.map((e) => e.countIssue),
      //       data: Object.values(CountCategory.data),
      //     },
      //   ],
      // });

      const CountStatus = await axios
        .get(LinkApi + `api/Issue/GetCountStatus`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            history.push("/login");
          }
        });
      setCountStatusDetail(CountStatus.data);
      setpieChartdata({
        // labels: IssueCount.data.map((e) => format(new Date(e.issueDate),"yyyy-MM-dd")),
        labels: ["Open", "Closed", "Dropped", "Unresolved", "Pending-Closure"],
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            label: "Category",
            borderWidth: 1,
            //data: IssueCount.data.map((e) => e.countIssue),
            data: Object.values(CountStatus.data),
          },
        ],
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  //console.log("set data", countStatusDetail["1"]);
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          {/* Recent Orders */}
          <Grid item xs={12} spacing={3}>
            <Paper style={{ display: "flex" }}>
              <Grid item xs={12} md={4} lg={3} style={{ padding: "5px" }}>
                <Paper className={fixedHeightPaper}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                    >
                      New Issue
                    </Typography>
                    <Typography component="p" variant="h3" align="center">
                      {countStatusDetail["1"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{
                        flex: 1,
                      }}
                    >
                      {dateToday}
                    </Typography>
                    <div align="center">View balance</div>
                  </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ padding: "5px" }}>
                <Paper className={fixedHeightPaper}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                    >
                      Closed Issue
                    </Typography>
                    <Typography component="p" variant="h3" align="center">
                      {countStatusDetail["2"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{
                        depositContext: {
                          flex: 1,
                        },
                      }}
                    >
                      {dateToday}
                    </Typography>
                    <div align="center">View balance</div>
                  </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ padding: "5px" }}>
                <Paper className={fixedHeightPaper}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                    >
                      Dropped Issue
                    </Typography>
                    <Typography component="p" variant="h3" align="center">
                      {countStatusDetail["3"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{
                        depositContext: {
                          flex: 1,
                        },
                      }}
                    >
                      {dateToday}
                    </Typography>
                    <div align="center">View balance</div>
                  </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ padding: "5px" }}>
                <Paper className={fixedHeightPaper}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                    >
                      Unresolved Issue
                    </Typography>
                    <Typography component="p" variant="h3" align="center">
                      {countStatusDetail["4"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{
                        depositContext: {
                          flex: 1,
                        },
                      }}
                    >
                      {dateToday}
                    </Typography>
                    <div align="center">View balance</div>
                  </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ padding: "5px" }}>
                <Paper className={fixedHeightPaper}>
                  <React.Fragment>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      align="center"
                      gutterBottom
                    >
                      Pending Issue
                    </Typography>
                    <Typography component="p" variant="h3" align="center">
                      {countStatusDetail["5"]}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{
                        depositContext: {
                          flex: 1,
                        },
                      }}
                    >
                      {dateToday}
                    </Typography>
                    <div align="center">View balance</div>
                  </React.Fragment>
                </Paper>
              </Grid>
            </Paper>
          </Grid>
          {/* Chart */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper className={fixedHeightPaper}>
              <Bar data={chartdata} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper style={{ height: "100%" }}>
              <Pie data={pieChartdata} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
