import React, {  useState } from 'react'
import { FitxerRecurs } from '../../utils/models/FitxerRecurs'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './AppDetails.css'

type Props = {
    recurs: FitxerRecurs
};

export const AppDetails:React.FC<Props> = ({recurs}) => {
    const [numPages, setNumPages] = useState(0);

    return (
        <div className="app-details">
            <div className="app-details-title">
                <h2>{recurs.title}</h2>
            </div>
            <p className="app-details-description" dangerouslySetInnerHTML={{__html: recurs.description}}></p>
            <Document file={recurs.file} onLoadSuccess={({ numPages })=>setNumPages(numPages)}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={index} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    )
}

