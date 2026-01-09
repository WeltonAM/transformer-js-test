<div align="center"> 
    <h1>🚀 Transformer JS Test</h1>
    <p>React · TypeScript · Vite · TailwindCSS · Hugging Face Transformers</p>
    <a href="https://react.dev/" target="_blank"> 
        <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" /> 
    </a> 
    <a href="https://vitejs.dev/" target="_blank"> 
        <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> 
    </a> 
    <a href="https://www.typescriptlang.org/" target="_blank"> 
        <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> 
    </a>
    <a href="https://tailwindcss.com/" target="_blank"> 
        <img src="https://img.shields.io/badge/TailwindCSS-4.1.18-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" /> 
    </a>
    <img src="https://img.shields.io/badge/License-Educational-blue?style=for-the-badge" /> 
</div>

## 🎥 Vídeo no YouTube

[Assista vídeo no YouTube](https://www.youtube.com/watch?v=G8oW3-mtFyA&t=110s)

## 📌 Sobre o Projeto

Este projeto é um teste prático com **Transformer.js**, React, TypeScript e Vite. O objetivo principal é mostrar como é possível usar IA sem integrar APIs externas, utilizando o **Hugging Face**, para criar uma ferramenta que analisa currículos e descrições de vagas, medindo a compatibilidade com ATS (Applicant Tracking System). O processamento dos dados é feito em segundo plano com web workers, garantindo melhor desempenho.

O desafio consistia em implementar uma funcionalidade usando algum modelo da library Hugging Face.

### Refatorações e Melhorias

- Refatorei o projeto separando **responsabilidades**, criando **hooks personalizados** e **contextos individuais para cada worker**.
- Implementei **navegação com `react-router-dom`** para acessar a página do ATS Analyzer.
- Criei o **ATS Analyzer**, que processa currículo e descrição de vaga e calcula compatibilidade via worker.
- Realizei ajustes de UI/UX **mobile-first**.
- Instalei e configurei bibliotecas adicionais:
  - **pdfjs-dist** → conversão de PDF para texto
  - **react-toastify** → notificações
  - **lucide-react** → ícones
  - **canvas-confetti** → confetidos

## 🧱 Estrutura do Projeto

```text
src/
│
├─ types/
│ ├─ ats.types.ts
│ ├─ pdfjs-dist.d.ts
│ └─ translator.types.ts
│
├─ data/
│ ├─ contexts/
│ │  ├─ ats-analyzer-context.tsx
│ │  └─ translator-context.tsx
│ └─ hooks/
│    ├─ use-animated-percentage.ts
│    ├─ use-ats-status.ts
│    ├─ use-confetti.ts
│    ├─ use-analyzer.ts
│    ├─ use-toastify.ts
│    └─ use-translator.ts
│
├─ pages/
│ ├─ translator/
│ │  └─ translator-page.tsx
│ └─ ats-analyzer/
│    └─ ats-page.tsx
│
├─ components/
│ ├─ template/
│ │  └─ page.tsx
│ ├─ shared/
│ │  ├─ header/
│ │  │ ├─ header-nav.tsx
│ │  │ ├─ mobile-drawer.tsx
│ │  │ └─ header.tsx
│ │  ├─ message.tsx
│ │  ├─ Progress.tsx
│ │  └─ footer.tsx
│ ├─ translator/
│ │  └─ LanguageSelector.tsx
│ └─ ats-analyzer/
│    ├─ ats-result.tsx
│    ├─ job-description-area.tsx
│    └─ pdf-uploader.tsx
│
├─ router/
│ └─ main-router.tsx
│
├─ utils/
│ └─ extract-text-from-pdf.ts
│
├─ workers/
│ ├─ ats-worker.js
│ └─ translator-worker.js
│
├─ App.tsx
├─ App.css
├─ index.css
└─ main.tsx
```

## 🛠️ Tech Stack

| Categoria              | Ferramentas/Conceitos         |
| :--------------------- | :---------------------------- |
| **Frontend**           | React 19 · TypeScript · Vite  |
| **Routing**            | React Router DOM 7            |
| **Styling**            | TailwindCSS                   |
| **Workers**            | Web Workers                   |
| **PDF Processing**     | pdfjs-dist                    |
| **UI & Icons**         | React-Toastify · Lucide Icons |
| **UI/UX & Animations** | canvas-confetti               |
| **ML/AI**              | @huggingface/transformers     |

## ⚙️ Como Rodar

### Instalação

```bash
git clone "https://github.com/seu-usuario/transformer-js-test.git"
cd transformer-js-test
npm install
```

### Rodar em Desenvolvimento

```bash
npm run dev
```

> App disponível em: `http://localhost:5173` (padrão Vite)

### Build de Produção

```bash
npm run build
npm run preview
```

## 📚 Bibliotecas e Dependências Principais

- **@huggingface/transformers** → modelos de NLP
- **pdfjs-dist** → conversão de PDF para texto
- **react-toastify** → notificações toast
- **lucide-react** → ícones
- **react-router-dom** → navegação e rotas
- **tailwindcss** → estilização rápida

## 👨‍💻 Autor

Desenvolvido por [**Micael Mota**](https://github.com/micaelomota).
Powered by [**Welton Matos**](https://github.com/WeltonAM).

## 🪪 Licença

Uso educacional e portfólio apenas.  
Sinta-se à vontade para estudar e adaptar o código.
