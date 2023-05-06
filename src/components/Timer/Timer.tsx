import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
	const [showTimer, setShowTimer] = useState<boolean>(false);
	const [time, setTime] = useState<number>(0);

	const formatTime = (time: number): string => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer]);

	return (
		<div>
			{showTimer ? (
				<div className='flex items-center space-x-2 bg-dark-fill-3 p-1.5 cursor-pointer rounded hover:bg-dark-fill-2'>
					<div>{formatTime(time)}</div>
					<FiRefreshCcw
						onClick={() => {
							setShowTimer(false);
							setTime(0);
						}}
					/>
				</div>
			) : (
				<div
					className='flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer'
					onClick={() => setShowTimer(true)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='1em'
						height='1em'
						fill='currentColor'
						className='h-6 w-6'
					>
						<path
							fillRule='evenodd'
							d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
							clipRule='evenodd'
						></path>
					</svg>
				</div>
			)}
		</div>
	);
};
export default Timer;
