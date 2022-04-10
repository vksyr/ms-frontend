import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { getUserEvents } from "../../lib/api";
import { groupBy } from "../../lib/groupBy";
import { MtgEventExtended } from "../../model/MtgEventExtended";
import MyEventsCard from "./MyEventsCard";

import classes from "./MyMeetings2.module.css";

import { Modal } from "react-bootstrap";

interface MyMeetings2Props {
  modalShow: boolean;
  closeModalHandler: () => void;
}

const MyMeetings2: FunctionComponent<MyMeetings2Props> = (props) => {
  const [ShowMyMeetings, setShowMyMeetings] = useState(true);
  const [ShowAwaitingMyApproval, setShowAwaitingMyApproval] = useState(false);

  const [myTodayEvents, setMyTodayEvents] = useState<MtgEventExtended[]>();
  const [myUpcomingEvents, setMyUpcomingEvents] = useState<
    Record<string, MtgEventExtended[]>
  >();

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

  const onShowMyMeetingsClick = () => {
    setShowMyMeetings(true);
    setShowAwaitingMyApproval(false);
  };

  const onShowAwaitingMyApprovalClick = () => {
    setShowMyMeetings(false);
    setShowAwaitingMyApproval(true);
  };

  return (
    <Fragment>
      <Modal
        className="modal fade right ms-myMeetings shadow"
        show={props.modalShow}
        onHide={props.closeModalHandler}
        animation={true}
        backdropClassName="d-none"
      >
        <Modal.Header closeButton>
          <Modal.Title>My Meetings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="btn-group">
            <button
              type="button"
              className={"btn btn-primary " + (ShowMyMeetings ? "active" : "")}
              onClick={onShowMyMeetingsClick}
            >
              my meetings
            </button>
            <button
              type="button"
              className={
                "btn btn-primary " + (ShowAwaitingMyApproval ? "active" : "")
              }
              onClick={onShowAwaitingMyApprovalClick}
            >
              awaiting my approval
            </button>
          </div>
          <div className={"row " + (!ShowMyMeetings ? "d-none" : "")}>
            <Container>
              <label>Today</label>
              {myTodayEvents &&
                myTodayEvents.map((event) => (
                  <MyEventsCard key={event.id} event={event} />
                ))}
            </Container>
            <Container>
              <label>Upcoming</label>
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
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default MyMeetings2;
