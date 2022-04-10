import { FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getAllSites } from "../../lib/api";
import { Site } from "../../model/SOFMS-Model";
import BuildingSelect from "./BuildingSelect";
import RoomSelect from "./RoomSelect";
import SiteSelect from "./SiteSelect";

interface LocationSelectProps {
  roomChange: (roomId: number) => void;
}

const LocationSelect: FunctionComponent<LocationSelectProps> = (props) => {
  let [site, setSite] = useState(0);
  let [building, setBuilding] = useState(0);
  let [room, setRoom] = useState(0);

  const siteChangeHandler = (siteId: number) => {
    setSite(siteId);
  };

  const buildingChangeHandler = (buildingId: number) => {
    setBuilding(buildingId);
  };

  const roomChangeHandler = (roomId: number) => {
    setRoom(roomId);
    props.roomChange(roomId);
  };

  return (
    <div className="shadow-sm p-3 mb-4 pt-1 bg-white">
      <div className="row justify-content-center">
        <div className="row col-11 p-0 m-0">
          <div className="col-lg-4 col-sm-12">
            <SiteSelect siteChange={siteChangeHandler} />
          </div>
          <div className="col-lg-4 col-sm-12">
            <BuildingSelect
              siteId={site}
              buildingChange={buildingChangeHandler}
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <RoomSelect buildingId={building} roomChange={roomChangeHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
