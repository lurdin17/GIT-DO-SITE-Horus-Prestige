const container = document.getElementById('particles-container');

// 1. GERADOR DE PARTÍCULAS (Mantido)
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

// 2. GERADOR DE ENGRENAGENS (Mantido)
for (let i = 0; i < 30; i++) {
    const g = document.createElement('div');
    g.classList.add('gear');
    const size = 40 + Math.random() * 100;
    g.style.width = `${size}px`;
    g.style.height = `${size}px`;
    g.style.position = 'absolute';
    g.style.top = `${Math.random() * 90}%`;
    g.style.left = `${Math.random() * 90}%`;
    g.style.border = `1px solid rgba(255, 255, 255, 0.05)`;
    g.style.borderRadius = '50%';
    const duration = 15 + Math.random() * 25;
    const direction = i % 2 === 0 ? 'normal' : 'reverse';
    g.style.animation = `rotateGear ${duration}s linear infinite ${direction}`;
    container.appendChild(g);
}

// 3. FUNÇÃO PARA SUBSTITUIR O "AVISO DO GOOGLE" (O TOAST)
// Essa função vai criar o aviso bonito na tela
window.mostrarAvisoLuxo = function(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast-luxo';
    toast.innerText = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
};

// 4. TRUQUE MESTRE: Desativar o alert do navegador
// Isso impede que qualquer 'alert' apareça e troca pelo nosso aviso
window.alert = function(msg) {
    window.mostrarAvisoLuxo(msg);
};

// 5. CSS DINÂMICO (Partículas + O NOVO AVISO)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatParticle {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    100% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
}
@keyframes rotateGear {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
/* ESTILO DO AVISO NO SITE */
.toast-luxo {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    padding: 15px 35px;
    border-radius: 50px;
    font-weight: bold;
    font-family: 'Playfair Display', serif;
    z-index: 10000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    transition: opacity 0.5s ease;
    animation: surgindo 0.5s ease-out;
    border: 1px solid #020202;
}
@keyframes surgindo {
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
}`;
document.head.appendChild(styleSheet);