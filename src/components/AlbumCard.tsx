import Link from 'next/link';
import styles from '../styles/AlbumCard.module.scss';

type ArtistData = {
    id:number,
    name:string,
    picture_medium:string
}

type AlbumData = {
    id:number;
    title:string;
    cover:string;
    artist: ArtistData;
}


interface ArtistCardProps{
    album:AlbumData;
}
export const AlbumCard = ({album}:ArtistCardProps) =>{
    return ( 
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={album.cover} alt={album.title} />
            </div>
            <div className={styles.albumInfo}>
                <p>{album.title}</p>
                <span>{album.artist.name}</span>
            </div>
            <Link href={`/playlist/${album.artist.id}`}>
                Go to music
            </Link>
        </div>
    );
}