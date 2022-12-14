export default function ImageSelectButton({ buttonNb, setImage, gamedNb }) {

    return (
        <button
            onClick={() => {
                localStorage.setItem("currentImage", buttonNb);
                setImage(`/images/${gamedNb}/0${buttonNb}.jpg`);
            }
            }
            className="bg-yellow px-3 py-1 sm:text-xl -skew-x-12 text-black focus:bg-purple focus:text-white">
            {buttonNb}
        </button>
    )
}