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

export default function Signup () {
  const [userName, setUserName] = useState('')
  const [nameErrors, setNameErrors] = useState([])

  const [userEmail, setUserEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])

  const [userCpf, setUserCpf] = useState('')
  const [cpfErrors, setCpfErrors] = useState([])

  const [userPhone, setUserPhone] = useState('')
  const [phoneErrors, setPhoneErrors] = useState([])

  const [userAddress, setUserAddress] = useState('')
  const [addressErrors, setAddressErrors] = useState([])

  const [userPassword, setUserPassword] = useState('')
  const [pwErrors, setPwErrors] = useState([])
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')
  const [repeatPwErrors, setRepeatPwErrors] = useState([])

  const [generalErrors, setGeneralErrors] = useState([])

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
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(userPassword !== userPasswordRepeat) {
      alert('Erro: As senhas não são iguais.')
      return
    }

    const data = {
      name: userName,
      email: userEmail,
      cpf: userCpf,
      phone: userPhone,
      address: userAddress,
      password: userPassword
    }

    try {
      await schema.validate(data, {abortEarly: false})
      setGeneralErrors([])
    } catch (error) {
      setGeneralErrors(error.errors)
      return
    }

    try {
      await apiUser.post('/customer/add', data)
      alert('Usuário cadastrado com sucesso.')
      history.push('/session/new')
    } catch (error) {
      alert('Algo deu errado, tente novamente.')
    }
  }

  async function validateField(obj: string, field: string, setFunction: React.Dispatch<React.SetStateAction<never[]>>) {
    try {
      await schema.validateAt(obj, {[obj]: field})
      setFunction([])
    } catch (err) {
      setFunction(err.errors)
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
            { generalErrors ?
            (<>
              <div className="bg-red-100 p-3 rounded-lg mb-3">
                <h3 className="text-red-800 font-bold">Campos inválidos:</h3>
                {generalErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
                ))}
              </div>
            </>)
            : null }
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Label for="userName">Nome</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  onBlur={async () => validateField('name', userName, setNameErrors)}
                  color="blue"
                  name="userName"
                  type="text"
                />
                { nameErrors ? nameErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
                )) : null}
              </fieldset>
              <fieldset className="my-4">
                <Label for="userEmail">Endereço de Email</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  onBlur={async () => validateField('email', userEmail, setEmailErrors)}
                  color="blue"
                  name="userEmail"
                  type="email"
                />
                { emailErrors ? emailErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
                )) : null}
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userCpf">CPF</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={userCpf}
                      onChange={e => setUserCpf(e.target.value)}
                      onBlur={async () => validateField('cpf', userCpf, setCpfErrors)}
                      color="blue"
                      name="userCpf"
                      type="text"
                    />
                    { cpfErrors ? cpfErrors.map((e) => (
                      <FormError key={Math.random()}>{e}</FormError>
                    )) : null}
                  </div>
                  <div className="w-1/2">
                    <Label for="userPhone">Telefone</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={userPhone}
                      onChange={e => setUserPhone(e.target.value)}
                      onBlur={async () => validateField('phone', userPhone, setPhoneErrors)}
                      color="blue"
                      name="userPhone"
                      type="text"
                    />
                    { phoneErrors ? phoneErrors.map((e) => (
                      <FormError key={Math.random()}>{e}</FormError>
                    )) : null}
                  </div>
                </div>
              </fieldset>
              <fieldset className="my-4">
                <Label for="userAddress">Endereço</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={userAddress}
                  onChange={e => setUserAddress(e.target.value)}
                  onBlur={async () => validateField('address', userAddress, setAddressErrors)}
                  color="blue"
                  name="userAddress"
                  type="text"
                />
                { addressErrors ? addressErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
                )) : null}
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label for="userPassword">Senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={userPassword}
                      onChange={e => setUserPassword(e.target.value)}
                      onBlur={async () => validateField('password', userPassword, setPwErrors)}
                      color="blue"
                      name="userPassword"
                      type="password"
                    />
                    { pwErrors ? pwErrors.map((e) => (
                      <FormError key={Math.random()}>{e}</FormError>
                    )) : null}
                  </div>
                  <div className="w-1/2">
                    <Label for="userPasswordRepeat">Repita a senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={userPasswordRepeat}
                      onChange={e => setUserPasswordRepeat(e.target.value)}
                      onBlur={async () => validateField('password', userPasswordRepeat, setRepeatPwErrors)}
                      color="blue"
                      name="userPasswordRepeat"
                      type="password"
                  />
                  { repeatPwErrors ? repeatPwErrors.map((e) => (
                    <FormError key={Math.random()}>{e}</FormError>
                  )) : null}
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
