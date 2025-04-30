// exportador-dados.js

// 1. Função de exportação melhorada
function exportarDados() {
    try {
        const dados = {
            jogadores: JSON.parse(localStorage.getItem('jogadores')) || [],
            partidas: JSON.parse(localStorage.getItem('partidas')) || []
        };

        // Verifica se há dados para exportar
        if (dados.jogadores.length === 0 && dados.partidas.length === 0) {
            alert('⚠️ Não há dados para exportar!');
            return;
        }

        // Cria conteúdo CSV
        const csv = [
            'Nome,Fichas,Valor Apostado,Valor Total,ID',
            ...dados.jogadores.map(j => 
                `"${j.nome}",${j.Fichas},${j.valorApostado?.toFixed(2)||'0.00'},${j.valorTotal?.toFixed(2)||'0.00'},${j.id}`
            ),
            '',
            'Data,Mesa,Jogador 1,Jogador 2,Status',
            ...dados.partidas.map((p, i) => 
                `"${new Date(p.data).toLocaleString()}",${i+1},"${p.jogador1.nome}","${p.jogador2?.nome||'BYE'}","${p.encerrada?'Encerrada':'Em Andamento'}"`
            )
        ].join('\n');

        // Cria e dispara o download
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `dados_sinuca_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Feedback visual
        const btn = document.getElementById('exportarBtn');
        if (btn) {
            btn.textContent = '✓ Dados Exportados!';
            btn.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                btn.textContent = 'Exportar Dados';
                btn.style.backgroundColor = '#d4af37';
            }, 2000);
        }
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
        alert('❌ Ocorreu um erro ao exportar os dados!');
    }
}

// 2. Detecção de hover na aba do navegador
let mouseNaAba = false;
let timeoutExportacao;

function configurarDetectorAba() {
    // Detecta quando o mouse entra na aba (aproximação para fechar)
    document.addEventListener('mouseout', (e) => {
        if (e.clientY < 0) {
            mouseNaAba = true;
            verificarExportacaoAoFechar();
        }
    });
    
    // Detecta quando o mouse sai da aba
    document.addEventListener('mouseover', (e) => {
        if (mouseNaAba && e.clientY >= 0) {
            mouseNaAba = false;
            clearTimeout(timeoutExportacao);
        }
    });
}

function verificarExportacaoAoFechar() {
    if (mouseNaAba) {
        const existemDados = (
            (JSON.parse(localStorage.getItem('jogadores')) || []).length > 0 || 
            (JSON.parse(localStorage.getItem('partidas')) || []).length > 0
        );
        
        if (existemDados) {
            // Mostra alerta após 500ms (tempo para o usuário mover o mouse para o botão de fechar)
            timeoutExportacao = setTimeout(() => {
                const deveExportar = confirm('📢 Você está prestes a sair. Deseja exportar os dados antes de fechar?');
                if (deveExportar) {
                    exportarDados();
                }
            }, 500);
        }
    }
}

// 3. Configuração do botão de exportação
function criarBotaoExportacao() {
    const btn = document.createElement('button');
    btn.id = 'exportarBtn';
    btn.textContent = 'Exportar Dados';
    btn.onclick = exportarDados;
    
    // Estilos do botão
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background-color: #d4af37;
        color: #121212;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    // Efeito hover
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = '#e8c252';
        btn.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '#d4af37';
        btn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(btn);
}

// 4. Evento de fechamento da página (backup)
window.addEventListener('beforeunload', (e) => {
    const existemDados = (
        (JSON.parse(localStorage.getItem('jogadores')) || []).length > 0 || 
        (JSON.parse(localStorage.getItem('partidas')) || []).length > 0
    );
    
    if (existemDados && mouseNaAba) {
        e.preventDefault();
        e.returnValue = 'Você tem dados não exportados. Deseja realmente sair?';
    }
});

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    criarBotaoExportacao();
    configurarDetectorAba();
});