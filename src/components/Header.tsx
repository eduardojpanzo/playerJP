import Link from 'next/link';
import { useState } from 'react';
import { MdDarkMode, MdLightMode, MdSearch } from 'react-icons/md';
import styles from '../styles/Header.module.scss'

interface HeaderProps{
    onSearch: ()=>void;
}

export function Header({onSearch}:HeaderProps){
    const [isLight, setIsLight] = useState(false);

    function onChangeMode(){
        setIsLight(!isLight)
    }
    return(
        <div className={styles.header}>
            <div className={styles.logo}><span>Music</span>P</div>
            
            <ul className={styles.menu}>
                <li>
                    <Link href={'/'}>My Singers</Link>
                </li>
                <li>
                    <Link href={'/search'}>Ir Buscar</Link>
                </li>
            </ul>

            <div className={styles.mode} onClick={onChangeMode}>
                {isLight
                ?<MdDarkMode/>
                :<MdLightMode/>}
            </div>
        </div>
    )
}