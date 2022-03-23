import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Layout from "./components/layout/Layout";
import MeetingScheduler from "./components/meeting-scheduler/MeetingScheduler";

function App() {
  return (
    <Layout>
      <MeetingScheduler />
    </Layout>
  );
}

export default App;
