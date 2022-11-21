import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { FormError } from '../../components/FormError';

import { apiAuth, apiUser } from '../../services/api';
import { schema } from './schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Inputmask from "inputmask";
import { isDark, toggleDarkMode, updateRootElementColor } from '../../utils/darkMode';

export default function Signup() {
  const [darkSwitch, setDarkSwitch] = useState(isDark)
  const [generalErrors, setGeneralErrors] = useState<string[]>([])
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
        var response = await apiAuth.post('/signup', {
          username: data['Nome'],
          email: data['Email'],
          password: data['Senha'],
          cpf: data['CPF'],
          phone: data['Telefone'],
          address: data['Endereço'],
          roles: [
            'ROLE_CLIENT'
          ]
        })
        localStorage.setItem('token', response.data)
        localStorage.setItem('email', data['Email'])

        response = await apiUser.get(`/customer/find/${localStorage.getItem('email')}`)
        localStorage.setItem('userId', response.data.id)

        toast('Cadastro efetuado com sucesso.', { autoClose: 2000, type: 'success' })
        setTimeout(() => {
          history.push('/')
        }, 2000)
      } catch (error) {
        // @ts-expect-error
        if (error.response) {
          // @ts-expect-error
          toast(error.response.data, { autoClose: msgTimeout, type: 'error' })
        } else {
          toast('Erro ao conectar com a API.', { autoClose: msgTimeout, 'type': 'error' })
        }
      }
  }

  async function validate() {
    try {
      await schema.validate(data, { abortEarly: false })
      setGeneralErrors([])
      return true
    } catch (error) {
      // @ts-expect-error
      setGeneralErrors(error.errors)
      return false
    }
  }

  useEffect(() => {
    updateRootElementColor()
    Inputmask("999.999.999-99", { autoUnmask: true }).mask('input[name*=cpf i]');
    Inputmask("(99) 9999-9999[9]", { autoUnmask: true }).mask('input[name*=phone i]');
  }, [])

  return (
    <div className="flex w-auto h-screen bg-white dark:bg-gray-700">
      <div className="flex flex-col items-end flex-initial h-full bg-blue-200 dark:bg-gray-800 justify-end">
        <div className="flex-auto m-16">
          <h1 className="text-5xl mb-8 text-left font-bold text-blue-700 dark:text-blue-200">
            <Link to="/">Imobiliária</Link>
          </h1>
          <h1 className="text-2xl text-left font-bold text-blue-700 dark:text-blue-200">
            Descubra imóveis para compra e aluguel na sua área
          </h1>
        </div>
        <div className="flex items-end p-2">
          <div className="flex items-center gap-2 dark:text-white">
            <FontAwesomeIcon className="text-lg" icon="sun" />
            <div onClick={() => { toggleDarkMode(); setDarkSwitch(!darkSwitch) }} className="cursor-pointer">
              <span className="relative">
                <span className={`block w-12 h-6 ${darkSwitch ? 'bg-blue-400' : 'bg-gray-100'} rounded-full shadow-inner`}></span>
                <span className={`absolute block w-5 h-5 mt-0.5 ml-0.5 rounded-full
                  shadow inset-y-0 left-0 focus-within:shadow-outline
                  transition-transform duration-300 bg-white ease-in-out ${darkSwitch ? 'transform translate-x-6' : ''}`}
                >
                  <input id="unchecked" type="checkbox" className="absolute opacity-0 w-0 h-0" />
                </span>
              </span>
            </div>
            <FontAwesomeIcon className="text-lg" icon="moon" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-11/12 h-full">
        <div className="flex justify-end p-8">
          <p className="dark:text-white">Já é membro?&nbsp;</p>
          <Link className="text-blue-700 dark:text-blue-400" to="/session/new">Acessar conta</Link>
        </div>
        <div className="flex justify-center items-center h-full overflow-y-auto
          scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-blue-400 mx-5 pb-10">
          <div className="flex flex-col w-2/5">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Crie sua conta</h1>
            {generalErrors[0] &&
              (<>
                <div className="bg-red-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
                  <h3 className="text-red-800 dark:text-red-400 font-bold">Campos inválidos:</h3>
                  {generalErrors.map((e, index) => (
                    <FormError className="text-red-500 dark:text-red-200" key={index}>{e}</FormError>
                  ))}
                </div>
              </>)}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <Label className="dark:text-blue-200" for="userName">Nome</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Nome']}
                  onChange={e => setData({ ...data, 'Nome': e.target.value })}
                  color="blue"
                  name="userName"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <Label className="dark:text-blue-200" for="userEmail">Endereço de Email</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Email']}
                  onChange={e => setData({ ...data, 'Email': e.target.value })}
                  color="blue"
                  name="userEmail"
                  type="email"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label className="dark:text-blue-200" for="userCpf">CPF</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['CPF']}
                      onChange={e => setData({ ...data, ['CPF']: e.target.value })}
                      color="blue"
                      name="userCpf"
                      type="text"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label className="dark:text-blue-200" for="userPhone">Telefone</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Telefone']}
                      onChange={e => {
                        e.target.value.length > 10 ?
                          Inputmask("(99) 9999[9]-9999", { autoUnmask: true }).mask('input[name*=phone i]') :
                          Inputmask("(99) 9999-9999[9]", { autoUnmask: true, greedy: false }).mask('input[name*=phone i]')
                        setData({ ...data, ['Telefone']: e.target.value })
                      }}
                      color="blue"
                      name="userPhone"
                      type="text"
                    // onKeyUp={e => setCorrectPhoneMask(document.querySelector('input[name*=phone i]'))}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="my-4">
                <Label className="dark:text-blue-200" for="userAddress">Endereço</Label>
                <span className="text-blue-700 font-bold"> *</span>
                <Input
                  value={data['Endereço']}
                  onChange={e => setData({ ...data, ['Endereço']: e.target.value })}
                  color="blue"
                  name="userAddress"
                  type="text"
                />
              </fieldset>
              <fieldset className="my-4">
                <div className="flex justify-between gap-6">
                  <div className="w-1/2">
                    <Label className="dark:text-blue-200" for="userPassword">Senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Senha']}
                      onChange={e => setData({ ...data, ['Senha']: e.target.value })}
                      color="blue"
                      name="userPassword"
                      type="password"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label className="dark:text-blue-200" for="userPasswordRepeat">Repita a senha</Label>
                    <span className="text-blue-700 font-bold"> *</span>
                    <Input
                      value={data['Repita a senha']}
                      onChange={e => setData({ ...data, ['Repita a senha']: e.target.value })}
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
