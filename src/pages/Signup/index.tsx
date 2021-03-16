import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { FormError } from '../../components/FormError';
import { TimedDialog } from '../../components/TimedDialog';

import { apiUser } from '../../services/api';
import { schema } from './schema';

export default function Signup () {
  const [generalErrors, setGeneralErrors] = useState<string[]>([])
  const [successMsg, setSuccessMsg] = useState<string[]>([])
  const [msgStart, setMsgStart] = useState(false)
  const msgTimeout = 2500

  const [data, setData] = useState({
    Nome: '',
    Email: '',
    CPF: '',
    Telefone: '',
    Endereço: '',
    Senha: '',
    'Repita a senha': ''
  })

  const history = useHistory()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (await validate())
      try {
        await apiUser.post('/customer/add', data)
        setSuccessMsg(['Usuário cadastrado com sucesso.', 'Redirecionando para o login...'])
        setMsgStart(true)
        setTimeout(() => {
          history.push('/session/new')
        }, msgTimeout)
      } catch (error) {
        alert('Algo deu errado, tente novamente.')
      }
  }

  async function validate() {
    try {
      await schema.validate(data, {abortEarly: false})
      setGeneralErrors([])
      return true
    } catch (error) {
      setGeneralErrors(error.errors)
      return false
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
            {successMsg && (<TimedDialog timeout={msgTimeout} msg={successMsg} start={msgStart} />)}
            <h1 className="text-3xl font-bold mb-8">Crie sua conta</h1>
            { generalErrors[0] &&
            (<>
              <div className="bg-red-100 p-3 rounded-lg mb-3">
                <h3 className="text-red-800 font-bold">Campos inválidos:</h3>
                {generalErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
                ))}
              </div>
            </>)}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Label for="userName">Nome</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Nome']}
                  onChange={e => setData({...data, 'Nome': e.target.value})}
                  color="blue"
                  name="userName"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <Label for="userEmail">Endereço de Email</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Email']}
                  onChange={e => setData({...data, 'Email': e.target.value})}
                  color="blue"
                  name="userEmail"
                  type="email"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userCpf">CPF</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['CPF']}
                      onChange={e => setData({...data, ['CPF']: e.target.value})}
                      color="blue"
                      name="userCpf"
                      type="text"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPhone">Telefone</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Telefone']}
                      onChange={e => setData({...data, ['Telefone']: e.target.value})}
                      color="blue"
                      name="userPhone"
                      type="text"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="my-4">
                <Label for="userAddress">Endereço</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Endereço']}
                  onChange={e => setData({...data, ['Endereço']: e.target.value})}
                  color="blue"
                  name="userAddress"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userPassword">Senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Senha']}
                      onChange={e => setData({...data, ['Senha']: e.target.value})}
                      color="blue"
                      name="userPassword"
                      type="password"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPasswordRepeat">Repita a senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Repita a senha']}
                      onChange={e => setData({...data, ['Repita a senha']: e.target.value})}
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
