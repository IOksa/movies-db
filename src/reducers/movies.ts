import { ActionWithPayload, createReducer } from "../redux/utils";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    image?: string;

}

interface MovieState { 
    top: Movie[],
    loading: boolean,
}

const initialState: MovieState = {
    top:[],
    loading: false
}

export const moviesLoaded =(movies: Movie[])=>({
    type: "movies/loaded",
    payload: movies
})

export const moviesLoading=()=>({
    type: "movies/loading"
})

const moviesReducer = createReducer<MovieState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<Movie[]>)=>{
            return {
                ...state,
                top: action.payload,
                loading: false,
            };           
        },
        "movies/loading":(state, action)=>{
            return {
                ...state,
                loading: true,
            }
        }
    }
)


export default moviesReducer;


