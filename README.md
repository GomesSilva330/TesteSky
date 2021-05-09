# User API for Sky Test

#### Instalação/Configuração
* Para instalar essa aplicação em sua máquina, rode o comando abaixo:
```
git clone https://github.com/GomesSilva330/TesteSky.git
```
* Crie um arquivo **.env** na raíz do projeto, e nele coloque as seguintes informações:
```
#porta em que a aplicação irá rodar
PORT=3000
#chave utilizada na criptografia
CRYPTO_PRIVATE_KEY=d22a1b75-1d46-4d82-8928-413dce0fa009
#chave utilizada na geração do JWT
JWT_PRIVATE_KEY=3742797f-f0ec-41d9-8578-2db9a78ed399
#tempo de expiração do JWT
JWT_EXPIRATION_TIME=1800
#base url do app
BASE_URL=https://localhost:3000
#uri de conexão com o mongoDb
MONGO_URI=mongodb+srv://luan:m58qPJ0KZUrBL2Nu@skytest.rthw6.mongodb.net/SkyTest?retryWrites=true&w=majority
```

* Por fim, rode esses comando no seu terminal e aplicação irá ser iniciada.
```
cd testesky
npm install
npm start
```

#### Utilização:
Esta API possui três rotas, sendo elas:
1. **POST** /auth/signup
Cria um usuário no banco de dados, passando informações como: nome, email, senha e telefone. *Segue um exemplo de chamada abaixo:*
``` 
curl --location --request POST 'http://localhost:3000/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome": "teste",
    "email": "teste@teste.com.br",
    "senha": "1234567",
    "telefones": [
        {
            "numero": "980571880",
            "ddd": "11"
        }
    ]
}'
```
2. **POST** /auth/signin
Valida se o usuário e senha são válidos *(mesmo login e senha que foram cadastrados na chamada 1)*, caso estejam corretos, retorna um novo token JWT criptografado no response da requisição junto com os dados do usuário. *Segue um exemplode chamada abaixo*:
```
curl --location --request POST 'http://localhost:3000/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "teste@teste.com.br",
"senha": "1234567"
}'
```

3. **GET** /user
Passando o token JWT gerado na chamada 2 no header x-access-token, caso o token ainda esteja válido, retorna todos os usuários (Nome, Email e Id) cadastrados no banco de dados. *Segue um exemplode chamada abaixo*

```
curl --location --request GET 'http://localhost:3000/user' \
--header 'Authorization: 879452a36d12744a0db4aae7b8e1eb4e7ab259066713b7d3b37c6245b745c74bea2e5760e9808546c15a72b7e0ac849cd653d3e68abaae0f4290f8c1b17fa225a4d6dfd6332d460a4462d3221d99106743f643bb82f53c7566a1787a6609fd343648e37b30eb84626b60f9c53f6923982776d891808a4ebeef70d46113b862b7d42c0d5f4feb6008676d1dd224d12f9bd694f7fbc784d0eca782fc6140fee32af56fada4fed7d2c99735422a851f4fd30fd0d3020e32433bc2b23b8d24d951da' \
--data-raw ''
```

4. **GET** /user/a526c305-7155-4cf2-b7b8-ef05c7261971
Passando o token JWT gerado na chamada 2 no header x-access-token e o Id do usuário como parâmetro na rota, caso o token ainda esteja válido, retorna o usuário (Nome, Email e Id) referente ao Id informado. *Segue um exemplode chamada abaixo*

```
curl --location --request GET 'http://localhost:3000/user/a526c305-7155-4cf2-b7b8-ef05c7261971' \
--header 'Authorization: 879452a36d12744a0db4aae7b8e1eb4e7ab259066713b7d3b37c6245b745c74bea2e5760e9808546c15a72b7e0ac849cd653d3e68abaae0f4290f8c1b17fa225a4d6dfd6332d460a4462d3221d99106743f643bb82f53c7566a1787a6609fd343648e37b30eb84626b60f9c53f6923982776d891808a4ebeef70d46113b862b7d42c0d5f4feb6008676d1dd224d12f9bd694f7fbc784d0eca782fc6140fee32af56fada4fed7d2c99735422a851f4fd30fd0d3020e32433bc2b23b8d24d951da' \
--data-raw ''
```

> **OBS:** 
> Os curl's acima foram exportados da ferramenta: [Postman](https://www.postman.com/downloads/)
> Para que os mesmo tenham funcionem corretamente, siga as instruções dadas acima
