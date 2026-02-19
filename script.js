const container = document.getElementById('particles-container');

// Gerador de Partículas (Brilhos metálicos)
for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    
    // Cores metálicas aleatórias (entre prata e cinza claro)
    const shade = 180 + Math.random() * 75;
    p.style.background = `rgba(${shade}, ${shade}, ${shade}, 0.3)`;
    
    p.style.position = 'absolute';
    p.style.top = `${Math.random() * 100}%`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.borderRadius = '50%';
    
    // Animação de flutuar
    p.style.animation = `floatParticle ${5 + Math.random() * 7}s ease-in-out infinite alternate`;
    container.appendChild(p);
}

// Gerador de Engrenagens (Sutis e elegantes)
for (let i = 0; i < 30; i++) {
    const g = document.createElement('div');
    g.classList.add('gear');
    
    const size = 40 + Math.random() * 100;
    g.style.width = `${size}px`;
    g.style.height = `${size}px`;
    
    g.style.position = 'absolute';
    g.style.top = `${Math.random() * 90}%`;
    g.style.left = `${Math.random() * 90}%`;
    
    g.style.border = `1px solid rgba(255, 255, 255, 0.05)`; // Bem discreto
    g.style.borderRadius = '50%';
    
    // Animação de rotação
    const duration = 15 + Math.random() * 25;
    const direction = i % 2 === 0 ? 'normal' : 'reverse';
    g.style.animation = `rotateGear ${duration}s linear infinite ${direction}`;
    
    container.appendChild(g);
}

// Adicionando as animações via CSS dinâmico
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatParticle {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    100% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
}
@keyframes rotateGear {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);