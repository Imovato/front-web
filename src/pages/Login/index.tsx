import React from 'react';
import { Link } from 'react-router-dom';

export default function Login () {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex-auto h-full bg-red-200">
                <div className="flex-auto m-16">
                    <h1 className="text-5xl mb-8 text-left font-bold text-red-700">
                        <Link to="/">Imobiliária</Link>
                    </h1>
                    <h1 className="text-2xl text-left font-bold text-red-700">
                        Descubra imóveis para compra e aluguel na sua área
                    </h1>
                </div>
            </div>
            <div className="flex-none w-3/5 h-full">
                <div className="flex flex-col w-auto h-full">
                    <div className="flex w-full justify-end p-8">
                        <p>Ainda não é membro?&nbsp;</p>
                        <Link className="text-red-700" to="/signup/new">Criar conta</Link>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col px-8 w-3/5">
                            <h1 className="text-3xl font-bold mb-8">Acesse sua conta</h1>
                            <form action="" method="post">
                                <fieldset>
                                    <label className="font-bold" htmlFor="userEmail">Endereço de Email</label>
                                    <input className="focus:ring focus:ring-red-200 w-full h-10 px-3 rounded-lg bg-gray-200 mt-2" type="email" name="userEmail" id="userEmail"/>
                                </fieldset>
                                <fieldset className="my-6">
                                    <div className="flex justify-between">
                                        <label className="font-bold" htmlFor="userPassword">Senha</label>
                                        <Link className="text-red-700" to="/passwords_reset/new">Esqueceu a senha?</Link>
                                    </div>
                                    <input className="focus:ring ring-red-200 w-full h-10 px-3 rounded-lg bg-gray-200 mt-2" type="password" name="userPassword" id="userPassword"/>
                                </fieldset>
                                <button className="w-1/2 transition duration-150 ease-in-out hover:bg-opacity-60 bg-red-500 rounded-lg h-10 text-white" type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}