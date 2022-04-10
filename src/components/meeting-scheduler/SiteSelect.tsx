import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { getAllSites } from "../../lib/api";
import { Site } from "../../model/SOFMS-Model";

interface SiteSelectProps {
  siteChange: (siteId: number) => void;
}

const SiteSelect: FunctionComponent<SiteSelectProps> = (props) => {
  const [sites, setSites] = useState<Site[]>();

  useEffect(() => {
    getAllSites().then((responseData) => {
      setSites(responseData.parsedBody);
    });
  }, [getAllSites]);

  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setSite(e.target.value);
    props.siteChange(parseInt(e.target.value));
  };

  return (
    <Fragment>
      <label className="form-label m-1">Site</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleSiteChange}
      >
        <option value="--Select a Site--">Select a Site</option>
        {sites &&
          sites.map((site: Site) => (
            <option key={site.id} value={site.id}>
              {site.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default SiteSelect;
