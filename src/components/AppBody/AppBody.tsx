import React, { useEffect, useState } from 'react'
import './AppBody.css'
import { ETipus } from '../../utils/enums/ETipus'
import { ApiResponse } from '../../utils/models/ApiResponse'
import { AppResourceList } from '../AppResourceList/AppResourceList'
import { AppSearchBar } from '../AppSearchBar/AppSearchBar'
import { AppSideBar } from '../AppSideBar/AppSideBar'
import { AppLoader } from './AppLoader/AppLoader'
import { AppDetails } from '../AppDetails/AppDetails'
import { FitxerRecurs } from '../../utils/models/FitxerRecurs'
import { API_URL } from '../../utils/url.constants'

type Props = {}

export const AppBody:React.FC<Props> = () => {
    const [selectedItem, setSelectedItem] = useState<ETipus>(ETipus.talleres);
    const [selectedResponse, setSelectedResponse] = useState<ApiResponse[]>([]);
    const [talleres, setTalleres] = useState<ApiResponse[]>([]);
    const [rincones, setRincones] = useState<ApiResponse[]>([]);
    const [ambientes, setAmbientes] = useState<ApiResponse[]>([]);
    const [rutinas, setRutinas] = useState<ApiResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [viewDetailsMode, setViewDetailsMode] = useState(false);
    const [selectedDetailsId, setSelectedDetailsId] = useState(0);
    const [selectedDetails, setSelectedDetails] = useState<FitxerRecurs>({} as FitxerRecurs);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            handleMenuAction(ETipus.talleres);
        }
    });

    const handleScroll = () => {
        document.getElementsByClassName('app-body')[0].scrollTop > 0 ? setScrolled(true) : setScrolled(false);
    }

    const getDetails = (id: number) => {
        fetch(API_URL + 'resources/' + id)
            .then(response => response.json())
            .then(data => {
                setViewDetailsMode(true)
                setSelectedDetails(data)
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }

    const getData = (selectedItem : ETipus, currentItems: ApiResponse[], setter: React.Dispatch<React.SetStateAction<ApiResponse[]>>) => {
        if(currentItems.length === 0) {
            fetch(API_URL + selectedItem)
            .then(response => response.json())
            .then(data => {
                if(data && data.length > 0) {
                    setter(data);
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
            setSelectedResponse(currentItems);
            setIsLoading(false);
        }
    }

    const handleMenuAction = (item: ETipus) => {
        setSelectedItem(item)
        setIsLoading(true)
        setViewDetailsMode(false)
        switch (item) {
            case ETipus.talleres:
                getData(item, talleres, setTalleres)
                break
            case ETipus.rincones:
                getData(item, rincones, setRincones)
                break
            case ETipus.ambientes:
                getData(item, ambientes, setAmbientes)
                break
            case ETipus.rutinas:
                getData(item, rutinas, setRutinas)
                break
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

    const handleViewDetails = (id: number) => {
        setSelectedDetailsId(id);
        setIsLoading(true);
        getDetails(selectedDetailsId);
    }

    if(isLoading) {
        return(
            <div className="app-main">
                <AppSearchBar />
                <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                <div className="app-body app-body-loader">
                    <AppLoader />
                </div>
            </div>
        )
    } else {
        if(viewDetailsMode) {
            return (
                <div className="app-main">
                    <AppSearchBar />
                    <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                    <div className="app-body">
                        <AppDetails recurs={selectedDetails}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="app-main">
                    <AppSearchBar scrolled={scrolled}/>
                    <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                    <div className="app-body" onScroll={() => handleScroll()}>
                        <div className="app-body-title">{selectedItem}</div>
                        {selectedResponse.map((items) => (
                            <AppResourceList key={items.sectionName} recursos={items} handleFavourite={(newId) => handleFavourite(newId)} handleDetails={(newId) => handleViewDetails(newId)}/>
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
}
