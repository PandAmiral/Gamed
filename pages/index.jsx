import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/utils.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import ShareButton from '../components/shareButton';
import ImageButtons from '../components/imageButtons';
const gameList = require("../public/data/games.json");

export default function Home() {
    const [gamedNb, setGamedNb] = useState(16);
    const [gameName, setGame] = useState("Devil May Cry 5");
    const [currentImage, setImage] = useState("/images/" + gamedNb + "/01.jpg");
    const [currentGuess, setGuess] = useState(1);
    const [value, setValue] = useState('');
    const [gameState, setGameState] = useState("playing");
    const [buttons, addButton] = useState(
        [
            { number: 1 },
        ]);
    const guessData = {
        gameName: gameName,
        gamedNb: gamedNb,
        buttons: buttons,
        value: value,
        currentGuess: currentGuess,
        setImage: setImage,
        setGameState: setGameState,
        addButton: addButton,
        setGuess: setGuess,
    };

    const setArrayLength = () => {
        for (let i = buttons.length; i < parseInt(localStorage.getItem("currentGuess")); i++) {
            addButton((buttons) => [...buttons, { number: i + 1 }]);
        }
    };


    useEffect(() => {
        if (localStorage.getItem('gamedNb') != gamedNb) {
            ResetStorageAndState();
        }
        if (localStorage.getItem('played')) {
            RestoreStorageAndState();
        } else {
            ResumeStorageAndState();
        }

    });

    const ResetStorageAndState = () => {
        setImage(`/images/${gamedNb}/01.jpg`);
        setGuess(1);
        localStorage.removeItem('played');
        localStorage.removeItem('results')
        localStorage.setItem('gamedNb', gamedNb);
        localStorage.setItem('currentImage', "1");
        localStorage.setItem("currentGuess", 1);
        localStorage.setItem("results", `Gamed #${gamedNb} \n🎮 ⬛ ⬛ ⬛ ⬛ ⬛ ⬛\n\nhttps://gamed-seven.vercel.app/`);
    }

    const RestoreStorageAndState = () => {
        setGameState(localStorage.getItem('gameState'));
        setImage(`/images/${gamedNb}/0${localStorage.getItem("currentImage")}.jpg`);
    }

    const ResumeStorageAndState = () => {
        setGameState("playing");
        setArrayLength();
        setGuess(parseInt(localStorage.getItem("currentGuess")));
        setImage(`/images/${gamedNb}/0${localStorage.getItem("currentImage")}.jpg`);
        localStorage.setItem("gamedNb", gamedNb);
        localStorage.setItem("gameState", gameState);
    }

    const RenderAttempts = () => {
        if (currentGuess === 6) {
            return (<h2 className='text-xl'>1 essai restant</h2>);
        }
        return (<h2 className='text-xl'>{7 - buttons.length} essais restants</h2>);
    }

    const guess = (value) => {
        let results = localStorage.getItem('results');
        if (value === gameName.toLowerCase()) {
            localStorage.setItem("results", results.replace("⬛", "🟨"));
            setGameState("won");
            localStorage.setItem('gameState', "won");
        } else if (buttons.length <= 5) {
            addButton([...buttons, { number: buttons.length + 1 }]);
            setImage(`/images/${gamedNb}/0${buttons.length + 1}.jpg`);
            localStorage.setItem("currentImage", buttons.length + 1);
            localStorage.setItem("results", results.replace("⬛", "🟪"));
            localStorage.setItem("currentGuess", currentGuess + 1);
            setGuess(currentGuess + 1);
        } else {
            localStorage.setItem("results", results.replace("⬛", "🟪"));
            setGameState("lost");
            localStorage.setItem('gameState', "lost");
        }
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className='mb-6'>
                <div className={styles.image}>
                    <Image
                        priority
                        src={currentImage}
                        height={720}
                        width={1280}
                        alt=""
                        quality={75}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-center mb-6 font-bold space-x-3">
                    <ImageButtons setImage={setImage} buttons={buttons} gamedNb={gamedNb} />
                </div>
                {gameState == 'lost' &&
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl'>Dommage, c'était {gameName}</h2>
                    </div>
                }
                {gameState == 'won' &&
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl'>GG tu as deviné {gameName}</h2>
                    </div>
                }
                {gameState != "playing"
                    ? <ShareButton buttons={buttons} addButton={addButton} />
                    : <>
                        <div className="mb-6">
                            <SearchBar setValue={setValue} value={value} />
                        </div>
                        <div className='flex justify-center mb-6'>
                            <RenderAttempts />
                        </div>
                        <div className='flex justify-center items-center mb-6'>
                            <GuessButton {...guessData}></GuessButton>
                        </div>
                    </>
                }
            </div>
        </Layout>
    );
}

