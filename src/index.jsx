import React, { useState, useEffect, useRef } from 'react';
import chevronDownDark from './images/chevron-down-dark.svg';
import chevronDownLight from './images/chevron-down-light.svg';
import PropTypes from 'prop-types';
import './style/dropdownstyle.css';

function DropDown({ label, name, id, options, onChange, theme }) {
    const [value, setValue] = useState(options.length > 0 ? (options[0].abbreviation || options[0]) : '');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setValue(options.length > 0 ? (options[0].name || options[0]) : '');
    }, [options]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (optionValue) => {
        setValue(optionValue);
        setIsOpen(false);
        if (onChange) {
            onChange({ target: { name, value: optionValue } });
        }
    };

    const renderOption = (option, index) => (
        <div 
            key={index}
            role="option"
            aria-selected={value === option}
            className={`selector-option ${value === option ? 'selected' : ''}`}
            onClick={() => handleChange(option.name || option)}
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

DropDown.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default DropDown;
