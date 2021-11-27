import React, { Component } from 'react'
import { Recurs } from '../../../utils/models/Recurs';
import './AppResourceListItem.css'
import FavouriteFullIcon from '../../../assets/FavouriteFullIcon.svg';
import FavouriteIcon from '../../../assets/FavouriteIcon.svg';

type Props = {
    recurs: Recurs;
};

export const AppResourceListItem:React.FC<Props> = ({recurs}) => {
    const [favourite, setFavourite] = React.useState(recurs.favourite);
    const handleFavourite = () => {
        setFavourite(!favourite);
    }
    return (
        <div className="app-resource-list-item">
            <img className="app-resource-list-item-image" src={recurs.image} alt={recurs.title}/>
            <div className="app-resource-list-item-title">{recurs.title}</div>
            <div className="app-resource-list-item-description">{recurs.description}</div>
            <div className="app-resource-list-item-favourite">
                {favourite ? <img className="app-resource-list-item-favourite-icon" src={FavouriteFullIcon} alt="favourite" onClick={handleFavourite}/> : <img className="app-resource-list-item-favourite-icon" src={FavouriteIcon} alt="favourite" onClick={handleFavourite}/>}
                <span>favorito</span>
            </div>
        </div>
    )
}

