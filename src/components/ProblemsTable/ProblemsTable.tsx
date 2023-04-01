import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});

	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<>
			<tbody className='text-white'>
				{problems.map((doc, idx) => {
					const difficulyColor =
						doc.difficulty === "Easy"
							? "text-dark-green-s"
							: doc.difficulty === "Medium"
							? "text-dark-yellow"
							: "text-dark-pink";
					return (
						<tr className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={doc.id}>
							<th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
								<BsCheckCircle fontSize={"18"} width='18' />
							</th>
							<td className='px-6 py-4'>
								<Link className='hover:text-blue-600 cursor-pointer' href={`/problems/${doc.id}`}>
									{doc.title}
								</Link>
							</td>
							<td className={`px-6 py-4 ${difficulyColor}`}>{doc.difficulty}</td>
							<td className={"px-6 py-4"}>{doc.category}</td>
							<td className={"px-6 py-4"}>
								{doc.videoId ? (
									<AiFillYoutube
										fontSize={"28"}
										className='cursor-pointer hover:text-red-600'
										onClick={() => setYoutubePlayer({ isOpen: true, videoId: doc.videoId as string })}
									/>
								) : (
									<p className='text-gray-400'>Coming soon</p>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
			{youtubePlayer.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={closeModal}></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0' onClick={closeModal} />
								<YouTube videoId={youtubePlayer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]' />
							</div>
						</div>
					</div>
				</tfoot>
			)}
		</>
	);
};
export default ProblemsTable;
