import React from "react";
import {Typography} from "@mui/material";
import {useNavigationContext} from "../../../Contexts/NavigationContext";
import styles from './SideNavigationMenuItem.module.css';
import {useNavigate} from "react-router-dom";
import {RoutesEnum} from "../../../Routes";

export interface SideNavigationMenuItemProps {
    /**
     * Text to display in the menu item
     */
    text?: string;

    /**
     * (Optional) icon to display on the left of the menu item
     */
    icon?: React.ReactNode;

    /**
     * (Optional) route to go to when menu item is clicked
     */
    route?: RoutesEnum;

    /**
     * (Optional) Callback to perform an onClick action
     */
    onClick?: () => void;

    selected?: boolean;
}

export const SideNavigationMenuItem = ({text, icon, route, onClick, selected}: SideNavigationMenuItemProps) => {
    const {isExpanded} = useNavigationContext();
    const navigate = useNavigate();

    return (
        <div

            className={isExpanded ? `${styles['menu-item']} ${styles['menu-item__expanded']} ${selected ? styles['menu-item__selected'] : ''}` : `${styles['menu-item']} ${styles['menu-item__condensed']} ${selected ? styles['menu-item__selected'] : ''}`}
            onClick={() => {
                if(onClick) {
                    onClick();
                }
                route && navigate(`/${route}`);
            }}
        >
            {icon}
            {isExpanded && <Typography style={{fontFamily:"Fahrenheit", fontWeight:"bold", fontSize:"18px"}} variant={'subtitle1'}>{text}</Typography>}
        </div>
    )
}
export default SideNavigationMenuItem;