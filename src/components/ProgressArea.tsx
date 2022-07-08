import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import styles from '../styles/ProgressArea.module.scss';

interface ProgressAreaProps{
    currentTime:number,
    duractionSong:number
}

export function ProgressArea({currentTime, duractionSong}:ProgressAreaProps){
    const mainBar = useRef<HTMLDivElement>(null);


    //const [progress, setProgress]  = useState(0);
    const [progresswidth, setProgresswidth] = useState<number>(0);
    const [currentTimeformatted, setCurrentTimeformatted] = useState('0:00');
    const [durationformatted, setDurationformatted] = useState('0:00');

    useEffect(()=>{
        formatCurrentTime();

        changeProgressBar();
    },[currentTime])
    
    useEffect(()=>{
        modifyDuraction()
    },[duractionSong])

    const formatCurrentTime = () =>{
        const totalMin = Math.floor(currentTime / 60);
        const totalSec = Math.floor(currentTime % 60);

        setCurrentTimeformatted(`${totalMin}:${totalSec}`);
    }

    const modifyDuraction = () =>{
        const totalMin = Math.floor(duractionSong / 60);
        const totalSec = Math.floor(duractionSong % 60);

        setDurationformatted(`${totalMin}:${totalSec}`)
    }

    function changeProgressBar() {
        setProgresswidth(currentTime / duractionSong * 100);
        // mainBar.current?.style.setProperty("width",`${progresswidth}%`);
    }

    /* function handleChangeProgressBar(event:MouseEvent<HTMLDivElement>){
        const width = mainBar.current?.clientWidth!;
        const offset = event.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audio.current?.currentTime = divprogress / 100 * timeSong.duraction;
    } */
    
    return(
        <div 
            className={styles.progress_area}
            /* onClick={handleChangeProgressBar} */
        >
            <div
                className={styles.progress_bar}
                ref={mainBar}
                style={{width:`${progresswidth}%`}}
            >
            </div>

            <div className={styles.song_timer}>
              <span className={styles.current_time}>{currentTimeformatted}</span>
              <span className={styles.max_duration}>{durationformatted}</span>
            </div>
        </div>
    )
}