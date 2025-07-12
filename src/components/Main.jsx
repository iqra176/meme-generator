import { useState, useEffect } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
        // topText, bottomText: texts the user enters.imageUrl: image shown in meme.
    })
    const [allMemes, setAllMemes] = useState([])
    // Stores the list of all meme templates fetched from API
    
    useEffect(() => {
        // Fetch meme data once when the component mounts.
        fetch("https://api.imgflip.com/get_memes") 
        // https://api.imgflip.com/get_memes
            .then(res => res.json()) //Fetched data → parsed to JSON → set to allMemes state.
            .then(data => setAllMemes(data.data.memes))
    }, [])
    // Empty dependency array ([]) means this effect runs only once.
    
    function getMemeImage() {
        // getMemeImage() for new image.
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        // Pick random meme image on button click.
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }
    
    function handleChange(event) {
        // handleChange() for text.Sync form inputs with meme state (topText and bottomText).
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
            // Uses event.currentTarget.name to dynamically update correct property.
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}