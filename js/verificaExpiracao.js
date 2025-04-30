// // verificaExpiracao.js
// const dataExpiracao = '';
// function verificarExpiracao() {
//     const hoje = new Date();
//     const expiracao = new Date(dataExpiracao);

//     if (hoje > expiracao) {
//         // Bloqueia a página (substitui todo o conteúdo)
//         document.body.innerHTML = `
//             <div style="text-align: center; padding: 50px; font-family: Arial; color: red;">
//                 <h1>⚠️ Sistema Expirado ⚠️</h1>
//                 <p>Este sistema não está mais disponível após ${dataExpiracao}.</p>
//                 <p>Contate o administrador.</p>
//               <p>Para mais informações, acesse o <a class:"contato_desenvolvedor" href="https://dav1samu3l.github.io/portifolio.github.io/" target="_blank">site oficial</a></p>
//                <img src="./assets/baixados.png" alt="">
//               </div>
//         `;
//         // Encerra scripts adicionais (opcional)
//         throw new Error('Sistema expirado.');
//     }
// }

// // Executa a verificação ao carregar a página
// verificarExpiracao();