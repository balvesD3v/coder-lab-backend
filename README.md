
# Coder Lab Backend

![image](https://github.com/balvesD3v/coder-lab-backend/assets/106263458/d74111a6-e542-45fe-9d05-c306b84aba7f)


# Importate
Altere o .env.example para .env e coloque os valores necessários

## Sobre o projeto
Este projeto foi feito para teste da vaga fullstack para a coder lab, foi um projeto bem interessante de ser realizado e utilizei tecnologias que eu não havia utilizado. Espero que esse projeto venha agradar seus olhos haha

## Funcionalidades

#### Principais recursos para usuários comuns:


- POST /auth/login: para que os administradores do acessem o sistema.
- GET /category: para listar todas as categorias de produtos
- GET /product: para listar todos os produtos
- GET /product:id: para pegar um produto
- POST /product: para criar um produto novo
- PATCH /product/:id: para alterar um produto
- DELETE /product:id: para excluir um produto

## Tecnologia utilizada

#### Back-end
- NodeJs
- Typescript
- Nest
- Postgres
- TypeORM
- Docker
- Docker compose
- AWS S3
- Bcrypt
- Multer

## Por quais motivos utilizei essas tecnologias?
- Nesse projeto utilizei Nest para dar ao projeto uma grande robustez e flexibilidade já que posso utilizar com ele o Typescript para deixar o projeto mais organizado e bonito. Utilizei tambem postgres com TypeORM para a criação do banco de dados e criação das entidades para o funcionamento correto. Além de que utilizei o docker para a criação da imagem do banco de dados junto com o docker-compose. Ah, tambem utilizei o AWS S3 com bucket para poder armazenar as imagens do projeto e manter a agilidade e rapidez. Utilizei o bcrypt para encriptografar a senha e o multer para o envio de imagens

## Como executar o projeto

```bash
# clonar repositório
   git clone git@github.com:balvesD3v/coder-lab-backend.git

# instale as dependencias 
    npm install 

# Você irá precisar instalar o docker desktop
# Rode o docker
    docker compose up -d

# inicie o projeto
    npm run dev
```
## Autor

- [@balvesD3v](https://github.com/balvesD3v)
- [@paulobarbosacode](https://www.linkedin.com/in/paulobarbosacode/)

