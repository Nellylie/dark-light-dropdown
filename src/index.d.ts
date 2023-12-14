interface DropDownProps {
  label?: string;
  name: string;
  id: string;
  options: any[]; 
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  theme?: 'light' | 'dark';
}

interface DarkLightDropdownProps extends DropDownProps {
  valueDropDown: any[];
}

declare function DarkLightDropdown(props: DarkLightDropdownProps): React.ReactElement;

export default DarkLightDropdown;
