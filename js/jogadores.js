function renderizarJogadores() {
    const listaJogadores = document.getElementById('lista-jogadores');
    listaJogadores.innerHTML = '';

    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

    if (jogadores.length === 0) {
        listaJogadores.innerHTML = '<p>Nenhum jogador cadastrado ainda.</p>';
        return;
    }

    jogadores.forEach(jogador => {
        const valorApostado = typeof jogador.valorApostado === 'number' ? jogador.valorApostado : parseFloat(jogador.valorApostado) || 0;
        const valorTotal = typeof jogador.valorTotal === 'number' ? jogador.valorTotal : parseFloat(jogador.valorTotal) || 0;

        const jogadorElement = document.createElement('div');
        jogadorElement.className = 'jogador-item';
        jogadorElement.innerHTML = `
            <div class="jogador-info">
                <h3>${jogador.nome}</h3>
                <p><strong>Fichas:</strong> ${jogador.Fichas}</p>
                <p><strong>Valor Apostado:</strong> R$ ${jogador.valorApostado.toFixed(2)}</p>
                <p><strong>Valor Total:</strong> R$ ${jogador.valorTotal.toFixed(2)}</p>
                <p><strong>ID-jogador:</strong> **${jogador.id}**</p>
                <button class="btn-excluir" data-id="${jogador.id}">Excluir</button>
            </div>
        `;
        listaJogadores.appendChild(jogadorElement);
    });

    // Adiciona event listeners aos botões de exclusão
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removerJogador(id);
        });
    });
}

function removerJogador(id) {
    const senhaCorreta = "1234";
    const senhaInserida = prompt("Digite a senha para remover o jogador:");

    if (senhaInserida !== senhaCorreta) {
        alert("Senha incorreta! Operação cancelada.");
        return;
    }

    let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    jogadores = jogadores.filter(j => j.id !== id);
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
    renderizarJogadores();
}

window.addEventListener('DOMContentLoaded', renderizarJogadores);
