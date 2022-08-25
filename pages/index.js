// Next
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Home.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import { dashboard } from "../components/FramerMotionVariants/Variants";
// Firebase
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/firebase-config";
// import { useAuthValue } from "../firebase/AuthContext";
import { useUserAuth } from '../firebase/AuthContext';

export default function Home() {
    // Current User
    const {user} = useUserAuth()
    const router = useRouter();
    const logout = () => {
        signOut(auth)
        router.push("/login")
        console.log('Sign out')
      }

    // if (!currentUser) {
    //     router.push("/login")
    //     var emailVerified = auth.currentUser.emailVerified
    // }

    // if (!auth.currentUser.emailVerified) {
    //     router.push("/verify-email")
    // }

    if (!user) {
        router.push('/login')
      } else {
        const verificado = user.emailVerified
    
        if (verificado === false ){
          router.push('/verify-email')
        //   logout()
          console.log("Email no verificado")
        }
    }

    return (
        <Box
            className={styles.container}
            sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}
            component={motion.div}
            variants={dashboard}
            initial="start"
            animate="animate"
            exit="exit"
        >
            {user?.email}
            {/* Title */}
            <Typography component="h1" variant="h1" color="primary">Virgo <br/> Anotador</Typography>
            <Divider className={styles.divider}/>
            {/* Content */}
            <Box className={styles.box}>
                <Typography color="primary" component="h2" variant="h6" className={styles.subtitle}>Que sale hoy rey ?</Typography>
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
                                <CardActionArea>
                                    <Box sx={{height: {xs: "21.5rem", sm: "18rem", md: "16.5rem", lg: "22rem", xl: "23.5rem"}}} className={styles.imageContainer}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1602901248692-06c8935adac0"
                                        alt="Picture of the author"
                                        objectFit="cover"
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
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                        {/* Fifita */}
                        <SwiperSlide>
                            <Card className={styles.card}>
                                <CardActionArea>
                                    <Box sx={{height: {xs: "21.5rem", sm: "18rem", md: "16.5rem", lg: "22rem", xl: "23.5rem"}}} className={styles.imageContainer}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
                                        alt="Picture of the author"
                                        objectFit="cover"
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
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Box>
        </Box>
    )
}
