import React, { Component, useEffect } from 'react'
import './AppBody.css'
import { ETipus } from '../../utils/enums/ETipus'
import { ApiResponse } from '../../utils/models/ApiResponse'
import { AppResourceList } from '../AppResourceList/AppResourceList'
import { AppSearchBar } from '../AppSearchBar/AppSearchBar'
import { AppSideBar } from '../AppSideBar/AppSideBar'

type Props = {}

export const AppBody:React.FC<Props> = () => {

    const [talleres, setTalleres] = React.useState<ApiResponse[]>([]);
    const [rincones, setRincones] = React.useState<ApiResponse[]>([]);
    const [ambientes, setAmbientes] = React.useState<ApiResponse[]>([]);
    const [rutinas, setRutinas] = React.useState<ApiResponse[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [firstLoad, setFirstLoad] = React.useState(true);

    useEffect(() => {
        if(firstLoad) {
            getData();
            setFirstLoad(false);
        }
    });

    const getData = () => {
        fetch('https://api.mocklets.com/mock68016/' + ETipus.talleres)
            .then(response => response.json())
            .then((talleres)=> {
                setIsLoading(false);
                setTalleres(talleres);
                console.log(talleres);
            })
            .catch(error => console.log(error));
    }

    if(isLoading) {
        return(
            <div className="Loader">
                Loading
            </div>
        )
    } else {
        return(
            <div className="app-main">
                <AppSearchBar/>
                <AppSideBar />
                <div className="app-body">
                    <div className="app-body-title">{ETipus.talleres}</div>
                    {talleres.map((talleres) => (
                        <AppResourceList key={talleres.sectionName} recursos={talleres}/>
                    ))}
                </div>
            </div>
        )
    }
};
