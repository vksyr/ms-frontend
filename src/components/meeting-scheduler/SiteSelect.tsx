import { Fragment, FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getAllSites } from "../../lib/api";
import { Site } from "../../model/SOFMS-Model";

interface SiteSelectProps {
  siteChange: (siteId: number) => void
}

const SiteSelect: FunctionComponent<SiteSelectProps> = (props) => {
  const {
    sendRequest: sendSitesRequest,
    status: siteRequestStatus,
    data: loadedSites,
    error: siteRequestError,
  } = useHttp(getAllSites, true);
  // let [site, setSite] = useState("--Select a Site--");

  useEffect(() => {
    sendSitesRequest();
  }, [sendSitesRequest]);

  const handleSiteChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // setSite(e.target.value);
    props.siteChange(parseInt(e.target.value));

  };

  if (siteRequestStatus === HttpReducerStatus.PENDING) {
    return <div>PENDING</div>;
  }

  if (siteRequestError) {
    // return <p>{siteRequestError}</p>;
    // TODO: Show error message
  }

  return (
    <Fragment>
      <label className="form-label">Site</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleSiteChange}
      >
        <option value="--Select a Site--">Select a Site</option>
        {loadedSites &&
          loadedSites.map((site: Site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default SiteSelect;
