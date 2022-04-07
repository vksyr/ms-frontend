import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Layout from "./components/layout/Layout";
import MeetingScheduler from "./components/meeting-scheduler/MeetingScheduler";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <MeetingScheduler />
    </Layout>
  );
}

export default App;
