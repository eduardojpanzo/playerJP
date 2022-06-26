import Link from 'next/link';
import styles from '../styles/MusicCard.module.scss';

type Data = {
    id:number;
    name:string;
    artist:string;
    img:string;
    src:string;
}

interface MusicCardProps{
    music:Data;
}
export const MusicCard = ({music}:MusicCardProps) =>{
    return ( 
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={music.img} alt={music.name} />
            </div>
            <div className={styles.musicInfo}>
                <p>{music.name}</p>
                <span>{music.artist}</span>
            </div>
            <Link href={`/music/${music.id}`}>
                Go to music
            </Link>
        </div>
    );
}