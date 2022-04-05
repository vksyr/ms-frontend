import React, { Fragment, FunctionComponent, useState } from "react";
import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import classes from "./MeetingScheduler.module.css";
import LocationSelect from "./LocationSelect";
import MyMeetings from "./MyMeetings";
import { getEventsBy } from "../../lib/api";
import { MtgEvent } from "../../model/SOFMS-Model";
import EventForm from "./EventForm";
import { MtgEventExtended } from "../../model/MtgEventExtended";

interface MeetingSchedulerProps {}

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  const [events, setEvents] = useState<MtgEventExtended[]>();

  const [RoomId, setRoomId] = useState(0);
  const [MeetingModal, setMeetingModal] = useState(false);
  const [MeetingStartDate, setMeetingStartDate] = useState(new Date());
  const [MeetingEndDate, setMeetingEndDate] = useState(new Date());

  const loadEvents = (roomId: number) => {
    getEventsBy(roomId).then((responseData) => {
      setEvents(responseData);
    });
  };

  const roomChangeHandler = (roomId: number) => {
    if (roomId && roomId > 0) {
      setRoomId(roomId);
      loadEvents(roomId);
    } else {
      setRoomId(0);
      setEvents([]);
    }
  };

  const modalClose = () => {
    setMeetingModal(false);
  };

  const modalShow = () => {
    setMeetingModal(true);
  };

  const dateClickHandler = (dateInfo: DateClickArg) => {
    if (RoomId && RoomId > 0) {
      console.debug("Date click: ", dateInfo);
      setMeetingStartDate(dateInfo.date);

      const endDate = new Date(dateInfo.date);
      endDate.setMinutes(endDate.getMinutes() + 30);
      setMeetingEndDate(endDate);

      modalShow();
    }
  };

  const addEventHandler = (newEvent: MtgEvent) => {
    loadEvents(RoomId);

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
            height={"auto"}
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
            events={events as EventSourceInput}
            dateClick={dateClickHandler}
          />
        </div>
        <div className="col-3">
          <MyMeetings />
        </div>
      </div>
      <EventForm
        roomId={RoomId}
        startDate={MeetingStartDate}
        endDate={MeetingEndDate}
        modalShow={MeetingModal}
        closeModalHandler={modalClose}
        addEventHandler={addEventHandler}
      />
    </Fragment>
  );
};

export default MeetingScheduler;
