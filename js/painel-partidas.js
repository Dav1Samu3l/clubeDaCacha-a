document.addEventListener('DOMContentLoaded', function() {
    const partidasContainer = document.getElementById('partidas-container');
    const atualizarBtn = document.getElementById('atualizar-btn');
    const ultimaAtualizacao = document.getElementById('ultima-atualizacao');

    // Função principal para carregar partidas
    function carregarPartidas() {
        const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
        partidasContainer.innerHTML = '';

        if (partidas.length === 0) {
            partidasContainer.innerHTML = '<p class="sem-partidas">Nenhuma partida em andamento</p>';
            return;
        }

        // Filtra apenas partidas recentes (últimas 2 horas)
        const partidasRecentes = partidas.filter(partida => {
            const diff = (new Date() - new Date(partida.data)) / (1000 * 60 * 60);
            return diff < 2;
        });

        if (partidasRecentes.length === 0) {
            partidasContainer.innerHTML = '<p class="sem-partidas">Nenhuma partida ativa no momento</p>';
            return;
        }

        partidasRecentes.forEach((partida, index) => {
            const partidaElement = document.createElement('div');
            partidaElement.className = 'partida-card';
            
            partidaElement.innerHTML = `
                <div class="partida-header">
                    <h3>Mesa ${index + 1}</h3>
                    <span class="hora">${new Date(partida.data).toLocaleTimeString()}</span>
                </div>
                <div class="jogadores-partida">
                    <div class="jogador jogador1">
                        <h4>${partida.jogador1.nome}</h4>
                        <div class="detalhes">
                            <span class="ficha">Fichas: ${partida.jogador1.Fichas}</span>
                            <span class="valor">R$ ${partida.jogador1.valorApostado.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="jogador jogador2">
                        <h4>${partida.jogador2?.nome || 'BYE'}</h4>
                        ${partida.jogador2 ? `
                        <div class="detalhes">
                            <span class="ficha">Fichas: ${partida.jogador2.Fichas}</span>
                            <span class="valor">R$ ${partida.jogador2.valorApostado.toFixed(2)}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <div class="partida-status">
                    <span class="status">EM ANDAMENTO</span>
                </div>
            `;
            partidasContainer.appendChild(partidaElement);
        });

        // Atualiza o timestamp
        ultimaAtualizacao.textContent = `Última atualização: ${new Date().toLocaleTimeString()}`;
    }

    // Configura auto-atualização a cada 30 segundos
    let intervaloAtualizacao = setInterval(carregarPartidas, 30000);

    // Botão de atualização manual
    atualizarBtn.addEventListener('click', function() {
        carregarPartidas();
        // Reinicia o intervalo
        clearInterval(intervaloAtualizacao);
        intervaloAtualizacao = setInterval(carregarPartidas, 30000);
    });

    // Inicializa
    carregarPartidas();

    // Monitora alterações em outras abas
    const channel = new BroadcastChannel('sinuca-updates');
    channel.onmessage = function(e) {
        if (e.data.type === 'partidas-updated') {
            carregarPartidas();
        }
    };
});




function atualizarDadosPeriodicamente() {
    if (typeof renderizarJogadores === 'function') {
        renderizarJogadores();
    }
    
    // Agenda a próxima atualização
    setTimeout(atualizarDadosPeriodicamente, 1000);
}

atualizarDadosPeriodicamente();