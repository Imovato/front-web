import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { apiUser } from '../../services/api';

export default function Login () {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const history = useHistory()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
        // const response = await apiAuth.post('/session', { userEmail, userPassword })
        const response = await apiUser.get('/customer/find/1')

        localStorage.setItem('userId', response.data.id)
        localStorage.setItem('userName', response.data.name)
        localStorage.setItem('userEmail', response.data.email)
        localStorage.setItem('userCpf', response.data.cpf)
        localStorage.setItem('userPhone', response.data.phone)
        localStorage.setItem('userAddress', response.data.address)

        history.push('/')
    } catch (err) {
        alert('Erro ao logar, tente novamente.')
    }
  }

  return (
    <div className="flex w-auto h-screen">
      <div className="flex-initial h-full bg-red-200">
        <div className="flex-auto m-16">
          <h1 className="text-5xl mb-8 text-left font-bold text-red-700">
              <Link to="/">Imobiliária</Link>
          </h1>
          <h1 className="text-2xl text-left font-bold text-red-700">
              Descubra imóveis para compra e aluguel na sua área
        </h1>
        </div>
      </div>
      <div className="flex flex-col w-11/12 h-full justify-items-stretch">
        <div className="flex justify-end p-8">
          <p>Ainda não é membro?&nbsp;</p>
          <Link className="text-red-700" to="/signup/new">Criar conta</Link>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/5">
            <h1 className="text-3xl font-bold mb-8">Acesse sua conta</h1>
            <form onSubmit={handleLogin}>
                <fieldset>
                    <Label for="userEmail">Endereço de Email</Label>
                    <Input
                      name="userEmail"
                      type="email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset className="my-6">
                    <div className="flex justify-between">
                        <Label for="userPassword">Senha</Label>
                        <Link
                          className="text-red-700"
                          to="/passwords_reset/new">Esqueceu a senha?</Link>
                    </div>
                    <Input
                      name="userPassword"
                      type="password"
                      value={userPassword}
                      onChange={e => setUserPassword(e.target.value)}
                    />
                </fieldset>
                <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
