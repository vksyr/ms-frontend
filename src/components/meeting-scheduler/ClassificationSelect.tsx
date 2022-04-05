import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getClassifications } from "../../lib/api";
import { MtgClassification } from "../../model/SOFMS-Model";

interface ClassificationSelectProps {
  classificationRef: React.RefObject<HTMLSelectElement>;
}

const ClassificationSelect: FunctionComponent<ClassificationSelectProps> = (props) => {
  const [classifications, setClassifications] = useState<MtgClassification[]>();
  // let [classification, setClassification] = useState("--Select a Classification--");

  useEffect(() => {
    getClassifications().then((responseData) => {
      setClassifications(responseData.parsedBody);
    });
  }, [getClassifications]);

  return (
    <Fragment>
      <Form.Group className="mb-3" controlId="classificationSelect">
        <Form.Label>Event Classification</Form.Label>
        <Form.Select aria-label="Select a Classification" ref={props.classificationRef}>
          <option value="--Select a Classification--">Select a Classification</option>
          {classifications &&
            classifications.map((classification: MtgClassification) => (
              <option key={classification.id} value={classification.id}>
                {classification.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Fragment>
  );
};

export default ClassificationSelect;
