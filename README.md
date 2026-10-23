# Atividade SENAI – Cadastro de alunos

Projeto funcional compatível com os requisitos visíveis nas capturas do roteiro. Os trechos de código ocultos nas seções expansíveis da página não foram fornecidos; esta é uma implementação própria equivalente, não uma transcrição literal.

## Windows / PowerShell

1. Abra esta pasta no VS Code (`code .`).
2. Copie `.env.example` para `.env`: `Copy-Item .env.example .env`.
3. Edite `.env` com a senha real do MySQL instalado. **Não compartilhe nem envie esse arquivo para o GitHub**.
4. No PowerShell, crie banco e tabela (solicitará a senha):
   `& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "source banco.sql"`
   Alternativamente, dentro do cliente mysql, digite `source C:/Users/igorm/Downloads/Projetos/aula-mysql/banco.sql;` (ajuste o caminho).
5. `npm install`
6. `npm run build`
7. `npm start`
8. Abra `http://localhost:3000` e teste `http://localhost:3000/api/health`.

> Importante: os comandos npm são executados no PowerShell, **não** no prompt `mysql>`.

### Testes

- Cadastre Ana Souza (ana.souza@exemplo.com, Desenvolvimento de Sistemas).
- Cadastre Bruno Lima (bruno.lima@exemplo.com, Redes de Computadores).
- Cadastre Carla Mendes (carla.mendes@exemplo.com, Desenvolvimento de Sistemas).
- Teste a busca por Ana; limpe a busca; exclua Bruno confirmando o aviso.
- Um e-mail repetido retorna HTTP 409; formulário inválido retorna 400.

## Arquivos

Backend TypeScript em `src/`; frontend TypeScript em `public/ts/app.ts` (compilado para `public/js/app.js`); HTML e CSS em `public/`; banco em `banco.sql`.

## Solução de problemas

- Erro `Access denied`: confira DB_USER / DB_PASSWORD em `.env`.
- Erro `Unknown database`: execute `banco.sql`.
- Erro de porta: `3306` é a porta MySQL, `3000` é a porta HTTP da aplicação.
- Ao modificar `src/` ou `public/ts/`, execute `npm run build` novamente.
