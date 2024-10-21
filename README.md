# E-commerce App - Documentação

Este projeto é parte da conclusão do módulo de **JavaScript Dinâmico** do programa **Santander Coders**, desenvolvido em parceria com a **ADA**. Trata-se de uma aplicação de e-commerce que permite ao usuário realizar login, visualizar uma lista de produtos, adicionar itens ao carrinho e finalizar compras. A aplicação foi construída utilizando **Fake Store API** como fonte de dados dos produtos e inclui funcionalidades de autenticação de usuários, manipulação de carrinho de compras e gestão de pedidos.

## Funcionalidades

1. **Login e Autenticação**
   - O usuário pode realizar login utilizando um e-mail e senha. 
   - O sistema utiliza JWT para autenticação e salva o token no sessionStorage.

2. **Visualização de Produtos**
   - Os produtos são carregados a partir da Fake Store API e exibidos ao usuário.
   - É possível filtrar produtos por categorias e ordenar por preço ou nome.

3. **Carrinho de Compras**
   - O usuário pode adicionar produtos ao carrinho, modificar a quantidade de cada item e remover itens.
   - O carrinho é salvo no localStorage, garantindo persistência entre as sessões.

4. **Finalização de Compra**
   - Antes de finalizar a compra, o sistema verifica se o carrinho contém itens.
   - Caso o carrinho esteja vazio, uma mensagem é exibida, informando que é necessário adicionar itens para finalizar a compra.
   
## Tecnologias Utilizadas

- **HTML5, CSS3**: Interface e estilização da aplicação.
- **JavaScript, TypeScript**: Manipulação de DOM, interações e funcionalidades dinâmicas.
- **Fake Store API**: API usada para fornecer dados de produtos, categorias e usuários.
- **LocalStorage & SessionStorage**: Armazenamento local de dados do carrinho e autenticação.
- **JWT (JSON Web Token)**: Utilizado para autenticação de usuários.

  ## Funcionalidades Detalhadas

### Login e Autenticação

A autenticação utiliza um sistema baseado em JWT. Quando o usuário realiza o login, um token é gerado e armazenado no `sessionStorage`. O token é decodificado para identificar o usuário e o ID é salvo para futuras operações (como carregar o carrinho do usuário).

### Carregamento de Produtos

Os produtos são carregados dinamicamente a partir da **Fake Store API**. O sistema permite filtrar os produtos por categoria e ordená-los por preço ou nome. A renderização dos produtos na página utiliza a manipulação do DOM para exibir as informações.

### Carrinho de Compras

O carrinho é gerenciado localmente utilizando o `localStorage`. Cada usuário tem seu próprio carrinho, identificado por seu ID de usuário. O carrinho é atualizado conforme o usuário adiciona, remove ou altera as quantidades de produtos. Antes da finalização da compra, o sistema verifica se o carrinho contém itens.

### Finalização de Compra

Quando o usuário tenta finalizar uma compra, o sistema verifica o conteúdo do carrinho. Caso o carrinho esteja vazio, uma mensagem é exibida. Se houver itens no carrinho, a compra é finalizada com sucesso e o carrinho é esvaziado.

## Conclusão

Este projeto é uma aplicação completa de e-commerce, desenvolvida com foco em manipulação de dados, integração de APIs e utilização de armazenamento local para dados sensíveis como autenticação e persistência do carrinho de compras. É uma entrega importante como parte da conclusão do módulo de **JavaScript Dinâmico** do programa **Santander Coders**.

## Autores

- [Jorge Alexandre](https://github.com/JorgeDeAquino)
- [Luiz Fernando](https://github.com/fatalite38)
- [Leonardo Mendes](https://github.com/Choconaldo)
- [Lucas Notaro](https://github.com/LucasNotaro)
