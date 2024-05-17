import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Encryption from './Encryption/Encryption'
import Decryption from './Decryption/Decryption'


export default function Index() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={< Encryption />} />
                <Route path='/decrypt-data' element={<Decryption />} />
            </Routes>
        </>
    )
}
