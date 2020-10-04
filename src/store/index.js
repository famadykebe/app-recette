import {combineReducers} from 'redux';
import {reducerRecette,listFavoriItem,recuerSearchRecette} from './reducer'

const store = combineReducers({
    reducerRecette,
    listFavoriItem,
    recuerSearchRecette
})

export default store;