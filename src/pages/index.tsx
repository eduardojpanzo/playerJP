import { GetServerSideProps } from 'next';
import { ArtistCard } from '../components/ArtistCard';
import styles from '../styles/Home.module.scss'

type ArtistData = {
  id:number,
  name:string,
  picture_medium:string
}

type MusicData = {
  id:number;
  name:string;
  artist:ArtistData;
  img:string;
  src:string;
}

interface HomepageProps{
  musics: MusicData[];
  artists:ArtistData[]
}

const Home = ({artists,musics}:HomepageProps) => {
  console.log(artists);
  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <div className={styles.grid}>
          {artists.map(artist=>(
            <ArtistCard key={artist.id} artist={artist}/>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () =>{
  const res = await fetch(`http://localhost:3000/api/trending`);
  const json = await res.json();

  return{
      props:{
          artists:json.list.data,
      }
  }
}
