import React from 'react';

const FilterBox = (props: any) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setFilterValue(event.target.value)}
				placeholder={props.placeHolder}
			></input>
		</div>
	);
};

export default FilterBox;