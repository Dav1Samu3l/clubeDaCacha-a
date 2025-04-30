// verificaExpiracao.js
const dataExpiracao = '2024-04-30'; 
function verificarExpiracao() {
    const hoje = new Date();
    const expiracao = new Date(dataExpiracao);

    if (hoje > expiracao) {
        // Bloqueia a página (substitui todo o conteúdo)
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial; color: red;">
                <h1>⚠️ Sistema Expirado ⚠️</h1>
                <p>Este sistema não está mais disponível após ${dataExpiracao}.</p>
                <p>Contate o administrador.</p>
            </div>
        `;
        // Encerra scripts adicionais (opcional)
        throw new Error('Sistema expirado.');
    }
}

// Executa a verificação ao carregar a página
verificarExpiracao();