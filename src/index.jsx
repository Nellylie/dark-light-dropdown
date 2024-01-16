import React, { useState, useEffect, useRef } from 'react';
import chevronDownDark from './images/chevron-down-dark.svg';
import chevronDownLight from './images/chevron-down-light.svg';
import PropTypes from 'prop-types';
import './style/dropdownstyle.css';

// DropDown Component: A customizable dropdown menu component.
// Props include label, name, id, options array, onChange handler, and theme ('light' or 'dark').
function DropDown({ label, name, id, options, onChange, theme }) {
    // State for the selected value, open status of dropdown, and ref for the dropdown
    const [value, setValue] = useState(options.length > 0 ? (options[0]?.abbreviation || options[0]) : '');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handles clicking outside to close the dropdown
    useEffect(() => {
        // Function to be called when a click event is detected
        function handleClickOutside(event) {
            // Checks if the click is outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // If so, sets the dropdown's open state to false
                setIsOpen(false);
            }
        }

        // Adding event listener to the document for mousedown event
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup function: Removing the event listener when the component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    // Updates value when options change
    useEffect(() => {
        setValue(options.length > 0 ? (options[0]?.abbreviation || options[0]) : '');
    }, [options]);

    // Toggles dropdown open/close
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Handles option selection and triggers onChange
    const handleChange = (optionValue) => {
        setValue(optionValue?.abbreviation || optionValue);
        setIsOpen(false);
        if (onChange) {
            onChange({ target: { name, value: (optionValue?.name || optionValue) } });
        }
    };

    // Renders individual dropdown options
    const renderOption = (option, index) => (
        <div
            key={index}
            role="option"
            aria-selected={value === option}
            className={`selector-option ${value === option ? 'selected' : ''}`}
            onClick={() => handleChange(option)}
        >
            {option.name || option}
        </div>
    );
    const themeClass = theme === 'dark' ? 'selector-dark' : 'selector-light';

    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <div ref={dropdownRef} className={`selector-container ${themeClass}`}>
                <div
                    id={id}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-list`}
                    aria-haspopup="listbox"
                    className="selector-value"
                    onClick={handleToggle}
                >
                    {value}
                    {theme === "dark" ? <img src={chevronDownDark} alt='arrow down dark' /> : <img src={chevronDownLight} alt='arrow down light' />}
                </div>
                {isOpen && (
                    <div role="listbox" id={`${id}-list`} className="selector-options">
                        {options.map(renderOption)}
                    </div>
                )}
            </div>
        </>
    );
}

// PropTypes for DropDown Component
DropDown.propTypes = {
    label: PropTypes.string, // Optional string prop for the label of the dropdown
    name: PropTypes.string.isRequired, // Required string prop for the name attribute of the dropdown
    id: PropTypes.string.isRequired, // Required string prop for the ID attribute of the dropdown
    options: PropTypes.array.isRequired, // Required array prop for the list of options in the dropdown
    onChange: PropTypes.func, // Optional function prop for handling change events
    theme: PropTypes.oneOf(['light', 'dark']), // Optional string prop to specify the theme, limited to 'light' or 'dark'
};


export default DropDown;
