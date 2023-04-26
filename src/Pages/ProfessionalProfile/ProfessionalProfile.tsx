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
const reviews = [
    {
        requestID: 1,
        review: "This is an amazing boiler that has been installed! I would highly recommend it.",
        rating: 5
    },
    {
        requestID: 2,
        review: "I was pleasantly surprised by his work. It exceeded my expectations.",
        rating: 4
    },
    {
        requestID: 3,
        review: "I have been using this plumber for a months now and I am very happy with him.",
        rating: 4
    },
    {
        requestID: 4,
        review: "They install a new pipes for my house! It has made my life so much easier.",
        rating: 5
    },
    {
        requestID: 5,
        review: "Plumbing job was okay. It works fine but I've had some issues with the toliet.",
        rating: 3
    },
    {
        requestID: 6,
        review: "I wouldn't recommend this plumber. He doesn't work just drinks on the job",
        rating: 2
    }
];


export const ProfessionalProfile = () => {
    const user : User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const [value] = React.useState<number | null>(2);

    if (user) {
        return (
            <Box
                component={motion.div}
                {...fadeInUp}
            >
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
               <Box sx={{
                   my: 3,
               }}>
                <Box style={{height: "800px", width:"800px"}}>
                    <CarouselReview reviews={reviews} />
                </Box>
                </Box>
            </Box>
        );
    }
}

export default ProfessionalProfile;