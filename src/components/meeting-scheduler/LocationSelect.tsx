import { FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getAllSites } from "../../lib/api";
import { Site } from "../../model/SOFMS-Model";
import BuildingSelect from "./BuildingSelect";
import RoomSelect from "./RoomSelect";
import SiteSelect from "./SiteSelect";

interface LocationSelectProps { }

const LocationSelect: FunctionComponent<LocationSelectProps> = () => {
  let [site, setSite] = useState(0);
  let [building, setBuilding] = useState(0);
  let [room, setRoom] = useState(0);

  const siteChangeHandler = (siteId: number) => {
    setSite(siteId);
  };

  return (
    <div className="shadow-lg p-3 mb-5 bg-primary bg-gradient">
      <div className="row">
        <div className="col-lg-4 col-sm-12">
          <SiteSelect siteChange={siteChangeHandler} />
        </div>
        <div className="col-lg-4 col-sm-12">
          <BuildingSelect siteId={3} />
        </div>
        <div className="col-lg-4 col-sm-12">
          <RoomSelect />
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
