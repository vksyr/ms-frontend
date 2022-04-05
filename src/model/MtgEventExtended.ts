import { DurationInput } from "@fullcalendar/react";
import { Options } from "rrule";
import { MtgEvent } from "./SOFMS-Model";

export interface MtgEventExtended extends MtgEvent {
  rrule?: Partial<Options>;
  duration?: DurationInput;
  backgroundColor?: string;
  textColor?: string;
}
