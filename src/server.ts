import express from 'express';
import path from 'path';
import 'dotenv/config';
import { pool } from './config/database';
import alunosRouter from './routes/alunos';
const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok' }); }
  catch { res.status(503).json({ status: 'erro', mensagem: 'Banco indisponível' }); }
});
app.use('/api/alunos', alunosRouter);
app.listen(PORT, '127.0.0.1', () => console.log(`Aplicação: http://localhost:${PORT}`));
pool.query('SELECT 1').then(() => console.log('Conexão com MySQL estabelecida')).catch(err => console.error('Erro na conexão MySQL:', err.message));
