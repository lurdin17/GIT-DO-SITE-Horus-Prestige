const BANCO_DE_DADOS = {
    "h3-black": {
        nome: "H3 Black Edition",
        preco: 0.00,
        imagem: "https://i.imgur.com/ORlGCxO.jpeg",
        link: "marcas/addiesdive/h3_black.html"
    },
    "h3-silver": {
        nome: "H3 Silver Classic",
        preco: 0.00,
        imagem: "https://i.imgur.com/uY3FHOw.jpeg",
        link: "marcas/addiesdive/h3_silver.html"
    },
    "h3-black-silver": {
        nome: "H3 Black Silver",
        preco: 0.00,
        imagem: "https://i.imgur.com/JzTWQDM.jpeg",
        link: "marcas/addiesdive/h3_black_silver.html"
    },
    "h3-blue-silver": {
    nome: "H3 Blue Silver",
    preco: 0.00, // Defina o preço que desejar
    imagem: "https://i.imgur.com/qC1nrKP.jpeg",
    link: "marcas/addiesdive/h3_blue_silver.html",
    marca: "addiesdive"
    },
    "h3-zenturion-green": {
    "nome": "H3 Zenturion Green",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/tp0iKgm.jpeg",
    "link": "marcas/addiesdive/h3_zenturion_green.html",
    "marca": "addiesdive"
    },
    "pg-pepsi": {
    "nome": "PG Pepsi GMT",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/o37Q581.jpeg", 
    "link": "marcas/pagani/pg_pepsi.html",
    "marca": "pagani" 
     },
     "pg-gmt-blue-sky": {
    "nome": "PG GMT Blue Sky",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/QXbol96.jpeg", 
    "link": "marcas/pagani/pg_gmt_blue_sky.html",
    "marca": "pagani" 
     },
          "pg-gmt-red": {
    "nome": "PG GMT Red",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/TOjG141.jpeg", 
    "link": "marcas/pagani/pg_gmt_red.html",
    "marca": "pagani" 
     },
               "pg-gmt-gray": {
    "nome": "PG GMT Gray",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/QKRLFaL.jpeg", 
    "link": "marcas/pagani/pg_gmt_gray.html",
    "marca": "pagani" 
     },
    "pg-gmt-brown": {
    "nome": "PG GMT Brown",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/SQElYEJ.jpeg",
    "link": "marcas/pagani/pg_gmt_brown.html",
    "marca": "pagani" 
     },
     "pg-bright-blue": {
    "nome": "PG Bright Blue",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/5suF4aT.jpeg",
    "link": "marcas/pagani/pg_bright_blue.html",
    "marca": "pagani"
     },
     "pg-wimbledon": {
    "nome": "PG Wimbledon",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/W2qBP2r.jpeg",
    "link": "marcas/pagani/pg_wimbledon.html",
    "marca": "pagani"
    },
    "pg-gmt-gold": {
    "nome": "PG GMT Gold",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/ElbXqJt.jpeg",
    "link": "marcas/pagani/pg_gmt_gold.html",
    "marca": "pagani"
     },
     "ho-oyster-platinum": {
    "nome": "HO Oyster Platinum",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/SUUc3kg.jpeg",
    "link": "marcas/holuns/ho_oyster_platinum.html",
    "marca": "holuns"
    },
    "ho-platinum-black": {
    "nome": "HO Platinum Black",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/fE2V9PL.jpeg",
    "link": "marcas/holuns/ho_platinum_black.html",
    "marca": "holuns"
     },
     "ho-platinum-gold": {
    "nome": "HO Platinum Gold",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/E46EzJc.jpeg",
    "link": "marcas/holuns/ho_platinum_gold.html",
    "marca": "holuns"
     },
     "pg-gmt-blue": {
    "nome": "PG GMT Blue",
    "preco": 0.00,
    "imagem": "https://i.imgur.com/vRKb8Pc.jpeg",
    "link": "marcas/pagani/pg_gmt_blue.html",
    "marca": "pagani"
     }
};

/**
 * Adiciona um produto ao carrinho buscando os dados no BANCO_DE_DADOS
 * @param {string} id - O ID do produto (ex: 'h3-black-silver')
 */
function adicionarAoCarrinhoPeloId(id) {
    const produto = BANCO_DE_DADOS[id];
    
    if (!produto) {
        console.error("Produto não encontrado no banco de dados: " + id);
        alert("Erro ao encontrar o produto. Verifique o console.");
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem('horus_cart')) || [];
    const index = carrinho.findIndex(item => item.nome === produto.nome);

    if (index > -1) {
        carrinho[index].quantidade = (carrinho[index].quantidade || 1) + 1;
    } else {
        carrinho.push({ 
            nome: produto.nome, 
            preco: produto.preco, 
            imagem: produto.imagem, 
            quantidade: 1 
        });
    }

    localStorage.setItem('horus_cart', JSON.stringify(carrinho));
    
    // Calcula o caminho correto para o carrinho.html
    const caminho = window.location.pathname;
    let prefixo = "";
    
    if (caminho.includes('/marcas/')) {
        prefixo = "../../";
    }

    window.location.href = prefixo + "carrinho.html";
}