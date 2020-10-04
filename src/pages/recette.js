import React,{useEffect,useState} from 'react';
import { Col,Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Suggestion from '../components/suggestion';
import {connect} from 'react-redux';
import {getRecetteElement,getFavoriList,deleteRemoveItem} from '../store/actions'

const Recette = (props) => {
    const [modal, setModal] = useState(false);
    const {RecetteElement,nutriment,getFavoriList,favoriList,deleteRemoveItem} = props;
    const id = props.match.params.id;
    const index = favoriList.findIndex(el => el.id === nutriment.id);
    useEffect(() => {
        RecetteElement(id);
    },[id])

    const handeleAddFavoriItem = (nutriment) => {
        getFavoriList(nutriment);
    }

    const handeleAddFavoriItemDelete = (itemId) => {
        deleteRemoveItem(itemId)
    }

    const toggle = () => setModal(!modal);
    return (
        <>
             <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{nutriment.title}</ModalHeader>
                <ModalBody className="modal-body">
                    {nutriment.instruction}
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>Fermer</Button>
                </ModalFooter>
            </Modal>
            <Col lg="8" xs="12">
                <div className="recette-element">
                    <div className="header-recette-element">
                        <h3 className="title-recette-element">{nutriment.title}</h3>
                        <div className="content-btn-favori">
                            <Button onClick={() => toggle()} className="add-favori"><i className="fas fa-plus" ></i>En savoir plus</Button>
                            {index >=0 ? (
                                <Button className="add-favori" onClick={() => handeleAddFavoriItemDelete(nutriment.id)}><i className="fas fa-minus" ></i>delete to favori</Button>
                            ) : (
                                <Button className="add-favori" onClick={() => handeleAddFavoriItem(nutriment)}><i className="fas fa-heart" ></i>add to favori</Button>
                            )}
                        </div>
                        
                    </div>
                    <figure className="recette-img-element xs-12"><img src={nutriment.image} alt={nutriment.image} /></figure>

                    <div className="recette-content-element">
                        <div className="recette-etape">
                       
                           <div className="item-etape">
                                <span className="item-text">Préparation :{nutriment.readyInMinutes} min > </span>
                           </div>

                           <div className="item-etape">
                                <span className="item-text">cuisines: {nutriment.cuisines && nutriment.cuisines.length > 0 ? (
                                    nutriment.cuisines.map((element) => {
                                        return element+','
                                    })
                                ) :null}</span>

                           </div>

                        </div>

                        <div className="top-ingre">
                            <h2><span>Ingrédients</span></h2>
                            <ul className="list-item-ingre">
                                {nutriment.ingredients && nutriment.ingredients.length > 0 ? nutriment.ingredients.map((element,index) => (<li key={index}>{element.name}</li>)) : null}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </Col>
            <Col xs="12" lg="4" md="12">
                <Suggestion idRecette={id} elementRecette={nutriment}/>
            </Col>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        nutriment: state.reducerRecette.elementRecette,
        favoriList : state.listFavoriItem.favoriList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RecetteElement: (id) => dispatch(getRecetteElement(id)),
        getFavoriList: (nutriment) => dispatch(getFavoriList(nutriment)),
        deleteRemoveItem : (itemId) => dispatch(deleteRemoveItem(itemId))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Recette);