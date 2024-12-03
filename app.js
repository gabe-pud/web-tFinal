//nav
const hamburger = document.querySelector(".hamburger");

const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));




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


// Array para armazenar os produtos no carrinho
let carrinho = [];
let usuarioLogado = false; // Variável para verificar se o usuário está logado

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(produto, preco) {
    // Verifica se o produto já está no carrinho
    let itemExistente = carrinho.find(item => item.produto === produto);

    if (itemExistente) {
        // Se o produto já existe, apenas incrementa a quantidade
        itemExistente.quantidade++;
    } else {
        // Se o produto não existe, adiciona com quantidade 1
        carrinho.push({
            produto: produto,
            preco: preco,
            quantidade: 1
        });
    }

    // Atualiza o carrinho e o valor total
    atualizarCarrinho();
}

// Função para remover um item do carrinho
function removerDoCarrinho(produto) {
    // Remove o item do carrinho
    carrinho = carrinho.filter(item => item.produto !== produto);
    
    // Atualiza o carrinho e o valor total
    atualizarCarrinho();
}

// Função para alterar a quantidade de um item
function alterarQuantidade(produto, quantidade) {
    // Encontra o item no carrinho e altera a quantidade
    let item = carrinho.find(item => item.produto === produto);
    
    if (item) {
        // Se a quantidade for maior que 0, atualiza
        if (quantidade > 0) {
            item.quantidade = quantidade;
        } else {
            // Se a quantidade for 0 ou menor, remove o item do carrinho
            removerDoCarrinho(produto);
        }
    }

    // Atualiza o carrinho e o valor total
    atualizarCarrinho();
}

// Função para atualizar o carrinho no HTML
function atualizarCarrinho() {
    let listaCarrinho = document.getElementById('offcanvas-lista');
    let resultadoCarrinho = document.getElementById('offcanvas-resultado');
    
    listaCarrinho.innerHTML = ''; // Limpa a lista de produtos no carrinho

    let total = 0;
    let totalProdutos = 0;

    // Itera sobre os itens do carrinho para exibir na tela
    carrinho.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.produto} - R$${item.preco.toFixed(2)} x 
            <input type="number" value="${item.quantidade}" min="1" 
                   onchange="alterarQuantidade('${item.produto}', this.value)" 
                   style="width: 50px; margin-right: 10px;">
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho('${item.produto}')">Remover</button>
        `;
        listaCarrinho.appendChild(li);

        total += item.preco * item.quantidade;
        totalProdutos += item.quantidade;
    });

    // Atualiza o preço total e a quantidade de produtos
    resultadoCarrinho.innerHTML = `
        <h3>Preço total: R$${total.toFixed(2)}</h3>
        <p>Total de produtos: ${totalProdutos}</p>
        <button type="submit" class="btn btn-primary mb-3">Finalizar compra</button>
    `;
}

// Função para abrir o carrinho (verifica se o usuário está logado)
function abrirCarrinho() {
    if (usuarioLogado) {
        // Se o usuário estiver logado, abre o carrinho
        let offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvas'));
        offcanvas.show();
    } else {
        alert("Você precisa estar logado para acessar o carrinho.");
    }
}

// Função para fazer login (simulação de um login básico)
function fazerLogin() {
    // Lógica de login simples para o exemplo
    let email = prompt("Digite seu email:");
    let senha = prompt("Digite sua senha:");

    // Simulando um login de sucesso
    if (email === "gabrielgarcia@fatec.com" && senha === "leviferreira") {
        usuarioLogado = true;  // Marca como logado
        alert("Login bem-sucedido!");
        document.getElementById("btnCarrinho").disabled = false; // Habilita o botão do carrinho
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Função para adicionar eventos aos botões "COMPRAR"
function adicionarEventos() {
    document.getElementById('item1').addEventListener('click', function() {
        adicionarAoCarrinho('Mini Napolitano', 12.99);
    });

    document.getElementById('item2').addEventListener('click', function() {
        adicionarAoCarrinho('Chocolate, Morango OU Pistache', 19.99);
    });

    document.getElementById('item3').addEventListener('click', function() {
        adicionarAoCarrinho('Baunilha C/ Chocolate', 12.99);
    });

    document.getElementById('item4').addEventListener('click', function() {
        adicionarAoCarrinho('NAPOLITANO 2L', 24.99);
    });

    document.getElementById('item5').addEventListener('click', function() {
        adicionarAoCarrinho('Expresso Caramelizado', 14.99);
    });

    document.getElementById('item6').addEventListener('click', function() {
        adicionarAoCarrinho('Laranja, Abacaxi OU Morango', 6.99);
    });

    // Evento para o botão do carrinho
    document.getElementById('btnCarrinho').addEventListener('click', abrirCarrinho);
}

// Chama a função para adicionar eventos ao carregar a página
window.onload = adicionarEventos;