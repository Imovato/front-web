import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import Navbar from "../../components/Navbar";
import { apiUser } from "../../services/api";

export function Profile() {
  // atualmente nao esta funcionando pois os dados nao estao mais sendo salvos
  // no localstorage.
  const [userName, setUserName] = useState(localStorage.getItem('userName') ?? '')
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') ?? '')
  const [userCpf, setUserCpf] = useState(localStorage.getItem('userCpf') ?? '')
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') ?? '')
  const [userAddress, setUserAddress] = useState(localStorage.getItem('userAddress') ?? '')

  const userId = localStorage.getItem('userId')

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

    // issues a new request to retrieve user password because
    // we're using put instead of patch in the back-end, so I have to
    // rebuild an entire user here then send it over for them to update it

    // could've saved the user password locally, but not the best idea
    try {
      const response = await apiUser.get(`/user/customer/find/${userId}`)
      data.password = response.data.password
    } catch (error) {
      alert('Erro ao recuperar dados vitais do usuário.')
    }

    try {
      const response = await apiUser.put('/customer/update', data)

      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('userName', response.data.name)
      localStorage.setItem('userEmail', response.data.email)
      localStorage.setItem('userCpf', response.data.cpf)
      localStorage.setItem('userPhone', response.data.phone)
      localStorage.setItem('userAddress', response.data.address)

      alert('Usuário atualizado com sucesso.')
    } catch (error) {
      alert('Erro ao atualizar informações do usuário.')
    }
  }

  useEffect(() => {
    Inputmask("999.999.999-99", {autoUnmask: true}).mask('input[name*=cpf i]');
    Inputmask("(99) 9999-9999", {autoUnmask: true}).mask('input[name*=phone i]');
  }, [])

  return (
    <>
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
                            Inputmask("(99) 9999[9]-9999", {autoUnmask: true}).mask('input[name*=phone i]') :
                            Inputmask("(99) 9999-9999[9]", {autoUnmask: true, greedy: false}).mask('input[name*=phone i]')
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

    try {
      const response = await apiUser.get(`/user/customer/find/${userId}`)
      actualPassword = response.data.password
    } catch (error) {
      alert('Erro ao recuperar dados vitais do usuário.')
    }

    if(!newPassword || !newPasswordRepeat || !password) {
      alert('Preencha os campos vazios.')
      return
    }

    if(password !== actualPassword) {
      alert('A senha atual está incorreta.')
      return
    }


    if(newPassword !== newPasswordRepeat) {
      alert('As senhas não são iguais.')
      return
    }

    const data = {
      "id": userId,
      "email": localStorage.getItem('userEmail'),
      "name": localStorage.getItem('userName'),
      "password": newPassword,
      "cpf": localStorage.getItem('userCpf'),
      "phone": localStorage.getItem('userPhone'),
      "address": localStorage.getItem('userAddress')
    }


    try {
      await apiUser.put('/customer/update', data)
      alert('Senha atualizada com sucesso.')
    } catch (error) {
      alert('Erro ao atualizar a senha.')
    }
  }

  return (
    <>
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
