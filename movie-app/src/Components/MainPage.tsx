const MainPage = (props: any) => {
	return (
		<>
			{props.movies.map((movie: any, index: any) => (
				<div className='image'>
					<img src={movie.Poster} alt='movie'></img>
				</div>
			))}
		</>
	);
};

export default MainPage;