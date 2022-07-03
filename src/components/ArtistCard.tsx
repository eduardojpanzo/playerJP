import Link from 'next/link';
import styles from '../styles/ArtistCard.module.scss';

type ArtistData = {
    id:number,
    name:string,
    picture_medium:string
  }


interface ArtistCardProps{
    artist:ArtistData;
}
export const ArtistCard = ({artist}:ArtistCardProps) =>{
    return ( 
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={artist.picture_medium} alt={artist.name} />
            </div>
            <div className={styles.artistInfo}>
                <p>{artist.name}</p>
            </div>
            <Link href={`/musicplayer/${artist.id}`}>
                Go to music
            </Link>
        </div>
    );
}