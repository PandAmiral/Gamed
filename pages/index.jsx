import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Select } from 'react-select';
import { data } from 'autoprefixer';
import { render } from 'react-dom';
var gameList = require('../public/data/mydata.json');

function GuessComponent( {setImage, mainGameName} ) {
    const [won, setWon] = useState(false);
    const [isEnd, setEnd] = useState(false);
    const gameName = mainGameName;

    const [buttons, addButton] = useState(
        [
        {id: 1, number:1},
    ]);
    const [value, setValue] = useState('');
    
    const onChange = (event) => {
        setValue(event.target.value);
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
    }

    const guess = (value) => {
        {
        if(buttons.length <= 5){
            addButton([...buttons, {id: buttons.length + 1, number: buttons.length + 1}]);
            setImage("/images/" + gameName + "/0" + (buttons.length + 1) + ".jpg");
            console.log("/images/" + gameName + "/0" + (buttons.length + 1) + ".jpg");
            if (value === gameName.toLowerCase()) {
                setWon(true);
            }
        } else {
            setEnd(true);
            }
        }
    }
    
    return (
        <><div className='flex justify-center mb-5 text-black font-bold space-x-3'>
            {buttons.map((button) => <button onClick={() => setImage("/images/" + gameName + "/0" + (button.number) + ".jpg")} className="bg-yellow px-3 py-1 sm:text-2xl -skew-x-12">{button.number}</button>)}
        </div>
            <div className='mb-5'>
                <div className='relative'>
                    <ul className='absolute left-20 w-9/12 overflow-y-auto bottom-full max-h-36 bg-black text-white border-solid border-2 border-purple empty:border-none '>
                        {gameList.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const gameName = item.game_name.toLowerCase();
                                
                            return searchTerm && gameName.startsWith(searchTerm) && gameName !== searchTerm;
                        })
                        .map((item) => (
                            <li 
                                onClick={() => onSearch(item.game_name)}
                                className='cursor-pointer text-start p-2 hover:bg-purple font-poppinslight transition ease-in-out hover:font-bold'
                                key={item.game_name}
                                >{item.game_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <input type="text" value={value} onChange={onChange} placeholder="Search for game or guess to skip"
                            className='border-solid border-4 border-yellow p-2 m-1 font-poppinslight w-9/12 transition ease-in-out focus:border-purple focus:outline-none focus:-skew-x-12'/>
                </div>
            </div>
            <div className={styles.wrapper}>
            {!won && !isEnd &&
                <a className={styles.cta} onClick={() => guess(value.toLowerCase())}>    
                    <span className={styles.span}>GUESS</span>
                    <span className={styles.span}>
                        <svg width="40px" height="40px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path className={styles.one} d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                <path className={styles.two} d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                <path className={styles.three} d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                    </span>
                </a>
            }{won && !isEnd &&
                <h1 className='font-poppins text-white'>GG you've found {gameName} in {buttons.length - 1} guesses</h1>
            }{isEnd &&
                <h1 className='font-poppins text-white'>Better luck tomorrow, it was {gameName}</h1>
            }
            </div></>
    );
}

export default function Home() {
    const gameName = ("Assassin's Creed Unity");
    const [image, setImage] = useState("/images/" + gameName + "/01.jpg");

    return (
        <Layout home>
            <Head>
                <title>Gamed - Daily videogame guessing game</title>
            </Head>
            <div>
                <div>
                    <Image className='mb-5'
                        priority
                        src={image}
                        height={720}
                        width={1280}
                        alt=""
                    />
                </div>
            </div>
            <div>
                <GuessComponent setImage={setImage} mainGameName={gameName} />
            </div>
        </Layout>
    );
}

