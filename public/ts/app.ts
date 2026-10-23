interface Aluno { id: number; nome: string; email: string; curso: string; }
const form = document.querySelector<HTMLFormElement>('#form')!;
const lista = document.querySelector<HTMLTableSectionElement>('#lista')!;
const mensagem = document.querySelector<HTMLElement>('#mensagem')!;
const busca = document.querySelector<HTMLInputElement>('#busca')!;
const input = (id: string) => document.querySelector<HTMLInputElement>(`#${id}`)!.value.trim();
async function carregar(): Promise<void> {
  try {
    const resposta = await fetch(`/api/alunos?busca=${encodeURIComponent(busca.value.trim())}`);
    if (!resposta.ok) throw new Error('Falha na consulta.');
    const alunos = await resposta.json() as Aluno[];
    lista.replaceChildren();
    for (const aluno of alunos) {
      const tr = document.createElement('tr');
      for (const valor of [aluno.id, aluno.nome, aluno.email, aluno.curso]) {
        const td = document.createElement('td'); td.textContent = String(valor); tr.append(td);
      }
      const td = document.createElement('td'); const btn = document.createElement('button');
      btn.textContent = 'Excluir'; btn.className = 'excluir'; btn.type = 'button';
      btn.addEventListener('click', async () => {
        if (!confirm(`Excluir ${aluno.nome}?`)) return;
        try {
          const r = await fetch(`/api/alunos/${aluno.id}`, { method: 'DELETE' });
          if (!r.ok) throw new Error((await r.json()).erro || 'Erro ao excluir.');
          mensagem.textContent = 'Aluno excluído.'; await carregar();
        } catch (e) { mensagem.textContent = (e as Error).message; }
      });
      td.append(btn); tr.append(td); lista.append(tr);
    }
    if (!alunos.length) { const tr = document.createElement('tr'); const td = document.createElement('td'); td.colSpan = 5; td.textContent = 'Nenhum aluno encontrado.'; tr.append(td); lista.append(tr); }
  } catch (e) { mensagem.textContent = (e as Error).message; }
}
form.addEventListener('submit', async (evento) => {
  evento.preventDefault(); mensagem.textContent = '';
  try {
    const resposta = await fetch('/api/alunos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: input('nome'), email: input('email'), curso: input('curso') }) });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Erro ao cadastrar.');
    mensagem.textContent = 'Aluno cadastrado com sucesso!'; form.reset(); await carregar();
  } catch (e) { mensagem.textContent = (e as Error).message; }
});
busca.addEventListener('input', () => { void carregar(); });
document.querySelector<HTMLButtonElement>('#limpar')!.addEventListener('click', () => { busca.value = ''; void carregar(); });
void carregar();
