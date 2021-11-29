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
import { API_SEARCH_URL, API_URL } from '../../utils/url.constants'
import { Recurs } from '../../utils/models/Recurs'

type Props = {}

export const AppBody:React.FC<Props> = () => {
    const [selectedItem, setSelectedItem] = useState<ETipus>(ETipus.talleres)
    const [selectedFilter, setSelectedFilter] = useState<ETipus>(ETipus.talleres)
    const [selectedResponse, setSelectedResponse] = useState<ApiResponse[]>([])
    const [searchResponse, setSearchResponse] = useState<Recurs[]>([])
    const [filteredSearchResponse, setFilteredSearchResponse] = useState<Recurs[]>([])
    const [talleres, setTalleres] = useState<ApiResponse[]>([])
    const [rincones, setRincones] = useState<ApiResponse[]>([])
    const [ambientes, setAmbientes] = useState<ApiResponse[]>([])
    const [rutinas, setRutinas] = useState<ApiResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [scrolled, setScrolled] = useState(false)
    const [viewDetailsMode, setViewDetailsMode] = useState(false)
    const [selectedDetailsId, setSelectedDetailsId] = useState(0)
    const [selectedDetails, setSelectedDetails] = useState<FitxerRecurs>({} as FitxerRecurs)
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        if(searchResponse.length > 0) {
            setFilteredSearchResponse(searchResponse.filter((item: Recurs) => item.tag.toString().toLowerCase() === selectedFilter.toString().toLowerCase()))
        }
    }, [selectedFilter])

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)
            handleMenuAction(ETipus.talleres)
        }
    })

    const handleScroll = () => {
        document.getElementsByClassName('app-body')[0].scrollTop > 0 ? setScrolled(true) : setScrolled(false)
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
                    setter(data)
                    setSelectedResponse(data)
                    setIsLoading(false)
                }else{
                    setIsLoading(false)
                    setSelectedResponse([])
                }
            })
            .catch(error => {
                setIsLoading(false)
                setSelectedResponse([])
            })
        } else {
            setSelectedResponse(currentItems)
            setIsLoading(false)
        }
    }

    const handleSearch = (searchText: string) => {
        if(searchText.length > 0) {
            setIsLoading(true)
            fetch(API_SEARCH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    keyword: searchText
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data && data.length > 0) {
                    setSearchResponse(data)
                    setFilteredSearchResponse(data.filter((item: Recurs) => item.tag.toString().toLowerCase() === selectedFilter.toString().toLowerCase()))
                    setIsLoading(false)
                }else{
                    setIsLoading(false)
                    setSearchResponse([])
                }
            })
            .catch(error => {
                setIsLoading(false)
                setSelectedResponse([])
            })
        }        
    }

    const handleMenuAction = (item: ETipus) => {
        setSelectedItem(item)
        setIsLoading(true)
        setSearchResponse([])
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
                setSelectedResponse([])
                setIsLoading(false)
                break
        }
    }

    const handleFavourite = (id: number) => {
        switch(selectedItem) {
            case ETipus.talleres:
                const newTalleres = talleres.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite
                        }
                        return res
                    })
                    return item
                })
                setTalleres(newTalleres)
                setSelectedResponse(newTalleres)
                break
            case ETipus.rincones:
                const newRincones = rincones.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite
                        }
                        return res
                    })
                    return item
                })
                setRincones(newRincones)
                setSelectedResponse(newRincones)
                break
            case ETipus.ambientes:
                const newAmbientes = ambientes.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite
                        }
                        return res
                    })
                    return item
                })
                setAmbientes(newAmbientes)
                setSelectedResponse(newAmbientes)
                break
            case ETipus.rutinas:
                const newRutinas = rutinas.map(item => {
                    item.resources.map(res => {
                        if(res.id === id) {
                            res.favourite = !res.favourite
                        }
                        return res
                    })
                    return item
                })
                setRutinas(newRutinas)
                setSelectedResponse(newRutinas)
                break
            default:
                break
        }
    }

    const handleViewDetails = (id: number) => {
        setSelectedDetailsId(id)
        setIsLoading(true)
        setSearchResponse([])
        getDetails(selectedDetailsId)
    }

    if(isLoading) {
        return(
            <div className="app-main">
                <AppSearchBar scrolled={scrolled} handleSearch={(newString) => handleSearch(newString)} handleTypeFilter={(tipus) => setSelectedFilter(tipus)}/>
                <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                <div className="app-body app-body-loader">
                    <AppLoader />
                </div>
            </div>
        )
    } else {
        if(searchResponse.length > 0) {
            return(
                <div className="app-main">
                    <AppSearchBar scrolled={scrolled} handleSearch={(newString) => handleSearch(newString)} handleTypeFilter={(tipus) => setSelectedFilter(tipus)}/>
                    <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                    <div className="app-body" onScroll={() => handleScroll()}>
                        <AppResourceList sectionName={"Resultats de la cerca"} recursos={filteredSearchResponse} handleDetails={(id) => handleViewDetails(id)} handleFavourite={(id) => handleFavourite(id)}/>
                    </div>
                </div>
            )
        }
        if(viewDetailsMode) {
            return (
                <div className="app-main">
                    <AppSearchBar scrolled={scrolled} handleSearch={(newString) => handleSearch(newString)} handleTypeFilter={(tipus) => setSelectedFilter(tipus)}/>
                    <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                    <div className="app-body">
                        <AppDetails recurs={selectedDetails}/>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="app-main">
                    <AppSearchBar scrolled={scrolled} handleSearch={(newString) => handleSearch(newString)} handleTypeFilter={(tipus) => setSelectedFilter(tipus)}/>
                    <AppSideBar selectedItem={selectedItem} setSelectedItem={(newValue) => handleMenuAction(newValue)}/>
                    <div className="app-body" onScroll={() => handleScroll()}>
                        <div className="app-body-title">{selectedItem}</div>
                        {selectedResponse.map((items) => (
                            <AppResourceList key={items.sectionName} sectionName={items.sectionName} recursos={items.resources} handleDetails={(id) => handleViewDetails(id)} handleFavourite={(id) => handleFavourite(id)}/>
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
