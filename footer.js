document.addEventListener('DOMContentLoaded', function () {

    // ── CSS do footer ──────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        footer {
            position: relative;
            z-index: 1;
            width: 100%;
            background: linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('https://i.imgur.com/9swFJOL.png') center/cover no-repeat;
            box-shadow: 0 -4px 25px rgba(0,0,0,0.9);
            backdrop-filter: blur(8px);
            border-top: 1px solid rgba(255,255,255,0.08);
            font-family: 'Albert Sans', sans-serif;
        }

        .footer-main {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 28px 40px;
            gap: 20px;
        }

        .footer-logo img {
            width: 90px;
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.25));
            display: block;
        }

        .footer-center {
            text-align: center;
            flex: 1;
        }

        .footer-copy {
            color: #aaa;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.3px;
        }

        .footer-links {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 8px;
        }

        .footer-links a {
            color: #666;
            font-size: 11px;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 500;
            transition: color 0.3s;
        }

        .footer-links a:hover { color: #fff; }

        .footer-socials {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .footer-social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            text-decoration: none;
            transition: 0.3s;
        }

        .footer-social-btn:hover {
            background: #fff;
            transform: translateY(-2px);
        }

        .footer-social-btn:hover svg { fill: #000; }
        .footer-social-btn svg { width: 18px; height: 18px; fill: #fff; transition: 0.3s; }

        @media (max-width: 768px) {
            .footer-main {
                flex-direction: column;
                align-items: center;
                padding: 24px 20px;
                gap: 18px;
                text-align: center;
            }
            .footer-logo img { width: 75px; }
            .footer-links { flex-wrap: wrap; justify-content: center; gap: 14px; }
        }
    `;
    document.head.appendChild(style);

    // ── HTML do footer ─────────────────────────────────────────────
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-main">

            <div class="footer-logo">
                <a href="index.html">
                    <img src="https://i.imgur.com/cCq52ps.png" alt="Horus Prestige">
                </a>
            </div>

            <div class="footer-center">
                <p class="footer-copy">© 2026 Horus Prestige — Todos os direitos reservados.</p>
                <div class="footer-links">
                    <a href="termos.html">Termos e Condições</a>
                    <a href="privacidade.html">Política de Privacidade</a>
                </div>
            </div>

            <div class="footer-socials">
                <a href="https://www.instagram.com/horus.prestige/" target="_blank" class="footer-social-btn" aria-label="Instagram">
                    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://wa.me/5511943032667" target="_blank" class="footer-social-btn" aria-label="WhatsApp">
                    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                </a>
            </div>

        </div>
    `;

    document.body.appendChild(footer);
});