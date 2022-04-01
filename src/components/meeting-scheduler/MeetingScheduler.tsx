import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import classes from "./MeetingScheduler.module.css";
import LocationSelect from "./LocationSelect";
import MyMeetings from "./MyMeetings";
import { addEvent, getEventsBy } from "../../lib/api";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MtgEvent } from "../../model/SOFMS-Model";

interface MeetingSchedulerProps {}

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  const {
    sendRequest: sendEventsRequest,
    status: eventRequestStatus,
    data: loadedEvents,
    error: eventRequestError,
  } = useHttp(getEventsBy, true);
  const {
    sendRequest: sendAddEventRequest,
    status: addEventRequestStatus,
    data: addedEvent,
    error: addEventRequestError,
  } = useHttp(getEventsBy, true);

  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [RoomId, setRoomId] = useState(0);
  const [MeetingModal, setMeetingModal] = useState(false);
  const [MeetingStartDate, setMeetingStartDate] = useState(new Date());
  const [MeetingEndDate, setMeetingEndDate] = useState(new Date());

  const roomChangeHandler = (roomId: number) => {
    sendEventsRequest(roomId);
    setRoomId(roomId);
  };

  const modalClose = () => {
    setMeetingModal(false);
  };

  const modalShow = () => {
    setMeetingModal(true);
  };

  const dateClickHandler = (dateInfo: DateClickArg) => {
    console.debug("Date click: ", dateInfo);
    setMeetingStartDate(dateInfo.date);

    const endDate = new Date(dateInfo.date);
    endDate.setMinutes(endDate.getMinutes() + 30);
    setMeetingEndDate(endDate);

    modalShow();
  };

  const startDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.debug("Start Time change value: ", e.target.value);

    const tmpStartDate = new Date(MeetingStartDate);
    const newHour = parseInt(e.target.value.substring(0, 2));
    const newMinute = parseInt(e.target.value.substring(3, 5));
    tmpStartDate.setHours(newHour);
    tmpStartDate.setMinutes(newMinute);

    setMeetingStartDate(tmpStartDate);
  };

  const endDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.debug("End Time change value: ", e.target.value);

    const tmpEndDate = new Date(MeetingStartDate);
    const newHour = parseInt(e.target.value.substring(0, 2));
    const newMinute = parseInt(e.target.value.substring(3, 5));
    tmpEndDate.setHours(newHour);
    tmpEndDate.setMinutes(newMinute);

    setMeetingEndDate(tmpEndDate);
  };

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.debug("Title change: ", e.target.value);
  };

  const newMeetingBookHandler = () => {
    const newEvent: MtgEvent = {};
    newEvent.roomID = RoomId;
    newEvent.approvalCodeID = 1;
    newEvent.pocid = 1;
    newEvent.jDirectorateID = 6;
    newEvent.classificationID = 1;
    if (startTimeRef && startTimeRef.current) {
      console.debug("Start Time: ", startTimeRef.current.value);
      const tmpStartDate = new Date(MeetingStartDate);
      const newHour = parseInt(startTimeRef.current.value.substring(0, 2));
      const newMinute = parseInt(startTimeRef.current.value.substring(3, 5));
      tmpStartDate.setHours(newHour);
      tmpStartDate.setMinutes(newMinute);
      newEvent.startDate = tmpStartDate.toISOString();
    }
    if (endTimeRef && endTimeRef.current) {
      console.debug("End Time: ", endTimeRef.current.value);
      const tmpEndDate = new Date(MeetingStartDate);
      const newHour = parseInt(endTimeRef.current.value.substring(0, 2));
      const newMinute = parseInt(endTimeRef.current.value.substring(3, 5));
      tmpEndDate.setHours(newHour);
      tmpEndDate.setMinutes(newMinute);
      newEvent.endDate = tmpEndDate.toISOString();
    }
    if (titleRef && titleRef.current) {
      newEvent.name = titleRef.current.value;
    }
    // console.debug("End Time: ", endTimeRef.current.value);
    // console.debug("Start Time: ", titleRef.current.value);
    sendAddEventRequest(newEvent);
    sendEventsRequest(RoomId);
    modalClose();
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-9">
          <LocationSelect roomChange={roomChangeHandler} />
          <FullCalendar
            plugins={[
              bootstrap5Plugin,
              rrulePlugin,
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            themeSystem="bootstrap5"
            initialView="timeGridWeek"
            slotMinTime={"07:00:00"}
            slotMaxTime={"19:00:00"}
            slotDuration={"00:15:00"}
            headerToolbar={{
              start: "title",
              center: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
              end: "today prev,next",
            }}
            weekends={false}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              omitZeroMinute: false,
              hour12: false,
            }}
            allDaySlot={false}
            events={loadedEvents}
            dateClick={dateClickHandler}
          />
        </div>
        <div className="col-3">
          <MyMeetings />
        </div>
      </div>
      <Modal size="lg" show={MeetingModal} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="meetingDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                readOnly={true}
                value={MeetingStartDate.toISOString().substring(0, 10)}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="meetingStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Start"
                  min={"07:00"}
                  max={"19:00"}
                  defaultValue={MeetingStartDate.toTimeString().substring(0, 5)}
                  ref={startTimeRef}
                  // onChange={startDateChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="meetingEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="End"
                  min={"07:00"}
                  max={"19:00"}
                  defaultValue={MeetingEndDate.toTimeString().substring(0, 5)}
                  ref={endTimeRef}
                  // onChange={endDateChangeHandler}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="meetingTitle">
              <Form.Label>Title/Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Meeting Title"
                ref={titleRef}
                // onChange={titleChangeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={newMeetingBookHandler}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default MeetingScheduler;
