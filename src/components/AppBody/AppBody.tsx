import React, { Component, useEffect } from 'react'
import './AppBody.css'
import { ETipus } from '../../utils/enums/ETipus'
import { ApiResponse } from '../../utils/models/ApiResponse'
import { AppResourceList } from '../AppResourceList/AppResourceList'
import { AppSearchBar } from '../AppSearchBar/AppSearchBar'
import { AppSideBar } from '../AppSideBar/AppSideBar'

type Props = {}

export const AppBody:React.FC<Props> = () => {
    const [selectedItem, setSelectedItem] = React.useState<ETipus>(ETipus.talleres);
    const [selectedResponse, setSelectedResponse] = React.useState<ApiResponse[]>([]);
    const [talleres, setTalleres] = React.useState<ApiResponse[]>([]);
    const [rincones, setRincones] = React.useState<ApiResponse[]>([]);
    const [ambientes, setAmbientes] = React.useState<ApiResponse[]>([]);
    const [rutinas, setRutinas] = React.useState<ApiResponse[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [firstLoad, setFirstLoad] = React.useState(true);

    useEffect(() => {
        if(firstLoad) {
            getData(selectedItem);
            setFirstLoad(false);
        }
    });

    useEffect(() => {
        getData(selectedItem);
    }, [selectedItem]);

    const getData = (selectedItem : ETipus) => {
        fetch('https://api.mocklets.com/mock68016/' + selectedItem)
            .then(response => response.json())
            .then((response)=> {
                setIsLoading(false);
                if(response && response.length > 0) {
                    setSelectedResponse(response);
                    switch(selectedItem) {
                        case ETipus.talleres:
                            setTalleres(response);
                            break;
                        case ETipus.rincones:
                            setRincones(response);
                            break;
                        case ETipus.ambientes:
                            setAmbientes(response);
                            break;
                        case ETipus.rutinas:
                            setRutinas(response);
                            break;
                    }
                }else{
                    setSelectedResponse([]);
                }
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
                <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => setSelectedItem(newValue)}/>
                <div className="app-body">
                    <div className="app-body-title">{selectedItem}</div>
                    {selectedResponse.map((items) => (
                        <AppResourceList key={items.sectionName} recursos={items}/>
                    ))}
                </div>
            </div>
        )
    }
};
