import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import {
  BottomText,
  Box,
  Button,
  FindMeme,
  Form,
  Header,
  Image,
  ImageContainer,
  Input,
  MainContainer,
  TopText,
} from './StyledApp';

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
    setImageWithtText(imageWithoutText + '.jpg');
  }, [imageWithoutText]);

  useEffect(() => {
    setImageWithtText(imageWithoutText + `/${topText}/` + bottomText + '.jpg');
  }, [topText, bottomText]);

  console.log('without', imageWithoutText);
  console.log('witht', imageWithtText);
  console.log(removeDefaultTextImg());
  console.log(images);

  const handleClick = () => {
    return saveAs(imageWithtText, 'meme');
  };

  // I need to create a function to erease the top and bottom text when the input boxes are erease
  return (
    <MainContainer>
      <Header>React meme generator</Header>
      <Box>
        {isLoading && <div>Loading...</div>}
        {imageWithtText === '' ? (
          <ImageContainer>
            <Image
              data-test-id="meme-image"
              src={imageWithtText}
              alt="random"
            />
          </ImageContainer>
        ) : (
          <ImageContainer>
            <Image
              data-test-id="meme-image"
              src={imageWithtText}
              alt="random"
            />
          </ImageContainer>
        )}

        <TopText>
          Top text
          <Input onChange={(event) => setTopText(event.currentTarget.value)} />
        </TopText>
        <BottomText>
          Bottom text
          <Input
            onChange={(event) => setBottomText(event.currentTarget.value)}
          />
        </BottomText>
        <FindMeme>Find exact meme</FindMeme>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Input
            onChange={(event) => {
              setImageWithtText(
                url + `/${event.currentTarget.value}/Meme_Template`,
              );
            }}
          />
        </Form>
        <Button onClick={() => handleClick()}>Download</Button>
      </Box>
    </MainContainer>
  );
}
