document.addEventListener('DOMContentLoaded', function () {

    // Detecta profundidade da pasta para ajustar caminhos
    const depth = window.location.pathname.split('/').filter(s => s !== '').length - 1;
    const base = depth <= 0 ? '' : depth === 1 ? '../' : '../../';

    const pagina = window.location.pathname.split('/').pop();

    const headerHTML = `
    <header>
        <div class="hamburger" id="hamburger" onclick="toggleMenu()">
            <span></span><span></span><span></span>
        </div>
        <a href="${base}carrinho.html" class="cart-mobile">
            Carrinho <span id="cart-count-mobile"></span>
        </a>

        <div class="logo-header-wrap">
            <a href="${base}index.html">
                <img src="https://i.imgur.com/cCq52ps.png" class="logo-header" alt="Horus Logo">
            </a>
        </div>

        <nav class="nav-center">
            <a href="${base}index.html" ${pagina === 'index.html' || pagina === '' ? 'class="active"' : ''}>Início</a>
            <a href="${base}catalogo.html" ${pagina === 'catalogo.html' ? 'class="active"' : ''}>Catálogo</a>
            <a href="${base}parceria.html" ${pagina === 'parceria.html' ? 'class="active"' : ''}>Parceria</a>
            <a href="${base}informacoes.html" ${pagina === 'informacoes.html' ? 'class="active"' : ''}>Informações</a>
            <a href="${base}sobre.html" ${pagina === 'sobre.html' ? 'class="active"' : ''}>Sobre Nós</a>
            <a href="${base}contato.html" ${pagina === 'contato.html' ? 'class="active"' : ''}>Contato</a>
        </nav>

        <div class="nav-right">
            <a href="${base}carrinho.html">Carrinho <span id="cart-count"></span></a>
            <a href="https://www.instagram.com/horus.prestige/" target="_blank" class="social-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://wa.me/5511943032667" target="_blank" class="social-icon">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
        </div>
    </header>

    <div class="mobile-menu" id="mobile-menu">
        <a href="${base}index.html">Início</a>
        <a href="${base}catalogo.html">Catálogo</a>
        <a href="${base}parceria.html">Parceria</a>
        <a href="${base}informacoes.html">Informações</a>
        <a href="${base}sobre.html">Sobre Nós</a>
        <a href="${base}contato.html">Contato</a>
        <div class="social-row">
            <a href="https://www.instagram.com/horus.prestige/" target="_blank" class="social-icon">
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://wa.me/5511943032667" target="_blank" class="social-icon">
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#fff"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    window.toggleMenu = function () {
        document.getElementById('mobile-menu').classList.toggle('open');
        document.getElementById('hamburger').classList.toggle('open');
    };
});