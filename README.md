# Portfolio Pessoal - Elton Peixoto

Site pessoal moderno construído com **React + Tailwind CSS + Vite**, focado em **DevOps, SRE e Platform Engineering**.

🌐 **Demo:** [https://elton-peixoto-lu.github.io/portifolio/](https://elton-peixoto-lu.github.io/portifolio/)

## ✨ Funcionalidades

- **🎨 Design moderno e responsivo** - Interface limpa inspirada em gabrielmotta.dev
- **📝 Blog com Markdown** - Posts renderizados automaticamente a partir de arquivos `.md`
- **🌙 Dark Mode** - Alternância entre temas claro e escuro
- **📱 Mobile-first** - Totalmente responsivo para todos os dispositivos
- **⚡ Performance otimizada** - Build otimizado com Vite
- **🔍 SEO otimizado** - Meta tags e Open Graph configurados
- **🚀 Deploy automático** - GitHub Actions para GitHub Pages

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização e responsividade
- **Vite** - Build tool e dev server
- **React Router** - Navegação SPA
- **React Markdown** - Renderização de posts
- **Gray Matter** - Parse de frontmatter YAML
- **Date-fns** - Manipulação de datas
- **Highlight.js** - Syntax highlighting para código

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/elton-peixoto-lu/portifolio.git
   cd portifolio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:5173
   ```

## 📁 Estrutura do projeto

```
portifolio/
├── content/posts/          # Posts do blog em Markdown
│   ├── observabilidade-prometheus.md
│   ├── platform-engineering-kubernetes.md
│   └── terraform-em-escala.md
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── Layout.jsx
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── SEO.jsx
│   │   └── MarkdownRenderer.jsx
│   ├── pages/             # Páginas principais
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── utils/             # Utilitários
│   │   └── blog.js        # Funções para processar posts
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globais
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # Deploy automático
├── public/                # Assets estáticos
├── index.html            # HTML principal
├── vite.config.js        # Configuração do Vite
└── tailwind.config.js    # Configuração do Tailwind
```

## ✍️ Criando posts no blog

1. **Crie um arquivo `.md` em `content/posts/`**
   ```markdown
   ---
   title: "Título do seu post"
   description: "Descrição curta para SEO e listagem"
   date: "2024-01-15"
   tags: ["DevOps", "SRE", "Kubernetes"]
   author: "Seu Nome"
   published: true
   image: null  # Opcional: URL da imagem de capa
   ---

   # Título do Post

   Conteúdo do seu post em Markdown...
   ```

2. **O post aparecerá automaticamente** no blog e será acessível via URL `/blog/nome-do-arquivo`

## 🎨 Personalização

### Configurações pessoais

Edite as seguintes constantes no arquivo `src/pages/Home.jsx`:

```javascript
const name = "Seu Nome";
const role = "Sua Área • Especialidade • Expertise";
const tagline = "Sua tagline ou descrição curta";

const links = {
  github: "https://github.com/seu-usuario",
  linkedin: "https://linkedin.com/in/seu-perfil",
  company: "https://sua-empresa.com",
  email: "mailto:seu-email@exemplo.com",
};
```

### Cores e tema

As cores principais estão definidas no `tailwind.config.js`. Para personalizar:

```javascript
theme: {
  extend: {
    colors: {
      // Adicione suas cores personalizadas
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### SEO e Meta Tags

Configure as meta tags no arquivo `index.html` e no componente `SEO.jsx`.

## 🚀 Deploy

### GitHub Pages (automático)

1. **Configure o repositório**
   - Vá em Settings > Pages
   - Source: GitHub Actions

2. **O deploy acontece automaticamente** quando você faz push para a branch `main`

3. **Seu site estará disponível em:**
   ```
   https://seu-usuario.github.io/nome-do-repositorio/
   ```

### Deploy manual

```bash
# Build de produção
npm run build

# O conteúdo estará em ./dist
# Faça upload para seu provedor de hospedagem
```

### Outros provedores

- **Vercel:** Conecte seu repositório e o deploy será automático
- **Netlify:** Arraste a pasta `dist` ou conecte via Git
- **Firebase Hosting:** Use `firebase deploy` após build

## 📝 Scripts disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Lint do código
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙋‍♂️ Contato

**Elton Peixoto**
- LinkedIn: [linkedin.com/in/elton-peixoto-914452296](https://www.linkedin.com/in/elton-peixoto-914452296/)
- GitHub: [github.com/elton-peixoto-lu](https://github.com/elton-peixoto-lu)
- Email: pluizelton@gmail.com

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
