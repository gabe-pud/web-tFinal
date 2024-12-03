//nav
const hamburger = document.querySelector(".hamburger");

const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));


// Função de validação do login
let usuarioLogado = false; // Variável para verificar se o usuário está logado

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

        usuarioLogado = true;  // Marca como logado
        alert("Login bem-sucedido!");
        var myModalEl = document.getElementById('staticBackdrop');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
        setTimeout(() => {
            document.location.href = './vendas.html',true; // Redireciona para a página de vendas
        }, 1000); // O redirecionamento ocorre após 1 segundo para que a mensagem de "Sucesso" seja visível
    } else {
        message.style.color = 'red';
        message.textContent = 'Usuário ou senha inválidos'; // Exibe mensagem de erro
    }
}


// carrinho

// Array para armazenar os produtos no carrinho
let carrinho = [];

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
            ${item.produto} - R$${item.preco.toFixed(2)} 
            <input type="number" value="${item.quantidade}" min="1" 
                   onchange="alterarQuantidade('${item.produto}', this.value)" 
                   style="width: 50px; margin-right: 10px;">
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho('${item.produto}')">Remover</button>
        `;
        listaCarrinho.appendChild(li);

        total += parseFloat(item.preco) * parseInt(item.quantidade) ;
        totalProdutos += parseInt(item.quantidade);
    });

    // Atualiza o preço total e a quantidade de produtos
    resultadoCarrinho.innerHTML = `
        <h3>Preço total: R$${total.toFixed(2)}</h3>
        <p>Total de produtos: ${totalProdutos}</p>
        <button type="submit" class="btn btn-primary mb-3">Finalizar compra</button>
    `;
}

// finalizar compra
function finalizarCompra() {
    setTimeout(() => {
        document.location.href = './checkout.html',true; // Redireciona para a página de vendas
    }, 1000); // O redirecionamento ocorre após 1 segundo para que a mensagem de "Sucesso" seja visível
}

function confirmarPagamento() {
    alert("compra finalizada com sucesso")
    setTimeout(() => {
        document.location.href = './index.html',true; // Redireciona para a página de vendas
    }, 1000); // O redirecionamento ocorre após 1 segundo para que a mensagem de "Sucesso" seja visível
}

// Função para adicionar eventos aos botões "COMPRAR"
function adicionarEventos() {
    document.getElementById('item1').addEventListener('click', function () {
        adicionarAoCarrinho('Mini Napolitano', 12.99);
    });

    document.getElementById('item2').addEventListener('click', function () {
        adicionarAoCarrinho('Chocolate, Morango OU Pistache', 19.99);
    });

    document.getElementById('item3').addEventListener('click', function () {
        adicionarAoCarrinho('Baunilha C/ Chocolate', 12.99);
    });

    document.getElementById('item4').addEventListener('click', function () {
        adicionarAoCarrinho('NAPOLITANO 2L', 24.99);
    });

    document.getElementById('item5').addEventListener('click', function () {
        adicionarAoCarrinho('Expresso Caramelizado', 14.99);
    });

    document.getElementById('item6').addEventListener('click', function () {
        adicionarAoCarrinho('Laranja, Abacaxi OU Morango', 6.99);
    });
}

// Chama a função para adicionar eventos ao carregar a página
window.onload = adicionarEventos;


//viacep

$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});