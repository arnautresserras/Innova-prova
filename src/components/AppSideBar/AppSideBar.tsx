import React from 'react'
import './AppSideBar.css'
import { ETipus } from '../../utils/enums/ETipus'
import TalleresIcon from '../../assets/TalleresIcon.svg'
import RinconesIcon from '../../assets/RinconesIcon.svg'
import AmbientesIcon from '../../assets/AmbientesIcon.svg'
import RutinasIcon from '../../assets/RutinasIcon.svg'

type Props = {
    selectedItem: ETipus,
    setSelectedItem: (item: ETipus) => void,
}

export const AppSideBar:React.FC<Props> = ({selectedItem, setSelectedItem}) => {

    const getIcon = (tipus: ETipus) => {
        switch (tipus) {
            case ETipus.talleres:
                return TalleresIcon
            case ETipus.rincones:
                return RinconesIcon
            case ETipus.ambientes:
                return AmbientesIcon
            case ETipus.rutinas:
                return RutinasIcon
            default:
                return TalleresIcon
        }
    }

    return (
        <div className="app-side-bar">
            <div className="app-side-bar-header">Dinámicas</div>
            <div className="app-side-bar-content">
                {Object.values(ETipus).map((item) => {
                    return (
                        <div className={`app-side-bar-button ${selectedItem === item ? "app-side-bar-button-active":""}`} key={item} onClick={() => setSelectedItem(item)}>
                            <img className="app-side-bar-button-image" src={getIcon(item)} alt="tipus" />
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

