import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";
import { searchUsers } from "../../lib/api";
import { User } from "../../model/SOFMS-Model";

interface UserPickerProps {
  pocChangeHandler: (poc: User) => void;
}

const UserPicker: FunctionComponent<UserPickerProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<User[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);

    searchUsers(query).then((responseData) => {
      if (responseData.parsedBody) {
        const options = responseData.parsedBody;

        setOptions(options);
      }

      setIsLoading(false);
    });
  };

  const filterBy = () => true;

  return (
    <Fragment>
      <AsyncTypeahead
        filterBy={filterBy}
        id="user-picker"
        isLoading={isLoading}
        labelKey="commonName"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        placeholder="Search for a user..."
        onChange={(selected) => {
          props.pocChangeHandler(selected[0] as User);
        }}
      />
    </Fragment>
  );
};

export default UserPicker;
