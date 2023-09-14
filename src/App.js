import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

export default function App() {
  const url = 'https://api.memegen.link/images';

  function getRandomImages(max) {
    return Math.floor(Math.random() * max);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [imageWithtText, setImageWithtText] = useState('');
  const [images, setImages] = useState('');
  const [imageWithoutText, setImageWithoutText] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const removeDefaultTextImg = (randomImage) => {
    const linkWithoutText = [];
    if (typeof randomImage === 'string') {
      const words = randomImage.split('/');
      for (let i = 0; i < 5; i++) {
        linkWithoutText.push(words[i]);
      }
    }
    return linkWithoutText.join('/');
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setImages(res.data);
        console.log(res.data);

        const randomImage = res.data[getRandomImages(198)].url;
        setIsLoading(false);
        console.log(randomImage);
        setImageWithoutText(removeDefaultTextImg(randomImage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setImageWithtText(imageWithoutText + `/_${topText}/` + bottomText);
  }, [topText, bottomText, imageWithoutText]);

  console.log('without', imageWithoutText);
  console.log('witht', imageWithtText);
  console.log(removeDefaultTextImg());
  console.log(images);

  const handleClick = () => {
    return saveAs(imageWithtText, 'meme');
  };

  return (
    <div className="App">
      <h1>React meme generator</h1>

      {isLoading && <div>Loading...</div>}
      {imageWithtText === `https://api.memegen.link/images//Meme_Template` ? (
        <div>
          Meme not foun...refresh the page or write the wished meme in the input
        </div>
      ) : (
        <img data-test-id="meme-image" src={imageWithtText} alt="random" />
      )}

      <div>enter top text {topText}</div>
      <input
        onChange={(event) =>
          setTopText('Top_text_' + event.currentTarget.value)
        }
      />
      <div>enter bottom text {bottomText}</div>
      <input
        onChange={(event) =>
          setBottomText('Bottom_text_' + event.currentTarget.value)
        }
      />
      <div>Find exact meme</div>
      <form>
        <input
          onChange={(event) => {
            event.preventDefault();
            setImageWithtText(
              url + `/${event.currentTarget.value}/Meme_Template`,
            );
          }}
        />
      </form>
      <button onClick={() => handleClick()}>Download</button>
    </div>
  );
}
