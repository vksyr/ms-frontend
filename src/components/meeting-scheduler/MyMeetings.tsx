import { FunctionComponent } from "react";

import classes from "./MyMeetings.module.css";

interface MyMeetingsProps {}

const MyMeetings: FunctionComponent<MyMeetingsProps> = () => {
  return (
    <div className="row">
      <h3>My Meetings</h3>
    </div>
  );
};

export default MyMeetings;
