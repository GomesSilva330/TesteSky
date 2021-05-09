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
CRYPTO_PRIVATE_KEY=1234
#chave utilizada na geração do JWT
JWT_PRIVATE_KEY=1234
#tempo de expiração do JWT (em milisegundos)
JWT_EXPIRATION_TIME=1800
#base url do app
BASE_URL=https://testesky-luan.herokuapp.com/
#uri de conexão com o mongoDb
MONGO_URI=YOUR_MONGO_URI
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
Cria um usuário no banco de dados, passando informações como: nome, email, senha e um vetor de telefones. *Segue um exemplo de chamada abaixo:*
``` 
curl --location --request POST 'https://testesky-luan.herokuapp.com/auth/signup' \
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
curl --location --request POST 'https://testesky-luan.herokuapp.com/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "teste@teste.com.br",
"senha": "1234567"
}'
```

3. **GET** /user/96e8f9f1-d8d4-4266-9286-bad08044980c
Passando o token JWT gerado na chamada 2 no header x-access-token e o Id do usuário como parâmetro na rota, caso o token ainda esteja válido, retorna o usuário (Nome, Email e Id) referente ao Id informado. *Segue um exemplo de chamada abaixo*

```
curl --location --request GET 'https://testesky-luan.herokuapp.com/user/96e8f9f1-d8d4-4266-9286-bad08044980c' \
--header 'Authorization: Bearer 879452a36d12744a0db4aae7b8e1eb4e7ab259066713b7d3b37c6245b745c74bea2e5760e9808546c15a72b7e0ac849c4312af607d776af2e01180bd417c3bbd45b327b81693a87dba6016010e07f7755fb3a43844a633ec5f8465c66aa8acb93cf6309ce36e5b010ca4a2dfabe1f1657b5ae3d1b9a46eb1326d2d5bbebe739915ff043a2b7eb2c93aa74a7fc13edf4cc6780ea8eb601532f74255f06590640367da8989c1aae2dfb3f11af4dafff0e19a418d7db3070d273507075d0855434bee0de463e93ca09a1ac52c361344050b' \
--data-raw ''
```

> **OBS:** 
> Os curl's acima foram exportados da ferramenta: [Postman](https://www.postman.com/downloads/)
> Para que os mesmo tenham funcionem corretamente, siga as instruções dadas acima
