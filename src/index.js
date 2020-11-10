import React from 'react'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}


export {default as Button} from './Button';
export * from './Button';

export {default as CheckBox} from "./CheckBox";
export * from './CheckBox';

export {default as DateInput} from "./DateInput";
export * from './DateInput';

export {default as DropDown} from "./DropDown";
export * from './DropDown';

export {default as Icon} from "./Icon";
export * from './Icon';

export {default as PasswordInput} from "./PasswordInput";
export * from './PasswordInput';

export {default as IconButton} from "./IconButton";
export * from './IconButton';

export {default as NumberInput} from "./NumberInput";
export * from './NumberInput';

export {default as TextArea} from "./TextArea";
export * from './TextArea';

export {default as TextInput} from "./TextInput";
export * from './TextInput';

export {default as ToggleSwitch} from "./ToggleSwitch";
export * from './ToggleSwitch';