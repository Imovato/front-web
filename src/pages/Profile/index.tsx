import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import { apiAuth, apiUser } from "../../services/api";

export function Profile() {
  // atualmente nao esta funcionando pois os dados nao estao mais sendo salvos
  // no localstorage.
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCpf, setUserCpf] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  let userId = ''

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = {
      "id": userId,
      "email": userEmail,
      "name": userName,
      "password": '',
      "cpf": userCpf,
      "phone": userPhone,
      "address": userAddress
    }

    try {
      await apiUser.put('/customer/update', data)
      toast('Usuário atualizado com sucesso.', { autoClose: 4000, 'type': 'success' })
    } catch (error) {
      toast('Erro ao atualizar informações do usuário.', { autoClose: 4000, 'type': 'error' })
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiUser.get(`/customer/find/${localStorage.getItem('email')}`)
        console.log(response)
        userId = response.data.id
        setUserAddress(response.data.address)
        setUserEmail(response.data.email)
        setUserName(response.data.name)
        setUserCpf(response.data.cpf)
        setUserPhone(response.data.phone)
        setUserPassword(response.data.password)
      } catch (error) {
        toast('Erro ao recuperar dados vitais do usuário.', { autoClose: 4000, 'type': 'error' })
      }
    }
    fetch()
    Inputmask("999.999.999-99", { autoUnmask: true }).mask('input[name*=cpf i]');
    Inputmask("(99) 9999-9999", { autoUnmask: true }).mask('input[name*=phone i]');
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar />
          <div className="flex gap-16 justify-start max-w-2xl w-full">
            <div className="flex flex-col min-w-max text-lg h-full text-gray-500 dark:text-gray-400">
              <Link className="font-bold text-red-700 dark:text-red-300 mb-2" to="/account/profile">Editar perfil</Link>
              <Link className="hover:text-black dark:hover:text-white" to="/account/password">Alterar senha</Link>
            </div>
            <div className="flex flex-col justify-start bg-white p-5
              rounded-lg shadow-md dark:bg-gray-800 dark:text-white"
            >
              <h1 className="text-3xl font-bold mb-8">Editar perfil</h1>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <Label for="userName">Nome</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    name="userName"
                    type="text"
                  />
                </fieldset>
                <fieldset className="my-4">
                  <Label color="black dark:text-red-300" for="userEmail">Endereço de Email</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    name="userEmail"
                    type="email"
                  />
                </fieldset>
                <fieldset className="my-4">
                  <div className="flex justify-between gap-6">
                    <div className="w-1/2">
                      <Label color="black dark:text-red-300" for="userCpf">CPF</Label>
                      <span className="text-red-700 font-bold"> *</span>
                      <Input
                        value={userCpf}
                        onChange={e => setUserCpf(e.target.value)}
                        name="userCpf"
                        type="text"
                      />
                    </div>
                    <div className="w-1/2">
                      <Label color="black dark:text-red-300" for="userPhone">Telefone</Label>
                      <span className="text-red-700 font-bold"> *</span>
                      <Input
                        value={userPhone}
                        onChange={e => {
                          e.target.value.length > 10 ?
                            Inputmask("(99) 9999[9]-9999", { autoUnmask: true }).mask('input[name*=phone i]') :
                            Inputmask("(99) 9999-9999[9]", { autoUnmask: true, greedy: false }).mask('input[name*=phone i]')
                          setUserPhone(e.target.value)
                        }}
                        name="userPhone"
                        type="text"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="my-4">
                  <Label color="black dark:text-red-300" for="userAddress">Endereço</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={userAddress}
                    onChange={e => setUserAddress(e.target.value)}
                    name="userAddress"
                    type="text"
                  />
                </fieldset>
                <Button type="submit">Salvar mudanças</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function ChangePw() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')

  const userId = localStorage.getItem('userId')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let actualPassword = ''

    const data = {
      "id": '',
      "email": '',
      "name": '',
      "password": newPassword,
      "cpf": '',
      "phone": '',
      "address": '',
    }

    try {
      const response = await apiUser.get(`/customer/find/${localStorage.getItem('email')}`)
      actualPassword = response.data.password
      data['id'] = response.data.id
      data['email'] = response.data.email
      data['name'] = response.data.name
      data['cpf'] = response.data.cpf
      data['phone'] = response.data.phone
      data['address'] = response.data.address
    } catch (error) {
      toast('Erro ao recuperar dados vitais do usuário.', { autoClose: 4000, 'type': 'error' })
      return
    }

    if (!newPassword || !newPasswordRepeat || !password) {
      toast('Preencha os campos vazios.', { autoClose: 4000, 'type': 'error' })
      return
    }

    if (password !== actualPassword) {
      toast('A senha atual está incorreta.', { autoClose: 4000, 'type': 'error' })
      return
    }


    if (newPassword !== newPasswordRepeat) {
      toast('As senhas não são iguais.', { autoClose: 4000, 'type': 'error' })
      return
    }

    try {
      await apiUser.put('/customer/update', data)
      toast('Senha atualizada com sucesso.', { autoClose: 4000, 'type': 'success' })
    } catch (error) {
      toast('Erro ao atualizar a senha.', { autoClose: 4000, 'type': 'success' })
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl m-auto h-screen">
        <div className="flex flex-col gap-12 items-center">
          <Navbar />
          <div className="flex gap-16 justify-start max-w-2xl w-full">
            <div className="flex flex-col min-w-max text-lg h-full text-gray-500 dark:text-gray-400">
              <Link className="hover:text-black mb-2 dark:hover:text-white" to="/account/profile">Editar perfil</Link>
              <Link className="font-bold text-red-700 dark:text-red-300" to="/account/password">Alterar senha</Link>
            </div>
            <div className="flex flex-col justify-start bg-white p-5 rounded-lg shadow-md
              dark:bg-gray-800 dark:text-white"
            >
              <h1 className="text-3xl font-bold mb-8">Alterar senha</h1>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <Label for="password">Senha atual</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    type="password"
                  />
                </fieldset>
                <fieldset className="my-4">
                  <Label for="newPassword">Nova senha</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    name="newPassword"
                    type="password"
                  />
                </fieldset>
                <fieldset className="my-4">
                  <Label for="newPasswordRepeat">Repita a nova senha</Label>
                  <span className="text-red-700 font-bold"> *</span>
                  <Input
                    value={newPasswordRepeat}
                    onChange={e => setNewPasswordRepeat(e.target.value)}
                    name="newPasswordRepeat"
                    type="password"
                  />
                </fieldset>
                <Button type="submit">Salvar mudanças</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
