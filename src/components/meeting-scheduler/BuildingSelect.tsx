import { Fragment, FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getBuildingsBySite } from "../../lib/api";
import { Building } from "../../model/SOFMS-Model";

interface BuildingSelectProps {
  siteId: number
}

const BuildingSelect: FunctionComponent<BuildingSelectProps> = (props) => {
  const {
    sendRequest: sendBuildingsRequest,
    status: buildingRequestStatus,
    data: loadedBuildings,
    error: buildingRequestError,
  } = useHttp(getBuildingsBySite, true);
  let [building, setBuilding] = useState("--Select a Building--");

  useEffect(() => {
    sendBuildingsRequest(props.siteId);
  }, [sendBuildingsRequest]);

  const handleBuildingChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBuilding(e.target.value);
  };

  if (buildingRequestStatus === HttpReducerStatus.PENDING) {
    return <div>PENDING</div>;
  }

  if (buildingRequestError) {
    // return <p>{buildingRequestError}</p>;
    // TODO: Show error message
  }

  return (
    <Fragment>
      <label className="form-label">Building</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleBuildingChange}
      >
        <option value="--Select a Building--">Select a Building</option>
        {loadedBuildings &&
          loadedBuildings.map((building: Building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default BuildingSelect;
