import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {
    Avatar,
} from "@mui/material";
import {User} from "../../Types/User";
import {motion} from "framer-motion";
import {fadeInUp} from "../../Effects/Animations";
import CarouselReview from './CarouselReview';



export const ProfessionalProfile = () => {
    const user : User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const [value] = React.useState<number | null>(2);

    if (user) {
        return (
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                <Box sx={{
                    display: "grid",
                    justifyContent: "center"
                }}>
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                            sx={{
                                width: 90,
                                height: 90,
                            }}
                        />
                    </div>
                    <Box style={{justifyContent: "center", display: "grid"}}>
                        <h1>{user.firstName} {user.lastName}</h1>
                        <center><Rating name="read-only" value={value} readOnly/></center>
                    </Box>
                </Box>
               <Box sx={{
                   my: 3,
               }}>
                <Box style={{height: "800px", width:"800px"}}>
                    <CarouselReview />
                </Box>
                </Box>
            </Box>
        );
    }
}

export default ProfessionalProfile;