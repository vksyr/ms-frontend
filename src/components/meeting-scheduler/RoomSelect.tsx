import { Fragment, FunctionComponent, useEffect, useState } from "react";
import useHttp, { HttpReducerStatus } from "../../hooks/use-http";
import { getAllRooms } from "../../lib/api";
import { Room } from "../../model/SOFMS-Model";

interface RoomSelectProps { }

const RoomSelect: FunctionComponent<RoomSelectProps> = () => {
  const {
    sendRequest: sendRoomsRequest,
    status: roomRequestStatus,
    data: loadedRooms,
    error: roomRequestError,
  } = useHttp(getAllRooms, true);
  let [room, setRoom] = useState("--Select a Room--");

  useEffect(() => {
    sendRoomsRequest();
  }, [sendRoomsRequest]);

  const handleRoomChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoom(e.target.value);
  };

  if (roomRequestStatus === HttpReducerStatus.PENDING) {
    return <div>PENDING</div>;
  }

  if (roomRequestError) {
    // return <p>{roomRequestError}</p>;
    // TODO: Show error message
  }

  return (
    <Fragment>
      <label className="form-label">Room</label>
      <select
        id="ddLocation"
        className="form-select"
        aria-label="Select a Location"
        onChange={handleRoomChange}
      >
        <option value="--Select a Room--">Select a Room</option>
        {loadedRooms &&
          loadedRooms.map((room: Room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
      </select>
    </Fragment>
  );
};

export default RoomSelect;
