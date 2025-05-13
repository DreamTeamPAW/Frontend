export const buttonStyle = "w-lg px-6 py-3 text-white rounded-full shadow-lg hover:drop-shadow-xl transition";

export const labelStyle = `block text-sm font-medium text-[var(--text-input-color)] mb-2 transition group-focus-within:text-[var(--focused-border-color)]`;

export const inputFieldIconStyle = "absolute left-4 inset-y-0 flex items-center text-[var(--disabled-icon-color)] group-focus-within:text-[var(--text-input-color)]";

export const inputFIeldStyle = `w-lg py-2 pl-10 pr-4 rounded-xl bg-[var(--contrast-text-color)] transition focus:outline-none
                border-1 border-[var(--disabled-border-color)] focus:border-[var(--focused-border-color)]
                shadow-md focus:shadow-lg shadow-[var(--primary-shadow-color)] focus:shadow-[var(--secondary-shadow-color)]
                text-[var(--text-input-color)] focus:text-[var(--primary-text-color)]`;

export const inputFieldStyleNoIcon = `py-2 pl-2 pr-4 rounded-xl bg-[var(--contrast-text-color)] transition focus:outline-none
                border-1 border-[var(--disabled-border-color)] focus:border-[var(--focused-border-color)]
                shadow-md focus:shadow-lg shadow-[var(--primary-shadow-color)] focus:shadow-[var(--secondary-shadow-color)]
                text-[var(--text-input-color)] focus:text-[var(--primary-text-color)]`;

export const dropdownFieldStyle = `py-2 pl-2 pr-4 rounded-xl bg-[var(--contrast-text-color)] transition focus:outline-none
                border-1 border-[var(--disabled-border-color)] focus:border-[var(--focused-border-color)]
                shadow-md focus:shadow-lg shadow-[var(--primary-shadow-color)] focus:shadow-[var(--secondary-shadow-color)]
                text-[var(--text-input-color)] focus:text-[var(--primary-text-color)]`;


export const primaryButtonStyle = "bg-[var(--primary-button-color)] hover:bg-[var(--primary-button-hover-color)] active:bg-[var(--primary-button-active-color)]"

export const secondaryButtonStyle = "bg-[var(--secondary-button-color)] hover:bg-[var(--secondary-button-hover-color)] active:bg-[var(--secondary-button-active-color)]"

export const tertiaryButtonStyle = "bg-[var(--tertiary-button-color)] hover:bg-[var(--tertiary-button-hover-color)] active:bg-[var(--tertiary-button-active-color)]"

export const bookBoxLabelStyle = "font-khmer font-normal text-[60px] leading-[60px] text-[var(--primary-text-color)] text-shadow";

export const loginFlavorTextLabelStyle = "font-aksara font-normal text-[24px] leading-[32px] text-[var(--secondnary-text-color)]";

export const tertiaryTextLabelStyle = "font-aksara font-normal text-[12px] leading-[20px] text-[var(--tertiary-text-color)]"

export const backgroundImageLoginPage = {
                backgroundContainer: {
                                backgroundImage: "url('/images/mc-bookshelf.jpg')",
                                backgroundRepeat: "repeat",
                                height: "100vh",
                                width: "100%",
                },
};

export const navBarStyle = "sticky top-0 z-50 h-20 bg-[#DDC8B5] flex items-center px-6"

export const imageButtonStyle = "bg-transparent p-0 border-none focus:outline-none hover:opacity-80 transition";

export const textButtonStyle = "font-Khmer font-normal text-[20px] leading-[100%] tracking-normal text-center text-[var(--primary-button-color)] px-2 py-1 rounded hover:underline focus:outline-none focus:underline transition";

export const primaryTextStyle = "font-aksara font-normal text-[20px] leading-[100%] tracking-[0%]"

export const hamburgerButtonStyle = "w-16 h-16 flex flex-col items-center justify-center bg-transparent border-none p-0 space-y-2"

export const navBarSpacedTextButtons = "ml-auto flex items-center space-x-40 flex-nowrap"

export const bookInfoRowPrimaryTextStyle = "text-[var(--primary-text-color)] text-shadow-lg/20 text-xl"
export const bookInfoRowSecondaryTextStyle = "text-[var(--contrast-text-color)] text-shadow-lg/20 text-xl"
export const bookStatusDropdownTextStyle = "text-[var(--primary-text-color)] text-xl"

export const bookOverlayWindowStyle = "fixed inset-0 bg-black flex items-center justify-center z-50 bg-black/60"
export const bookOverlayStyle = "bg-[var(--base-secondary-light)] rounded-2xl shadow-2xl p-6 max-w-3xl relative pb-22 overflow-hidden"
export const bookOverlayCloseButtonStyle = "text-gray-500 hover:text-black text-4xl absolute top-1 right-4"


// Add book overlay styles

//File picker styles
export const filePickerContainerStyle = "flex justify-between items-center gap-4 bg-white rounded-3xl py-1 pr-1 pl-4 max-w-[500px] shadow-lg"
export const filePickerTextStyle = "text-[var(--primary-text-color)] overflow-hidden text-ellipsis whitespace-nowrap max-w-[65%] text-lg"
export const filePickerButtonStyle = `${tertiaryButtonStyle} ${bookInfoRowSecondaryTextStyle} h-10 rounded-full w-[35%]`

//Dropdown row styles
export const dropdownRowContainerStyle = "flex justify-between items-center mb-2"
export const dropdownStyle = `${dropdownFieldStyle} ${bookStatusDropdownTextStyle} w-[40%] appearance-none`

//Input field row styles
export const inputFieldRowContainerStyle = "flex justify-between mb-2"

//Add book form styles
export const addBookFormImageStyle = "h-full mr-6 max-h-[280px] max-w-[250px] rounded-lg"
export const addBookFormButtonStyle = `${primaryButtonStyle} mt-4 self-start w-full`
export const addBookFormStyle = "flex-col -between h-full w-[500px]"

//Add book overlay styles
export const addBookOverlayStyle = "bg-[var(--base-secondary-light)] rounded-2xl shadow-2xl p-6 max-w-4xl relative pb-22 overflow-hidden"
export const addBookOverlayImageStyle = "h-15 w-full bg-repeat-x absolute left-0 bottom-0 z-0"
export const addBookOverlayHeaderStyle = "text-xl font-bold mb-4"
