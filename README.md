Aqui está o README editado para o seu projeto de validação de dados:

---

<h3 align="center">API de Validação de Dados</h3>

---

<p align="center">API para validação e transformação de dados, com suporte a tipos, formatos, objetos aninhados e validação de operações CRUD.</p>

## 📝 Tabela de Conteúdos

- [Sobre](#about)
- [Início Rápido](#getting_started)
- [Uso](#usage)
- [Deployment](#deployment)
- [Tecnologias Utilizadas](#built_using)
- [Autores](#authors)

## 🧐 Sobre <a name="about"></a>

A **API de Validação de Dados** é uma solução projetada para validar e transformar dados de forma eficiente. Ela oferece suporte para:

- Validação de tipos de dados.
- Validação de formatos, como e-mails e URLs.
- Validação de objetos aninhados.
- Aplicação de regras personalizadas para objetos.
- Validação de operações CRUD com base em esquemas dinâmicos.

## 🏁 Início Rápido <a name="getting_started"></a>

Siga as etapas abaixo para configurar o projeto em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [PostgreSQL](https://www.postgresql.org/) ou outro banco de dados compatível com o TypeORM
- [Redis](https://redis.io/) (opcional, mas recomendado para cache)

### Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/Nill-pixel/api_validations.git
   cd api_validations
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` e defina as variáveis de ambiente, como as credenciais do banco de dados, porta da API, entre outros. Exemplo:

   ```
   DATABASE_URL=postgres://user:password@localhost:5432/validate-db
   ```

4. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run start:dev
   ```

5. A API estará disponível em `http://localhost:3000`.

## 🎈 Uso <a name="usage"></a>

A API possui diferentes endpoints para validação de dados:

### Validação de Tipos

- **POST** `/validate/type`

  Corpo da requisição:

  ```json
  {
    "value": "123",
    "targetType": "number"
  }
  ```

  Retorno:

  ```json
  {
    "success": true,
    "convertedValue": 123
  }
  ```

### Validação de Formatos

- **POST** `/validate/format`

  Corpo da requisição:

  ```json
  {
    "value": "email@example.com",
    "format": "email"
  }
  ```

  Retorno:

  ```json
  {
    "success": true,
    "message": "Formato válido"
  }
  ```

### Validação de Objetos Aninhados

- **POST** `/validate/nested`

  Corpo da requisição:

  ```json
  {
    "object": { "name": "John", "age": 30 },
    "schema": { "name": "string", "age": "number" }
  }
  ```

  Retorno:

  ```json
  {
    "success": true,
    "message": "Objeto aninhado válido"
  }
  ```

### Aplicação de Regras

- **POST** `/validate/rules`

  Corpo da requisição:

  ```json
  {
    "object": { "name": "John", "age": 17 },
    "rules": { "age": "min:18" }
  }
  ```

  Retorno:

  ```json
  {
    "success": false,
    "message": "A idade mínima é 18"
  }
  ```

### Validação de Operações CRUD

- **POST** `/validate/crud`

  Corpo da requisição:

  ```json
  {
    "data": { "id": 1, "name": "John" },
    "operation": "create",
    "schema": { "id": "number", "name": "string" }
  }
  ```

  Retorno:

  ```json
  {
    "success": true,
    "message": "Validação de operação CRUD bem-sucedida"
  }
  ```

## 🚀 Deployment <a name="deployment"></a>

Para rodar o projeto em produção:

1. Configure as variáveis de ambiente de produção.
2. Compile o TypeScript para JavaScript:

   ```bash
   npm run build
   ```

3. Inicie o servidor em modo de produção:

   ```bash
   npm run start:prod
   ```

## ⛏️ Tecnologias Utilizadas <a name = "built_using"></a>

- [NestJS](https://nestjs.com/) - Framework de backend
- [Redis](https://redis.io/) - Cache
## ✍️ Autores <a name = "authors"></a>

- [Nilvany Sunguessungue](https://github.com/Nill-pixel) - Desenvolvimento e manutenção

---

Com este README atualizado, o projeto está documentado para que outros desenvolvedores ou colaboradores possam compreender o funcionamento da API e instalá-la corretamente.