## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Tarefas

- CRUD Planos (iniciante, intermediário, avançado, expert)
  - id
  - nome do plano
  - data de criação
  - data de atualização
  - data de deleção

- CRUD Empresa
  - id
  - id externo
  - nome da empresa
  - data de criação
  - data de atualização
  - data de deleção
  - id plano (relacionamento)
  - Salvar DATA DO SALDO INICIAL:

- CRUD Usuário
  - id
  - nome do usuário
  - email
  - senha
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD Fornecedores
  - id
  - nome do fornecedor
  - cnpj
  - email
  - telefone
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD clientes
  - id
  - nome
  - cnpj/cpf
  - email
  - telefone
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD Bancos
  - id
  - nome do banco
  - saldo no banco
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD plano de contas categorias
  - id
  - nome da categoria
  - código da categoria (ex: 1.1)
  - tipo da categoria (receita ou despesa)
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD plano de contas subcategorias
  - id
  - nome da subcategoria
  - código da subcategoria (ex: 1.1.1)
  - id categoria (relacionamento)
  - data de criação
  - data de atualização
  - data de deleção
  - id empresa (relacionamento)

- CRUD Orçamentos
  - id
  - tipo da categoria (receita ou despesa)
  - id da categoria (relacionamento)
  - data referente ao orçamento
  - valor da meta
  - id empresa (relacionamento)
  - data de criação
  - data de atualização
  - data de deleção

- CRUD projetos
  - id
  - nome (Consolidado, filial1, filial2)
  - id empresa (relacionamento)
  - data de criação
  - data de atualização
  - data de deleção

- CRUD documentos
  - id
  - nome (boleto, nota fiscal, etc)
  - id empresa (relacionamento)
  - data de criação
  - data de atualização
  - data de deleção

- CRUD Lançamentos contas
  - id
  - id empresa (relacionamento)
  - tipo lançamento (a receber, a pagar)
  - data lançamento
  - id documento (relacionamento)
  - id categoria (relacionamento)
  - id projeto (relacionamento)
  - id categoria (relacionamento)
  - id subcategoria (relacionamento)
  - tipo (recorrente, parcela)
  - id cliente (relacionamento)
  - descrição
  - id do banco (relacionamento)
  - valor do lançamento
  - qtd parcelas
  - valor parcela
  - data vencimento
  - data recebimento

  - data de criação
  - data de atualização
  - data de deleção

- CRUD transferencia entre bancos
  - id
  - id empresa (relacionamento)
  - id banco origem (relacionamento)
  - id banco destino (relacionamento)
  - valor da transferencia
  - data da transferencia
  - data de criação
  - data de atualização
  - data de deleção
