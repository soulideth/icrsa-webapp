import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectIssuerList } from "../../../features/Connect/Connect";
import DeleteIcon from "@material-ui/icons/Delete";
import { LinkApi } from "../../../ApiConnection";
import { useHistory } from "react-router";
const DeleteIssue = ({
  ModalOpen,
  setopenAlertStatus,
  setMessageStatus,
  setalertStatus,
}) => {
  const Issues = useSelector(selectIssuerList);
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .delete(LinkApi + "api/Issue/DeleteIssue/" + Issues.ref, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessageStatus(
            "your issue ref : " + Issues.ref + " has been deleted."
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
  return (
    <Paper style={{ paddingTop: "25px" }}>
      <Card variant="outlined" style={{ overflow: "auto" }}>
        <CardHeader
          title={"Are you sure to delete issue ref : " + Issues.ref + " ?"}
        />
        <CardContent spacing={4}>
          <form onSubmit={handleSubmit}>
            <div>
              <Grid
                item
                xs={12}
                sm={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  spacing={1}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default DeleteIssue;
