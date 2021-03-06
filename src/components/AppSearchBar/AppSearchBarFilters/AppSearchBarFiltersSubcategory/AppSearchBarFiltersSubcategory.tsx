import React from "react"
import './AppSearchBarFiltersSubcategory.css'
import { ELocation } from "../../../../utils/enums/ELocation"
import { ECurs } from "../../../../utils/enums/ECurs"
import { EBloques } from "../../../../utils/enums/EBloques"
import { ETipus } from "../../../../utils/enums/ETipus"
import DropDownIcon from "../../../../assets/DropDownIcon.svg"
import DropUpIcon from "../../../../assets/DropUpIcon.svg"

type Props = {
    tipus: string
    handleTypeFilter?: (filter: ETipus) => void
}

export const AppSearchBarFiltersSubcategory:React.FC<Props> = ({tipus, handleTypeFilter}) => {

    const [isOpen, setIsOpen] = React.useState(true)
    const [selectedItem, setSelectedItem] = React.useState(0)

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleItemClick = (index: number, tipus: ETipus) => {
        setSelectedItem(index)     
        handleTypeFilter && handleTypeFilter(tipus)
    }

    switch (tipus) {
        case 'Location':
            return (
                <div className="app-search-bar-filter-subcategory">
                    <div className="app-search-bar-filter-subcategory-title" onClick={() => handleDropdown()}>
                        <span>{tipus}</span>
                        <img src={isOpen ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filter-subcategory-toggle-icon" />
                    </div>
                    <div className={`app-search-bar-filter-subcategory-dropdown app-search-bar-filter-subcategory-dropdown-wide ${isOpen ? 'app-search-bar-filter-subcategory-dropdown--show' : ''}`}>
                        {Object.values(ELocation).map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={`app-search-bar-filter-subcategory-dropdown-item app-search-bar-filter-subcategory-dropdown-item-wide ${selectedItem === index ? 'app-search-bar-filter-subcategory-dropdown-item-active' : ''}`}
                                    onClick={() => setSelectedItem(index)}>
                                    <span>{item.toString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        case 'Curs':
            return (
                <div className="app-search-bar-filter-subcategory">
                    <div className="app-search-bar-filter-subcategory-title" onClick={() => handleDropdown()}>
                        <span>{tipus}</span>
                        <img src={isOpen ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filter-subcategory-toggle-icon" />
                    </div>
                    <div className={`app-search-bar-filter-subcategory-dropdown ${isOpen ? 'app-search-bar-filter-subcategory-dropdown--show' : ''}`}>
                        {Object.values(ECurs).map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={`app-search-bar-filter-subcategory-dropdown-item ${selectedItem === index ? 'app-search-bar-filter-subcategory-dropdown-item-active' : ''}`}
                                    onClick={() => setSelectedItem(index)}>
                                    <span>{item.toString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        case 'Bloques':
            return (
                <div className="app-search-bar-filter-subcategory">
                    <div className="app-search-bar-filter-subcategory-title" onClick={() => handleDropdown()}>
                        <span>{tipus}</span>
                        <img src={isOpen ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filter-subcategory-toggle-icon" />
                    </div>
                    <div className={`app-search-bar-filter-subcategory-dropdown app-search-bar-filter-subcategory-dropdown-wide ${isOpen ? 'app-search-bar-filter-subcategory-dropdown--show' : ''}`}>
                        {Object.values(EBloques).map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={`app-search-bar-filter-subcategory-dropdown-item app-search-bar-filter-subcategory-dropdown-item-wide ${selectedItem === index ? 'app-search-bar-filter-subcategory-dropdown-item-active' : ''}`}
                                    onClick={() => setSelectedItem(index)}>
                                    <span>{item.toString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        case 'Tipus':
            return (
                <div className="app-search-bar-filter-subcategory">
                    <div className="app-search-bar-filter-subcategory-title" onClick={() => handleDropdown()}>
                        <span>{tipus}</span>
                        <img src={isOpen ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filter-subcategory-toggle-icon" />
                    </div>
                    <div className={`app-search-bar-filter-subcategory-dropdown app-search-bar-filter-subcategory-dropdown-wide ${isOpen ? 'app-search-bar-filter-subcategory-dropdown--show' : ''}`}>
                        {Object.values(ETipus).map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={`app-search-bar-filter-subcategory-dropdown-item app-search-bar-filter-subcategory-dropdown-item-wide ${selectedItem === index ? 'app-search-bar-filter-subcategory-dropdown-item-active' : ''}`}
                                    onClick={() => handleItemClick(index, item)}>
                                    <span>{item.toString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        default:
            return (
                <div className="app-search-bar-filter-subcategory">
                    <div className="app-search-bar-filter-subcategory-title" onClick={() => handleDropdown()}>
                        <span>{tipus}</span>
                        <img src={isOpen ? DropUpIcon : DropDownIcon} alt="DropdownIcon" className="app-search-bar-filter-subcategory-toggle-icon" />
                    </div>
                    <div className={`app-search-bar-filter-subcategory-dropdown ${isOpen ? 'app-search-bar-filter-subcategory-dropdown--show' : ''}`}>
                        {Object.values(ECurs).map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={`app-search-bar-filter-subcategory-dropdown-item ${selectedItem === index ? 'app-search-bar-filter-subcategory-dropdown-item-active' : ''}`}
                                    onClick={() => setSelectedItem(index)}>
                                    <span>{item.toString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
    }
    
}