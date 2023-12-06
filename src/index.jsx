import React, {useState} from "react";

function DarkLightDropdown({options}){
   const [selected, setSelected] = useState('');

const handleChange = (event) => {
  setSelected(event.target.value);
};

return (
  <select onChange={handleChange} value={selected}>
    {options.map((option, index) => (
      typeof option === 'object'
        ? <option key={"option-"+index} value={option.value}>{option.label}</option>
        : <option key={"option-"+index} value={option}>{option}</option>
    ))}
  </select>
);
    }

export default DarkLightDropdown;