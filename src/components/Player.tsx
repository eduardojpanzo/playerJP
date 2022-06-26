import {MdFastForward, MdFastRewind, MdPause, MdPlayArrow} from 'react-icons/md'
import styles from '../styles/Player.module.scss'


interface PlayerProps{
    isPlaying:boolean;
    onPlayPauseSong:()=>void;
    onNextSong:()=>void;
    onPrevSong:()=>void;
}
export function Player({isPlaying,onPlayPauseSong,onNextSong,onPrevSong}:PlayerProps) {
    return(
        <div className={styles.controls}>
          <div className={styles.prev}
            onClick={onPrevSong}
          >
              <i><MdFastRewind/></i>
          </div>

          <div className={styles.play_pause}
            onClick={onPlayPauseSong}
          >
              {!isPlaying
              ?<i><MdPlayArrow/></i>
              :<i><MdPause/></i>}
          </div>

          <div className={styles.next}
            onClick={onNextSong}
          >
            <i><MdFastForward/></i>     
          </div>
        </div>
    )
}