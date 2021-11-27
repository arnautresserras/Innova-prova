import React, { Component } from 'react'
import './AppSearchBarFilters.css'
import DropDownIcon from '../../../assets/DropDownIcon.svg'
import DropUpIcon from '../../../assets/DropUpIcon.svg'
import SettingsIcon from '../../../assets/SettingsIcon.svg'
import { ECurs } from '../../../utils/enums/ECurs'
import { ELocation } from '../../../utils/enums/ELocation'
import { EBloques } from '../../../utils/enums/EBloques'
import { ETipus } from '../../../utils/enums/ETipus'
import { AppSearchBarFiltersSubcategory } from './AppSearchBarFiltersSubcategory/AppSearchBarFiltersSubcategory'

type Props = {}

export const AppSearchBarFilters:React.FC<Props> = () => {
    const [showFilters, setShowFilters] = React.useState(false)

    const handleFiltersClick = () => {
        setShowFilters(!showFilters)
    }

    return (
        <div className={`app-search-bar-filters ${showFilters ? 'app-search-bar-filters--show' : ''}`}>
            <a href="#" className="app-search-bar-filters-toggle" onClick={() => handleFiltersClick()}>
                <img src={showFilters ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filters-toggle-icon" />
                <span className="app-search-bar-filters-toggle-text">
                    Filtros
                </span>
                <img src={SettingsIcon} alt="SettingsIcon" className="app-search-bar-filters-toggle-icon" />
            </a>
            <div className={`app-search-bar-filter-dropdown ${showFilters ? 'app-search-bar-filter-dropdown--show' : ''}`}>
                <AppSearchBarFiltersSubcategory enums={'Location'}/>
                <AppSearchBarFiltersSubcategory enums={'Cursos'}/>
                <AppSearchBarFiltersSubcategory enums={'Tipus'}/>
                <AppSearchBarFiltersSubcategory enums={'Bloques'}/>
            </div>
        </div>
    )
}
