import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const url = 'https://api.memegen.link/images';

  function getRandomImages(max) {
    return Math.floor(Math.random() * max);
  }
  const [images, setImages] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setImages(res.data[getRandomImages(198)].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const removeDefaultTextImg = () => {
    const linkWithoutText = [];
    const words = images.split('/');
    for (let i = 0; i < 5; i++) {
      linkWithoutText.push(words[i]);
    }
    return linkWithoutText.join('/');
  };

  console.log(removeDefaultTextImg());

  return (
    <div className="App">
      <h1>React meme generator</h1>
      <img
        data-test-id="meme-image"
        src={removeDefaultTextImg()}
        alt="random"
      />
      <div>enter top text {topText}</div>
      <input onChange={(event) => setTopText(event.currentTarget.value)} />
      <div>enter bottom text {bottomText}</div>
      <input onChange={(event) => setBottomText(event.currentTarget.value)} />
    </div>
  );
}
