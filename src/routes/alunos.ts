import { Router, Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import { Aluno, NovoAluno } from '../types/aluno';
const router = Router();
type AlunoRow = Aluno & RowDataPacket;
const texto = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

router.get('/', async (req: Request, res: Response) => {
  try {
    const busca = typeof req.query.busca === 'string' ? req.query.busca.trim() : '';
    const [rows] = busca
      ? await pool.query<AlunoRow[]>('SELECT id, nome, email, curso FROM alunos WHERE nome LIKE ? OR email LIKE ? ORDER BY id DESC', [`%${busca}%`, `%${busca}%`])
      : await pool.query<AlunoRow[]>('SELECT id, nome, email, curso FROM alunos ORDER BY id DESC');
    res.json(rows);
  } catch (e) { console.error(e); res.status(500).json({ erro: 'Falha ao consultar alunos.' }); }
});

router.post('/', async (req: Request<{}, {}, Partial<NovoAluno>>, res: Response) => {
  const { nome, email, curso } = req.body || {};
  if (!texto(nome) || !texto(email) || !texto(curso) || nome.trim().length > 120 || email.trim().length > 160 || curso.trim().length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    res.status(400).json({ erro: 'Informe nome, e-mail válido e curso (sem exceder os limites).' }); return;
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>('INSERT INTO alunos (nome, email, curso) VALUES (?, ?, ?)', [nome.trim(), email.trim().toLowerCase(), curso.trim()]);
    res.status(201).json({ id: result.insertId, nome: nome.trim(), email: email.trim().toLowerCase(), curso: curso.trim() });
  } catch (e: unknown) {
    if ((e as {code?: string}).code === 'ER_DUP_ENTRY') { res.status(409).json({ erro: 'Este e-mail já está cadastrado.' }); return; }
    console.error(e); res.status(500).json({ erro: 'Falha ao cadastrar aluno.' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) { res.status(400).json({ erro: 'ID inválido.' }); return; }
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM alunos WHERE id = ?', [id]);
    if (result.affectedRows === 0) { res.status(404).json({ erro: 'Aluno não encontrado.' }); return; }
    res.status(200).json({ mensagem: 'Aluno excluído.' });
  } catch (e) { console.error(e); res.status(500).json({ erro: 'Falha ao excluir aluno.' }); }
});
export default router;
