import MainPageHeading from "./MainPageHeading";
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


const MoviePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const movie = state.movie;

    const toMainPage = () => {
        navigate('/');
    };
    return (
        <div className='container-fluid movie-app'>
            <div className='btn d-flex align-items-center mt-5 mb-5' onClick={toMainPage}>
                 <MainPageHeading heading='Movies'/>
             </div>
             <Row xs={1} md={4} className="g-4" style={{display:'flex'}}>
                <div className='col-4 d-flex justify-content-center text-center'>
                    <Card style={{ width: 'auto', height: 'auto'}}>
                        <Card.Img variant="top" src={state.movie.Poster} alt='movie' />
                    </Card>
                </div>
                <div className='col-4 d-flex justify-content-left text-left'>
                    <Card bg={'dark'} text={'light'} style={{ width: 'auto', height: 'auto'}}>
                        <Card.Body>
                            <Card.Title>{movie.name}</Card.Title>
                            <Card.Text>{movie.synopsisShort}</Card.Text>
                            <Card.Title>Genre: {movie.genre}</Card.Title>
                            <Card.Title>Production Year: {movie.productionYear}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
    
};

export default MoviePage;