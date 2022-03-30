import { FunctionComponent } from "react";
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
import { getEvents } from "../../lib/api";
import useHttp from "../../hooks/use-http";

interface MeetingSchedulerProps { }

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  const {
    sendRequest: sendEventsRequest,
    status: eventRequestStatus,
    data: loadedEvents,
    error: eventRequestError,
  } = useHttp(getEvents, true);

  const roomChangeHandler = (roomId: number) => {
    sendEventsRequest();
  };

  const dateClickHandler = (dateInfo: DateClickArg) => {
    console.debug("Date click: ", dateInfo);
  }

  return (
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
          events={loadedEvents}
          dateClick={dateClickHandler}
        />
      </div>
      <div className="col-3">
        <MyMeetings />
      </div>
    </div>
  );
};

export default MeetingScheduler;
