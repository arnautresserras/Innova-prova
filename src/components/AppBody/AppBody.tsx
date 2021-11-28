import React, { Component, useEffect, useState } from 'react'
import './AppBody.css'
import { ETipus } from '../../utils/enums/ETipus'
import { ApiResponse } from '../../utils/models/ApiResponse'
import { AppResourceList } from '../AppResourceList/AppResourceList'
import { AppSearchBar } from '../AppSearchBar/AppSearchBar'
import { AppSideBar } from '../AppSideBar/AppSideBar'
import { AppLoader } from './AppLoader/AppLoader'

type Props = {}

export const AppBody:React.FC<Props> = () => {
    const [selectedItem, setSelectedItem] = useState<ETipus>(ETipus.talleres);
    const [selectedResponse, setSelectedResponse] = useState<ApiResponse[]>([]);
    const [talleres, setTalleres] = useState<ApiResponse[]>([]);
    const [rincones, setRincones] = useState<ApiResponse[]>([]);
    const [ambientes, setAmbientes] = useState<ApiResponse[]>([]);
    const [rutinas, setRutinas] = useState<ApiResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if(firstLoad) {
            getData(selectedItem);
            setFirstLoad(false);
        }
    });

    useEffect(() => {
        setIsLoading(true);
        getData(selectedItem);
    }, [selectedItem]);

    const handleScroll = () => {
        document.getElementsByClassName('app-body')[0].scrollTop > 0 ? setScrolled(true) : setScrolled(false);
    }

    const getData = (selectedItem : ETipus) => {
        switch(selectedItem) {
            case ETipus.talleres:
                if(talleres.length === 0) {
                    fetch('https://api.mocklets.com/mock68016/' + selectedItem)
                    .then(response => response.json())
                    .then(data => {
                        if(data && data.length > 0) {
                            setTalleres(data);
                            setSelectedResponse(data);
                            setIsLoading(false);
                        }else{
                            setIsLoading(false);
                            setSelectedResponse([]);
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setSelectedResponse([]);
                    });
                } else {
                    setSelectedResponse(talleres);
                    setIsLoading(false);
                }
                break;
            case ETipus.rincones:
                if(rincones.length === 0) {
                    fetch('https://api.mocklets.com/mock68016/' + selectedItem)
                    .then(response => response.json())
                    .then(data => {
                        if(data && data.length > 0) {
                            setRincones(data);
                            setSelectedResponse(data);
                            setIsLoading(false);
                        }else{
                            setIsLoading(false);
                            setSelectedResponse([]);
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setSelectedResponse([]);
                    });
                } else {
                    setSelectedResponse(rincones);
                    setIsLoading(false);
                }
                break;
            case ETipus.ambientes:
                if(ambientes.length === 0) {
                    fetch('https://api.mocklets.com/mock68016/' + selectedItem)
                    .then(response => response.json())
                    .then(data => {
                        if(data && data.length > 0) {
                            setAmbientes(data);
                            setSelectedResponse(data);
                            setIsLoading(false);
                        }else{
                            setIsLoading(false);
                            setSelectedResponse([]);
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setSelectedResponse([]);
                    });
                } else {
                    setSelectedResponse(ambientes);
                    setIsLoading(false);
                }
                break;
            case ETipus.rutinas:
                if(rutinas.length === 0) {
                    fetch('https://api.mocklets.com/mock68016/' + selectedItem)
                    .then(response => response.json())
                    .then(data => {
                        if(data && data.length > 0) {
                            setRutinas(data);
                            setSelectedResponse(data);
                            setIsLoading(false);
                        }else{
                            setIsLoading(false);
                            setSelectedResponse([]);
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        setSelectedResponse([]);
                    });
                }else {
                    setSelectedResponse(rutinas);
                    setIsLoading(false);
                }
                break;
            default:
                setSelectedResponse([]);
                setIsLoading(false);
                break;
        }
    }

    const handleFavourite = (id: number) => {
        switch(selectedItem) {
            case ETipus.talleres:
                const newTalleres = talleres.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite;
                        }
                        return res;
                    });
                    return item;
                });
                setTalleres(newTalleres);
                setSelectedResponse(newTalleres);
                break;
            case ETipus.rincones:
                const newRincones = rincones.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite;
                        }
                        return res;
                    });
                    return item;
                });
                setRincones(newRincones);
                setSelectedResponse(newRincones);
                break;
            case ETipus.ambientes:
                const newAmbientes = ambientes.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite;
                        }
                        return res;
                    });
                    return item;
                });
                setAmbientes(newAmbientes);
                setSelectedResponse(newAmbientes);
                break;
            case ETipus.rutinas:
                const newRutinas = rutinas.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite;
                        }
                        return res;
                    });
                    return item;
                });
                setRutinas(newRutinas);
                setSelectedResponse(newRutinas);
                break;
            default:
                break;
        }
    }

    if(isLoading) {
        return(
            <div className="app-main">
                <AppSearchBar />
                <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => setSelectedItem(newValue)}/>
                <div className="app-body app-body-loader">
                    <AppLoader />
                </div>
            </div>
        )
    } else {
        return(
            <div className="app-main">
                <AppSearchBar scrolled={scrolled}/>
                <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => setSelectedItem(newValue)}/>
                <div className="app-body" onScroll={() => handleScroll()}>
                    <div className="app-body-title">{selectedItem}</div>
                    {selectedResponse.map((items) => (
                        <AppResourceList key={items.sectionName} recursos={items} handleFavourite={(newId) => handleFavourite(newId)}/>
                    ))}
                    {selectedResponse.length === 0 ? (
                        <div className="app-body-empty">
                            No hay resultados
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}
