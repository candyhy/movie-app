import React from 'react';
import MainPageHeading from './MainPageHeading';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const MoviePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state.props;

  const toMainPage = () => {
    navigate("/");
  };

  const shareMovie = <T extends string>(platform: T) => {
    const shareTitle = movie.name;
    const emptyUrl = " ";
    const shareText = `Check out this movie:\n\n${shareTitle}\n\n${movie.synopsisShort}\n\nGenre: ${movie.genre}\nProduction Year: ${movie.productionYear}`;

  
    switch (platform) {
      case 'facebook':
        return (
          <FacebookShareButton url={emptyUrl} quote={shareText}>
            <FacebookIcon size={32} round={true}/>
          </FacebookShareButton>
        );
      case 'twitter':
        return (
          <TwitterShareButton url={emptyUrl} title={shareText}>
            <TwitterIcon size={32} round={true}/>
          </TwitterShareButton>
        );
      case 'whatsapp':
        return (
          <WhatsappShareButton url={emptyUrl} title={shareText}>
            <WhatsappIcon size={32} round={true}/>
          </WhatsappShareButton>
        );
        case 'telegram':
        return (
          <TelegramShareButton url={emptyUrl} title={shareText}>
            <TelegramIcon size={32} round={true}/>
          </TelegramShareButton>
        );
      default:
        return null;
    }
  };
  const facebookShareButton = shareMovie('facebook');
  const twitterShareButton = shareMovie('twitter');
  const whatsappShareButton = shareMovie('whatsapp');
  const telegramShareButton = shareMovie('telegram');

  return (
    <div className="container-fluid movie-app">
      <div className="btn d-flex align-items-center mt-5 mb-5" onClick={toMainPage}>
        <MainPageHeading heading="Movies" />
      </div>
      <Row xs={1} md={4} className="g-4" style={{ display: 'flex' }}>
        <div className="col-4 d-flex justify-content-center text-center">
          <Card style={{ width: 'auto', height: 'auto' }}>
            <Card.Img variant="top" src={movie.Poster} alt="movie" />
          </Card>
        </div>
        <div className="col-4 d-flex justify-content-left text-left">
          <Card bg={'dark'} text={'light'} style={{ width: 'auto', height: 'auto' }}>
            <Card.Body>
              <h5 className="card-title">{movie.name}</h5>
              <Card.Text>{movie.synopsisShort}</Card.Text>
              <Card.Text>Genre: {movie.genre}</Card.Text>
              <Card.Text>Production Year: {movie.productionYear}</Card.Text>
              <div>
                Share: &nbsp;
              {whatsappShareButton}
              {telegramShareButton}
              {twitterShareButton}
              {facebookShareButton}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default MoviePage;
