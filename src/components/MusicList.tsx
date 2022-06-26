import styles from '../styles/MusicList.module.scss'

type MusicProps = {
    id:number;
    name:string;
    artist:string;
    img:string;
    src:string;
}
  
interface MyProps{
    music:MusicProps
}

function MusicList({music}:MyProps) {
    return ( 
        <div className={styles.music_list}>
            
            <div className={styles.header}>
                <div className={styles.row}>
                    <i className="list material-icons">queue_music</i>
                    <span>Music list</span>
                </div>
                <i id="close" className="material-icons">close</i>
            </div>

            <ul>
                <li li-index={music.id + 1}>
                    <div className={styles.row}>
                    <span>{music.name}</span>
                    <p>{music.artist}</p>
                    </div>

                    <span id="${allMusic[i].src}" className={styles.audio_duration}>3:40</span>
                </li>
            </ul>
        </div>
     );
}

export default MusicList;