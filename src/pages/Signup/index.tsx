import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { FormError } from '../../components/FormError';

import { apiUser } from '../../services/api';
import { TimedDialog } from '../../components/TimedDialog';
import { schema } from './schema';

interface UserData {
  name: string
  email: string
  cpf: string
  phone: string
  address: string
  password: string
  passwordRepeat: string
}

let timeout: NodeJS.Timeout

export default function Signup () {
  const [generalErrors, setGeneralErrors] = useState<string[]>([])
  const [successMsg, setSuccessMsg] = useState('')
  const [msgStart, setMsgStart] = useState(false)
  const msgTimeout = 2500

  const [data, setData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    password: '',
    passwordRepeat: ''
  } as UserData)

  const history = useHistory()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (await validate())
      try {
        await apiUser.post('/customer/add', data)
        setSuccessMsg('Usuário cadastrado com sucesso.\n\nRedirecionando para o login...')
        setMsgStart(true)
        timeout = setTimeout(() => {
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
                  value={data.name}
                  onChange={e => setData({...data, name: e.target.value})}
                  color="blue"
                  name="userName"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <Label for="userEmail">Endereço de Email</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data.email}
                  onChange={e => setData({...data, email: e.target.value})}
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
                      value={data.cpf}
                      onChange={e => setData({...data, cpf: e.target.value})}
                      color="blue"
                      name="userCpf"
                      type="text"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPhone">Telefone</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data.phone}
                      onChange={e => setData({...data, phone: e.target.value})}
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
                  value={data.address}
                  onChange={e => setData({...data, address: e.target.value})}
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
                      value={data.password}
                      onChange={e => setData({...data, password: e.target.value})}
                      color="blue"
                      name="userPassword"
                      type="password"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label for="userPasswordRepeat">Repita a senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data.passwordRepeat}
                      onChange={e => setData({...data, passwordRepeat: e.target.value})}
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
