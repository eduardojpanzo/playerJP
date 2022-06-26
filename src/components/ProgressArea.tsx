import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import styles from '../styles/ProgressArea.module.scss';

interface ProgressAreaProps{
    timeSong:{
        currentTime:number,
        duraction:number
    },
    songSrc :string,
    audio:RefObject<HTMLAudioElement>,
    onPlaying:(event:ChangeEvent<HTMLAudioElement>)=>void
}

export function ProgressArea({timeSong,songSrc, audio,onPlaying}:ProgressAreaProps){
    const mainBar = useRef<HTMLDivElement>(null);

    //const [progress, setProgress]  = useState(0);
    const [duration, setDuration] = useState("");
    const [currentTime, setCurrentTime] = useState("0:00");
    const [progresswidth, setProgresswidth] = useState<number>(0);

    useEffect(()=>{
        modifyCurrentTime();

        changeProgressBar();
    },[timeSong])
    
    useEffect(()=>{
        modifyDuraction()
    },[timeSong.duraction])

    const modifyCurrentTime = () =>{
        const totalMin = Math.floor(timeSong.currentTime / 60);
        const totalSec = Math.floor(timeSong.currentTime % 60);

        setCurrentTime(`${totalMin}:${totalSec}`);
    }

    const modifyDuraction = () =>{
        const totalMin = Math.floor(timeSong.duraction / 60);
        const totalSec = Math.floor(timeSong.duraction % 60);

        setDuration(`${totalMin}:${totalSec}`)
    }

    function changeProgressBar() {
        setProgresswidth(timeSong.currentTime / timeSong.duraction * 100);
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

            <audio 
                src={songSrc}
                ref={audio}
                onTimeUpdate={onPlaying}
            />

            <div className={styles.song_timer}>
              <span className={styles.current_time}>{currentTime}</span>
              <span className={styles.max_duration}>{duration}</span>
            </div>
        </div>
    )
}