import React,{useState,useEffect} from 'react';
import {Button} from 'reactstrap';
import {withRouter,Link} from 'react-router-dom';

 const Header = (props)  => {
    const pathname = props.history.location.pathname;
    const [isAdvenced,setIsAdvenced] = useState(false);
    const [isOpen,setOpen] = useState(false);
    const [champText,setChampText] = useState('');
    const [vegetarian,setVegetarian] = useState('');
    const champTextRef = React.createRef();
    
    useEffect(() => {
        window.addEventListener('click',() => {
            setIsAdvenced(false);
        })
    },[])

    const handleIsActiveAdvenced = (e) => {
        e.stopPropagation();
        setIsAdvenced(!isAdvenced);
    }

    const handeleIsOpen = () => {
        setOpen(!isOpen)
    }

    const handeleSearch = (e) => {
        e.preventDefault();
        champTextRef.current.value = ''
       if(vegetarian && vegetarian.length > 0){
            props.history.push('/search?query='+champText+'&tags='+vegetarian);
       }else{
            props.history.push('/search?query='+champText);
       }
    }

    const handeleChampText = (e) => {
        setChampText(e.target.value);
    }

    const handeleChangeVegetal = (e) => {

        const element = e.target;
        console.log('element -->',element)

        if(element.checked){
            setVegetarian(element.value);
        }else{
            setVegetarian('')
        }

    }

    return (
        <header id="header">
            <a href="" id="logo">
                <h1 className="title">O'delice</h1>
            </a>

           <nav className="navigation" role="navigation">
            <ul className={ `list-menu ${isOpen ? ('list-meunIsopen') :''}`}>
                    <li>
                        <Link to="">Home</Link>
                        {pathname === '/' ? <span className="button-link-menu"></span> : null}
                    </li>
                    <li>
                        <Link to="/favorie">Mes Favories</Link>
                        {pathname === '/favorie' ? <span className="button-link-menu"></span> : null}
                    </li>
            </ul>
            <div  id="menuToggle" onClick={() => handeleIsOpen()}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <form  onSubmit={(e) => handeleSearch(e)}>
                <Button className="avance-search" onClick={(e) => handleIsActiveAdvenced(e)}>
                    <i className="fas fa-sort"></i>
                </Button>
                {isAdvenced ? (
                    <div className="advanced-search-element" onClick={(e) => {e.stopPropagation()}}>
                        <span>Recherche avancé :</span>
                        <div className="item-advanced">
                            <input type="checkbox" id="vege" onChange={(e) => handeleChangeVegetal(e)} value="vegetarian"/>
                            <label htmlFor="vege">végétarien</label>
                        </div>
                </div>
                ) : null}
                <div className="group-search">
                    <input ref={champTextRef} type="" placeholder="Rechercher une recette" className="form-control form-search" onChange={(e) => handeleChampText(e)}/>
                    <Button className="btn-search">
                    <span className="fa fa-search" ></span>
                    </Button>
                    
                </div>
                
            </form>
           </nav>
        </header>
    )
}

export default withRouter(Header)
