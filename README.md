# Comandos para Configurar e Executar o Projeto

Este arquivo contém os comandos necessários para configurar e executar o projeto backend de receitas culinárias.

## 1. Pré-requisitos

*   Node.js (versão recomendada: 20 ou superior)
*   npm (gerenciador de pacotes do Node.js)
*   PostgreSQL (servidor de banco de dados)

## 2. Configuração do Banco de Dados

Certifique-se de que o PostgreSQL esteja rodando na porta **5434** com o usuário `postgres` e senha `2`, e que exista um banco de dados chamado `receitasapi`.

**Observação:** As credenciais do banco de dados (host, porta, usuário, senha, nome do banco) estão configuradas diretamente nos arquivos `data-source.ts` e `data-source-cli.ts`. Para um ambiente de produção, é altamente recomendável usar variáveis de ambiente (e.g., um arquivo `.env`).

## 3. Instalação de Dependências

Navegue até a pasta raiz do projeto (`backend-receitasculinarias`) no seu terminal e execute:

```bash
npm install
```
Este comando instalará todas as dependências do projeto listadas no `package.json`.

## 4. Executar Migrations (para criar as tabelas no banco de dados)

Primeiro, compile o projeto para garantir que as migrations sejam reconhecidas:

```bash
npm run build
```

Em seguida, execute as migrations para criar as tabelas no seu banco de dados.

```bash
npm run migration:run
```

## 5. Popular o Banco de Dados com Dados Iniciais (Seeds)

Compile o projeto novamente (se você fez alterações desde o último build):

```bash
npm run build
```

Em seguida, execute o seed para popular o banco de dados com dados de exemplo:

```bash
npm run seed:run
```

## 6. Iniciar o Servidor da Aplicação

Para iniciar o servidor NestJS em modo de desenvolvimento (com watch para recarga automática):

```bash
npm run start:dev
```
O servidor estará disponível em `http://localhost:3000`.

## 7. Testar Endpoints (com Postman ou ferramenta similar)

Consulte o arquivo `ENDPOINTS.txt` na raiz do projeto para obter a lista completa de endpoints e exemplos de requisições. 
