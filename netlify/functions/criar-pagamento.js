const { MercadoPagoConfig, Preference } = require('mercadopago');

const SITE_URL = "https://horusprestige.netlify.app";

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Método Não Permitido." }) 
        };
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "MERCADOPAGO_ACCESS_TOKEN não configurada." }) 
        };
    }

    try {
        const requestData = JSON.parse(event.body);
        const { items, payer, payment_method } = requestData;

        const nomeCompleto = payer?.name || 'Cliente';
        const partesDoNome = nomeCompleto.trim().split(' ');
        const firstName = partesDoNome[0];
        const lastName = partesDoNome.length > 1 ? partesDoNome.slice(1).join(' ') : ' ';

        const client = new MercadoPagoConfig({ accessToken });
        const preference = new Preference(client);

        const itemsMP = items.map(item => ({
            title: item.title,
            unit_price: parseFloat(item.unit_price),
            quantity: parseInt(item.quantity),
            currency_id: 'BRL',
            picture_url: item.picture_url
        }));

        const digitsOnly = (payer?.phone?.number || '').replace(/\D/g, '');
        const areaCode = payer?.phone?.area_code || digitsOnly.substring(0, 2);
        const phoneNumber = payer?.phone?.number || digitsOnly.substring(2);

        let payment_methods = {};

        if (payment_method === 'pix') {
            payment_methods = {
                excluded_payment_types: [
                    { id: 'credit_card' },
                    { id: 'debit_card' },
                    { id: 'ticket' }
                ]
            };
        } else if (payment_method === 'cartao') {
            payment_methods = {
                excluded_payment_types: [
                    { id: 'bank_transfer' },
                    { id: 'ticket' }
                ],
                installments: 3
            };
        } else {
            payment_methods = {
                excluded_payment_types: [
                    { id: 'ticket' }
                ]
            };
        }

        const body = {
            items: itemsMP,
            payer: {
                name: firstName,
                surname: lastName,
                email: payer?.email || '',
                phone: {
                    area_code: areaCode,
                    number: phoneNumber
                }
            },
            payment_methods,
            back_urls: {
                success: `${SITE_URL}/sucesso.html`,
                failure: `${SITE_URL}/falha.html`,
                pending: `${SITE_URL}/pendente.html`
            },
            auto_return: 'approved',
            statement_descriptor: 'HORUS PRESTIGE',
            external_reference: `HP-${Math.random().toString(36).toUpperCase().substring(2, 9)}`,
            notification_url: `${SITE_URL}/.netlify/functions/webhook`
        };

        const createdPreference = await preference.create({ body });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: createdPreference.id,
                init_point: createdPreference.init_point,
                sandbox_init_point: createdPreference.sandbox_init_point
            })
        };

    } catch (error) {
        console.error("Erro:", error.message);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Erro ao processar pagamento.' })
        };
    }
};