import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layoutArchive';
import styles from '../../styles/utils.module.css';
import Image from 'next/image';
import { useState } from 'react';
import GuessButton from 'components/guessButtonArchive';
import SearchBar from 'components/searchBar';
import { useRouter } from 'next/router'

const gamesArchive = require("../../public/data/archive.json");

export const getStaticPaths = async () => {
    const res = await fetch('../../public/data/archive.json');
    const data = await res.json();

    const paths = data.map(game => {
        return {
            params: { id: game.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('../../public/data/archive.json');
    const data = await res.json();

    const game = data.find(game => game.id === id);

    return {
        props: { game }
    }
}

export default function ArchiveEntry() {
    const router = useRouter();
    const gamedNb = router.query.id;
    //const gameName = gamesArchive[gamedNb - 1].game_name;
    const gameName = "The Witcher 3";
    const [value, setValue] = useState('');
    const [gameState, setGameState] = useState("playing");
    const [image, setImage] = useState(`/images/${gamedNb}/01.jpg`);
    const [buttons, addButton] = useState(
        [
            { number: 1 },
        ]);
    const guessData = {
        gameName: gameName,
        gamedNb: gamedNb,
        buttons: buttons,
        value: value,
        setImage: setImage,
        setGameState: setGameState,
        addButton: addButton,
    };

    const RenderAttempts = () => {
        if (buttons.length === 6) {
            return (<h2 className='text-xl'>1 essai restant</h2>);
        }
        return (<h2 className='text-xl'>{7 - buttons.length} essais restants</h2>);
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle + gamedNb}</title>
            </Head>
            <div>
                <div className={styles.image}>
                    <Image className='mb-6'
                        priority
                        src={image}
                        height={720}
                        width={1280}
                        alt=""
                        quality={75}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-center mb-6 font-bold space-x-3">
                    {buttons.map((button) => {
                        return (
                            <div key={button.number}>
                                <button onClick={() => { setImage(`/images/${gamedNb}/0${button.number}.jpg`) }} className="bg-yellow px-3 py-1 sm:text-2xl -skew-x-12 text-black focus:bg-purple focus:text-white">
                                    {button.number}
                                </button>
                            </div>
                        );
                    })}
                </div >
            </div>
            {gameState == 'lost' &&
                <div className='flex justify-center mb-6'>
                    <h2 className='text-xl'>C'était {gameName}</h2>
                </div>
            }
            {gameState == 'won' &&
                <div className='flex justify-center mb-6'>
                    <h2 className='text-xl'>GG, tu as trouvé {gameName}</h2>
                </div>
            }
            {gameState == 'playing' &&
                <>
                    <div className="mb-6">
                        <SearchBar setValue={setValue} value={value} />
                    </div>
                    <div className='flex justify-center mb-6'>
                        <RenderAttempts />
                    </div>
                    <div className='flex justify-center items-center mb-6'>
                        <GuessButton {...guessData} />
                    </div>
                </>
            }
        </Layout >
    );
};