import React, { Component } from 'react'
import './AppSearchBar.css'
import LupaIcon from '../../assets/LupaIcon.svg'
import { AppSearchBarFilters } from './AppSearchBarFilters/AppSearchBarFilters'

type Props = {}

export const AppSearchBar:React.FC<Props> = () => {
    return (
        <div className="app-search-bar">
            <AppSearchBarFilters />
            <input type="text" placeholder="Introduce un texto" />
            <button className="app-search-bar-search-button">
                <img src={LupaIcon} alt=""/>
                <span>Buscar</span>
            </button>
        </div>
    )
}
