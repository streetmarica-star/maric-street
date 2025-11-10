document.addEventListener("DOMContentLoaded", function() {
    // URL de publicação direta da sua planilha
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSK2OnClNufKGaIx41JH0C_x7l7OIOI2OivxhiftGLBX91Q74EhvWRK2lpGOvqggSZT-tWR-jkLw1e9/pub?gid=342798418&single=true&output=csv';
    // Adiciona um parâmetro "t" que muda a cada carregamento para evitar cache
    const urlComCacheBuster = `${sheetUrl}&t=${new Date().getTime()}`;

    // Pega a referência da caixa de mensagem
    const messageBox = document.getElementById('message-box');

    /**
     * Função para mostrar mensagens ao usuário (substitui o alert)
     * @param {string} message - A mensagem para mostrar
     * @param {string} type - 'loading', 'error', ou 'success'
     */
    function showMessage(message, type = 'loading') {
        if (!messageBox) {
            console.error("Elemento #message-box não encontrado. A mensagem era:", message);
            return;
        }
        messageBox.textContent = message;
        messageBox.className = `message-${type}`; // Remove classes antigas e adiciona a nova
        messageBox.style.display = 'block'; // Mostra a caixa
    }

    /**
     * Função de "sleep" para criar um atraso (delay)
     * @param {number} ms - Milissegundos para esperar
     */
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Verifica se o container do mapa existe
    if (!document.getElementById('map')) {
        console.error("Elemento #map não encontrado. O mapa não pode ser inicializado.");
        showMessage("Erro: O container do mapa não foi encontrado na página.", "error");
        return; 
    }

    // Centraliza o mapa em Maricá
    const map = L.map('map').setView([-22.9189, -42.8189], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /**
     * Função para converter endereço em coordenadas (Geocodificação)
     */
    async function geocodeAddress(address) {
        try {
            // Adicionamos ", Maricá, RJ" para tornar a busca mais precisa
            const fullAddress = `${address}, Maricá, RJ`;
            const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
            
            // IMPORTANTE: Nominatim exige um User-Agent.
            const response = await fetch(geoUrl, {
                headers: {
                    'User-Agent': 'SeuAppDeMapa/1.0 (seuemail@exemplo.com)' // Mude para seu email
                }
            });

            const geoData = await response.json();

            if (geoData && geoData.length > 0) {
                // Retorna as coordenadas do primeiro resultado encontrado
                return { lat: parseFloat(geoData[0].lat), lon: parseFloat(geoData[0].lon) };
            }
        } catch (error) {
            console.error(`Erro ao geocodificar o endereço '${address}':`, error);
        }
        console.warn(`Endereço não encontrado no Nominatim: '${address}'`);
        return null; // Retorna nulo se não encontrar o endereço ou se der erro
    }

    showMessage("Carregando dados da planilha...", 'loading');

    // Usa PapaParse para carregar e processar o CSV
    Papa.parse(urlComCacheBuster, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: async function(results) {
            const data = results.data;
            
            // Linha de debug: Verifique no console (F12) se o nome da coluna está correto
            console.log("Primeira linha de dados (verifique o nome da coluna):", data[0]);

            if (!data || data.length === 0) {
                showMessage("A planilha foi carregada, mas está vazia ou no formato incorreto.", 'error');
                return;
            }
            
            let locationsFound = 0;
            let totalItems = data.length;
            
            showMessage(`Planilha carregada. Processando ${totalItems} endereços... (Isso pode levar alguns minutos)`, 'loading');

            // Processa cada linha da planilha uma por uma
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                // ATENÇÃO: Verifique se o nome da coluna "Logradouro da Ocorrência" está EXATO
                const address = item["Logradouro da Ocorrência"];

                if (address && address.trim() !== "") {
                    
                    // Mostra progresso
                    showMessage(`Processando ${i + 1} de ${totalItems}: "${address}"`, 'loading');

                    const coords = await geocodeAddress(address);

                    if (coords) {
                        locationsFound++;
                        const marker = L.marker([coords.lat, coords.lon]).addTo(map);
                        
                        let popupContent = '';
                        for (const key in item) {
                            popupContent += `<b>${key}:</b> ${item[key]}<br>`;
                        }
                        // Adiciona as coordenadas encontradas ao popup para conferência
                        popupContent += `<b>Coordenadas Encontradas:</b> ${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)}`;
                        
                        marker.bindPopup(popupContent);
                    }

                    // *** A CORREÇÃO MAIS IMPORTANTE ***
                    // Espera 1.1 segundos antes de fazer a próxima requisição
                    // Para respeitar o limite de 1 req/seg do Nominatim
                    await sleep(1100); 

                } else {
                     console.warn(`Linha ${i+1} pulada (sem endereço):`, item);
                }
            }

            // Mensagem final
            if (locationsFound === 0) {
                showMessage("Planilha carregada, mas nenhum dos endereços pôde ser convertido em coordenadas. Verifique o console (F12) para erros.", 'error');
            } else {
                showMessage(`Processamento concluído! ${locationsFound} de ${totalItems} endereços foram encontrados e mapeados.`, 'success');
            }
        },
        error: function(error) {
            console.error('Erro ao processar o CSV:', error);
            showMessage(`Erro ao carregar os dados da planilha. Detalhe: ${error.message}`, 'error');
        }
    });
});
