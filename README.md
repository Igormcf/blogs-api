# Blogs API

## Sobre o projeto:

Neste projeto, desenvolvi uma `API` e um banco de dados em `Node.js` para a produção de conteúdos de um blog, usando o pacote `Sequelize` no gerenciamento das models e migrations para fazer um `CRUD` de posts. Além disso, os endpoints criados, seguindo os princípios do `REST`, foram responsáveis pelas conexão e associações com o banco de dados `(MySQL)`. Ainda, uitilizei o `JWT` (JSON Web Token) para a geração de `tokens` e autenticação dos usuários logados. Para realizar a validação dos dados foi utilizado `Joi`.

## Orientações para a Execução:

<details>
  <summary><strong>Com Docker</strong></summary><br />
  
  - Execute o serviço `node` com o comando `docker-compose up -d`, para inicializar o container `blogs_api` e outro chamado `blogs_api_db`.
  - Rode o comando `docker exec -it blogs_api bash` para acessar o terminal interativo do container.
  - Instale as dependências com `npm install` .
</details>

<details>
  <summary><strong>Localmente</strong></summary><br />
  
  - Necessário o `node` instalado.
  - Instale as dependências com `npm install`.
</details>

## Outras informações:

<details>
  <summary><strong>Scripts prontos</strong></summary><br />
  
  - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

  - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

  - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```
</details>
