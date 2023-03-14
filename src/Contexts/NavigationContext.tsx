import React, {createContext, useContext, useState} from 'react';
import {SideNavigationMenuItemProps} from "../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import HomeIcon from '@mui/icons-material/Home';
import BiotechIcon from '@mui/icons-material/Biotech';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {RoutesEnum} from "../Routes";

const NavigationContext = createContext({} as NavigationContextState);

interface NavigationContextState {
    //Current state of side navigation bar
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;

    //Menu items in the side navigation
    sideNavigationMenuItems: SideNavigationMenuItemProps[];
}

export const NavigationContextContextProvider = ({children}: any) => {
    /**
     * Current state of side navigation bar
     */
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <HomeIcon/>,
            text: 'Home',
            route: RoutesEnum.HOME
        },
        {
            icon: <BiotechIcon />,
            text: 'Test',
            route: RoutesEnum.TEST
        },
        {
            icon: <LogoutIcon />,
            text: 'Logout (Inactive)'
        },
        {
            icon: <PersonAddIcon />,
            text: 'Sign-Up',
            route: RoutesEnum.SIGNUP
        }
    ]

    const value = {
        isExpanded,
        setIsExpanded,
        sideNavigationMenuItems
    }

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigationContext = () => useContext(NavigationContext);