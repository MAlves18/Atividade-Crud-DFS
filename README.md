# Atividade – Cadastro de aluno


   Alternativamente, dentro do cliente mysql

1. `npm install`
2. `npm run build`
3. `npm start`
4. Abra `http://localhost:3000` e teste `http://localhost:3000/api/health`
   
  
POST /api/alunos → HTTP 201 ao cadastrar.
GET /api/alunos → HTTP 200 ao consultar.
DELETE /api/alunos/:id → HTTP 200 ao excluir.
E-mail repetido → HTTP 409.
Dados inválidos → HTTP 400.
Aluno inexistente → HTTP 404.

Backend TypeScript em `src/`; frontend TypeScript em `public/ts/app.ts` (compilado para `public/js/app.js`); HTML e CSS em `public/`; banco em `banco.sql`.
