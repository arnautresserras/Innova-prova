import React, { Component } from 'react'
import './AppSideBar.css'
import { ETipus } from '../../utils/enums/ETipus'
import TalleresIcon from '../../assets/TalleresIcon.svg'
import RinconesIcon from '../../assets/RinconesIcon.svg'
import AmbientesIcon from '../../assets/AmbientesIcon.svg'
import RutinasIcon from '../../assets/RutinasIcon.svg'

type Props = {};

export const AppSideBar:React.FC<Props> = () => {
    return (
        <div className="app-side-bar">
            <div className="app-side-bar-header">Dinámicas</div>
            <div className="app-side-bar-content">
                <a className="app-side-bar-button" key={ETipus.talleres}>
                    <img className="app-side-bar-button-image" src={TalleresIcon} alt="tipus" />
                    {ETipus.talleres}
                </a>
                <a className="app-side-bar-button" key={ETipus.rincones}>
                    <img className="app-side-bar-button-image" src={RinconesIcon} alt="tipus" />
                    {ETipus.rincones}
                </a>
                <a className="app-side-bar-button" key={ETipus.ambientes}>
                    <img className="app-side-bar-button-image" src={AmbientesIcon} alt="tipus" />
                    {ETipus.ambientes}
                </a>
                <a className="app-side-bar-button" key={ETipus.rutinas}>
                    <img className="app-side-bar-button-image" src={RutinasIcon} alt="tipus" />
                    {ETipus.rutinas}
                </a>
            </div>
        </div>
    )
};

