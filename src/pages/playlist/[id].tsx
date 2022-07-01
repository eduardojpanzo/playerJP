import { ChangeEvent, useEffect, useRef, useState } from 'react';
import MusicList from '../../components/MusicList';
import { Player } from '../../components/Player';
import { ProgressArea } from '../../components/ProgressArea';

import styles from '../../styles/Music.module.scss';

type SongProps = {
  id:number;
  name:string;
  artist:string;
  img:string;
  src:string;
}

interface MyProps{
    musics:SongProps[]
}

type TimeSong = {
  currentTime: number;
  duraction:number
}

const Music = ({musics}:MyProps) => {
  const mainAudio = useRef<HTMLAudioElement>(null);

  const [songIndex, setSongIndex] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<SongProps>(musics[songIndex]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [timeSong,setTimeSong] = useState<TimeSong>({currentTime:0,duraction:0})

    /* const router = useRouter();
    const {musicId} = router.query; */


  //sempre controlará se está ou não a tocar...
  useEffect(()=>{
    if (isPlaying) {
      PlaySong();
    } else {
      PauseSong();
    }
  },[isPlaying])
  
  function getCurrentTimeAndDuration(audioElement:HTMLAudioElement) {
    const currentTime = audioElement.currentTime;
    const duraction = audioElement.duration;

    return{currentTime,duraction}
  }

/*   function changeProgressBar() {
    mainAudio.current?.currentTime = 100 * timeSong.duraction;
  } */

  const onPlaying = (event:ChangeEvent<HTMLAudioElement>) => {
    setTimeSong(getCurrentTimeAndDuration(event.target))
  }

  function handleChangePlayPause() {
    setIsPlaying(oldState=>oldState = !oldState)
  }

  const PlaySong = ()=>{
    mainAudio.current?.play();
  }
  
  const PauseSong = ()=>{
    mainAudio.current?.pause();
  }

  const handleNextSong = ()=>{
    const index = musics.findIndex(music=>music.id === currentSong.id);
    if (index == 0) {
      setCurrentSong(musics[musics.length -1]);
    } else{
      setCurrentSong(musics[index -1]);
    }
  }

  const handlePrevtSong = ()=>{
    const index = musics.findIndex(music=>music.id === currentSong.id);
    if (index === musics.length) {
      setCurrentSong(musics[0]);
    } else{
      setCurrentSong(musics[index + 1]);
    }
  }

  return (
    <div className={styles.music_container}>
      <div className={styles.wrapper}>
        
        <div className={styles.image_area}>
            <img src={currentSong.img} alt={currentSong.name} />
        </div>

        <div className={styles.song_details}>
            <p className={styles.name}>{currentSong.name}</p>
            <p className={styles.artist}>{currentSong.artist}</p>
        </div>

        <ProgressArea 
          timeSong={timeSong}
          songSrc={currentSong.src}
          audio={mainAudio}
          onPlaying={onPlaying}
        />

        <Player
          isPlaying={isPlaying}
          onPlayPauseSong={handleChangePlayPause}
          onNextSong={handleNextSong}
          onPrevSong={handlePrevtSong}
        />

      </div>

      <MusicList music={currentSong}/>
    </div>
  )
}

export default Music

export const getServerSideProps = async () =>{
    const res = await fetch(`http://localhost:3000/api/music`);
  
    const data = await res.json();
  
    return{
        props:{
            musics:data
        }
    }
  }