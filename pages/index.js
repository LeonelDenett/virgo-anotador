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
    const pagination = {
        clickable: true,
        bulletClass: `swiper-pagination-bullet`
    };

    return (
        <Box className={styles.container}>
            {/* Title */}
            <Typography component="h1" variant="h1" color="primary">Virgo Anotador</Typography>
            <Divider className={styles.divider}/>
            {/* Content */}
            <Box className={styles.box}>
                <Typography color="primary" className={styles.subtitle}>Que sale hoy rey ?</Typography>
                <Box className={styles.cardContainer}>
                    {/* <Card className={styles.card}>
                        <Image
                            src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                            alt="Picture of the author"
                            layout="responsive"
                            height={'75%'}
                            width={'100%'}
                            priority
                        />
                        <CardContent>
                            <Typography variant="h5" component="h5">
                            Codiak
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="large" variant="contained">Partida</Button>
                            <Button size="large" variant="contained">Historial</Button>
                        </CardActions>
                    </Card>
                    <Card className={styles.card}>
                        <Image
                            src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                            alt="Picture of the author"
                            layout="responsive"
                            height={'75%'}
                            width={'100%'}
                            priority
                        />
                        <CardContent>
                            <Typography variant="h5" component="h5">
                            Codiak
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="large" variant="contained">Partida</Button>
                            <Button size="large" variant="contained">Historial</Button>
                        </CardActions>
                    </Card> */}
                    {/* <div className="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>
                    <div className="swiper-pagination"></div>
                    </div> */}
                    {/* Swiper needs Global Style */}
                    <style global jsx>{`
                        .swiper-pagination {
                        margin-bottom: -0.7rem
                        },
                    `}</style>
                    <Swiper
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper"
                        spaceBetween={16}
                        style={{
                            "--swiper-pagination-color": "#f56217",
                            "--swiper-pagination-bullet-inactive-color": "#999999",
                            "--swiper-pagination-bullet-inactive-opacity": "0.5",
                            "--swiper-pagination-bullet-size": "0.8rem",
                            "--swiper-pagination-bullet-horizontal-gap": "3px",
                        }}
                    >
                        <SwiperSlide>
                            <Card className={styles.card}>
                                <Image
                                    src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                                    alt="Picture of the author"
                                    layout="responsive"
                                    objectFit='cover'
                                    height={'100%'}
                                    width={'100%'}
                                    priority
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                    Codi
                                    </Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className={styles.card}>
                                <Image
                                    src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
                                    alt="Picture of the author"
                                    layout="responsive"
                                    objectFit='cover'
                                    height={'100%'}
                                    width={'100%'}
                                    priority
                                />
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
