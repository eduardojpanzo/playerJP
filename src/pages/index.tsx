import { GetServerSideProps } from 'next';
import { MusicCard } from '../components/MusicCard';
import styles from '../styles/Home.module.scss'

type Data = {
  id:number;
  name:string;
  artist:string;
  img:string;
  src:string;
}

interface HomepageProps{
  musics: Data[];
}

const Home = ({musics}:HomepageProps) => {

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <div className={styles.grid}>
          {musics.map(music=>(
            <MusicCard key={music.id} music={music}/>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () =>{
  const res = await fetch(`http://localhost:3000/api/music`);

  const data = await res.json();

  return{
      props:{
          musics:data
      }
  }
}
