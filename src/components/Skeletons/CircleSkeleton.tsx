import React from "react";

const CircleSkeleton: React.FC = () => {
	return (
		<div className='space-y-2.5 animate-pulse max-w-lg'>
			<div className='flex items-center w-full space-x-2'>
				<div className='w-6 h-6 rounded-full bg-dark-fill-3'></div>
			</div>
		</div>
	);
};
export default CircleSkeleton;
