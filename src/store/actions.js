//import module
import {apiServerRequet,API_KEY} from '../config';

// KEY_ACTION
export const REQUEST_RECETTE = 'REQUEST_RECETTE';
export const REQUEST_RECETTE_SUCCESS = 'REQUEST_RECETTE_SUCCESS';
export const REQUEST_FAIL_GET = 'REQUEST_FAIL_GET';
export const REQUEST_RECETTE_ELEMENT = 'REQUEST_RECETTE_ELEMENT';
export const REQUEST_RECETTE_ELEMENT_SUCCESS = 'REQUEST_RECETTE_ELEMENT_SUCCESS';
export const REQUEST_RECETTE_ELEMENT_FAIL = 'REQUEST_RECETTE_ELEMENT_FAIL';
export const REQUEST_RECETTE_SIMILAR_SUCCESS = 'REQUEST_RECETTE_SIMILAR_SUCCESS';
export const REQUEST_RECETTE_SIMILAR_FAIL = 'REQUEST_RECETTE_SIMILAR_FAIL';
export const REQUEST_LIST_FAVORI_ADD = 'REQUEST_LIST_FAVORI_ADD';
export const DELETE_ITEM_FAVAORI = 'DELETE_ITEM_FAVAORI';
export const REQUEST_SEARCH_RECETTE = 'REQUEST_SEARCH_RECETTE';
export const REQUEST_SEARCH_RECETTE_SUCCESS = 'REQUEST_SEARCH_RECETTE_SUCCESS';
export const REQUEST_SEARCH_RECETTE_FAIL = 'REQUEST_SEARCH_RECETTE_FAIL';

//action creators

export const getRecette = () => {

    return (dispatch) => {
        dispatch({type:REQUEST_RECETTE});

        apiServerRequet.get(`/complexSearch/?apiKey=${API_KEY}`).then(res => {
           
            dispatch({type:REQUEST_RECETTE_SUCCESS,payload:res.data.results})
        }).catch(err => {
            dispatch({type:REQUEST_FAIL_GET,payload:err.message})
        })
    }
} 

export const getRecetteElement = (id) => {
  
    return (dispatch) => {
        dispatch({type:REQUEST_RECETTE_ELEMENT});
        apiServerRequet.get(`/${id}/information/?apiKey=${API_KEY}`).then(res => {
            const inGredientsFilterForName = res.data.extendedIngredients.map(el  => {
                return {
                    name:el.originalName
                }
            })
            const newData = {
                id:res.data.id,
                title:res.data.title,
                image:res.data.image,
                instruction:res.data.instructions,
                ingredients:inGredientsFilterForName,
                cuisines:res.data.cuisines,
                readyInMinutes:res.data.readyInMinutes
            }

            dispatch({type:REQUEST_RECETTE_ELEMENT_SUCCESS,payload:newData})
        }).catch(err => {
            dispatch({type:REQUEST_RECETTE_ELEMENT_FAIL,payload:err.message})
        })
    }
} 

export const getRecetteSimilar = (id) => {
    return (dispatch) => {
        apiServerRequet(`/${id}/similar/?apiKey=${API_KEY}`).then(res => {
            const results = res.data.map(el => {
                return {
                    id:el.id,
                    title:el.title,
                    image:el.sourceUrl
                }
            })

            dispatch({type:REQUEST_RECETTE_SIMILAR_SUCCESS,payload:results})
        }).catch(err => {
            dispatch({type:REQUEST_RECETTE_SIMILAR_FAIL,payload:err.message})
        })
    }
}

export const getFavoriList = (item) => {
    return (dispatch,getState) => {
        const {listFavoriItem: {favoriList}}  = getState();
        const index = favoriList.findIndex(element => element.id === item.id);
        if(index >= 0){
            
        }else{
            dispatch({type:REQUEST_LIST_FAVORI_ADD,payload:item});
            const newlisstfavori = getState().listFavoriItem.favoriList;
            localStorage.setItem('favoriList', JSON.stringify(newlisstfavori));
        } 
    }
}

export const deleteRemoveItem = (itemId) => {
    
    return (dispatch,getState) => {
        const {listFavoriItem: {favoriList}} = getState();
        const newDatatListFavori = favoriList.filter(el => el.id !== itemId);
        dispatch({type:DELETE_ITEM_FAVAORI,payload:newDatatListFavori});
        localStorage.setItem('favoriList',JSON.stringify(newDatatListFavori));
    }
}

export const getSearchRecette = (query) => {
    return (dispatch) =>{
        dispatch({type:REQUEST_SEARCH_RECETTE});
        apiServerRequet.get(`/autocomplete?${query}&apiKey=${API_KEY}`).then(res => {
            dispatch({type:REQUEST_SEARCH_RECETTE_SUCCESS,payload:res.data})
        }).catch(err => {
            dispatch({type:REQUEST_SEARCH_RECETTE_FAIL,payload:err.message})
        })
    }
}