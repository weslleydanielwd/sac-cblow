# 🎧 SAC CBLOW · SAV (Serviço de Atendimento ao Viewer)

Página de humor / gag inspirada nas transmissões do **Yoda**:
> *"Se tiver alguma reclamação, vai lá no último vídeo do Bronziocre deixando um comentário!"*

---

## ⚡ O que tem no projeto:

- **KPI Cards ao Vivo:**
  - **Reclamações Registradas:** Contador dinâmico que incrementa aos poucos em tempo real.
  - **Respondidas pelo Bronziocre:** Mapeamento de todas as reclamações despachadas pro canal do YouTube.
  - **Horário de resposta:** *"Amanhã 12h"* (Sem falta).
- **Formulário de Ouvidoria:**
  - Campo **Nick na KICK** (placeholder `RAMMUS#TAUNT`).
  - **Título da reclamação**.
  - **Eu to tiltado?** (Slider com variações: *Anota ai geo*, *Bronziocre Omisso*, *Spamando CPI [emote:37230:POLICE] (Sirene de policia) no chat 🚨*).
  - Termo de concordância que *"o Yoda tem sempre razão"*.
- **Desafio Cognitivo Anti-Choradeira:**
  - Perguntas impossíveis da lore do CBlow (*"Quantos dragões o vô corvo ja fez?"*, *"Serphiroth você é melhor do que eu?"*, *"Quantas vezes o revolta falou para PastorDeCalcinha resetar?"*).
  - Todas as respostas são dadas como inválidas pela triagem!
- **Áudio Original do Yoda:**
  - Ao errar o teste, toca o som original do **Yoda Fon** (`yoda_fon.mp3`).
- **Cooldown Disciplinar de 24 Horas:**
  - Bloqueio com cronômetro regressivo persistido no `localStorage`.
- **A Rota de Fuga do Bronziocre:**
  - Botão vermelho direto para o canal de vídeos do **Bronziocre** no YouTube.
  - Botão de um clique para copiar o desabafo com protocolo `Ticket: ...` e hashtags oficiais para colar nos comentários do YouTube.
- **Mural "Últimas solicitações":**
  - Exibe solicitações recentes do chat (Peuvinii, BrilhaLux, Kiko_tesouro, Luxana de Lux, Lux_sup_faz_AP) e as respostas do SAV.

---

## 🚀 Como testar localmente

Basta dar dois cliques no arquivo [`index.html`](index.html) diretamente no seu navegador, ou rodar:

```bash
node server.js
```
Acesse `http://localhost:3000`.

---

## 🌐 Como colocar ONLINE DE GRAÇA no GitHub (Passo a Passo)

### ⚠️ O repositório PODE ser privado ou TEM que ser público?
> **TEM que ser PÚBLICO (Public)!**
> No plano gratuito do GitHub, a ferramenta de hospedagem (**GitHub Pages**) só funciona em repositórios **Públicos**. Se você criar como Privado, o GitHub vai pedir assinatura paga do GitHub Pro para liberar o site. Como o nosso código não tem senhas nem dados sensíveis (é apenas a brincadeira do SAC), deixá-lo **Público** é 100% seguro e totalmente gratuito para sempre.

---

### 📝 Passo a Passo Completo (Direto pelo Navegador, Sem Terminal):

#### 1. Criar o Repositório no GitHub
1. Acesse sua conta no [GitHub.com](https://github.com/).
2. No canto superior direito, clique no botão **`+`** e selecione **"New repository"**.
3. Preencha os campos:
   - **Repository name:** `sac-cblow` (ou o nome que preferir).
   - **Visibility:** Selecione obrigatoriamente **`Public`**.
   - **NÃO** marque a caixinha "Add a README file" (pois já temos um).
4. Clique no botão verde **"Create repository"**.

#### 2. Subir os Arquivos pelo Navegador
1. Na tela seguinte que abrir, clique no link azul escrito:
   👉 **`uploading an existing file`** (enviar um arquivo existente).
2. Abra a pasta do projeto no seu computador (`d:\projects\rodizio_cblow`).
3. Selecione e arraste os arquivos e pastas para dentro da janela do navegador:
   - `index.html`
   - `sac.html`
   - `server.js`
   - `package.json`
   - `README.md`
   - Pasta `assets` (contendo o `yoda_fon.mp3`)
   - Pasta `css` (contendo `sac.css` e `style.css`)
   - Pasta `js` (contendo `sac.js`)
4. Role até o fim da página no GitHub e clique no botão verde **"Commit changes"**.

#### 3. Ativar o Site no GitHub Pages
1. No menu superior do seu repositório no GitHub, clique na aba **Settings** (Configurações ⚙️).
2. No menu lateral esquerdo, clique em **Pages** (dentro da seção "Code and automation").
3. Na seção **"Build and deployment"**:
   - Em **Source**, deixe marcado **`Deploy from a branch`**.
   - Em **Branch**, mude de `None` para **`main`**.
   - Na caixinha ao lado, deixe como **`/ (root)`**.
   - Clique em **Save**.

#### 4. Pegar o Link do Site
1. Aguarde cerca de 1 a 2 minutos e recarregue a página de **Settings > Pages**.
2. Aparecerá uma caixa verde no topo com a mensagem:
   🎉 **"Your site is live at https://SEU_USUARIO.github.io/sac-cblow/"**
3. Basta copiar esse link e mandar para a galera da live!
   - No menu lateral esquerdo, clique em **Pages**.
   - Em **Build and deployment > Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
5. **Pronto!** Em cerca de 1 a 2 minutos, o GitHub vai gerar o link do seu site:
   `https://SEU_USUARIO.github.io/sac-cblow/`

---

### Método 2: Vercel ou Netlify (Arrastar e Soltar em 10 segundos)

Se você quiser colocar no ar sem nem usar o terminal:
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop) ou [Vercel](https://vercel.com).
2. Arraste a pasta `rodizio_cblow` inteira para dentro da tela.
3. Ele vai publicar instantaneamente e te dar um link gratuito `.netlify.app` ou `.vercel.app` com certificado HTTPS incluso.
