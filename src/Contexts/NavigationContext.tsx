import React, {createContext, useContext, useState} from 'react';
import {SideNavigationMenuItemProps} from "../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AddBox from '@mui/icons-material/AddBox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {RoutesEnum} from "../Routes";
import {UserType} from "../Types/Account";
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person';
import {User} from "../Types/User";

const NavigationContext = createContext({} as NavigationContextState);

interface NavigationContextState {
    //Current state of side navigation bar
    isExpanded: boolean;
    //Callback to set the state of the side navigation bar
    setIsExpanded: (isExpanded: boolean) => void;
    //Menu items in the side navigation
    sideNavigationMenuItems: SideNavigationMenuItemProps[];
}

export const NavigationContextContextProvider = ({children}: any) => {
    /**
     * Current state of side navigation bar
     */
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <HomeIcon/>,
            text: 'Home',
            route: RoutesEnum.HOME
        },
        {

            icon: <ArticleIcon/>,
            text: user?.userType === UserType.PROFESSIONAL ? 'Request History' : 'My Requests',
            route: RoutesEnum.REQUEST_HISTORY
        },
        {
            icon: <AccountCircle/>,
            text: 'Account Profile',
            route: RoutesEnum.USER_MANAGEMENT
        },
    ];

    //If the usertype is a client, render the client icons too
    if (user.userType === UserType.CLIENT) {
        const createRequest: SideNavigationMenuItemProps = {
            icon: <AddBox/>,
            text: 'Create Requests',
            route: RoutesEnum.CREATE_REQUEST
        }
        sideNavigationMenuItems.splice(1, 0, createRequest);
    }

    if (user.userType === UserType.PROFESSIONAL) {
        const userSpecificNavigation: SideNavigationMenuItemProps = {
            icon: <MenuIcon/>,
            text: 'Available Requests',
            route: RoutesEnum.AVAILABLE_REQUESTS
        }
        sideNavigationMenuItems.splice(1, 0, userSpecificNavigation);
    }
    if (user.userType === UserType.PROFESSIONAL) {
        const userSpecificNavigation: SideNavigationMenuItemProps = {
            icon: <Person/>,
            text: 'Profile Page',
            route: RoutesEnum.Pro_Profile
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