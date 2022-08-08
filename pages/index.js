// Next
import {useState} from 'react';
// Styles
import styles from '../styles/Home.module.css'
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Framer Motion
import {motion, AnimatePresence} from 'framer-motion';
import { Button } from '@mui/material';

export default function Home({loading}) {
  const [show,setShow] = useState(false)
  function Show() {
    setShow(!show)
    console.log("Clicked")
  }
  return (
    <div className={styles.container}>

      <Box>
        <Typography variant="h1">Virgo Anotador</Typography>
        <Box component={motion.div}>
            <Button onClick={Show} variant="contained">Show</Button>
        </Box>
        <AnimatePresence>
          { show? <Box component={motion.div} key="box" style={{width: '120px', height: '120px', backgroundColor: 'purple'}}
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          exit={{ opacity: 0, y:50}}
          
          ></Box> : null
        }
        </AnimatePresence>
      </Box>
    </div>
  )
}
