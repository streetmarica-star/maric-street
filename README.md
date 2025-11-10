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

. 

├── index.html # Estrutura principal, CSS de estilização e o código JavaScript (in-page script) completo. 

── README.md # Documentação do projeto. 

└── ocorrencias.js # Script JavaScript para geocodificação e mapeamento (usado em versões separadas).

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Função | 
 | ----- | ----- | ----- | 
| **Front-end** | HTML5, CSS3, JavaScript (ES6+) | Estrutura, Estilização e Lógica de Processamento. | 
| **Mapeamento** | [**Leaflet.js**](https://leafletjs.com/) | Biblioteca principal para renderização do mapa interativo. | 
| **Geocodificação** | [**Nominatim (OpenStreetMap)**](https://nominatim.org/) | Serviço para conversão de endereços em coordenadas geográficas. | 
| **Dados** | [**PapaParse.js**](https://www.papaparse.com/) | Parser de CSV para leitura rápida dos dados da Planilha Google. | 
| **Plataforma** | Google Forms, Google Sheets, GitHub Pages | Coleta de dados, Armazenamento e Hospedagem. | 

## 🎓 Informações Acadêmicas

| Detalhe | Informação | 
 | ----- | ----- | 
| **Instituição** | Instituto Federal Fluminense (IFF), Campus Maricá | 
| **Curso** | Técnico em Informática para Internet | 
| **Disciplina** | Linguagem de Programação de Aplicações Móveis | 

## 🎓 Professor: Djones Braz de Araujo Costa

Professor de Tecnologia da Informação (TI) no Instituto Federal Fluminense (IFF), Campus Avançado Maricá no Programa Formatec +Maricá.

**Formação e Pesquisa:**

* Graduado em Analise e Desenvolvimento de Sistemas (UNESA).

* Pós-graduado em Gestão de Projetos e Negócios em Tecnologia da Informação (IFRJ).

* Mestrando em Computação (UFF).

* Pesquisador no Laboratório de Projetos de Tecnologia da Informação, Negócios e Economia Criativa (LABPROJTNE) do IFRJ.

* Suas áreas de pesquisa e estudo incluem: Educação em T.I, Tecnologia da Informação (T.I), Inteligência Artificial (I.A), Blockchain e Cidades Inteligentes.

* **GitHub:** [@djones-braz](https://github.com/djones-braz)

## 👨‍💻 Equipe (Grupo A – Maricá Street)

* Guilherme Gil de Almeida Dantas

* Caio Costa Ribeiro

* Cauan Santos Rangel

* Cauê Santiago Pinto da Paixão

* Davi Souza Barbosa

* Eduardo Brum Sampaio de Carvalho

* Emilly Ismerio Dias

* Isabelle Ramalho Feitosa

* Isac Gama Sant' Ana

* Ítalo Augusto Dias de Oliveira

## 🔗 Links

* **🗺️ Aplicação (Mapa):** [**https://streetmarica-star.github.io/maric-street/**](https://streetmarica-star.github.io/maric-street/)

* **📝 Formulário de Registro:** [**https://docs.google.com/forms/d/e/1FAIpQLSdSXiy54n82-7ZMxWdNZ_cX2HrLLAcx6_fSdAum562tBG7mzA/viewform**](https://docs.google.com/forms/d/e/1FAIpQLSdSXiy54n82-7ZMxWdNZ_cX2HrLLAcx6_fSdAum562tBG7mzA/viewform)

