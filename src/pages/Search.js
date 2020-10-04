import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {getSearchRecette} from '../store/actions';
import Loading from '../components/Loading';
import {Link} from 'react-router-dom';
import {Col} from 'reactstrap'

const Search = (props) => {
    const {getSearchRecette,listDtataSearch,isLoading} = props;
    const query = props.location.search;

    if(query && query.length > 0){

    }else{
        props.history.push('/')
    }

    useEffect(() => {
        getSearchRecette(query.split('?')[1]);
    },[query])
    
    return (
        <>
           {isLoading ? (
                <Loading />   
           ) :
            
           <>
            {listDtataSearch && listDtataSearch.length > 0 ? (
             listDtataSearch.map((element) => {
                 return (
                    <Col xs="12" md="4" lg="4" key={element.id}>

                        <div className="item-suggestion">
                            <Link to={`/recette/${element.id}`}className="item-link-suggestion">
                                <h4>{element.title}</h4>
                            </Link>
                        </div>

                     </Col>
                 )
             })
             ) : (
                 <div className="empty-favori">
                     <h4>aucun Résultat</h4>
                 </div>
             )}
           </>
        
           }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchRecette : (query) => dispatch(getSearchRecette(query))
    }
}

const mpaStateToProps = (state) => {
    return {
        listDtataSearch:state.recuerSearchRecette.listDtataSearch,
        isLoading:state.recuerSearchRecette.isLoading
    }
} 

export default connect(mpaStateToProps,mapDispatchToProps)(Search);
