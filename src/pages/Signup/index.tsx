import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup'
import { setLocale } from 'yup'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { validarCPF } from '../../utils/validarCpf'
import { FormError } from '../../components/FormError';

import { apiUser } from '../../services/api';

const translation = {
  mixed: {
    required: '${path} é um campo obrigatório',
  },
  string: {
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    email: '${path} tem o formato de e-mail inválido',
    matches: '${path} está no formato inválido'
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    max: '${path} deve ser no máximo ${max}',
  },
}

setLocale(translation)

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
  const [successTimeout, setSucessTimeout] = useState(3500)
  const [cooldownWidth, setCooldownWidth] = useState(0)

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

  const schema = yup.object().shape({
    name: yup.string().required().max(100),
    email: yup.string().email().required().max(100).min(2),
    cpf: yup.string().required().test('cpf', 'cpf não é válido', function (val) {
      return validarCPF(val ?? '00000000000') // always returns false if undefined
    }),
    phone: yup.string().required().matches(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
    address: yup.string().required(),
    password: yup.string().required().min(8).max(30),
    passwordRepeat: yup.string().test('passwordRepeat', 'as senhas devem ser iguais', function(value) {
      return this.parent.password === value
    })
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (await validate())
      try {
        await apiUser.post('/customer/add', data)
        setSuccessMsg('Usuário cadastrado com sucesso.\n\nRedirecionando para o login...')
        setTimeout(() => {
          setCooldownWidth(100)
        }, 10)
        timeout = setTimeout(() => {
          history.push('/session/new')
        }, successTimeout)
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
            {successMsg &&
            (<>
              <div style={{
                transition: 'opacity 0.5s',
                opacity: `${cooldownWidth / 100}`
              }} className="bg-green-100 rounded-t-none rounded-lg mb-5">
                <div style={{
                  transition: `width linear ${successTimeout / 1000}s`,
                  width: `${cooldownWidth}%`
                }}
                className="h-1 bg-green-500"></div>
                <div className="p-5">
                  <p className="text-green-700 font-bold">{successMsg}</p>
                </div>
              </div>
            </>)}
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
