import { MdSearch } from "react-icons/md";
import styles from "./../styles/Search.module.scss";

function Search() {
    return ( 
        <main className={styles.container}>
            <div className={styles.searchContainer}>
                <form className={styles.searchInput}>
                    <select name="typeSearch" id="typeSearch">
                        <option value="artist">Cantor ou Artista</option>
                        <option value="music">Música</option>
                    </select>
                    <input type="search"/>

                    <button type="submit">
                        <MdSearch/>
                    </button>
                </form>
            </div>

            <div className={styles.foundContainer}>
                aqui
            </div>
        </main >
     );
}

export default Search;