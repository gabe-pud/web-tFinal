//nav
const hamburger = document.querySelector(".hamburger");

const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// login



// carrinho




// Função de validação do login
function validateLogin(event) {
    event.preventDefault(); // Impede o envio do formulário (padrão) para manter a página

    // Obter os valores dos campos
    const email = document.getElementById('ControlInput1').value;
    const password = document.getElementById('inputPassword2').value;
    const message = document.getElementById('message'); // Onde a mensagem será exibida

    // Credenciais corretas
    const validEmail = 'gabrielgarcia@fatec.com';
    const validPassword = 'leviferreira';

    // Validação
    if (email === validEmail && password === validPassword) {
        message.style.color = 'green';
        message.textContent = 'Sucesso'; // Exibe "Sucesso" em verde

        // Redireciona após 1 segundo
        setTimeout(() => {
            window.location.href = 'index.html'; // Redireciona para a página principal
        }, 1000); // O redirecionamento ocorre após 1 segundo para que a mensagem de "Sucesso" seja visível
    } else {
        message.style.color = 'red';
        message.textContent = 'Usuário ou senha inválidos'; // Exibe mensagem de erro
    }
}




