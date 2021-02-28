import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

import { apiCrud } from '../../services/api';

export default function Signup () {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCpf, setUserCpf] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')

  const history = useHistory()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(userPassword !== userPasswordRepeat) {
      alert('Erro: As senhas não são iguais.')
      return
    }

    const data = {
      "email": userEmail,
      "name": userName,
      "cpf": userCpf,
      "phone": userPhone,
      "address": userAddress,
      "password": userPassword
    }

    try {
      await apiCrud.post('user/customer/add', data)
      alert('Usuário cadastrado com sucesso.')
      history.push('/session/new')
    } catch (error) {
      alert('Algo deu errado, tente novamente.')
    }
  }

  return (
    <div className="flex w-auto h-screen">
      <div className="flex-initial h-full bg-blue-200 ">
        <div className="flex-auto m-16">
          <h1 className="text-5xl mb-8 text-left font-bold text-blue-700">
            <Link to="/">Imobiliária</Link>
          </h1>
          <h1 className="text-2xl text-left font-bold text-blue-700">
            Descubra imóveis para compra e aluguel na sua área
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-11/12 h-full justify-items-stretch">
        <div className="flex justify-end p-8">
          <p>Já é membro?&nbsp;</p>
          <Link className="text-blue-700" to="/session/new">Acessar conta</Link>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/5">
            <h1 className="text-3xl font-bold mb-8">Crie sua conta</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Label for="userName">Nome</Label>
                <Input
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  color="blue"
                  name="userName"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <Label for="userEmail">Endereço de Email</Label>
                <Input
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  color="blue"
                  name="userEmail"
                  type="email"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userCpf">CPF</Label>
                    <Input
                      value={userCpf}
                      onChange={e => setUserCpf(e.target.value)}
                      color="blue"
                      name="userCpf"
                      type="text"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPhone">Telefone</Label>
                    <Input
                      value={userPhone}
                      onChange={e => setUserPhone(e.target.value)}
                      color="blue"
                      name="userPhone"
                      type="text"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="my-4">
                <Label for="userAddress">Endereço</Label>
                <Input
                  value={userAddress}
                  onChange={e => setUserAddress(e.target.value)}
                  color="blue"
                  name="userAddress"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userPassword">Senha</Label>
                    <Input
                      value={userPassword}
                      onChange={e => setUserPassword(e.target.value)}
                      color="blue"
                      name="userPassword"
                      type="password"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPasswordRepeat">Repita a senha</Label>
                    <Input
                      value={userPasswordRepeat}
                      onChange={e => setUserPasswordRepeat(e.target.value)}
                      color="blue"
                      name="userPasswordRepeat"
                      type="password"
                  />
                  </div>
                </div>
              </fieldset>
              <Button color="blue" type="submit">Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
