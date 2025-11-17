document.addEventListener("DOMContentLoaded", function() {
    // URL de publicação direta da sua planilha
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSK2OnClNufKGaIx41JH0C_x7l7OIOI2OivxhiftGLBX91Q74EhvWRK2lpGOvqggSZT-tWR-jkLw1e9/pub?gid=342798418&single=true&output=csv';
    const urlComCacheBuster = `${sheetUrl}&t=${new Date().getTime()}`;

    // Centraliza o mapa na sua cidade
    const map = L.map('map').setView([-22.9189, -42.8189], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Função para converter endereço em coordenadas (Geocodificação)
    async function geocodeAddress(address) {
        try {
            // Adicionamos ", Maricá, RJ" para tornar a busca mais precisa
            const fullAddress = `${address}, Maricá, RJ`;
            const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
            
            const response = await fetch(geoUrl);
            const geoData = await response.json();

            if (geoData && geoData.length > 0) {
                // Retorna as coordenadas do primeiro resultado encontrado
                return { lat: parseFloat(geoData[0].lat), lon: parseFloat(geoData[0].lon) };
            }
        } catch (error) {
            console.error(`Erro ao geocodificar o endereço '${address}':`, error);
        }
        return null; // Retorna nulo se não encontrar o endereço ou se der erro
    }

    // --- MODIFICAÇÃO 1: Adicionando a função 'sleep' ---
    // Esta função cria uma promessa que resolve após um tempo (ms)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    Papa.parse(urlComCacheBuster, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: async function(results) { // A função DEVE ser 'async' para o 'await' funcionar
            const data = results.data;
            let locationsFound = 0;
            let count = 0;

            console.log(`Iniciando geocodificação de ${data.length} endereços...`);

            // Processa cada linha da planilha uma por uma
            for (const item of data) {
                count++;
                const address = item["Logradouro da ocorrência"];

                if (address) {
                    
                    // --- MODIFICAÇÃO 2: A Pausa ---
                    // Espera 1 segundo (1000ms) ANTES de fazer a chamada
                    // Isso respeita a política de uso do Nominatim (1 req/seg)
                    console.log(`Processando item ${count}/${data.length}: "${address}". Aguardando 1 segundo...`);
                    await sleep(1000); 
                    
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
                        console.log(`...Endereço encontrado e marcador adicionado.`);
                    } else {
                        console.warn(`...Endereço NÃO encontrado para: "${address}"`);
                    }
                }
            }

            console.log(`Geocodificação concluída. ${locationsFound} marcadores adicionados.`);
            if (locationsFound === 0 && data.length > 0) {
                alert("Planilha carregada, mas nenhum endereço pôde ser convertido em coordenadas.");
            }
        },
        error: function(error) {
            console.error('Erro ao processar o CSV:', error);
            alert(`Erro ao carregar os dados da planilha. Detalhe: ${error.message}`);
        }
    });

});
