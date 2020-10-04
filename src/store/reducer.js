import Cookie from 'js-cookie';
import {
    REQUEST_RECETTE,
    REQUEST_RECETTE_SUCCESS,
    REQUEST_FAIL_GET,
    REQUEST_RECETTE_ELEMENT,
    REQUEST_RECETTE_ELEMENT_SUCCESS,
    REQUEST_RECETTE_ELEMENT_FAIL,
    REQUEST_RECETTE_SIMILAR_SUCCESS,
    REQUEST_RECETTE_SIMILAR_FAIL,
    REQUEST_LIST_FAVORI_ADD,
    DELETE_ITEM_FAVAORI,
    REQUEST_SEARCH_RECETTE_SUCCESS,
    REQUEST_SEARCH_RECETTE_FAIL
    } 
    from './actions'

const inisialState = {
    isLoadingRecette:null,
    recette: [],
    request_error_recette: null,
    request_error_recette_element:null,
    request_error_recette_similar:null,
    recetteSimilar:[],
    elementRecette:{}
}

const inisialStateListeItemFavori = {
    favoriList: JSON.parse(localStorage.getItem('favoriList')) || [],
}

export const reducerRecette = (state = inisialState,action) => {
    switch(action.type){
        case REQUEST_RECETTE :{
            return {
                ...state,
                isLoadingRecette:true,
            }
        }

        case REQUEST_RECETTE_SUCCESS :{
            return{
                ...state,
                recette:[...action.payload],
                isLoadingRecette:false, 
            }
        }

        case REQUEST_FAIL_GET : {
            return {
                ...state,
                request_error_recette:action.payload,
                isLoadingRecette:false,
            }
        }

        case REQUEST_RECETTE_ELEMENT : {
            return{
                ...state,
                isLoadingRecette:true
            }
        }

        case REQUEST_RECETTE_ELEMENT_SUCCESS : {

            return {
                ...state,
                elementRecette:action.payload
            }
        }

        case REQUEST_RECETTE_ELEMENT_FAIL : {
            return{
                ...state,
                request_error_recette_element:action.payload
            }
        }

        case REQUEST_RECETTE_SIMILAR_SUCCESS : {
            return {
                ...state,
                recetteSimilar:action.payload
            }
        }

        case REQUEST_RECETTE_SIMILAR_FAIL : {
            return {
                ...state,
                request_error_recette_similar:action.payload
            }
        }

        default : return state;
    }
}

export const listFavoriItem = (state = inisialStateListeItemFavori,action ) => {
    switch(action.type){

        case REQUEST_LIST_FAVORI_ADD : {
           console.log('new action payload -->',action.payload)
            return {
                ...state,
                favoriList:[...state.favoriList,action.payload],
            }
        }

        case DELETE_ITEM_FAVAORI : {
            return {
                ...state,
                favoriList:action.payload
            }
        }

        default : return  state
    }
}

export const recuerSearchRecette = (state = {listDtataSearch:[],isLoading:null,error_get_search:null},action) => {

    switch (action.type) {
        case REQUEST_SEARCH_RECETTE_FAIL:{
           return{
            ...state,
            isLoading:true
           }
        }

        case REQUEST_SEARCH_RECETTE_SUCCESS : {
            return{
                ...state,
                isLoading:false,
                listDtataSearch:action.payload
            }
        }

        case REQUEST_SEARCH_RECETTE_FAIL :{
            return {
                ...state,
                error_get_search:action.payload
            }
        }
            
        default: return state;       
    }

}