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
import EventForm from "./EventForm";

interface MeetingSchedulerProps { }

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  const {
    sendRequest: sendEventsRequest,
    status: eventRequestStatus,
    data: loadedEvents,
    error: eventRequestError,
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

  const addEventHandler = (newEvent: MtgEvent) => {

    sendEventsRequest();

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
      <EventForm roomId={RoomId} startDate={MeetingStartDate} endDate={MeetingEndDate} modalShow={MeetingModal} closeModalHandler={modalClose} addEventHandler={addEventHandler} />
    </Fragment>
  );
};

export default MeetingScheduler;
