import React, { Component } from 'react'
import { ApiResponse } from '../../utils/models/ApiResponse'
import './AppResourceList.css'
import { AppResourceListItem } from './AppResourceListItem/AppResourceListItem';

type Props = {
    recursos: ApiResponse;
    handleFavourite: (id: number) => void;
    handleDetails: (id: number) => void;
};

export const AppResourceList:React.FC<Props> = ({recursos, handleFavourite, handleDetails}) => {
    return (
        <div className="app-resource">
            <h2 className="app-resource-title">{recursos.sectionName}</h2>
            <div className="app-resource-list">
                {recursos.resources.map((recurso, index) => {
                    return (
                        <AppResourceListItem key={index} recurs={recurso} itemFavourited={(newId) => handleFavourite(newId)} handleDetails={(newId) => handleDetails(newId)}/>
                    )
                })}
            </div>
        </div>
    )
}

