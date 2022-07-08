import styles from '../styles/SongsListList.module.scss'

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
    songs:SongProps[],
    isShow:boolean,
}

export function SongsList({songs,isShow}:SongsListProps) {
    return ( 
        <div 
            className={styles.music_list}
            style={{
                right:isShow?'0':'-300px',
                display:isShow?'block':'none'
            }}
        >
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