# 🎧 SAC CBLOW · SAV (Serviço de Atendimento ao Viewer)

Página de humor / gag inspirada nas transmissões do **Yoda**:
> *"Se tiver alguma reclamação, vai lá no último vídeo do Bronziocre deixando um comentário!"*

🔗 **Site no ar:** https://weslleydanielwd.github.io/sac-cblow/

---

## 🔗 Links úteis

- [📺 Canal do Bronziocre](https://www.youtube.com/@bronziocre/videos)
- [🎮 Canal do Yoda](https://www.youtube.com/@YodaSL/videos)
- [🌐 Site CBLOW](https://cblow.xyz/)
- [💜 Ajude o YoGamesDoBem](https://pixgg.com/yogamersdobem)

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

## 🌐 Hospedagem

O site já está publicado de graça via **GitHub Pages**, direto do branch `main` deste repositório (que precisa ser público, pois o Pages gratuito não funciona em repositório privado).

Para atualizar o site: basta dar `git push` para a branch `main` — o GitHub Pages rebuilda automaticamente em 1-2 minutos.
