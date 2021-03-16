import * as yup from 'yup'
import { setLocale } from 'yup';
import { apiUser } from '../../services/api';

import { validarCPF } from '../../utils/validarCpf';

// form validation (yup) locale
setLocale({
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
})

export const schema = yup.object().shape({
  Nome: yup.string().required().max(100),
  // @ts-expect-error
  Email: yup.string().email().required().max(100).min(2).test('Email', 'Email já cadastrado', async function (val) {
    try {
      const res = await apiUser.post('/checkEmail', {
        email: val
      })
      return !res.data
    } catch(err) {
      console.log("something went wrong with the api...", err)
    }
  }),
  CPF: yup.string().required().test('CPF', 'CPF não é válido', function (val) {
    return validarCPF(val ?? '00000000000') // always returns false if undefined
  }),
  Telefone: yup.string().required().matches(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
  Endereço: yup.string().required(),
  Senha: yup.string().required().min(8).max(30),
  'Repita a senha': yup.string().test('Repita a senha', 'As senhas devem ser iguais', function(value) {
    return this.parent['Senha'] === value
  })
})
