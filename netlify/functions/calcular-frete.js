const https = require('https');

// CEP de origem da loja (Mauá - SP)
const CEP_ORIGEM = '09370000';

function isFreteGratis(cep) {
    const num = parseInt(cep.replace(/\D/g, ''));
    // SP Capital: 01000-000 a 05999-999 e 08000-000 a 08499-999
    const spCapital = (num >= 1000000 && num <= 5999999) || (num >= 8000000 && num <= 8499999);
    // ABC Paulista: 09000-000 a 09999-999
    const abcPaulista = num >= 9000000 && num <= 9999999;
    return spCapital || abcPaulista;
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método não permitido' }) };
    }

    try {
        const { cep, quantidade } = JSON.parse(event.body);
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'CEP inválido' }) };
        }

        // FRETE GRÁTIS para SP Capital e ABC Paulista
        if (isFreteGratis(cepLimpo)) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    opcoes: [{
                        id: 'gratis',
                        nome: 'Entrega Local',
                        preco: 0,
                        prazo: '1 a 2 dias úteis',
                        gratis: true
                    }]
                })
            };
        }

        const token = process.env.MELHOR_ENVIO_TOKEN;
        if (!token) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: 'Token não configurado' }) };
        }

        // Peso padrão por relógio: 300g, dimensões: 8x8x8cm
        const qtd = parseInt(quantidade) || 1;
        const pesoTotal = 0.3 * qtd;

        const payload = JSON.stringify({
            from: { postal_code: CEP_ORIGEM },
            to: { postal_code: cepLimpo },
            package: {
                height: 8,
                width: 8,
                length: 8,
                weight: pesoTotal
            },
            options: {
                receipt: false,
                own_hand: false
            },
            services: '1,2,17,18' // PAC, SEDEX, PAC Contrato, SEDEX Contrato
        });

        const resultado = await new Promise((resolve, reject) => {
            const req = https.request({
                hostname: 'melhorenvio.com.br',
                path: '/api/v2/me/shipment/calculate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': 'HorusPrestige/1.0 (contato@horusprestige.com.br)',
                    'Accept': 'application/json'
                }
            }, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    try { resolve(JSON.parse(body)); }
                    catch (e) { reject(new Error('Resposta inválida da API')); }
                });
            });
            req.on('error', reject);
            req.write(payload);
            req.end();
        });

        // Filtra só opções com preço válido
        const opcoes = resultado
            .filter(op => op.price && !op.error)
            .map(op => ({
                id: op.id,
                nome: op.name,
                preco: parseFloat(op.price),
                prazo: `${op.delivery_time} dia${op.delivery_time > 1 ? 's' : ''} útil${op.delivery_time > 1 ? 'eis' : ''}`,
                gratis: false
            }))
            .sort((a, b) => a.preco - b.preco);

        if (opcoes.length === 0) {
            return { statusCode: 200, headers, body: JSON.stringify({ opcoes: [], erro: 'Nenhuma opção disponível para este CEP' }) };
        }

        return { statusCode: 200, headers, body: JSON.stringify({ opcoes }) };

    } catch (erro) {
        console.error('Erro frete:', erro.message);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erro ao calcular frete' }) };
    }
};