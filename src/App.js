import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import {
  BottomText,
  Box,
  Button,
  Header,
  Image,
  ImageContainer,
  Input,
  Label,
  MainContainer,
  TopText,
} from './StyledApp';

export default function App() {
  const url = 'https://api.memegen.link/images';
  function getRandomImages(max) {
    return Math.floor(Math.random() * max);
  }
  const [template, setTemplate] = useState('');
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
        const randomImage = res.data[getRandomImages(198)].url;
        setIsLoading(false);
        setImageWithoutText(removeDefaultTextImg(randomImage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    if (
      imageWithoutText &&
      topText === '' &&
      bottomText === '' &&
      template === ''
    ) {
      setImageWithtText(imageWithoutText + '/.jpg');
    } else if (
      imageWithoutText &&
      topText.length > 0 &&
      bottomText === '' &&
      template === ''
    ) {
      setImageWithtText(imageWithoutText + `/${topText}.jpg`);
    } else if (
      imageWithoutText &&
      topText.length > 0 &&
      bottomText.length > 0 &&
      template === ''
    ) {
      setImageWithtText(
        imageWithoutText + `/${topText}/` + bottomText + '.jpg',
      );
    } else if (
      imageWithoutText &&
      topText.length === 0 &&
      bottomText.length > 0 &&
      template === ''
    ) {
      setImageWithtText(imageWithoutText + `/_/${bottomText}.jpg`);
    } else if (
      template.length > 0 &&
      topText.length === 0 &&
      bottomText.length === 0
    ) {
      setImageWithtText(url + `/` + template + '/.jpg');
     
    } else if (
      template.length > 0 &&
      topText.length > 0 &&
      bottomText.length === 0
    ) {
      setImageWithtText(url + '/' + template + `/${topText}/.jpg`);
    } else if (
      template.length > 0 &&
      topText.length > 0 &&
      bottomText.length > 0
    ) {
      setImageWithtText(
        url + '/' + template + `/${topText}/` + bottomText + '.jpg',
      );
    } else {
      setImageWithtText(url + '/' + template + `/_/${bottomText}.jpg`);
    }
  }, [topText, bottomText, imageWithoutText, template]);

  const handleClick = () => {
    return saveAs(imageWithtText, 'meme');
  };

  return (
    <MainContainer>
      <Header>React meme generator</Header>
      <Box>
        {isLoading && <div>Loading...</div>}
        <ImageContainer>
          <Image data-test-id="meme-image" src={imageWithtText} alt="random" />
        </ImageContainer>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <TopText for="topText">
              Top text
              <Input
                type="text"
                id="topText"
                onChange={(event) => setTopText(event.currentTarget.value)}
              />
            </TopText>
            <BottomText for="bottomText">
              <br />
              Bottom text
              <Input
                type="text"
                id="bottomText"
                onChange={(event) => setBottomText(event.currentTarget.value)}
              />
            </BottomText>
            <Label>
              <br />
              Meme template
              <Input
                onChange={(event) => {
                  setTemplate(event.currentTarget.value);
                }}
              />
            </Label>
          </form>
          <Button onClick={() => handleClick()}>Download</Button>
        </div>
      </Box>
    </MainContainer>
  );
}
