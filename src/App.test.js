import React from 'react'

import { render, screen } from 'test-utils'

import App from './App'

jest.mock('components/auth/useAuth', () => ({
    useAuth: jest.fn(() => ({ user: null })),
}))
jest.mock('components/auth/facebook/FacebookAuthBtn', () => ({
    __esModule: true,
    default: () => <div>FACEBOOK LOGIN!</div>,
}))
jest.mock('components/auth/google/GoogleAuthBtn', () => ({
    __esModule: true,
    default: () => <div>GOOGLE LOGIN!</div>,
}))

test('Unauthenticated user sees login screen', async () => {
    render(<App />)

    expect(screen.getByText('Log in and start taking note!')).toBeTruthy()

    // Expect (mocked) Google and Facebook buttons to be rendered
    expect(screen.getByText('FACEBOOK LOGIN!')).toBeTruthy()
    expect(screen.getByText('GOOGLE LOGIN!')).toBeTruthy()
})

test('Unauthenticated cannot see user settings dropdown menu', async () => {
    render(<App />)

    expect(screen.queryByTestId('user-settings-menu-button')).toBeNull()
})
