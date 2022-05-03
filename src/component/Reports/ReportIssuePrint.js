import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useStyles from "../Dashboard_Style";
import Moment from "moment";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import { LinkApi } from "../../ApiConnection";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import { useHistory } from "react-router";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ExportToExcel } from "../../features/ExportToExcel";
const ReportIssuePrint = () => {
  const classes = useStyles();
  const currentDate =
    format(new Date(), "yyyy-MM-dd") + "T" + format(new Date(), "HH:mm:ss");
  const [formInput, setFormInput] = useState({
    DateFrom: currentDate,
    DateTo: currentDate,
  });
  function CustomPagination(props) {
    const { state, api } = props;
    return (
      <Pagination
        className={classes.root}
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => api.current.setPage(value - 1)}
      />
    );
  }
  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }
  const columnsIssue2 = [
    { field: "fullName", headerName: "Booking By", width: 200 },
    { field: "bookingDate", headerName: "Booking Date", width: 200 },
    { field: "ref", headerName: "ref", width: 100 },
    { field: "issueName", headerName: "Issue Name", width: 250 },
    {
      field: "issueDate",
      headerName: "Issue Date",
      width: 200,
      renderCell: (params) => (
        <view>{Moment(params.getValue("issueDate")).format("yyyy-MM-DD")}</view>
      ),
    },
    {
      field: "timelineFrom",
      headerName: "Timeline From",
      width: 200,
      renderCell: (params) => (
        <view>
          {Moment(params.getValue("timelineFrom")).format("HH:mm:ss")}
        </view>
      ),
    },
    {
      field: "issuer",
      headerName: "Issuer",
      width: 150,
    },
    {
      field: "department_name",
      headerName: "Department",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
    {
      field: "category_name",
      headerName: "Category",
      width: 150,
    },
    {
      field: "resolution",
      headerName: "Resolution",
      width: 200,
    },
    {
      field: "closeBy",
      headerName: "Close By",
      width: 200,
    },
    {
      field: "closeDate",
      headerName: "Close Date",
      width: 200,
      renderCell: (params) => (
        <view>{Moment(params.getValue("closeDate")).format("yyyy-MM-DD")}</view>
      ),
    },
    {
      field: "timelineTo",
      headerName: "Timeline To",
      width: 200,
      renderCell: (params) => (
        <view>{Moment(params.getValue("timelineTo")).format("HH:mm:ss")}</view>
      ),
    },
  ];
  // const columnsIssue = [
  //   // { field: "ref", headerName: "ref", width: 100 },
  //   {
  //     field: "ref",
  //     headerName: "ref",
  //     width: 100,
  //     renderCell: (params) => (
  //       <strong>
  //         <IconButton
  //           size="small"
  //           color="primary"
  //           aria-label="Get Detail"
  //           component="span"
  //           style={{ marginLeft: 1 }}
  //         >
  //           {params.getValue("ref")}
  //         </IconButton>
  //       </strong>
  //     ),
  //   },
  //   { field: "fullName", headerName: "Booking By", width: 200 },
  //   { field: "issueDate", headerName: "Issue Date", width: 200 },
  //   { field: "assignedTo", headerName: "Assigned To", width: 150 },
  //   { field: "issueName", headerName: "Issue Name", width: 250 },
  //   {
  //     field: "issuer",
  //     headerName: "Issuer",
  //     width: 200,
  //   },

  //   {
  //     field: "department_name",
  //     headerName: "Department",
  //     width: 150,
  //   },
  //   {
  //     field: "category_name",
  //     headerName: "Category",
  //     width: 150,
  //   },
  //   {
  //     field: "description",
  //     headerName: "Description",
  //     width: 250,
  //   },
  //   {
  //     field: "closeDate",
  //     headerName: "Close Date",
  //     width: 200,
  //   },
  //   {
  //     field: "resolution",
  //     headerName: "Resolution",
  //     width: 200,
  //   },
  //   {
  //     field: "status_name",
  //     headerName: "Status",
  //     width: 150,
  //   },
  // ];
  const [IssueList, setIssueList] = useState([]);
  const [IssueListFind, setIssueListFind] = useState([]);
  const [IssueListExcel, setIssueListExcel] = useState([]);
  const fixedHeightPaper = clsx(classes.paper);
  const history = useHistory();
  async function LoadIssueListReport() {
    await axios
      .get(LinkApi + "api/Issue/GetIssueDetail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        setIssueList(response.data);
        setIssueListFind(response.data);
        const ListExcel = response.data.map(function (obj) {
          return {
            fullName: obj.fullName,
            bookingDate: Moment(obj.bookingDate).format("DD-MM-yyyy"),
            ref: obj.ref,
            issueName: obj.issueName,
            issueDate: Moment(obj.issueDate).format("DD-MM-yyyy"),
            timelineFrom: Moment(obj.timelineFrom).format("HH:mm:ss"),
            issuer: obj.issuer,
            department_name: obj.department_name,
            description: obj.description,
            assignedTo: obj.assignedTo,
            category_name: obj.category_name,
            resolution: obj.resolution,
            closeBy: obj.closeBy,
            closeDate: Moment(obj.closeDate).format("DD-MM-yyyy"),
            timelineTo: Moment(obj.timelineTo).format("HH:mm:ss"),
          };
        });
        setIssueListExcel(ListExcel);
        //console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      });
  }
  function FindItem() {
    if (formInput.DateFrom !== null && formInput.DateTo !== null) {
      // setIssueListFind(
      //   IssueList.filter((obj) => {
      //     return (
      //       format(obj.issueDate, "yyyyMMdd") >=
      //         format(formInput.DateFrom, "yyyyMMdd") &&
      //       format(obj.issueDate, "yyyyMMdd") <=
      //         format(formInput.DateTo, "yyyyMMdd")
      //     );
      //   })
      // );
      const List = IssueList.filter((obj) => {
        return (
          Moment(obj.issueDate).format("yyyyMMDD") >=
            Moment(formInput.DateFrom).format("yyyyMMDD") &&
          Moment(obj.issueDate).format("yyyyMMDD") <=
            Moment(formInput.DateTo).format("yyyyMMDD")
        );
      });
      const ListExcel = List.map(function (obj) {
        return {
          fullName: obj.fullName,
          bookingDate: Moment(obj.bookingDate).format("DD-MM-yyyy"),
          ref: obj.ref,
          issueName: obj.issueName,
          issueDate: Moment(obj.issueDate).format("DD-MM-yyyy"),
          timelineFrom: Moment(obj.timelineFrom).format("HH:mm:ss"),
          issuer: obj.issuer,
          department_name: obj.department_name,
          description: obj.description,
          assignedTo: obj.assignedTo,
          category_name: obj.category_name,
          resolution: obj.resolution,
          closeBy: obj.closeBy,
          closeDate: Moment(obj.closeDate).format("DD-MM-yyyy"),
          timelineTo: Moment(obj.timelineTo).format("HH:mm:ss"),
        };
      });
      setIssueListFind(List);
      setIssueListExcel(ListExcel);
    } else {
      const ListExcel = IssueList.map(function (obj) {
        return {
          fullName: obj.fullName,
          bookingDate: Moment(obj.bookingDate).format("DD-MM-yyyy"),
          ref: obj.ref,
          issueName: obj.issueName,
          issueDate: Moment(obj.issueDate).format("DD-MM-yyyy"),
          timelineFrom: Moment(obj.timelineFrom).format("HH:mm:ss"),
          issuer: obj.issuer,
          department_name: obj.department_name,
          description: obj.description,
          assignedTo: obj.assignedTo,
          category_name: obj.category_name,
          resolution: obj.resolution,
          closeBy: obj.closeBy,
          closeDate: Moment(obj.closeDate).format("DD-MM-yyyy"),
          timelineTo: Moment(obj.timelineTo).format("HH:mm:ss"),
        };
      });
      setIssueListFind(IssueList);
      setIssueListExcel(ListExcel);
    }
  }
  useEffect(() => {
    LoadIssueListReport();
    FindItem();
  }, []);
  useEffect(() => {
    FindItem();
  }, [formInput]);
  return (
    <div>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    name="DateFrom"
                    label="Date From"
                    required
                    ampm={false}
                    value={formInput.DateFrom}
                    onChange={(data) => {
                      setFormInput({
                        ...formInput,
                        DateFrom: format(data, "yyyy-MM-dd HH:mm:ss"),
                      });
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    name="DateTo"
                    label="Date To"
                    required
                    ampm={false}
                    value={formInput.DateTo}
                    onChange={(data) => {
                      setFormInput({
                        ...formInput,
                        DateTo: format(data, "yyyy-MM-dd HH:mm:ss"),
                      });
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </MuiPickersUtilsProvider>
                <ExportToExcel
                  apiData={IssueListExcel}
                  fileName={"ReportIssue"}
                />
              </Grid>

              <Card variant="outlined">
                <CardHeader title="Report Issue" />
                <div style={{ height: "80vh", width: "100%" }}>
                  <DataGrid
                    rows={IssueListFind}
                    columns={columnsIssue2}
                    pageSize={11}
                    rowsPerPageOptions={[11, 20, 30, 100]}
                    pagination
                    getRowId={(row) => row.ref}
                    components={{
                      LoadingOverlay: CustomLoadingOverlay,
                      Toolbar: GridToolbar,
                      Pagination: CustomPagination,
                    }}
                    sortModel={[
                      {
                        field: "ref",
                        sort: "desc",
                      },
                    ]}
                    // checkboxSelection
                  />
                </div>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ReportIssuePrint;
