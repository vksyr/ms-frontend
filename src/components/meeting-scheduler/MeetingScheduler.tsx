import React, { Fragment, FunctionComponent, useState } from "react";
import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./MeetingScheduler.module.css";
import LocationSelect from "./LocationSelect";
import MyMeetings2 from "./MyMeetings2";
import { getEventsBy } from "../../lib/api";
import { MtgEvent } from "../../model/SOFMS-Model";
import EventForm from "./EventForm";
import { MtgEventExtended } from "../../model/MtgEventExtended";

interface MeetingSchedulerProps {}

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  const [events, setEvents] = useState<MtgEventExtended[]>();

  const [RoomId, setRoomId] = useState(0);
  const [MyMeetingsModal, setMyMeetingsModal] = useState(false);
  const [EventFormModal, setEventFormModal] = useState(false);
  const [MeetingStartDate, setMeetingStartDate] = useState(new Date());
  const [MeetingEndDate, setMeetingEndDate] = useState(new Date());
  const [PersonIconCss, setPersonIconCss] = useState("inactive");

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

  const eventFormModalClose = () => {
    setEventFormModal(false);
  };

  const eventFormModalShow = () => {
    setEventFormModal(true);
  };

  const dateClickHandler = (dateInfo: DateClickArg) => {
    if (RoomId && RoomId > 0) {
      console.debug("Date click: ", dateInfo);
      setMeetingStartDate(dateInfo.date);

      const endDate = new Date(dateInfo.date);
      endDate.setMinutes(endDate.getMinutes() + 30);
      setMeetingEndDate(endDate);

      eventFormModalShow();
    }
  };

  const addEventHandler = (newEvent: MtgEvent) => {
    loadEvents(RoomId);

    eventFormModalClose();
  };

  const onPersonIconClick = () => {
    if (MyMeetingsModal) {
      setMyMeetingsModal(false);
      setPersonIconCss("inactive");
    } else {
      setMyMeetingsModal(true);
      setPersonIconCss("active");
    }
  };

  return (
    <Fragment>
      <nav className="navbar navbar-default">
        <div className="container-fluid col-11">
          <div className="col-9">
            <a className="navbar-brand" href="/meetings/ui/index.html">
              Meeting Scheduler
            </a>
          </div>
          <div className="float-right text-right">
            <label
              className={"d-block ms-person-icon-" + PersonIconCss}
              onClick={onPersonIconClick}
            >
              <PersonIcon
                style={{
                  fill: "white",
                  alignItems: "end",
                  display: "flex"
                }}
              />
            </label>
          </div>
        </div>
      </nav>
      <div className="row bg-light">
        <LocationSelect roomChange={roomChangeHandler} />
      </div>
      <div className="row bg-light justify-content-center">
        <div className="col-11">
          <FullCalendar
            plugins={[
              bootstrap5Plugin,
              rrulePlugin,
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin
            ]}
            themeSystem="bootstrap5"
            initialView="timeGridWeek"
            slotMinTime={"07:00:00"}
            slotMaxTime={"19:00:00"}
            slotDuration={"00:15:00"}
            height={"auto"}
            headerToolbar={{
              start: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
              center: "title",
              end: "prev,next"
            }}
            weekends={false}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              omitZeroMinute: false,
              hour12: false
            }}
            allDaySlot={false}
            events={events as EventSourceInput}
            dateClick={dateClickHandler}
          />
        </div>
      </div>
      <EventForm
        roomId={RoomId}
        startDate={MeetingStartDate}
        endDate={MeetingEndDate}
        modalShow={EventFormModal}
        closeModalHandler={eventFormModalClose}
        addEventHandler={addEventHandler}
      />
      <MyMeetings2
        modalShow={MyMeetingsModal}
        closeModalHandler={onPersonIconClick}
      />
    </Fragment>
  );
};

export default MeetingScheduler;
