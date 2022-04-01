import RRule, { Options } from "rrule";
import { MtgEventExtended } from "../model/MtgEventExtended";
import { MtgEvent } from "../model/SOFMS-Model";

const APIURL = process.env.REACT_APP_MS_API_URL;

export async function getAllOrganizations() {
  console.debug("getAllOrganizations");
  const response = await fetch(`${APIURL}/Organization`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch organizations.");
  }

  console.debug("Data: ", data);

  const transformedOrganizations = [];

  for (const key in data) {
    const organizationObj = {
      id: key,
      ...data[key],
    };

    transformedOrganizations.push(organizationObj);
  }

  return transformedOrganizations;
}

export async function getAllSites() {
  console.debug("getAllSites");
  const response = await fetch(`${APIURL}/Site`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch sites.");
  }

  console.debug("Data: ", data);

  const transformedSites = [];

  for (const key in data) {
    const siteObj = {
      id: key,
      ...data[key],
    };

    transformedSites.push(siteObj);
  }

  return transformedSites;
}

export async function getAllBuildings() {
  console.debug("getAllBuildings");
  const response = await fetch(`${APIURL}/Building`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch buildings.");
  }

  console.debug("Data: ", data);

  const transformedBuildings = [];

  for (const key in data) {
    const buildingObj = {
      id: key,
      ...data[key],
    };

    transformedBuildings.push(buildingObj);
  }

  return transformedBuildings;
}

export async function getBuildingsBySite(siteId: number) {
  console.debug("getBuildingsBySite");
  const response = await fetch(`${APIURL}/Building?siteID=${siteId}`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch buildings.");
  }

  console.debug("Data: ", data);

  const transformedBuildings = [];

  for (const key in data) {
    const buildingObj = {
      id: key,
      ...data[key],
    };

    transformedBuildings.push(buildingObj);
  }

  return transformedBuildings;
}

export async function getAllRooms() {
  console.debug("getAllRooms");
  const response = await fetch(`${APIURL}/Room`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch rooms.");
  }

  console.debug("Data: ", data);

  const transformedRooms = [];

  for (const key in data) {
    const roomObj = {
      id: key,
      ...data[key],
    };

    transformedRooms.push(roomObj);
  }

  return transformedRooms;
}

export async function getRoomsByBuilding(buildingId: number) {
  console.debug("getRoomsByBuilding");
  const response = await fetch(`${APIURL}/Room?buildingID=${buildingId}`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch rooms.");
  }

  console.debug("Data: ", data);

  const transformedRooms = [];

  for (const key in data) {
    const roomObj = {
      id: key,
      ...data[key],
    };

    transformedRooms.push(roomObj);
  }

  return transformedRooms;
}

export async function getAllEvents() {
  console.debug("getAllEvents");
  const response = await fetch(`${APIURL}/Event`);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch rooms.");
  }

  console.debug("Data: ", data);

  const transformedEvents = processEvents(data);

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
  const response = await fetch(requestUrl);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch rooms.");
  }

  console.debug("Data: ", data);

  const transformedEvents = processEvents(data);

  console.debug("Transformed Events: ", transformedEvents);

  return transformedEvents;
}

const processEvents = (events: MtgEvent[]) => {
  const transformedEvents = [];

  for (const key in events) {
    const eventObj: MtgEventExtended = {
      id: key,
      title: events[key].name as string,
      start: new Date(events[key].startDate as string),
      end: new Date(events[key].endDate as string),
      allDay: false,
      ...events[key],
    };

    if (events[key].recurrenceRule) {
      if (events[key].startDate && events[key].endDate) {
        const startDate = new Date(events[key].startDate as string);
        const endDate = new Date(events[key].endDate as string);

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
  console.debug("getAllEvents");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  };

  const response = await fetch(`${APIURL}/Event`, requestOptions);
  console.debug("Response: ", response);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create event.");
  }

  console.debug("Data: ", data);

  const transformedRooms = [];

  for (const key in data) {
    const roomObj = {
      id: key,
      ...data[key],
    };

    transformedRooms.push(roomObj);
  }

  return transformedRooms;
}
