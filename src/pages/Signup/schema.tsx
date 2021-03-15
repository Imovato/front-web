import * as yup from 'yup'
import { setLocale } from 'yup';

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
})
