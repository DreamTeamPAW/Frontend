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

// Book overlay styles
export const bookInfoRowPrimaryTextStyle = "text-[var(--primary-text-color)] text-shadow-lg/20 text-xl"
export const bookInfoRowSecondaryTextStyle = "text-[var(--contrast-text-color)] text-shadow-lg/20 text-xl"
export const bookStatusDropdownTextStyle = "text-[var(--primary-text-color)] text-xl"

export const bookOverlayWindowStyle = "fixed inset-0 bg-black flex items-center justify-center z-50 bg-black/60"
export const bookOverlayStyle = "bg-[var(--base-secondary-light)] rounded-2xl shadow-2xl p-6 max-w-3xl relative pb-22 overflow-hidden"
export const bookOverlayCloseButtonStyle = "text-gray-500 hover:text-black text-4xl absolute top-1 right-4"

export const bookOverlayDeletePopupStyle1 = "fixed inset-0 flex items-center justify-center bg-opacity-1 z-50"
export const bookOverlayDeletePopupStyle2 = "bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center"

// Pagination styles
export const paginationBookElementStyle = "cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col w-[250px] border-3"

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

export const DEFAULT_BASE64_IMAGE =
  "data:image/png;base64,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AgaESMCAEAn+C4GjF7LRxlL9AAACEGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLycgeDp4bXB0az0nSW1hZ2U6OkV4aWZUb29sIDEwLjgwJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+S2VycmkgUXVpbm48L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz4KhkmnAAAADmVYSWZNTQAqAAAACAAAAAAAAADSU5MAAAAASUVORK5CYII=";