import React, { useEffect } from 'react'
import './AppSearchBar.css'
import LupaIcon from '../../assets/LupaIcon.svg'
import { AppSearchBarFilters } from './AppSearchBarFilters/AppSearchBarFilters'
import { ETipus } from '../../utils/enums/ETipus'

type Props = {
    scrolled?: boolean,
    handleSearch: (searchString: string) => void,
    handleTypeFilter: (filter: ETipus) => void,
}

export const AppSearchBar:React.FC<Props> = ({scrolled, handleSearch, handleTypeFilter}) => {
    const [isScrolled, setIsScrolled] = React.useState(scrolled)
    const [searchString, setSearchString] = React.useState('')

    useEffect(() => {
        setIsScrolled(scrolled)
    }, [scrolled])

    const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>)=> {
        if(event.key === 'Enter') {
            handleSearch(searchString)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
    }

    return (
        <div className={`app-search-bar ${isScrolled ? 'app-search-bar-scrolled' : ''}`}>
            <AppSearchBarFilters handleTypeFilter={(tipus) => handleTypeFilter(tipus)}/>
            <input className="app-search-bar-search-box" type="text" placeholder="Introduce un texto" onKeyDown={(event) => handleInputChange(event)} onChange={(event) => handleChange(event)}/>
            <button className="app-search-bar-search-button" onClick={() => handleSearch(searchString)}>
                <img src={LupaIcon} alt=""/>
                <span>Buscar</span>
            </button>
        </div>
    )
}
