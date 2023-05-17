import React from 'react';

interface FilterBoxProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
  placeHolder: string;
}

const FilterBox: React.FC<FilterBoxProps> = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.filterValue}
        onChange={(event) => props.setFilterValue(event.target.value)}
        placeholder={props.placeHolder}
      />
    </div>
  );
};

export default FilterBox;

