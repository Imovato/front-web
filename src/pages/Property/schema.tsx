import * as yup from 'yup'

// form validation (yup) locale
yup.setLocale({
  mixed: {
    required: '${path} é um campo obrigatório',
  },
  string: {
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    length: '${path} deve ter exatamente ${length} caracteres',
    email: '${path} tem o formato de e-mail inválido',
    matches: '${path} está no formato inválido'
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    max: '${path} deve ser no máximo ${max}',
    positive: '${path} precisa ser positivo',
  },
})

export const schema = yup.object().shape({
  Tipo: yup.string().required(),
  Área: yup.number().required().min(1).max(10000),
  Nome: yup.string().required().min(5).max(500),
  Bairro: yup.string().required().min(1).max(100),
  Endereço: yup.string().required().min(5).max(500),
  Cidade: yup.string().required().min(1).max(50),
  Descrição: yup.string().required().min(10).max(500),
  Estado: yup.string().required().length(2),
  Preço: yup.number().required().min(0),
  Número: yup.number().positive().required(),
  Quantidade: yup.number().positive().required(),
  Bloco: yup.string().when('Tipo', {
    is: (val: string) => val === 'apartment',
    then: yup.string().required()
  }),
  Quartos: yup.number().positive().when('Tipo', {
    is: (val: string) => val !== 'ground',
    then: yup.number().positive().required()
  }),
})
