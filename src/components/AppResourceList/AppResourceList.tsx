import React, { Component } from 'react'
import { ApiResponse } from '../../utils/models/ApiResponse'
import './AppResourceList.css'
import { AppResourceListItem } from './AppResourceListItem/AppResourceListItem';

type Props = {
    recursos: ApiResponse;
};

export const AppResourceList:React.FC<Props> = ({recursos}) => {
    return (
        <div className="app-resource">
            <h2 className="app-resource-title">{recursos.sectionName}</h2>
            <div className="app-resource-list">
                {recursos.resources.map((recurso, index) => {
                    return (
                        <AppResourceListItem key={index} recurs={recurso}/>
                    )
                })}
            </div>
        </div>
    )
}

