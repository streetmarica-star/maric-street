# 🚗 Maricá Street

**Maricá Street** é uma ferramenta moderna e eficiente para o mapeamento e registro de acidentes viários na cidade de Maricá, com o objetivo de fornecer dados em tempo real à Defesa Civil. Desenvolvido por alunos do IFF, o projeto visa aprimorar a segurança e organização do trânsito local.

## 🚀 Sobre o Projeto

O aplicativo permite que os usuários reportem rapidamente ocorrências de acidentes através de um formulário. Esses dados são processados, geocodificados e exibidos em um mapa interativo, permitindo uma resposta rápida das autoridades e contribuindo para a segurança.

## 🎯 Objetivo

Oferecer apoio em tempo real aos moradores de Maricá em casos de emergência. As informações de contato e a descrição detalhada da situação são utilizadas exclusivamente para fins de assistência imediata, garantindo agilidade no atendimento e segurança dos envolvidos.

## ⚙️ Como Funciona (Arquitetura)

A arquitetura do projeto é baseada em ferramentas gratuitas e de fácil integração:

1. **Coleta de Dados:** O morador registra a ocorrência através do [**Google Forms**](https://docs.google.com/forms/d/e/1FAIpQLSdSXiy54n82-7ZMxWdNZ_cX2HrLLAcx6_fSdAum562tBG7mzA/viewform).

2. **Armazenamento:** Os dados do formulário são salvos automaticamente em uma **Planilha Google (Google Sheets)**, que atua como banco de dados em tempo real.

3. **Leitura dos Dados:** A aplicação web utiliza a biblioteca **PapaParse.js** para carregar o arquivo CSV da planilha publicada.

4. **Geocodificação:** Um script JavaScript utiliza a API do **Nominatim (OpenStreetMap)** para converter o endereço de cada ocorrência (`Logradouro da Ocorrência`) em coordenadas geográficas.

5. **Exibição no Mapa:** A biblioteca **Leaflet.js** renderiza o mapa e adiciona marcadores para cada ocorrência mapeada.

## 📂 Estrutura de Arquivos

A aplicação é composta por três arquivos principais, organizados na raiz do repositório:
