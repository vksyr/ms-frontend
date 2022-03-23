import { FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getAllOrganizations } from "../../lib/api";
import { Organization } from "../../model/SOFMS-Model";

interface LocationSelectProps {}

const LocationSelect: FunctionComponent<LocationSelectProps> = () => {
  const {
    sendRequest: sendOrganizationsRequest,
    status: organizationRequestStatus,
    data: loadedOrganizations,
    error: organizationRequestError,
  } = useHttp(getAllOrganizations, true);
  let [organization, setOrganization] = useState("--Select a Location--");

  useEffect(() => {
    sendOrganizationsRequest();
  }, [sendOrganizationsRequest]);

  const handleOrganizationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrganization(e.target.value);
  };

  if (organizationRequestStatus === HttpReducerStatus.PENDING) {
    return <div>PENDING</div>;
  }

  if (organizationRequestError) {
    // return <p>{organizationRequestError}</p>;
    // TODO: Show error message
  }

  return (
    <div className="shadow-lg p-3 mb-5 bg-primary bg-gradient">
      <div className="row">
        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Location</label>
          <select
            id="ddLocation"
            className="form-select"
            aria-label="Select a Location"
            onChange={handleOrganizationChange}
          >
            <option value="--Select a Location--">Select a Location</option>
            {loadedOrganizations &&
              loadedOrganizations.map((organization: Organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Building</label>
          <select className="form-select" aria-label="Select a Building">
            <option selected>Select a Building</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-lg-4 col-sm-12">
          <label className="form-label">Room</label>
          <select className="form-select" aria-label="Select a Room">
            <option selected>Select a Room</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
