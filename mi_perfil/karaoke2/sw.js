const CACHE_NAME = 'karaoke-green-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './cocteles.html',
    './promos.html',
    './styles.css',
    './script.js',
    './canciones.json',
    './manifest.json',
    './verdek.webp'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => cachedResponse || fetch(e.request))
    );
});

// ==========================================
// 2. SISTEMA DE CARRITO Y PEDIDOS A WHATSAPP
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    let carrito = [];

    const carritoItemsList = document.getElementById('carritoItemsList');
    const carritoTotal = document.getElementById('carritoTotal');
    const enviarWhatsAppBtn = document.getElementById('enviarWhatsAppBtn');

    function renderCarrito() {
        if (!carritoItemsList) return;

        if (carrito.length === 0) {
            carritoItemsList.innerHTML = '';
            const pVacio = document.createElement('p');
            pVacio.style.cssText = 'color: var(--text-muted); text-align: center; margin: 15px 0;';
            pVacio.textContent = 'Tu carrito está vacío';
            carritoItemsList.appendChild(pVacio);
            if (carritoTotal) carritoTotal.textContent = 'Bs. 0.00';
            return;
        }

        carritoItemsList.innerHTML = '';
        let total = 0;

        carrito.forEach((prod, index) => {
            let subtotal = prod.precio * prod.cantidad;
            total += subtotal;

            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(30, 17, 26, 0.6); padding: 6px 8px; border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(139, 83, 110, 0.3);';
            
            // Sanitización estricta anti-XSS usando textContent
            const infoSpan = document.createElement('span');
            infoSpan.style.cssText = 'font-size: 0.75rem; color: var(--text-light);';
            infoSpan.textContent = `${prod.nombre} (x${prod.cantidad}) - Bs. ${subtotal.toFixed(2)}`;

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = '🗑️';
            removeBtn.style.cssText = 'background: transparent; border: none; color: #ff5c5c; cursor: pointer; font-size: 0.9rem; min-width: 44px; min-height: 44px;';
            removeBtn.addEventListener('click', () => {
                carrito.splice(index, 1);
                renderCarrito();
            });

            row.appendChild(infoSpan);
            row.appendChild(removeBtn);
            carritoItemsList.appendChild(row);
        });

        if (carritoTotal) {
            carritoTotal.textContent = `Bs. ${total.toFixed(2)}`;
        }
    }

    // Delegación de eventos global para agregar al carrito
    document.addEventListener('click', function (e) {
        const promoBtn = e.target.closest('.promo-add-btn');
        if (promoBtn) {
            const nombre = promoBtn.getAttribute('data-item');
            const precio = parseFloat(promoBtn.getAttribute('data-price')) || 0;

            const existente = carrito.find(p => p.nombre === nombre);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }
            renderCarrito();
            
            // Feedback visual rápido
            const textoOriginal = promoBtn.textContent;
            promoBtn.textContent = '¡Agregado! ✓';
            setTimeout(() => { promoBtn.textContent = textoOriginal; }, 1000);
        }
    });

    // Envío del pedido estructurado hacia WhatsApp de forma segura
    if (enviarWhatsAppBtn) {
        enviarWhatsAppBtn.addEventListener('click', function () {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega algún elemento antes de enviar.');
                return;
            }

            let mensaje = '¡Hola, Luciana! 👋 Quiero realizar el siguiente pedido / selección:\n\n';
            let total = 0;

            carrito.forEach(prod => {
                let subtotal = prod.precio * prod.cantidad;
                total += subtotal;
                mensaje += `▪️ ${prod.nombre} x${prod.cantidad} - Bs. ${subtotal.toFixed(2)}\n`;
            });

            mensaje += `\n💰 *Total general: Bs. ${total.toFixed(2)}*\n\n¡Quedo atento/a a la confirmación! ✨`;

            const telefono = '59175273771'; // Número configurado
            const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});