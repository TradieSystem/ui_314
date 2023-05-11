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
                    className: `${styles['side-nav']} ${isExpanded ? styles['side-nav__open'] : styles['side-nav__closed']}`
                }}
            >
                <div>
                    {isExpanded ?
                        <SideNavigationMenuItem
                            text={'Collapse'}
                            icon={<ChevronLeft sx={{color: "#0c0c0c"}}/>}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                        :
                        <SideNavigationMenuItem
                            icon={<ChevronRight sx={{color: "#090909"}}/>}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                    }
                    {
                        sideNavigationMenuItems.map((item) => {
                            return (
                                <SideNavigationMenuItem key={`${item.text}-side__icon`}
                                                        icon={item.icon}
                                                        text={item.text}
                                                        route={item.route}
                                />
                            )
                        })
                    }
                </div>
                <div style={{marginBottom: isExpanded ? "0rem" : "1rem"}}>
                    {
                        user.professional !== null && user.client !== null &&
                        <SideNavigationMenuItem
                            icon={<SupervisedUserCircle/>}
                            text={`${user.userType === UserType.CLIENT ? 'Professional' : 'Client'} view`}
                            onClick={() => {
                                const newUserObject = {
                                    ...user,
                                    userType: user.userType === UserType.CLIENT ? UserType.PROFESSIONAL : UserType.CLIENT
                                }
                                localStorage.setItem("user", JSON.stringify(newUserObject));

                                navigate(`/${RoutesEnum.REQUEST_HISTORY}`);
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