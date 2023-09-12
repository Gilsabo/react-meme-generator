import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const url = 'https://api.memegen.link/images';

  function getRandomImages(max) {
    return Math.floor(Math.random() * max);
  }
  const [images, setImages] = useState('');
  let [topText, setTopText] = useState('dddd');
  let [bottomText, setBottomText] = useState('');

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

  useEffect(() => {
    const urli = 'https://api.memegen.link/images';
    const templateId = 'aag'; // Replace with your desired template ID

    axios
      .post(urli, {
        template_id: templateId,
        text: [topText, bottomText],
      })
      .then((res) => {
        console.log(res.data);
        setImages(res.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(`${removeDefaultTextImg()}/${encodeURIComponent(topText)}`);

  return (
    <div className="App">
      <h1>React meme generator</h1>
      {!topText && (
        <img
          data-test-id="meme-image"
          src={removeDefaultTextImg()}
          alt="random"
        />
      )}
      {topText && (
        <img
          data-test-id="meme-image"
          src={`removeDefaultTextImg()/${encodeURIComponent(topText)}`}
          alt="random"
        />
      )}

      <div>enter top text {topText}</div>
      <input onChange={(event) => setTopText(event.currentTarget.value)} />
      <div>enter bottom text {bottomText}</div>
      <input onChange={(event) => setBottomText(event.currentTarget.value)} />
    </div>
  );
}
