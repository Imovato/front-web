import React from 'react';

import logoNome from '../../assets/logoNome.svg'

export default function Login () {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex-auto h-full bg-red-200">
                <div className="flex-auto m-16">
                    <img src={logoNome} alt="Imobiliária"/>
                    <h1 className="text-2xl text-left font-bold text-red-500">
                        Descubra imóveis para compra e aluguel na sua área
                    </h1>
                </div>
            </div>
            <div className="flex-none w-3/5 h-full">
            
            </div>
        </div>
    )
}