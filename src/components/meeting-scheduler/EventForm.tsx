import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";

import classes from "./EventForm.module.css";
import { addEvent } from "../../lib/api";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterTimes, setFilterTimes] = useState<Date[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const jDirectorateRef = useRef<HTMLSelectElement>(null);
  const classificationRef = useRef<HTMLSelectElement>(null);
  // const pocRef = useRef<Typeahead>(null);

  useEffect(() => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

  const pocChangeHandler = (poc: User) => {
    setSelectedPOC(poc);
  };

  const startDateChangeHandler = (date: Date) => {
    setStartDate(date);
    const newEndDate = new Date(date);
    newEndDate.setHours(endDate.getHours());
    newEndDate.setMinutes(endDate.getMinutes());
    setEndDate(newEndDate);
    // TODO: Filter times based on date
  };
  const startTimeChangeHandler = (date: Date) => {
    setStartDate(date);
  };
  const endTimeChangeHandler = (date: Date) => {
    setEndDate(date);
  };

  const newMeetingBookHandler = () => {
    const newEvent: MtgEvent = {};
    newEvent.roomID = props.roomId;
    newEvent.approvalCodeID = 1;

    newEvent.start = startDate.toISOString();
    newEvent.end = endDate.toISOString();

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
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={startDateChangeHandler}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="meetingStartTime">
                <Form.Label>Start Time</Form.Label>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  minTime={setHours(setMinutes(new Date(), 0), 7)}
                  maxTime={setHours(setMinutes(new Date(), 0), 19)}
                  excludeTimes={filterTimes}
                  onChange={startTimeChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="meetingEndTime">
                <Form.Label>End Time</Form.Label>
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  minTime={setHours(setMinutes(new Date(), 0), 7)}
                  maxTime={setHours(setMinutes(new Date(), 0), 19)}
                  onChange={endTimeChangeHandler}
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
