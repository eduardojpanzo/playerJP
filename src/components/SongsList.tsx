import styles from '../styles/SongsList.module.scss'

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
  
interface SongsListProps{
    songs:SongProps[]
}

export function SongsList({songs}:SongsListProps) {
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
                {songs.map(song=>(
                    <li li-index={song.id + 1}>
                        <div className={styles.row}>
                        <span>{song.title}</span>
                        <p>{song.artist.name}</p>
                        </div>

                        <span id="${allMusic[i].src}" className={styles.audio_duration}>3:40</span>
                    </li>
                ))}
            </ul>
        </div>
     );
}