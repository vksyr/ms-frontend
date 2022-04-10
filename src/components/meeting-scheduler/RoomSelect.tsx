import { Fragment, FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getRoomsByBuilding } from "../../lib/api";
import { Room } from "../../model/SOFMS-Model";

interface RoomSelectProps {
  buildingId: number;
  roomChange: (roomId: number) => void;
}

const RoomSelect: FunctionComponent<RoomSelectProps> = (props) => {
  const [rooms, setRooms] = useState<Room[]>();
  // let [room, setRoom] = useState("--Select a Room--");

  useEffect(() => {
    if (props.buildingId > 0) {
      getRoomsByBuilding(props.buildingId).then((responseData) => {
        setRooms(responseData.parsedBody);
      });
    }
  }, [getRoomsByBuilding, props.buildingId]);

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setRoom(e.target.value);
    props.roomChange(parseInt(e.target.value));
  };

  return (
    <Fragment>
      <label className="form-label m-1">Room</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleRoomChange}
        disabled={props.buildingId === 0}
      >
        <option value="--Select a Room--">Select a Room</option>
        {rooms &&
          rooms.map((room: Room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default RoomSelect;
