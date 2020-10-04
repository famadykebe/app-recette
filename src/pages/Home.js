import React,{useEffect} from 'react';
import RecetteChildren from '../components/RecetteChildren';
import {connect} from 'react-redux';
import {getRecette,} from '../store/actions';
import Loading from '../components/Loading'

const Home = (props) => {
    const {getRecette,recette,isLoading} = props;
    useEffect(() => {
        getRecette();
    },[])

    return (
            <>
            {isLoading ? (<Loading />) : (
                <>{
                
                    recette && recette.length > 0 ? (
                    recette.map((element) => {return <RecetteChildren key={element.id}element={element}/>})
                    ) : null}
                </>
            )}
            </>
    )
}

const mapStateToProps = (state) => {
    return {
        recette:state.reducerRecette.recette,
        isLoading:state.reducerRecette.isLoadingRecette
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecette : () => dispatch(getRecette())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
