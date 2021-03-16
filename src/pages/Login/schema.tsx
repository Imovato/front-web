import * as yup from 'yup'
import { setLocale } from 'yup';
import { apiUser } from '../../services/api';

// form validation (yup) locale
setLocale({
  mixed: {
    required: '${path} é um campo obrigatório',
  },
  string: {
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    email: '${path} tem o formato de e-mail inválido',
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    max: '${path} deve ser no máximo ${max}',
  },
})

export const schema = yup.object().shape({
  Email: yup.string().email().required().max(100).min(2),
  Senha: yup.string().required().min(8).max(30),
})
