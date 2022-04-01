import { DurationInput } from "@fullcalendar/react";
import { Options } from "rrule";
import { MtgEvent } from "./SOFMS-Model";

export interface MtgEventExtended extends MtgEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  rrule?: Partial<Options>;
  duration?: DurationInput;
}
