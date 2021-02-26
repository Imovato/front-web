import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

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
            <div className="flex-none w-3/4 h-full">
                <div className="flex flex-col w-auto h-full">
                    <div className="flex w-full justify-end p-8">
                        <p>Ainda não é membro?&nbsp;</p>
                        <Link className="text-red-700" to="/signup/new">Criar conta</Link>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col px-48 w-3/5">
                            <h1 className="text-3xl font-bold mb-8">Acesse sua conta</h1>
                            <form action="" method="post">
                                <fieldset>
                                    <Label for="userEmail">Endereço de Email</Label>
                                    <Input name="userEmail" type="email"/>
                                </fieldset>
                                <fieldset className="my-6">
                                    <div className="flex justify-between">
                                        <Label for="userPassword">Senha</Label>
                                        <Link className="text-red-700" to="/passwords_reset/new">Esqueceu a senha?</Link>
                                    </div>
                                    <Input name="userPassword" type="password"/>
                                </fieldset>
                                <Button type="submit">Enviar</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
