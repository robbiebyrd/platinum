import classNames from "classnames";
import React from "react";
import platinumDropDownStyle from "./PlatinumDropDown.module.scss";

type PlatinumDropdownOptions = {
    value: string;
    label: string;
}

type PlatinumDropdownProps = {
    id: string;
    options: PlatinumDropdownOptions[];
    selected?: string;
    small?: boolean;
    onChangeFunc?: any;
}
const PlatinumDropdown: React.FC<PlatinumDropdownProps> = ({
                                                               id,
                                                               options,
                                                               selected,
                                                               small,
                                                               onChangeFunc
                                                           }) => {
    return (
        <div className={classNames(
            platinumDropDownStyle.platinumDropDown,
            small ? platinumDropDownStyle.platinumDropDownSmall : ""
        )}>
            <select
                id={id}
                value={selected}
                onChange={onChangeFunc}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
};
export default PlatinumDropdown;

