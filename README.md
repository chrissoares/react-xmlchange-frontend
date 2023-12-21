# XMLChange

**Descrição do Projeto - Frontend**

Este é o repositório do projeto Frontend do XMLChange, uma aplicação que permite editar e salvar dados em formato XML de forma interativa. A aplicação é construída com React.

## Funcionalidades

- Visualização e edição de dados XML de forma hierárquica.
- Adição e edição dinâmica de campos no XML.
- Salvamento de alterações no backend.

## Como Usar

1. Clone este repositório.
2. Instale as dependências com `npm install`.
3. Inicie a aplicação com `npm start`.
4. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

## Dependências

- [React](https://reactjs.org/): Biblioteca JavaScript para criar interfaces de usuário.
- [React Router DOM](https://reactrouter.com/): Navegação declarativa e baseada em componentes para React.
- [React Icons](https://react-icons.github.io/react-icons/): Ícones para aplicativos React.
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/): Biblioteca para salvar arquivos no navegador.

## Estrutura do Projeto

- **src/components:** Componentes React.
- **src/pages:** Páginas da aplicação.
- **src/services:** Lógica de comunicação com o backend.
- **src/utils:** Utilitários diversos.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma *issue* para discutir propostas de alteração.

## Licença

Este projeto é licenciado sob os termos da [Licença MIT] - consulte o arquivo [LICENSE](https://github.com/chrissoares/react-xmlchange-frontend/blob/master/LICENCE) para mais detalhes.

## Backend

O projeto do Backend pode ser encontrado [aqui](https://github.com/chrissoares/nodejs-xmlchange-backend). Certifique-se de configurar e iniciar o backend antes de usar o frontend.

## Endpoint API

- **/api/xml/save:** Envia os dados editados para o backend salvar.
- **/api/xml/read:** Obtém o arquivo XML do backend e o converte em JSON.
