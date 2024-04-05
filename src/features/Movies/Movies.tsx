import { useEffect } from "react";
import {connect, useDispatch} from "react-redux"
import {Movie, moviesLoaded, moviesLoading} from "../../reducers/movies";
import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import styles from "./Movies.module.scss";
import { client } from "../../api/tmdb";
// import MovieDetail from "../MovieDetail/MovieDetails";

interface MoviesProps{
    movies: Movie[];
    loading: boolean;
}

function Movies({movies, loading}:MoviesProps){
    const dispatch = useDispatch();

    useEffect(()=>{

        async function loadData(){
            dispatch(moviesLoading());

            const config = await client.GetConfiguration();
            const imageUrl = config.images.base_url;
            const results = await client.GetNowPlaying();
            const mappedResults: Movie[]=results.map((m)=>({
                id: m.id,
                title: m.title,
                popularity: m.popularity,
                overview: m.overview,
                poster_path: m.poster_path,
                release_date: m.release_date,
                vote_average: m.vote_average,
                vote_count: m.vote_count,
                image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined
            }));
            dispatch(moviesLoaded(mappedResults));
        }
        loadData();
    }, [dispatch]);

    return (
        <section>
            <div className={styles.list}>
                {loading ? (<h3>Loading...</h3>) : (movies.map(m=>(             
                    <MovieCard 
                        key={m.id} 
                        id={m.id} 
                        title={m.title} 
                        popularity={m.popularity} 
                        overview={m.overview}
                        poster_path={m.poster_path}
                        release_date={m.release_date}
                        vote_average={m.vote_average}
                        vote_count={m.vote_count}
                        image={m.image}
                        />
                  
                )))}
                
            </div>    
        </section>
    )
}

const mapStateToProps = (state: RootState)=>({
    movies: state.movies.top,
    loading: state.movies.loading
})

const connector = connect(mapStateToProps);

export default connector(Movies);