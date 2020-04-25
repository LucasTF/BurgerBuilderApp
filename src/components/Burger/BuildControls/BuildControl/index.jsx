import React from 'react';

import { StyledBuildControl } from './styles';

const BuildControl = props => {
	return (
		<StyledBuildControl>
			<div className='label'>{props.label}</div>
			<button
				className='less'
				onClick={props.remove}
				disabled={props.disabled}
			>
				Less
			</button>
			<button className='more' onClick={props.added}>
				More
			</button>
		</StyledBuildControl>
	);
};

export default BuildControl;
