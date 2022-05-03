import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "../Dashboard_Style";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { SetIssuerList } from "../../features/Connect/Connect";
import {
  InputBase,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  withStyles,
} from "@material-ui/core";
import { DataGrid, GridToolbar, GridOverlay } from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import IssueEdit from "./popup/IssueEdit";
import CreateIssue from "./popup/CreateIssue";
import { format } from "date-fns";
import DeleteIssue from "./popup/DeleteIssue";
import GavelRoundedIcon from "@material-ui/icons/GavelRounded";
import CloseIssue from "./popup/CloseIssue";
import { LinkApi } from "../../ApiConnection";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
function CustomPagination(props) {
  const { state, api } = props;
  const classes = useStyles();
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
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// Main Function---------------------------------------------------------------------
const Issuer = () => {
  const [openAlertStatus, setopenAlertStatus] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");
  const [alertStatus, setalertStatus] = useState("success");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseMore = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // console.log("open status:", open);
  const [IssueList, setIssueList] = useState([]);
  const [IssueListFind, setIssueListFind] = useState([]);
  const [RefValue, setRefValue] = useState("");
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper);
  const [body, setbody] = useState();
  function handleClose() {
    setOpen(false);
  }
  const CreateClick = () => {
    setbody(
      <CreateIssue
        ModalOpen={setOpen}
        setopenAlertStatus={setopenAlertStatus}
        setMessageStatus={setMessageStatus}
        setalertStatus={setalertStatus}
      />
    );
    setOpen(true);
  };
  const columnsIssue = [
    // { field: "ref", headerName: "ref", width: 100 },
    {
      field: "ref",
      headerName: "ref",
      width: 200,
      renderCell: (params) => (
        <strong>
          <IconButton
            size="small"
            color="primary"
            aria-label="Delete item"
            component="span"
            style={{ marginLeft: 1 }}
          >
            {params.getValue("ref")}
          </IconButton>
        </strong>
      ),
    },
    { field: "issueName", headerName: "Issue Name", width: 150 },
    {
      field: "issueDate",
      headerName: "Issue Date",
      width: 200,
      renderCell: (params) => (
        <view>{Moment(params.getValue("issueDate")).format("yyyy-MM-DD")}</view>
      ),
    },
    {
      field: "department_name",
      headerName: "Department",
      width: 150,
    },
    {
      field: "issuer",
      headerName: "Issuer",
      width: 100,
    },
    {
      field: "category_name",
      headerName: "Category",
      width: 150,
    },
    {
      field: "status_name",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <strong>
          <IconButton
            size="medium"
            color="primary"
            aria-label="Edit item"
            component="span"
            style={{ marginLeft: 1 }}
            onClick={() => {
              setbody(
                <IssueEdit
                  ModalOpen={setOpen}
                  setopenAlertStatus={setopenAlertStatus}
                  setMessageStatus={setMessageStatus}
                  setalertStatus={setalertStatus}
                />
              );
              dispatch(
                SetIssuerList({
                  ref: params.getValue("ref"),
                  status: params.getValue("status"),
                  issuer: params.getValue("issuer"),
                  issueName: params.getValue("issueName"),
                  issueDate: params.getValue("issueDate"),
                  department: params.getValue("department"),
                  description: params.getValue("description"),
                  priority: params.getValue("priority"),
                  assignedTo: params.getValue("assignedTo"),
                  bookby: params.getValue("bookby"),
                  closeBy: params.getValue("closeBy"),
                  closeDate: params.getValue("closeDate"),
                  category: params.getValue("category"),
                  actionTaken: params.getValue("actionTaken"),
                  resolution: params.getValue("resolution"),
                  closeComment: params.getValue("closeComment"),
                  timelineFrom: format(
                    new Date(params.getValue("timelineFrom")),
                    "HH:mm"
                  ),
                  timelineTo: format(
                    new Date(params.getValue("timelineTo")),
                    "HH:mm"
                  ),
                })
              );
              setOpen(true);
            }}
          >
            {/* {params.getValue("ref")} */}
            <EditIcon />
          </IconButton>
          <IconButton
            size="medium"
            aria-controls="customized-menu"
            aria-haspopup="true"
            component="span"
            style={{ marginLeft: 1 }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              dispatch(
                SetIssuerList({
                  ref: params.getValue("ref"),
                  status: params.getValue("status"),
                  issuer: params.getValue("issuer"),
                  issueName: params.getValue("issueName"),
                  issueDate: params.getValue("issueDate"),
                  department: params.getValue("department"),
                  description: params.getValue("description"),
                  priority: params.getValue("priority"),
                  assignedTo: params.getValue("assignedTo"),
                  bookby: params.getValue("bookby"),
                  closeBy: params.getValue("closeBy"),
                  closeDate: params.getValue("closeDate"),
                  category: params.getValue("category"),
                  actionTaken: params.getValue("actionTaken"),
                  resolution: params.getValue("resolution"),
                  closeComment: params.getValue("closeComment"),
                  timelineFrom: format(
                    new Date(params.getValue("timelineFrom")),
                    "HH:mm"
                  ),
                  timelineTo: format(
                    new Date(params.getValue("timelineTo")),
                    "HH:mm"
                  ),
                })
              );
            }}
          >
            {/* {params.getValue("ref")} */}
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMore}
          >
            <StyledMenuItem
              onClick={() => {
                handleCloseMore();
                setbody(
                  <CloseIssue
                    ModalOpen={setOpen}
                    setopenAlertStatus={setopenAlertStatus}
                    setMessageStatus={setMessageStatus}
                    setalertStatus={setalertStatus}
                  />
                );
                setOpen(true);
              }}
            >
              <ListItemIcon>
                <GavelRoundedIcon
                  variant="contained"
                  color="secondary"
                  fontSize="default"
                />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => {
                handleCloseMore();
                setbody(
                  <DeleteIssue
                    ModalOpen={setOpen}
                    setopenAlertStatus={setopenAlertStatus}
                    setMessageStatus={setMessageStatus}
                    setalertStatus={setalertStatus}
                  />
                );
                setOpen(true);
              }}
            >
              <ListItemIcon>
                <DeleteIcon
                  variant="contained"
                  color="secondary"
                  fontSize="default"
                />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </StyledMenuItem>
          </StyledMenu>
        </strong>
      ),
    },
  ];
  const history = useHistory();
  async function LoadIssueList() {
    await axios
      .get(LinkApi + "api/Issue/GetIssueDetail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        setIssueList(response.data);
        setIssueListFind(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      });
  }
  useEffect(() => {
    LoadIssueList();
  }, [open]);
  return (
    <div>
      {/* Modal Popup*/}
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          style={{
            position: "inherit",
          }}
          maxWidth="md"
          disableGutters={true}
          className={classes.containerModal}
        >
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  style={{ float: "right", padding: "2px" }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              {body}
            </Grid>
          </Grid>
        </Container>
      </Modal>
      {/* Modal Popup*/}
      <Container maxWidth="xl" className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <Card variant="outlined">
                <CardHeader title="Issue List" />
                <Collapse in={openAlertStatus}>
                  <Alert
                    severity={alertStatus}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setopenAlertStatus(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {messageStatus}
                  </Alert>
                </Collapse>
                <div
                  style={{
                    padding: "0px 25px",
                  }}
                >
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={CreateClick}
                      >
                        Create Issue
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper component="form" className={classes.root}>
                        <IconButton
                          className={classes.iconButton}
                          aria-label="refresh"
                          onClick={() => {
                            setIssueListFind(IssueList);
                          }}
                        >
                          <RefreshIcon />
                        </IconButton>
                        <InputBase
                          className={classes.input}
                          value={RefValue}
                          onChange={(event) => {
                            setRefValue(event.target.value);
                          }}
                          placeholder="Search Ref"
                          inputProps={{ "aria-label": "Search Ref Only" }}
                        />
                        <IconButton
                          className={classes.iconButton}
                          aria-label="search"
                          onClick={() => {
                            if (RefValue != "" && RefValue !== null) {
                              const List = IssueList.filter((obj) => {
                                return obj.ref == RefValue;
                              });
                              setIssueListFind(List);
                            } else {
                              setIssueListFind(IssueList);
                            }
                          }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
                <CardContent>
                  <div style={{ height: "80vh", width: "100%" }}>
                    <DataGrid
                      
                      rows={IssueListFind}
                      columns={columnsIssue}
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
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}></Paper>
          </Grid> */}
          {/* Recent Orders */}
          {/* <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};
export default Issuer;
