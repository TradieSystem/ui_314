import React from "react";
import SideNavigationMenuItem from "./SideNavigationMenuItem/SideNavigationMenuItem";
import {useNavigationContext} from "../../Contexts/NavigationContext";
import styles from './SideNavigation.module.css';
import {Drawer} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import {RoutesEnum} from "../../Routes";

export const SideNavigation = () => {
    const {isExpanded, setIsExpanded, sideNavigationMenuItems} = useNavigationContext();
    const navigate = useNavigate();
    return (
        <>
            <Drawer
                variant={"persistent"}
                anchor={"left"}
                open={true}
                PaperProps={{
                    className: isExpanded ? styles['side-nav__open'] : styles['side-nav__closed'],
                    sx: {backgroundColor: "#ffffff", color: "#db5b13"}
                }}
            >
                {isExpanded ?
                    <SideNavigationMenuItem
                        text={'Collapse'}
                        icon={<ChevronLeft sx={{color: "#db5b13"}}/>}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                    :
                    <SideNavigationMenuItem
                        icon={<ChevronRight sx={{color: "#db5b13"}}/>}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                }
                {
                    sideNavigationMenuItems.map((item) => {
                        return (
                            <SideNavigationMenuItem key={`${item.text}-side__icon`} icon={item.icon} text={item.text} route={item.route}/>
                        )
                    })
                }
                <SideNavigationMenuItem
                    icon={<LogoutIcon />}
                    text={"Logout"}
                    onClick={() => {
                        localStorage.setItem("user", "");
                        localStorage.setItem("access_token", "");
                        localStorage.setItem("refresh_token", "");
                        navigate(`/${RoutesEnum.LOGIN}`);
                    }}
                />
            </Drawer>
        </>
    )
}

export default SideNavigation;