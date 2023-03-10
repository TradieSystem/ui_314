import React from 'react';
import {Typography} from "@mui/material";
import SideNavigation from "../SideNavigation/SideNavigation";
import styles from './PageContainer.module.css';
import {useNavigationContext} from "../../Contexts/NavigationContext";

/**
 * Interface describing the properties of {@link PageContainer}
 */
export interface PageContainerProps {
    /**
     * Title of the page
     */
    title: React.ReactNode;

    /**
     * (Optional) Subtitle of the page
     */
    subtitle?: React.ReactNode;

    /**
     * (Optional) Children components to display on the page
     */
    children?: React.ReactElement;
}

/**
 * A component to render the components within a page
 * @param title to display on the top of the page, as a large header
 * @param subtitle (Optional) to display in smaller font, under the header
 * @param children (Optional) content to display on the body of the page, under title and subtitle
 */
export const PageContainer = ({title, subtitle, children}: PageContainerProps) => {
    const {isExpanded} = useNavigationContext();

    return (
        <>
            <SideNavigation/>
            <div
                id={'page-content'}
                className={isExpanded ? styles['page-content__min'] : styles['page-content__max']}
            >
                <Typography variant={'h2'}>{title}</Typography>
                {
                    subtitle &&
                    <Typography variant={'h3'}>{subtitle}</Typography>
                }
                {children}
            </div>
        </>
    )
}

export default PageContainer;