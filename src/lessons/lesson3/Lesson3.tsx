import React, { useState, ChangeEvent } from 'react';
import API from './API';
import './lesson_3';

type SearchResultType = {
    [key: string]: string
}

const Lesson3 = () => {
    const [searchName, setSearchName] = useState<string>('');
    const [searchResult, setSearchResult] = useState<SearchResultType>({});
    const [searchNameByType, setSearchNameByType] = useState<string>('');
    const [searchResultByType, setSearchResultByType] = useState<SearchResultType>({});

    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
        .then(({data}) => {
            setSearchResult(data)
            console.log(data)
        })
    };

    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        API.searchFilmsByType(searchNameByType, type)
        .then(({data}) => {
            console.log(data)
            setSearchResultByType(data)
        })
    }

    const onSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }

    const onSearchNameByType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchNameByType(e.currentTarget.value)
    }

    const viewSearchResult = (result: SearchResultType) => {
        if(Object.keys(result).length > 0) {
            return (<div>
                <img src={result.Poster} />
                <div>Released: {result.Released}</div>
                <div>IMDB rating: {result.imdbRating}</div>
                <div>Decription: {result.Plot}</div>
                </div>)
        } else{
            return null
        }
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={onSearchName}/>
                <button onClick={searchFilm}>Search</button>
                <div>
                   {viewSearchResult(searchResult)}
                </div>
            </div>

            <div>
                <h3><p>Search by type:</p></h3>
                <input type="text" value={searchNameByType} onChange={onSearchNameByType}/>
                <button onClick={searchByType} data-t='movie'>Movie</button>
                <button onClick={searchByType} data-t='series'>Series</button>
                <div>
                    {viewSearchResult(searchResultByType)}
                </div>
            </div>
        </div>
    );
}
export default Lesson3;