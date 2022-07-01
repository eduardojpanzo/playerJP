import {ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import { AlbumCard } from "../components/AlbumCard";
import { ArtistCard } from "../components/ArtistCard";
import styles from "./../styles/Search.module.scss";

type ArtistData = {
    id:number;
    name:string;
    picture_medium:string;
}
type AlbumData = {
    id:number;
    title:string;
    cover:string;
    artist: ArtistData;
}
const getFetchData = async (url:string) =>{
    const response = await fetch(url);
    return await response.json();
}

function Search() {
    const [searchText, setSearchText] = useState('');
    const [searchTypeFound, setSearchTypeFound] = useState('artist');

    const [albums, setAlbums] = useState<AlbumData[]>([]);
    const [artists, setArtists] = useState<ArtistData[]>([]);

    const [prevSearch, setPrevSearch] = useState('');
    const [nextSearch, setNextSearch] = useState('');

    const insertFoundData = (data:[]) => {
        if(searchTypeFound === 'artist'){
            setArtists(data);
        }
        
        if(searchTypeFound === 'album'){
            setAlbums(data);
        }
        
    }

    const enablePreviousAndNextButton = (prev:string,next:string) =>{
        setPrevSearch(prev);
        setNextSearch(next);
    }

    const handleSearch = async (event:ChangeEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const searchType = event.target.typeSearch.value;        

        if (searchText.trim()) {
            const json  = await getFetchData(`http://localhost:3000/api/search?q=${searchType},${searchText.trim()}`)
            
            setSearchTypeFound(json.list.data[0].type);

            insertFoundData(json.list.data)

            enablePreviousAndNextButton(json.list.prev,json.list.next)
        }
    }

    const hanleGoToPrevSearch = async ()=>{
        /* const json  = await getFetchData(`http://localhost:3000/api/change?q=${prevSearch}`);

        setArtists(json.list.data); */
    }

    const hanleGoToNextSearch = async ()=>{
        /* const json  = await getFetchData(`http://localhost:3000/api/change?q=${nextSearch}`);

        setArtists(json.list.data); */
    }    

    return ( 
        <main className={styles.container}>

            <div className={styles.searchContainer}>
                <form className={styles.searchInput} onSubmit={handleSearch}>
                    <select name="typeSearch" id="typeSearch">
                        <option value="artist">Cantor ou Artista</option>
                        <option value="album">Album</option>
                    </select>
                    <input 
                        type="search"
                        value={searchText}
                        onChange={e=>setSearchText(e.target.value)}
                    />

                    <button>
                        <MdSearch/>
                    </button>
                </form>
            </div>
            
            <div className={styles.foundContainer}>
                <div className={styles.grid}>
                    {searchTypeFound === 'artist'?
                        artists.map(artist=>(
                            <ArtistCard key={artist.id} artist={artist}/>
                        ))
                    :
                        albums.map(album=>(
                            <AlbumCard key={album.id} album={album}/>
                        ))
                    }
                </div>

                <div className={styles.buttons}>
                    {prevSearch && <button 
                        className={styles.btn_prev}
                        onClick={hanleGoToPrevSearch}
                    >Anterior</button>}
                    
                    {nextSearch && <button 
                        className={styles.btn_next}
                        onClick={hanleGoToNextSearch}
                    >Próximo</button>}
                </div>

            </div>
        </main >
     );
}

export default Search;