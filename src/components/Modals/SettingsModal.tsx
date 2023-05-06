import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ISettings } from "../Workspace/Playground/Playground";
import useLocalStorage from "@/hooks/useLocalStorage";

const EDITOR_FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "17px", "18px"];

interface SettingsModalProps {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ setSettings, settings }) => {
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const handleClickDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setSettings({ ...settings, dropdownIsOpen: !settings.dropdownIsOpen });
	};
	return (
		<div className='text-white z-40'>
			<div aria-modal='true' role='dialog' className='fixed inset-0 overflow-y-auto z-modal'>
				<div className='flex min-h-screen items-center justify-center px-4'>
					{/* overlay */}
					<div
						className='opacity-100'
						onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
					>
						<div className='fixed inset-0 bg-gray-8 opacity-60'></div>
					</div>

					<div className='my-8 inline-block min-w-full transform rounded-[13px] text-left transition-all bg-overlay-3 md:min-w-[420px] shadow-level4 shadow-lg p-0 bg-[rgb(40,40,40)] w-[600px] !overflow-visible opacity-100 scale-100'>
						{/* setting header */}
						<div className='flex items-center border-b px-5 py-4 text-lg font-medium  border-dark-divider-border-2'>
							Settings
							<button
								className='ml-auto cursor-pointer rounded transition-all'
								onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
							>
								<IoClose />
							</button>
						</div>

						<div className='px-6 pt-4 pb-6'>
							<div className='mt-6 flex justify-between first:mt-0'>
								<div className='w-[340px]'>
									<h3 className=' text-base font-medium'>Font size</h3>
									<h3 className='text-label-3  mt-1.5'>
										Choose your preferred font size for the code editor.
									</h3>
								</div>
								<div className='w-[170px]'>
									<div className='relative'>
										<button
											onClick={handleClickDropdown}
											className='flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between'
											type='button'
										>
											{fontSize}
											<BsChevronDown />
										</button>
										{/* Show dropdown for fontsizes */}
										{settings.dropdownIsOpen && (
											<ul
												className='absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1'
												style={{
													filter: "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
												}}
											>
												{EDITOR_FONT_SIZES.map((fontSize, idx) => (
													<SettingsListItem
														key={idx}
														fontSize={fontSize}
														selectedOption={settings.fontSize}
														handleFontSizeChange={(fontSize) => {
															setFontSize(fontSize);
															setSettings({ ...settings, fontSize: fontSize });
														}}
													/>
												))}
											</ul>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SettingsModal;

interface SettingsListItemProps {
	fontSize: string;
	selectedOption: string;
	handleFontSizeChange: (fontSize: string) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({ fontSize, selectedOption, handleFontSizeChange }) => {
	return (
		<li className='relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg'>
			<div
				className={`flex h-5 flex-1 items-center pr-2 ${selectedOption === fontSize ? "font-medium" : ""}`}
				onClick={() => handleFontSizeChange(fontSize)}
			>
				<div className='whitespace-nowrap'>{fontSize}</div>
			</div>
			<span
				className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
					selectedOption === fontSize ? "visible" : "invisible"
				}`}
			>
				<BsCheckLg />
			</span>
		</li>
	);
};
