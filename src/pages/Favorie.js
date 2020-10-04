import React from 'react';
import {connect} from 'react-redux';
import RecetteChildren from '../components/RecetteChildren';
import Loading from '../components/Loading';

 const Favorie = (props) => {
     const {favoriList,isLoading} = props;

    return (
        <>
        {isLoading ? (<Loading />) : (
            <>
            {favoriList && favoriList.length > 0 ? (
             favoriList.map((element) => {return <RecetteChildren key={element.id} element={element} delete={true}/>})
             ) : (
                 <div className="empty-favori">
                     <h4>aucun élément dans mes favoris</h4>
                 </div>
             )}
             </>
        )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        favoriList:state.listFavoriItem.favoriList,
        isLoading:state.listFavoriItem.isLoadingFavorie
    }
}

export default connect(mapStateToProps,null)(Favorie)
