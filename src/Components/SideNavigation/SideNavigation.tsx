import React from "react";
import SideNavigationMenuItem from "./SideNavigationMenuItem/SideNavigationMenuItem";
import {useNavigationContext} from "../../Contexts/NavigationContext";
import styles from './SideNavigation.module.css';
import {Button, Drawer} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

export const SideNavigation = () => {
    const {isExpanded, setIsExpanded, sideNavigationMenuItems} = useNavigationContext();

    return (
        <>
            <Drawer
                variant={"persistent"}
                anchor={"left"}
                open={true}
                PaperProps={{
                    className: isExpanded ? styles['side-nav__open'] : styles['side-nav__closed'],
                    sx: {backgroundColor: "#ffffff", color: "#0055ff"}
                }}
            >
                {isExpanded ?
                    <Button onClick={() => setIsExpanded(!isExpanded)}>
                        <ChevronLeft/>
                    </Button> :
                    <Button onClick={() => setIsExpanded(!isExpanded)}>
                        <ChevronRight/>
                    </Button>
                }
                {
                    sideNavigationMenuItems.map((item) => {
                        return (
                            <SideNavigationMenuItem key={`${item.text}-side__icon`} icon={item.icon} text={item.text} route={item.route}/>
                        )
                    })
                }
            </Drawer>
        </>
    )
}

export default SideNavigation;