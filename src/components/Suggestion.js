import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import {connect} from 'react-redux';
import {getRecetteSimilar} from '../store/actions';


const Suggestion = (props) =>  {
    const {idRecette,getRecetteSimilar,recetteSimilar} = props;
    useEffect(() => {
        getRecetteSimilar(idRecette);
    }, [idRecette])

 

    return (
        <div className="suggestion">
            <h3>cela pourrait vous intéresser</h3>

            {recetteSimilar && recetteSimilar.length > 0 ? (
                recetteSimilar.map(recette => (
                    <Col xs="12" md="4" lg="12" key={recette.id}>
                        <div className="item-suggestion">
                            <Link to={`/recette/${recette.id}`}className="item-link-suggestion">
                                <h4>{recette.title}</h4>
                            </Link>
                        </div>
                    </Col>
                ))
            ) :null}
          
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        recetteSimilar : state.reducerRecette.recetteSimilar,   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecetteSimilar : (id) => dispatch(getRecetteSimilar(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Suggestion)
