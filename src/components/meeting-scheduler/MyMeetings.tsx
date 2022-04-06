import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { getUserEvents } from "../../lib/api";
import { groupBy } from "../../lib/groupBy";
import { MtgEventExtended } from "../../model/MtgEventExtended";
import MyEventsCard from "./MyEventsCard";

import classes from "./MyMeetings.module.css";

interface MyMeetingsProps {}

const MyMeetings: FunctionComponent<MyMeetingsProps> = () => {
  const [myTodayEvents, setMyTodayEvents] = useState<MtgEventExtended[]>();
  const [myUpcomingEvents, setMyUpcomingEvents] =
    useState<Record<string, MtgEventExtended[]>>();

  useEffect(() => {
    getUserEvents(1, 5).then((responseData) => {
      const groupedEvents = groupBy(responseData, (me) => {
        const startDate = new Date(me.start as string);
        return startDate.toDateString();
      });
      const today = new Date();
      const todayEvents = groupedEvents[today.toDateString()];
      delete groupedEvents[today.toDateString()];

      setMyTodayEvents(todayEvents);
      setMyUpcomingEvents(groupedEvents);
    });
  }, [getUserEvents]);

  return (
    <Fragment>
      <Row>
        <h3>My Meetings</h3>
      </Row>
      <Container>
        <h4>Today</h4>
        {myTodayEvents &&
          myTodayEvents.map((event) => (
            <MyEventsCard key={event.id} event={event} />
          ))}
      </Container>
      <Container>
        <h4>Upcoming</h4>
        {myUpcomingEvents &&
          Object.keys(myUpcomingEvents).map((key) => (
            <Fragment key={key}>
              <h5>{key}</h5>
              {myUpcomingEvents[key].map((event) => (
                <MyEventsCard key={event.id} event={event} />
              ))}
            </Fragment>
          ))}
      </Container>
    </Fragment>
  );
};

export default MyMeetings;
