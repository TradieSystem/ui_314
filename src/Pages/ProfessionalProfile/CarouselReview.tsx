import React from 'react';
import Slider from "react-slick";
import {Grid, Typography} from "@mui/material";
 interface Review {
    id: number;

    service: string;

    content: string;

    rating: number;

}


interface ReviewCardProps {
    reviews: Array<Review>;
}
const reviews = [
    {
        id: 1,
        service: "Plumbing",
        content: "This is an amazing boiler that has been installed! I would highly recommend it.",
        rating: 5
    },
    {
        id: 2,
        service: "Plumbing",
        content: "I was pleasantly surprised by his work. It exceeded my expectations.",
        rating: 4
    },
    {
        id: 3,
        service: "Plumbing",
        content: "I have been using this plumber for a months now and I am very happy with him.",
        rating: 4
    },
    {
        id: 4,
        service: "Plumbing",
        content: "They install a new pipes for my house! It has made my life so much easier.",
        rating: 5
    },
    {
        id: 5,
        service: "Plumbing",
        content: "Plumbing job was okay. It works fine but I've had some issues with the toliet.",
        rating: 3
    },
    {
        id: 6,
        service: "Plumbing",
        content: "I wouldn't recommend this plumber. He doesn't work just drinks on the job",
        rating: 2
    }
];

const ReviewCard = ({ reviews }: ReviewCardProps) => {
    return (
        <div style={{ margin: "8px",
            borderRadius: "20px",
            border: "2px solid #DB5B13",
            padding:"50px",
            background: "#d9c8c6"}}>
            {reviews.map(review => (
                <div key={review.id} style={{ marginBottom: "20px"}}>
                    <Grid container spacing={4} style={{justifyContent: "center", display: "flex",padding:"25px"}}>
                        <Grid item xs={3}>
                            <Typography><b>Service:</b> {review.service}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography><b>Description:</b> {review.content}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography><b>Rating:</b> {review.rating}/5</Typography>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    );
};
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const CarouselReview = () => {
    const groupedReviews = reviews.reduce((acc: any[], review, i) => {
        const groupIndex = Math.floor(i / 3);
        acc[groupIndex] = acc[groupIndex] || [];
        acc[groupIndex].push(review);
        return acc;
    }, []);
    return (
        <Slider {...settings}>
            {groupedReviews.map((group, i) => (
                <div key={i}>
                    <ReviewCard reviews={group} />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselReview;