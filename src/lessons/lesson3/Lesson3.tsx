import React, { useState, ChangeEvent } from 'react';
import API from './API';
import './lesson_3';


const Lesson3 = () => {
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [searchNameByType, setSearchNameByType] = useState('');
    const [searchResultByType, setSearchResultByType] = useState('');

    //  Стандартно promise с then() 

    // const searchFilm = () => {
    //     API.searchFilmsByTitle(searchName)
    //     .then(({data}) => {
    //         console.log(data)
    //         if(data.Response === 'True'){
    //             setSearchResult(JSON.stringify(data.Search))
    //         } else {
    //             setSearchResult(data.Error)
    //         }
    //     })
    // };

    // Переписываем на async await.
    // Вс будет работать ровно так же.
    // data сразу достаем деструктуризацией.

    const searchFilm = async () => {
        try{
            const {data} = await API.searchFilmsByTitle(searchName)
            data.Response === 'True'
            ? setSearchResult(JSON.stringify(data.Search))
            : setSearchResult(data.Error)
        } catch(err){
            console.log(err)
        }
    };


    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        API.searchFilmsByType(searchNameByType, type)
        .then(({data}) => {
            console.log(data)
            if(data.Response === 'True'){
                setSearchResultByType(JSON.stringify(data.Search))
            } else{
                setSearchResultByType(data.Error)
            }
        })
    }

    const onSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }

    const onSearchNameByType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchNameByType(e.currentTarget.value)
    }



    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={onSearchName}/>
                <button onClick={searchFilm}>Search</button>
                <div>
                    {searchResult}
                </div>
            </div>
            <div>
                <h3><p>Search by type:</p></h3>
                <input type="text" value={searchNameByType} onChange={onSearchNameByType}/>
                <button onClick={searchByType} data-t='movie'>Movie</button>
                <button onClick={searchByType} data-t='series'>Series</button>
                <div>
                    {searchResultByType}
                </div>
            </div>
        </div>
    );
}
export default Lesson3;