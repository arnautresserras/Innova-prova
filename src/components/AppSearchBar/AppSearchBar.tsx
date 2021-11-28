import React, { Component, useEffect } from 'react'
import './AppSearchBar.css'
import LupaIcon from '../../assets/LupaIcon.svg'
import { AppSearchBarFilters } from './AppSearchBarFilters/AppSearchBarFilters'

type Props = {
    scrolled?: boolean
}

export const AppSearchBar:React.FC<Props> = ({scrolled}) => {
    const [isScrolled, setIsScrolled] = React.useState(scrolled)

    useEffect(() => {
        setIsScrolled(scrolled)
    }, [scrolled])

    return (
        <div className={`app-search-bar ${isScrolled ? 'app-search-bar-scrolled' : ''}`}>
            <AppSearchBarFilters />
            <input className="app-search-bar-search-box" type="text" placeholder="Introduce un texto" />
            <button className="app-search-bar-search-button">
                <img src={LupaIcon} alt=""/>
                <span>Buscar</span>
            </button>
        </div>
    )
}
