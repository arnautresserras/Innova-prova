import React from 'react'
import { Recurs } from '../../../utils/models/Recurs'
import './AppResourceListItem.css'
import FavouriteFullIcon from '../../../assets/FavouriteFullIcon.svg'
import FavouriteIcon from '../../../assets/FavouriteIcon.svg'

type Props = {
    recurs: Recurs
    itemFavourited: (id: number) => void
    handleDetails: (id: number) => void
}

export const AppResourceListItem:React.FC<Props> = ({recurs, itemFavourited, handleDetails}) => {
    const [favourite, setFavourite] = React.useState(recurs.favourite)
    const handleFavourite = (id: number) => {
        setFavourite(!favourite)
        itemFavourited(id)
    }
    return (
        <div className="app-resource-list-item">
            <img className="app-resource-list-item-image" src={recurs.image} alt={recurs.title} onClick={() => handleDetails(recurs.id)}/>
            <div className="app-resource-list-item-title" onClick={() => handleDetails(recurs.id)}>{recurs.title}</div>
            <div className="app-resource-list-item-description">{recurs.description}</div>
            <div className="app-resource-list-item-favourite" onClick={() => handleFavourite(recurs.id)}>
                <img className="app-resource-list-item-favourite-icon" src={favourite ? FavouriteFullIcon : FavouriteIcon} alt="favourite"/>
                <span>favorito</span>
            </div>
        </div>
    )
}

