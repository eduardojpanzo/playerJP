import { GetServerSideProps, GetStaticProps } from 'next';
import { ChangeEvent, ContextType, useEffect, useRef, useState } from 'react';
import {SongsList} from '../../components/SongsList';
import { Player } from '../../components/Player';
import { ProgressArea } from '../../components/ProgressArea';

import styles from '../../styles/MusicPlayer.module.scss';
import { MdPlaylistPlay } from 'react-icons/md';

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
  currentTime: number | undefined;
  duraction:number | undefined;
}

const MusicPlayer = ({musics}:MyProps) => {   
  const audioElement = useRef<HTMLAudioElement>(null);

  const [currentSong, setCurrentSong] = useState<SongProps>(musics[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [currentTime,setCurrentTime] = useState<number>(0)
  const [songDuration,setSongDuration] = useState<number>(0)

  const [isShow, setIsShow] = useState<boolean>(false);

  //sempre controlará se está ou não a tocar...
  useEffect(()=>{
    if (isPlaying) {
      PlaySong();
    } else {
      PauseSong();
    }
  },[isPlaying])

  const onPlaying = () => {
    const currentTime = audioElement.current?.currentTime;
    const songDuration = audioElement.current?.duration;
    setCurrentTime(currentTime!);
    setSongDuration(songDuration!)
  }

  function handleChangePlayPause() {
    setIsPlaying(oldState=>oldState = !oldState)
  }

  const PlaySong = ()=>{
    audioElement.current?.play();
  }
  
  const PauseSong = ()=>{
    audioElement.current?.pause();
  }

  const handlePrevSong = ()=>{
    const index = musics.findIndex(music=>music.id === currentSong.id);
    if (index === 0) {
      setCurrentSong(musics[musics.length -1]);
    } else{
      setCurrentSong(musics[index -1]);
    }

    setIsPlaying(true)
  }
  
  const handleNextSong = ()=>{
    const index = musics.findIndex(music=>music.id === currentSong.id);
    if (index === (musics.length - 1)) {
      setCurrentSong(musics[0]);
    } else{
      setCurrentSong(musics[index + 1]);
    }
    
    setIsPlaying(true)
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
          currentTime={currentTime}
          duractionSong={Number(currentSong.duration)}
        />

        <audio 
          src={currentSong.preview}
          ref={audioElement}
          onTimeUpdate={onPlaying}
        />

        <Player
          isPlaying={isPlaying}
          onPlayPauseSong={handleChangePlayPause}
          onNextSong={handleNextSong}
          onPrevSong={handlePrevSong}
        />

      </div>

      <div className={styles.showPlayList} onClick={()=>setIsShow(!isShow)}>
        <MdPlaylistPlay/>
      </div>
      <SongsList isShow={isShow} songs={musics}/>
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