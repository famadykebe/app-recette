import React from 'react'
import {Link} from 'react-router-dom';
import {Col,Button} from 'reactstrap';
import {connect} from 'react-redux'
import {deleteRemoveItem} from '../store/actions';

 const RecetteChildren = (props)  =>{
    const {title,image,id} = props.element;
    const handeleDeleteItem = (e,idItem) => {
        e.preventDefault();
        props.deleteRemoveItem(idItem)
    }
    return (
        <Col md="4">
            <div className="block-recette">
                <Link to={`/recette/${id}`} className="link-recette">
                    {props.delete ? <Button onClick={(e) => handeleDeleteItem(e,id)} color="danger" className="btn-delete-item"><i className="fas fa-trash"></i></Button> : null}
                    <div className="block-shadow-info">
                        <span><i className="fa fa-plus"></i></span>
                    </div>
                    <figure className="recette-img"><img src={image} alt={image} /></figure>
                    <span className="recette-title">{title}</span>
                  
                </Link>
            </div>
        </Col>
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        deleteRemoveItem : (itemId) => dispatch(deleteRemoveItem(itemId))
    }

}

export default connect(null,mapDispatchToProps)(RecetteChildren)
