import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppBody } from './components/AppBody/AppBody'
import { AppResourceListItem } from './components/AppResourceList/AppResourceListItem/AppResourceListItem'
import { Recurs } from './utils/models/Recurs'

test('renders sidebar title', () => {
    render(<AppBody />)
    const sidebar = screen.getByText(/dinámicas/i)
    expect(sidebar).toBeInTheDocument()
})

test('App should render the loader first', () => {
    render(<AppBody />)
    const items = screen.getByTestId('loader')
    expect(items).toBeInTheDocument()
})
