import React from "react";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Issuer from "./component/IssuerFunction/Issuer";
import { Route, Switch } from "react-router-dom";
import { Home } from "./component/Home/Home";
import ReportIssuePrint from "./component/Reports/ReportIssuePrint";
import Login from "./component/Login/Login";

function App() {
  // if (!localStorage.getItem("TOKEN")) {
  //   return <Login />;
  // }
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/issuer">
          <Dashboard body={<Issuer />} />
        </Route>
        <Route exact path="/reportissue">
          <Dashboard body={<ReportIssuePrint />} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Dashboard body={<Home />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
