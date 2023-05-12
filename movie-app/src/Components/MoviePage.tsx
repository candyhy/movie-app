import MainPageHeading from "./MainPageHeading";
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


const MoviePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const movie = state.props;

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
                        <Card.Img variant="top" src={movie.Poster} alt='movie' />
                    </Card>
                </div>
                <div className='col-4 d-flex justify-content-left text-left'>
                    <Card bg={'dark'} text={'light'} style={{ width: 'auto', height: 'auto'}}>
                        <Card.Body>
                            <h5 className="card-title">{movie.name}</h5>
                            <Card.Text>{movie.synopsisShort}</Card.Text>
                            <Card.Text>Genre: {movie.genre}</Card.Text>
                            <Card.Text>Production Year: {movie.productionYear}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
    
};

export default MoviePage;