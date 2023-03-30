import React, {createContext, useContext, useState} from 'react';
import {SideNavigationMenuItemProps} from "../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBox from '@mui/icons-material/AddBox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {RoutesEnum} from "../Routes";
import {useAuthContext} from "./AuthContext";
import {UserType} from "../Types/Account";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';

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
    const {user} = useAuthContext();

    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <HomeIcon/>,
            text: 'Home',
            route: RoutesEnum.HOME
        },
        {
            icon: <ArticleIcon />,
            text: user?.usertype === UserType.PROFESSIONAL ? 'Request History' : 'My Requests',
            route: RoutesEnum.REQUEST_HISTORY
        },
        {
            icon: <AccountCircle />,
            text: 'Profile',
            route: RoutesEnum.USER_MANAGEMENT
        },
        //TODO we want this at the bottom of the side nav bar, not rendered as part of the top navigation group
        {
            icon: <LogoutIcon />,
            text: 'Logout',
            route: RoutesEnum.LOGIN
        },
        {
            icon: <Person />,
            text: 'Tradie Profile',
            route: RoutesEnum.Pro_Profile
        }
    ];

    //If the usertype is a client, render the client icons too
    if(user?.usertype === UserType.CLIENT) {
        const createRequest : SideNavigationMenuItemProps = {
            icon: <AddBox />,
            text: 'Create Requests',
            route: RoutesEnum.CREATE_REQUEST
        }
        sideNavigationMenuItems.splice(1, 0, createRequest);
    }

    if(user?.usertype === UserType.PROFESSIONAL) {
        const userSpecificNavigation : SideNavigationMenuItemProps = {
            icon: <MenuIcon />,
            text: 'Available Requests',
            route: RoutesEnum.AVAILABLE_REQUESTS
        }
        sideNavigationMenuItems.splice(1, 0, userSpecificNavigation);
    }

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