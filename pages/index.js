// Next
import {useState} from 'react';
import Image from 'next/image';
// Styles
import styles from '../styles/Home.module.css';
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// Mui Icons
import CircleIcon from '@mui/icons-material/Circle';
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Framer Motion
import {motion, AnimatePresence} from 'framer-motion';

export default function Home() {
    const [show,setShow] = useState(false)
    function Show() {
        setShow(!show)
        console.log("Clicked")
    }

    return (
        <Box className={styles.container}>
            {/* Title */}
            <Typography component="h1" variant="h1" color="primary">Virgo <br/> Anotador</Typography>
            <Divider className={styles.divider}/>
            {/* Content */}
            <Box className={styles.box}>
                <Typography color="primary" className={styles.subtitle}>Que sale hoy rey ?</Typography>
                <Box className={styles.cardContainer}>
                    {/* Swiper needs Global Styles */}
                    <style global jsx>{`
                        .swiper-pagination {
                        margin-bottom: -0.7rem
                        }
                        .swiper-pagination-bullet{
                            background: #fe8c00;
                            background: -webkit-linear-gradient(to left, #f83600, #fe8c00);
                            background: linear-gradient(to right, #f83600, #fe8c00);
                            height: 0.8rem;
                            width: 0.8rem;
                            opacity: 0.5;
                        }
                        .swiper-pagination-bullet-active{
                            opacity: 1;
                        }
                    `}</style>
                    <Swiper
                        pagination={true}
                        modules={[Pagination]}
                        className={styles.swiperContainer}
                        spaceBetween={16}
                    >
                        {/* Codi */}
                        <SwiperSlide>
                            <Card className={styles.card}>
                                <Box sx={{height: {xs: '20rem', sm: '18rem', md: '15rem', lg: '14rem'}}} className={styles.imageContainer}>
                                <Image
                                    src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                                    alt="Picture of the author"
                                    objectFit='cover'
                                    priority
                                    className={styles.image}
                                    layout="fill"
                                />
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                    Codi
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        {/* Fifita */}
                        <SwiperSlide>
                            <Card className={styles.card}>
                                <Box sx={{height: {xs: '20rem', sm: '18rem', md: '15rem', lg: '14rem'}}} className={styles.imageContainer}>
                                <Image
                                    src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
                                    alt="Picture of the author"
                                    objectFit='cover'
                                    priority
                                    className={styles.image}
                                    layout="fill"
                                />
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                    Fifita
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Box>
        </Box>
    )
}
