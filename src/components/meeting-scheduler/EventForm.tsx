import React, { Fragment, FunctionComponent, useRef, useState } from "react";

import classes from "./EventForm.module.css";
import { addEvent } from "../../lib/api";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MtgEvent, User } from "../../model/SOFMS-Model";
import ClassificationSelect from "./ClassificationSelect";
import JDirectorateSelect from "./JDirectorateSelect";
import UserPicker from "./UserPicker";

interface EventFormProps {
  roomId: number;
  modalShow: boolean;
  startDate: Date;
  endDate: Date;
  closeModalHandler: () => void;
  addEventHandler: (newEvent: MtgEvent) => void;
}

const EventForm: FunctionComponent<EventFormProps> = (props) => {
  const [selectedPOC, setSelectedPOC] = useState<User>();
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const jDirectorateRef = useRef<HTMLSelectElement>(null);
  const classificationRef = useRef<HTMLSelectElement>(null);
  // const pocRef = useRef<Typeahead>(null);

  const pocChangeHandler = (poc: User) => {
    setSelectedPOC(poc);
  };

  const newMeetingBookHandler = () => {
    const newEvent: MtgEvent = {};
    newEvent.roomID = props.roomId;
    newEvent.approvalCodeID = 1;

    if (selectedPOC) {
      console.debug("Selected POC: ", selectedPOC);
      newEvent.pocid = selectedPOC.id;
    }
    if (jDirectorateRef && jDirectorateRef.current) {
      newEvent.jDirectorateID = parseInt(jDirectorateRef.current.value);
    }
    if (classificationRef && classificationRef.current) {
      newEvent.classificationID = parseInt(classificationRef.current.value);
    }
    if (startTimeRef && startTimeRef.current) {
      console.debug("Start Time: ", startTimeRef.current.value);
      const tmpStartDate = new Date(props.startDate);
      const newHour = parseInt(startTimeRef.current.value.substring(0, 2));
      const newMinute = parseInt(startTimeRef.current.value.substring(3, 5));
      tmpStartDate.setHours(newHour);
      tmpStartDate.setMinutes(newMinute);
      newEvent.start = tmpStartDate.toISOString();
    }
    if (endTimeRef && endTimeRef.current) {
      console.debug("End Time: ", endTimeRef.current.value);
      const tmpEndDate = new Date(props.startDate);
      const newHour = parseInt(endTimeRef.current.value.substring(0, 2));
      const newMinute = parseInt(endTimeRef.current.value.substring(3, 5));
      tmpEndDate.setHours(newHour);
      tmpEndDate.setMinutes(newMinute);
      newEvent.end = tmpEndDate.toISOString();
    }
    if (titleRef && titleRef.current) {
      newEvent.title = titleRef.current.value;
    }
    // console.debug("End Time: ", endTimeRef.current.value);
    // console.debug("Start Time: ", titleRef.current.value);
    addEvent(newEvent)
      .then((responseData) => {
        console.debug("Add event data: ", responseData);
        if (responseData.parsedBody) {
          props.addEventHandler(responseData.parsedBody);
        }
        // sendAddEventRequest(newEvent);
      })
      .catch((e) => {
        console.debug("Error adding event: ", e);
      });
    // sendEventsRequest(RoomId);
    // modalClose();
  };

  return (
    <Fragment>
      <Modal size="lg" show={props.modalShow} onHide={props.closeModalHandler}>
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
                value={props.startDate.toISOString().substring(0, 10)}
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
                  defaultValue={props.startDate.toTimeString().substring(0, 5)}
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
                  defaultValue={props.endDate.toTimeString().substring(0, 5)}
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
            <ClassificationSelect classificationRef={classificationRef} />
            <JDirectorateSelect jDirectorateRef={jDirectorateRef} />
            <Form.Group className="mb-3" controlId="pocPicker">
              <Form.Label>POC</Form.Label>
              <UserPicker pocChangeHandler={pocChangeHandler} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeModalHandler}>
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

export default EventForm;
