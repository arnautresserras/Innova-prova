import React from 'react'
import { Recurs } from '../../utils/models/Recurs'
import './AppResourceList.css'
import { AppResourceListItem } from './AppResourceListItem/AppResourceListItem'

type Props = {
    sectionName: string
    recursos: Recurs[]
    handleFavourite: (id: number) => void
    handleDetails: (id: number) => void
}

export const AppResourceList:React.FC<Props> = ({sectionName, recursos, handleFavourite, handleDetails}) => {
    return (
        <div className="app-resource">
            <h2 className="app-resource-title">{sectionName}</h2>
            <div className="app-resource-list">
                {recursos.map((recurs, index) => {
                    return (
                        <AppResourceListItem key={index} recurs={recurs} itemFavourited={(newId) => handleFavourite(newId)} handleDetails={(newId) => handleDetails(newId)}/>
                    )
                })}
            </div>
        </div>
    )
}

