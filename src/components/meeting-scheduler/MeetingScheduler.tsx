import { FunctionComponent } from "react";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import classes from "./MeetingScheduler.module.css";
import LocationSelect from "./LocationSelect";
import MyMeetings from "./MyMeetings";

interface MeetingSchedulerProps {}

const MeetingScheduler: FunctionComponent<MeetingSchedulerProps> = () => {
  return (
    <div className="row">
      <div className="col-9">
        <LocationSelect />
        <FullCalendar
          plugins={[
            bootstrap5Plugin,
            rrulePlugin,
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
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
          events={[
            { title: "event 1", date: "2022-03-21" },
            { title: "event 2", date: "2022-03-22" },
            {
              title: "my recurring event",
              rrule:
                "DTSTART:20220323T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=5;UNTIL=20220601;BYDAY=MO,FR",
            },
            {
              title: "Another Recurring Event",
              rrule:
                "DTSTART:20220324T170000\nRRULE:FREQ=WEEKLY;UNTIL=20220630T170200Z;COUNT=30;INTERVAL=1;WKST=MO\nEXDATE:20220324T170000Z",
            },
          ]}
        />
      </div>
      <div className="col-3">
        <MyMeetings />
      </div>
    </div>
  );
};

export default MeetingScheduler;
