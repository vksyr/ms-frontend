import { Fragment, FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getBuildingsBySite } from "../../lib/api";
import { Building } from "../../model/SOFMS-Model";

interface BuildingSelectProps {
  siteId: number;
  buildingChange: (buildingId: number) => void;
}

const BuildingSelect: FunctionComponent<BuildingSelectProps> = (props) => {
  const [buildings, setBuildings] = useState<Building[]>();
  // let [building, setBuilding] = useState("--Select a Building--");

  useEffect(() => {
    if (props.siteId > 0) {
      getBuildingsBySite(props.siteId).then((responseData) => {
        setBuildings(responseData.parsedBody);
      });
    }
  }, [getBuildingsBySite, props.siteId]);

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setBuilding(e.target.value);
    props.buildingChange(parseInt(e.target.value));
  };

  return (
    <Fragment>
      <label className="form-label m-1">Building</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleBuildingChange}
        disabled={props.siteId === 0}
      >
        <option value="--Select a Building--">Select a Building</option>
        {buildings &&
          buildings.map((building: Building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default BuildingSelect;
