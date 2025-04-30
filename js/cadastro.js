document.getElementById('form-jogador').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const valorApostadoInput = document.getElementById('ValAposta').value;
    const FichasInput = document.getElementById('Fichas').value;

    const valorApostado = parseFloat(valorApostadoInput) || 0;
    const Fichas = parseFloat(FichasInput) || 0;

    const jogador = {
        nome: nome,
        valorApostado: valorApostado,
        Fichas: Fichas,
        valorTotal: calcularValorTotal(valorApostado),
        //frequente: document.querySelector('input[name="frequente"]').checked,
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    jogadores.push(jogador);
    localStorage.setItem('jogadores', JSON.stringify(jogadores));

    this.reset();
});

function calcularValorTotal(valorApostado) {
    const valFixa = 4;
    const percentualCasa = 0.4;
    return valorApostado * (1 + percentualCasa) + valFixa;
}
