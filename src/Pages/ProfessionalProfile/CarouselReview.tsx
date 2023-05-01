import React from 'react';
import Slider from "react-slick";
import {Grid, Typography} from "@mui/material";
import {ServiceRequest} from "../../Types/ServiceRequest"

interface ReviewCardProps {
    reviews: ServiceRequest[];
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const ReviewCard = ({ reviews }: ReviewCardProps) => {
    return (
        <div style={{ margin: "8px",
            borderRadius: "20px",
            border: "2px solid #DB5B13",
            padding:"50px",
            background: "#d9c8c6"}}>
            {reviews.map(review => (
                <div key={review.requestID} style={{ marginBottom: "20px"}}>
                    <Grid container spacing={4} style={{justifyContent: "center", display: "flex",padding:"20px"}}>
                        <Grid item xs={3}>
                            <Typography><b>Request:</b> {review.requestID}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography><b>Service:</b> {review.serviceType}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography><b>Review:</b> {review.review}</Typography>
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

const CarouselReview = (props: {reviews: ServiceRequest[]}) => {
    const { reviews } = props;
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
