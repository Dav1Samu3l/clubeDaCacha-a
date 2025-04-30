function renderizarJogadores() {
    const listaJogadores = document.getElementById('lista-jogadores');
    listaJogadores.innerHTML = '';

    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

    if (jogadores.length === 0) {
        listaJogadores.innerHTML = '<p>Nenhum jogador cadastrado ainda.</p>';
        return;
    }

    // Cria o modal (será reutilizado)
    const modal = document.createElement('div');
    modal.className = 'modal-exclusao';
    modal.innerHTML = `
        <div class="modal-conteudo">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir este jogador?</p>
            <div class="modal-botoes">
                <button class="btn-cancelar">Cancelar</button>
                <button class="btn-confirmar">Excluir</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    jogadores.forEach(jogador => {
        const valorApostado = typeof jogador.valorApostado === 'number' ? jogador.valorApostado : parseFloat(jogador.valorApostado) || 0;
        const valorTotal = typeof jogador.valorTotal === 'number' ? jogador.valorTotal : parseFloat(jogador.valorTotal) || 0;

        const jogadorElement = document.createElement('div');
        jogadorElement.className = 'jogador-item';
        jogadorElement.setAttribute('data-id', jogador.id);
        jogadorElement.innerHTML = `
            <div class="jogador-info">
                <h3>${jogador.nome}</h3>
                <p><strong>Fichas:</strong> ${jogador.Fichas}</p>
                <p><strong>Valor Apostado:</strong> R$ ${jogador.valorApostado.toFixed(2)}</p>
                <p><strong>Valor Total:</strong> R$ ${jogador.valorTotal.toFixed(2)}</p>
                <p><strong>ID-jogador:</strong> **${jogador.id}**</p>
            </div>
        `;
        listaJogadores.appendChild(jogadorElement);

        //  evento de clique no card
        jogadorElement.addEventListener('click', function(e) {
            // Impede que o clique no modal propague para o card
            if (e.target.closest('.modal-conteudo')) return;
            
            const modal = document.querySelector('.modal-exclusao');
            modal.style.display = 'flex';
            modal.setAttribute('data-current-id', jogador.id);
        });
    });

    // Configura os botões do modal
    document.querySelector('.btn-cancelar').addEventListener('click', function() {
        document.querySelector('.modal-exclusao').style.display = 'none';
    });

    document.querySelector('.btn-confirmar').addEventListener('click', function() {
        const modal = document.querySelector('.modal-exclusao');
        const id = parseInt(modal.getAttribute('data-current-id'));
        modal.style.display = 'none';
        removerJogador(id);
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
