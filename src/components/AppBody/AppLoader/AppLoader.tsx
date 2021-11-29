import React from 'react'

import './AppLoader.css'

export const AppLoader:React.FC = () => {
    return(
        <div className="lds-ring">
            <div></div><div></div><div></div><div></div>
        </div>
    )
}