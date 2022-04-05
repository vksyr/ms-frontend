import RRule, { Options } from "rrule";
import { MtgEventExtended } from "../model/MtgEventExtended";
import {
  Building,
  MtgClassification,
  MtgEvent,
  MtgJDirectorate,
  Organization,
  Room,
  Site,
  User,
} from "../model/SOFMS-Model";
import { get, post } from "./http";

const APIURL = process.env.REACT_APP_MS_API_URL;

export async function getAllOrganizations() {
  console.debug("getAllOrganizations");
  // const response = await fetch(`${APIURL}/Organization`);
  const response = await get<Organization[]>(`${APIURL}/Organization`);

  return response;
}

export async function getAllSites() {
  console.debug("getAllSites");
  // const response = await fetch(`${APIURL}/Site`);
  const response = await get<Site[]>(`${APIURL}/Site`);

  return response;
}

export async function getAllBuildings() {
  console.debug("getAllBuildings");
  // const response = await fetch(`${APIURL}/Building`);
  const response = await get<Building[]>(`${APIURL}/Building`);

  return response;
}

export async function getBuildingsBySite(siteId: number) {
  console.debug("getBuildingsBySite");
  // const response = await fetch(`${APIURL}/Building?siteID=${siteId}`);
  const response = await get<Building[]>(`${APIURL}/Building?siteID=${siteId}`);

  return response;
}

export async function getAllRooms() {
  console.debug("getAllRooms");
  // const response = await fetch(`${APIURL}/Room`);
  const response = await get<Room[]>(`${APIURL}/Room`);

  return response;
}

export async function getRoomsByBuilding(buildingId: number) {
  console.debug("getRoomsByBuilding");
  // const response = await fetch(`${APIURL}/Room?buildingID=${buildingId}`);
  const response = await get<Room[]>(`${APIURL}/Room?buildingID=${buildingId}`);

  return response;
}

export async function getClassifications() {
  console.debug("getClassifications");
  // const response = await fetch(`${APIURL}/Room`);
  const response = await get<MtgClassification[]>(`${APIURL}/Classification`);

  return response;
}

export async function getJDirectorates() {
  console.debug("getJDirectorates");
  // const response = await fetch(`${APIURL}/Room`);
  const response = await get<MtgJDirectorate[]>(`${APIURL}/JDirectorate`);

  return response;
}
export async function getAllEvents() {
  console.debug("getAllEvents");
  const response = await get<MtgEvent[]>(`${APIURL}/Event`);

  let transformedEvents: MtgEventExtended[] = [];

  if (response.parsedBody) {
    transformedEvents = processEvents(response.parsedBody);
  }

  console.debug("Transformed Events: ", transformedEvents);

  return transformedEvents;
}

export async function getEventsBy(roomID?: number, classificationID?: number) {
  console.debug("getEventsBy");
  let requestUrl = `${APIURL}/Event?`;
  if (roomID && roomID > 0) {
    requestUrl += "roomID=" + roomID + "&";
  }

  if (classificationID && classificationID > 0) {
    requestUrl += "classificationID=" + classificationID;
  }
  const response = await get<MtgEvent[]>(requestUrl);

  let transformedEvents: MtgEventExtended[] = [];

  if (response.parsedBody) {
    transformedEvents = processEvents(response.parsedBody);
  }

  console.debug("Transformed Events: ", transformedEvents);

  return transformedEvents;
}

export async function getUserEvents(userID: number) {
  console.debug("getUserEvents");
  let requestUrl = `${APIURL}/User/${userID}/events`;

  const response = await get<MtgEvent[]>(requestUrl);
  let transformedEvents: MtgEventExtended[] = [];

  if (response.parsedBody) {
    transformedEvents = processEvents(response.parsedBody);
  }

  console.debug("Transformed Events: ", transformedEvents);

  return transformedEvents;
}

const processEvents = (events: MtgEvent[]) => {
  const transformedEvents = [];

  for (const key in events) {
    const eventObj: MtgEventExtended = {
      ...events[key],
    };

    if (events[key].approvalCodeID === 1) {
      // Pending approval
      eventObj.title += " (Pending Approval)";
      eventObj.backgroundColor = "#e6f2ff";
      eventObj.textColor = "black";
    } else {
      if (events[key].classification) {
        const classification = events[key].classification as MtgClassification;
        if (classification.backgroundColor) {
          eventObj.backgroundColor = classification.backgroundColor;
        }
        if (classification.textColor) {
          eventObj.textColor = classification.textColor;
        }
      }
    }

    if (events[key].recurrenceRule) {
      if (events[key].start && events[key].end) {
        const startDate = new Date(events[key].start as string);
        const endDate = new Date(events[key].end as string);

        let rruleOptions: Partial<Options> = RRule.parseString(
          `RRULE:${events[key].recurrenceRule}`
        );
        console.debug("RROptions: ", rruleOptions);
        rruleOptions.dtstart = startDate;
        console.debug("RROptions: ", rruleOptions);
        // let rrule = new RRule(rruleOptions);
        eventObj.rrule = rruleOptions;

        let duration = endDate.valueOf() - startDate.valueOf();
        eventObj.duration = { milliseconds: duration };
      }
    }

    transformedEvents.push(eventObj);
  }

  return transformedEvents;
};

export async function addEvent(newEvent: MtgEvent) {
  console.debug("AddEvent");

  // const requestOptions: RequestInit = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newEvent),
  // };

  // const response = await fetch(`${APIURL}/Event`, requestOptions);
  const response = await post<MtgEvent>(`${APIURL}/Event`, newEvent);

  return response;
}

export async function searchUsers(search: string) {
  console.debug("searchUsers");
  const response = await get<User[]>(`${APIURL}/User`);

  return response;
}
