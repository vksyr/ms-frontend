import { FunctionComponent } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MtgEventExtended } from "../../model/MtgEventExtended";

interface MyEventsCardProps {
  event: MtgEventExtended;
}

const MyEventsCard: FunctionComponent<MyEventsCardProps> = (props) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Text>
          {new Date(props.event.start as string).toTimeString().substring(0, 5)}
          -{new Date(props.event.end as string).toTimeString().substring(0, 5)}
        </Card.Text>
        <Card.Text>{props.event.title}</Card.Text>
        <Card.Text>Room: {props.event.room?.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyEventsCard;
