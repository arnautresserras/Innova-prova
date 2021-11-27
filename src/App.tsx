import React from 'react'
import logo from './logo.svg'
import './App.css'
import { AppBody } from './components/AppBody/AppBody'
import { AppSearchBar } from './components/AppSearchBar/AppSearchBar'
import { AppSideBar } from './components/AppSideBar/AppSideBar'

function App() {
    return (
        <div className="App">
            <AppBody/>
        </div>
    )
}

export default App
