import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

import { apiAuth, apiUser } from '../../services/api';
import { isDark, toggleDarkMode, updateRootElementColor } from '../../utils/darkMode';
import { schema } from './schema';

export default function Login() {
  const [darkSwitch, setDarkSwitch] = useState(isDark)
  const [generalErrors, setGeneralErrors] = useState<string[]>([])
  const msgTimeout = 2500

  const [data, setData] = useState({
    Email: '',
    Senha: '',
  })

  const history = useHistory()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (await validate())
      try {
        var response = await apiAuth.post('/signin', null, {
          params: {
            email: data['Email'],
            password: data['Senha']
          }
        })
        localStorage.setItem('token', response.data)
        localStorage.setItem('email', data['Email'])

        response = await apiUser.get(`/customer/find/${localStorage.getItem('email')}`)
        localStorage.setItem('userId', response.data.id)

        toast('Login efetuado com sucesso.', { autoClose: 2000, type: 'success' })
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

  useEffect(() => { updateRootElementColor() }, [])

  return (
    <div className="flex w-auto h-screen bg-white dark:bg-gray-700">
      <div className="flex flex-col items-end flex-initial h-full bg-red-200 dark:bg-gray-800 justify-end">
        <div className="flex-auto m-16">
          <h1 className="text-5xl mb-8 text-left font-bold text-red-700 dark:text-red-300">
            <Link to="/">Imobiliária</Link>
          </h1>
          <h1 className="text-2xl text-left font-bold text-red-700 dark:text-red-300">
            Descubra imóveis para compra e aluguel na sua área
          </h1>
        </div>
        <div className="flex items-end p-2">
          <div className="flex items-center gap-2 dark:text-white">
            <FontAwesomeIcon className="text-lg" icon="sun" />
            <div onClick={() => { toggleDarkMode(); setDarkSwitch(!darkSwitch) }} className="cursor-pointer">
              <span className="relative">
                <span className={`block w-12 h-6 ${darkSwitch ? 'bg-red-400' : 'bg-red-100'} rounded-full shadow-inner`}></span>
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
      <div className="flex flex-col w-11/12 h-full justify-items-stretch">
        <div className="flex justify-end p-8">
          <p className="dark:text-white">Ainda não é membro?&nbsp;</p>
          <Link className="text-red-700 dark:text-red-500" to="/signup/new">Criar conta</Link>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-2/5">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Acesse sua conta</h1>
            {generalErrors[0] &&
              (<>
                <div className="bg-red-100 dark:bg-gray-900 p-3 rounded-lg mb-3">
                  <h3 className="text-red-800 dark:text-red-500 font-bold">Campos inválidos:</h3>
                  {generalErrors.map((e, index) => (
                    <FormError key={index}>{e}</FormError>
                  ))}
                </div>
              </>)}
            <form onSubmit={handleLogin}>
              <fieldset>
                <Label for="userEmail">Endereço de Email</Label>
                <Input
                  name="userEmail"
                  type="email"
                  value={data['Email']}
                  onChange={e => setData({ ...data, 'Email': e.target.value })}
                />
              </fieldset>
              <fieldset className="my-6">
                <div className="flex justify-between">
                  <Label for="userPassword">Senha</Label>
                </div>
                <Input
                  name="userPassword"
                  type="password"
                  value={data['Senha']}
                  onChange={e => setData({ ...data, 'Senha': e.target.value })}
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
