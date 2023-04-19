import React from "react";
import SideNavigationMenuItem from "./SideNavigationMenuItem/SideNavigationMenuItem";
import {useNavigationContext} from "../../Contexts/NavigationContext";
import styles from './SideNavigation.module.css';
import {Drawer} from "@mui/material";
import {AccountCircle, ChevronLeft, ChevronRight, Person, SupervisedUserCircle} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import {RoutesEnum} from "../../Routes";
import {User} from "../../Types/User";
import {UserType} from "../../Types/Account";


export const SideNavigation = () => {
    const {isExpanded, setIsExpanded, sideNavigationMenuItems} = useNavigationContext();
    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

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
                            <SideNavigationMenuItem key={`${item.text}-side__icon`} icon={item.icon} text={item.text}
                                                    route={item.route}/>
                        )
                    })
                }

                <div style={{
                    padding: "1rem", position: "absolute",
                    bottom: "0"
                }}>
                    {
                        user.professional !== null && user.client !== null &&
                        <SideNavigationMenuItem
                            icon={<SupervisedUserCircle/>}
                            text={`Toggle to ${user.userType === UserType.CLIENT ? 'Professional' : 'Client'} view`}
                            onClick={() => {
                                const newUserObject = {
                                    ...user,
                                    userType: user.userType === UserType.CLIENT ? UserType.PROFESSIONAL : UserType.CLIENT
                                }
                                localStorage.setItem("user", JSON.stringify(newUserObject));

                                navigate(`/${RoutesEnum.HOME}`);
                                window.location.reload();
                            }}
                        />}
                    {
                        user.userType === UserType.PROFESSIONAL &&

                        <SideNavigationMenuItem
                            icon={<Person/>}
                            text={'Profile Page'}
                            onClick={() => {
                                navigate(`/${RoutesEnum.Pro_Profile}`);
                            }}
                        />
                    }
                    <SideNavigationMenuItem
                        icon={<AccountCircle/>}
                        text={'Account Profile'}
                        onClick={() => {
                            navigate(`/${RoutesEnum.USER_MANAGEMENT}`);
                        }}
                    />
                    <SideNavigationMenuItem
                        icon={<LogoutIcon/>}
                        text={"Logout"}
                        onClick={() => {
                            localStorage.setItem("user", "");
                            localStorage.setItem("access_token", "");
                            localStorage.setItem("refresh_token", "");
                            navigate(`/${RoutesEnum.LOGIN}`);
                        }}
                    />

                    {/*If the user has both PROFESSIONAL and CLIENT data, they should be able to toggle between the two*/}
                </div>

            </Drawer>
        </>
    )
}

export default SideNavigation;