# Lista de tarefa

Aplicativo para para organizar tarefas e compromissos. Permite criar, visualizar e gerenciar agendamentos diários, garantindo que você nunca perca um compromisso importante. 

## Tecnologias 
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Participantes
Ricardo de Paula Xavier, Gabriel Pereira Mendonça Passos, João Victor Bonilha Venturini, Lucas Lemanski


## Sobre o Projeto
A Lista de Tarefa é uma aplicação mobile desenvolvida com TypeScript e Next no front-end e Firebase no back-end. Ela permite que os usuários façam o gerenciamento de suas tarefas diárias, com funcionalidades como login, cadastro, criação de novas tarefas, busca por nome ou data, marcação de tarefas como concluídas e exclusão de tarefas.Além disso, há suporte para recuperação de senha via e-mail.

## Funcionalidades
- **Login/Cadastro**: O sistema permite que o usuário crie uma conta ou faça login utilizando o Firebase Authentication.
- **Recuperação de Senha**: Envio de link de redefinição de senha para o e-mail cadastrado, caso o usuário esqueça sua senha.
- **Gerenciamento de Tarefas**: Adicione, edite ou remova tarefas facilmente. Marque-as como concluídas quando finalizadas.
- **Busca por Nome/Data**: Use filtros de pesquisa para encontrar tarefas específicas pelo nome ou data.
- **Responsividade**: O design é adaptável para diferentes dispositivos, oferecendo uma experiência consistente tanto em desktops quanto em dispositivos móveis.

## Instalação
Para instalar e executar o projeto localmente, siga estes passos:
1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Instale as dependências com `npm install sass`.
4. Instale as dependências com `npm install firebase`.
5. Instale as dependências com `npm install zod`.
6. Instale as dependências com `npm install date-fns`.
7. Instale as dependências com `npm install auth`.
8. Instale as dependências com `npm install mask`.
9. Instale as dependências com `npm install react-hook-form`.
10. Instale as dependências com `npm install router`.
11. Inicie o servidor de desenvolvimento com `npm run dev`.

## Padrão de Projeto Observer na To-Do List
O padrão Observer(Observador) é adequado para essa aplicação de To-Do List quando há necessidade de manter múltiplos componentes sincronizados com o estado de um objeto. Neste caso, o padrão Observer pode ser usado para notificar automaticamente diferentes partes da interface sempre que houver mudanças nas tarefas (como quando uma tarefa é marcada como concluída ou excluída). O principal benefício deste padrão é a separação entre o código que gera as atualizações (como a conclusão de uma tarefa) e o código que reage a essas mudanças (atualizando a UI).

Na aplicação, implementamos o Observer para garantir que as mudanças no estado das tarefas sejam automaticamente refletidas em todos os componentes interessados, como a lista de tarefas exibida ao usuário.

## Benefícios do Observer:
Quando o usuário marca uma tarefa como concluída, todos os componentes que exibem essa tarefa podem ser notificados automaticamente para atualizar a UI, sem a necessidade de re-renderizar toda a página manualmente.


## Padrão de Projeto Factory Method na To-Do List
Outro padrão de projeto que pode ser interessante para essa aplicação é o Factory Method. Esse padrão pode ser utilizado na criação de diferentes tipos de tarefas, gerando objetos de tarefas com comportamentos específicos, sem expor a lógica de criação para o resto do código.


## Benefícios do Factory Method:
- Facilidade de estender o sistema para adicionar novos tipos de tarefas sem alterar o código existente.
- Centralização da lógica de criação de objetos, promovendo o princípio de responsabilidade única.


## Conclusão
- **Observer**: Utilizado para manter a interface sempre sincronizada com o estado das tarefas, notificando automaticamente as mudanças.
- **Factory Method**: Pode ser empregado para criar diferentes tipos de tarefas, facilitando a extensão do sistema no futuro.
Essa combinação de padrões permite uma aplicação escalável e mais fácil de manter, ao separar claramente responsabilidades e garantir a atualização eficiente da interface.
