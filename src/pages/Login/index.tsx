import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ValidationError } from 'yup';

import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { TimedDialog } from '../../components/TimedDialog';

import { apiUser } from '../../services/api';
import { schema } from './schema';

export default function Login () {
  const [generalErrors, setGeneralErrors] = useState<string[]>([])
  const [successMsg, setSuccessMsg] = useState([''])
  const [msgStart, setMsgStart] = useState(false)
  const msgTimeout = 2500

  const [data, setData] = useState({
    Email: '',
    Senha: '',
  })

  const history = useHistory()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(await validate())
      try {
          // const response = await apiAuth.post('/session', { userEmail, userPassword })
          const {data: user} = await apiUser.get('/customer/find/1')

          localStorage.setItem('userId', user.id)
          localStorage.setItem('userName', user.name)
          localStorage.setItem('userEmail', user.email)
          localStorage.setItem('userCpf', user.cpf)
          localStorage.setItem('userPhone', user.phone)
          localStorage.setItem('userAddress', user.address)
          setSuccessMsg(['Login efetuado com sucesso.', 'Redirecionando para a página inicial...'])
          setMsgStart(true)
          setTimeout(() => {
            history.push('/')
          }, msgTimeout)
      } catch (err) {
        alert('Algo deu errado, tente novamente.')
      }
  }

  async function validate() {
    try {
      await schema.validate(data, {abortEarly: false})
      const {data: emailExists} = await apiUser.post('/checkEmail', {
        email: data['Email']
      })
      if(!emailExists)
        throw new ValidationError('Login não encontrado')
      setGeneralErrors([])
      return true
    } catch (error) {
      setGeneralErrors(error.errors)
      return false
    }
  }

  return (
    <div className="flex w-auto h-screen bg-white">
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
            {successMsg && (<TimedDialog timeout={msgTimeout} msg={successMsg} start={msgStart} />)}
            <h1 className="text-3xl font-bold mb-8">Acesse sua conta</h1>
            { generalErrors[0] &&
            (<>
              <div className="bg-red-100 p-3 rounded-lg mb-3">
                <h3 className="text-red-800 font-bold">Campos inválidos:</h3>
                {generalErrors.map((e) => (
                  <FormError key={Math.random()}>{e}</FormError>
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
                      onChange={e => setData({...data, 'Email': e.target.value})}
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
                      value={data['Senha']}
                      onChange={e => setData({...data, 'Senha': e.target.value})}
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
