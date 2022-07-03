import { GetServerSideProps, GetStaticProps } from 'next';
import { ChangeEvent, ContextType, useEffect, useRef, useState } from 'react';
import {SongsList} from '../../components/SongsList';
import { Player } from '../../components/Player';
import { ProgressArea } from '../../components/ProgressArea';

import styles from '../../styles/MusicPlayer.module.scss';

type ArtistData = {
  id:number;
  name:string;
  picture_medium:string;
}
type AlbumProps ={
  id:number;
  title:string;
  cover:string;
}

type SongProps = {
  album:AlbumProps;
  artist:ArtistData;
  duration:string;
  id:number;
  preview:string;
  title:string;
}

interface MyProps{
    musics:SongProps[]
}

type TimeSong = {
  currentTime: number;
  duraction:number
}

const MusicPlayer = ({musics}:MyProps) => {
  console.log(musics);
  
  const mainAudio = useRef<HTMLAudioElement>(null);

  const [songIndex, setSongIndex] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<SongProps>(musics[songIndex]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeSong,setTimeSong] = useState<TimeSong>({currentTime:0,duraction:0})

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
            <img src={currentSong.album.cover} alt={currentSong.album.title} />
        </div>

        <div className={styles.song_details}>
            <p className={styles.name}>{currentSong.title}</p>
            <p className={styles.artist}>{currentSong.artist.name}</p>
        </div>

        <ProgressArea 
          timeSong={timeSong}
          songSrc={currentSong.preview}
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

      {/* <SongsList songs={musics}/> */}
    </div>
  )

}

export default MusicPlayer

  export const getServerSideProps: GetServerSideProps = async (context) =>{
    const res = await fetch(`http://localhost:3000/api/songs?q=${context.params?.id}`);

    const json = await res.json();

    return{
      props:{
          musics:json.list.data
    }
  }
}