document.addEventListener('DOMContentLoaded', function() {
    const jogadoresContainer = document.getElementById('jogadores-container');
    const partidasContainer = document.getElementById('partidas-container');
    const sortearBtn = document.getElementById('sortear-btn');

    // Carrega jogadores do localStorage
    function carregarJogadores() {
        const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
        
        if (jogadores.length === 0) {
            jogadoresContainer.innerHTML = '<p>Nenhum jogador cadastrado.</p>';
            sortearBtn.disabled = true;
            return;
        }

        jogadoresContainer.innerHTML = '<h2></h2>';
        jogadores.forEach(jogador => {
            const jogadorElement = document.createElement('div');
            jogadorElement.className = 'jogador-item';
            jogadorElement.innerHTML = `
                <h3>${jogador.nome}</h3>
                <p><strong>Fichas:<br></strong> ${jogador.Fichas}</p>
                <p><strong>Valor Apostado:<br></strong> R$ ${jogador.valorApostado.toFixed(2)}</p>
                <p><strong>Valor Total:<br></strong> R$ ${jogador.valorTotal.toFixed(2)}</p>
                <p><strong>ID-jogador:<br></strong> **${jogador.id}**</p>

            `;
            jogadoresContainer.appendChild(jogadorElement);
        });

        // Carrega partidas salvas se existirem
        carregarPartidasSalvas();
    }

    // Carrega partidas salvas no localStorage
    function carregarPartidasSalvas() {
        const partidasSalvas = JSON.parse(localStorage.getItem('partidas')) || [];
        
        if (partidasSalvas.length > 0) {
            partidasContainer.innerHTML = '<h2>Partidas Anteriores</h2>';
            partidasSalvas.forEach((partida, index) => {
                const partidaElement = document.createElement('div');
                partidaElement.className = 'partida-item';
                partidaElement.innerHTML = `
                    <h3>Partida ${index + 1} (${new Date(partida.data).toLocaleString()})</h3>
                    <div class="jogadores-partida">
                        <div class="jogador">
                            <h4>${partida.jogador1.nome}</h4>
                            <p>id-jogador${partida.jogador1.id}</p>
                        </div>
                        <div class="vs">VS</div>
                        <div class="jogador">
                        <h4>${partida.jogador2?.nome || 'BYE'}</h4>
                        <p>id-jogador${partida.jogador2.id}</p>                        </div>
                    </div>
                `;
                partidasContainer.appendChild(partidaElement);
            });
        }
    }

    // Sorteia e salva os confrontos
    function sortearPartidas() {

        const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
        
        if (jogadores.length < 2) {
            alert('É necessário pelo menos 2 jogadores para sortear partidas!');
            return;
        }

        // Embaralha os jogadores
        const jogadoresEmbaralhados = [...jogadores].sort(() => Math.random() - 0.5);
        const novasPartidas = [];
        
        partidasContainer.innerHTML = '<h2>Novas Partidas</h2>';

        // Cria os confrontos
        for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
            const partida = {
                data: new Date().toISOString(),
                jogador1: jogadoresEmbaralhados[i],
                jogador2: (i + 1 < jogadoresEmbaralhados.length) ? jogadoresEmbaralhados[i + 1] : null
            };
            novasPartidas.push(partida);

            const partidaElement = document.createElement('div');
            partidaElement.className = 'partida-item';
            partidaElement.innerHTML = `
                <h3>Partida ${novasPartidas.length}</h3>
                <div class="jogadores-partida">
                    <div class="jogador">
                        <h4>${partida.jogador1.nome}</h4>
                        <p>${partida.jogador1.frequente ? 'Frequente' : 'Ocasional'}</p>
                    </div>
                    <div class="vs">VS</div>
                    <div class="jogador">
                        <h4>${partida.jogador2?.nome || 'BYE'}</h4>
                        ${partida.jogador2 ? `<p>${partida.jogador2.frequente ? 'Frequente' : 'Ocasional'}</p>` : ''}
                    </div>
                </div>
            `;
            partidasContainer.appendChild(partidaElement);
        }

        // Salva no localStorage
        const partidasAnteriores = JSON.parse(localStorage.getItem('partidas')) || [];
        localStorage.setItem('partidas', JSON.stringify([...novasPartidas, ...partidasAnteriores]));
    }

    // Event Listeners
    sortearBtn.addEventListener('click', sortearPartidas);

    // Inicialização
    carregarJogadores();
});   

localStorage.clear