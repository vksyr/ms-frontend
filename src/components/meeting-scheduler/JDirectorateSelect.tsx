import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getJDirectorates } from "../../lib/api";
import { MtgJDirectorate } from "../../model/SOFMS-Model";

interface JDirectorateSelectProps {
  jDirectorateRef: React.RefObject<HTMLSelectElement>;
}

const JDirectorateSelect: FunctionComponent<JDirectorateSelectProps> = (props) => {
  const [jDirectorates, setJDirectorates] = useState<MtgJDirectorate[]>();
  // let [jDirectorate, setJDirectorate] = useState("--Select a JDirectorate--");

  useEffect(() => {
    getJDirectorates().then((responseData) => {
      setJDirectorates(responseData.parsedBody);
    });
  }, [getJDirectorates]);

  return (
    <Fragment>
      <Form.Group className="mb-3" controlId="jDirectorateSelect">
        <Form.Label>Event JDirectorate</Form.Label>
        <Form.Select aria-label="Select a JDirectorate" ref={props.jDirectorateRef}>
          <option value="--Select a JDirectorate--">Select a JDirectorate</option>
          {jDirectorates &&
            jDirectorates.map((jDirectorate: MtgJDirectorate) => (
              <option key={jDirectorate.id} value={jDirectorate.id}>
                {jDirectorate.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Fragment>
  );
};

export default JDirectorateSelect;
