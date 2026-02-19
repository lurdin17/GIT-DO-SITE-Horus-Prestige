const container = document.getElementById('particles-container');

// 1. GERADOR DE PARTÍCULAS
if (container) {
    for (let i = 0; i < 70; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        const shade = 180 + Math.random() * 75;
        p.style.background = `rgba(${shade}, ${shade}, ${shade}, 0.3)`;
        p.style.position = 'absolute';
        p.style.top = `${Math.random() * 100}%`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.borderRadius = '50%';
        p.style.animation = `floatParticle ${5 + Math.random() * 7}s ease-in-out infinite alternate`;
        container.appendChild(p);
    }
}

// 2. CORREÇÃO DO CONTADOR (Para Catálogo e todas as páginas)
window.atualizarContadorCarrinho = function() {
    const carrinho = JSON.parse(localStorage.getItem('horus_cart')) || [];
    const totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.innerText = totalItens;
        contador.style.display = totalItens > 0 ? 'flex' : 'none';
    }
};

// Executa automaticamente ao carregar qualquer página
window.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);

// 3. FUNÇÃO DE NOTIFICAÇÃO (TOAST) PRETA
window.mostrarAvisoLuxo = function(mensagem) {
    const avisoAntigo = document.querySelector('.toast-luxo');
    if (avisoAntigo) avisoAntigo.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-luxo';
    toast.innerText = mensagem;
    document.body.appendChild(toast);
    
    // Força a atualização do número no carrinho na hora
    window.atualizarContadorCarrinho();
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
};

// 4. DESATIVAR ALERTAS CHATOS DO NAVEGADOR
window.alert = function(msg) {
    window.mostrarAvisoLuxo(msg);
};

// 5. CSS DINÂMICO: BOTÃO PRETO + NOTIFICAÇÃO PRETA
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatParticle {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    100% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
}

/* NOTIFICAÇÃO LUXO PRETA */
.toast-luxo {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #000000; /* FUNDO TOTALMENTE PRETO */
    color: #ffffff;      /* TEXTO BRANCO */
    padding: 15px 35px;
    border-radius: 50px;
    font-weight: bold;
    font-family: 'Playfair Display', serif;
    z-index: 10000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    transition: opacity 0.5s ease;
    animation: surgindo 0.5s ease-out;
    border: 1px solid #d4af37; /* Mantém apenas a borda dourada fina */
}

/* BOTÃO VER CATÁLOGO PRETO (CORRIGINDO A IMAGEM) */
.btn-empty {
    display: inline-block !important;
    margin-top: 20px !important;
    padding: 12px 30px !important;
    background: #000000 !important; /* MUDADO PARA PRETO */
    color: #ffffff !important;      /* TEXTO BRANCO */
    text-decoration: none !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    border: 1px solid #d4af37 !important;
    transition: 0.3s !important;
    text-transform: uppercase;
}

.btn-empty:hover {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: #ffffff !important;
}

@keyframes surgindo {
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
}`;
document.head.appendChild(styleSheet);