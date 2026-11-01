/**
 * SAC CBLOW / SAV - Serviço de Atendimento ao Viewer
 * Script Interativo de Triagem, Gag do Bronziocre e Sistema de Cooldown de 24h
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY_COOLDOWN = 'cblow_sav_cooldown_end';
  const STORAGE_KEY_LAST_COMPLAINT = 'cblow_sav_last_complaint';
  const STORAGE_KEY_REGISTERED_COUNT = 'cblow_sav_registered_count';
  const STORAGE_KEY_SOUND = 'cblow_sav_sound_enabled';
  const COOLDOWN_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Horas em milissegundos

  // Sound state
  let isSoundEnabled = localStorage.getItem(STORAGE_KEY_SOUND) !== 'false';

  function playYodaFonAudio() {
    if (!isSoundEnabled) return;
    try {
      const audio = new Audio('assets/yoda_fon.mp3');
      audio.volume = 1.0;
      audio.play().catch(err => {
        console.warn('Não foi possível reproduzir assets/yoda_fon.mp3:', err);
      });
    } catch (e) {
      console.warn('Erro ao carregar o áudio do Yoda:', e);
    }
  }

  // Question Pool for Impossible Challenge
  const CHALLENGES = [
    {
      id: 1,
      category: 'Dragões & Selva do CBLOW',
      question: 'Quantos dragões o vô corvo ja fez?',
      options: [
        'Nenhum, o time não ajudou',
        'Rodil nivelou, colocou vô no mid',
        'O Dragão fez o vô.'
      ],
      failRoast: 'RESPOSTA INVÁLIDA! De acordo com as estatísticas oficiais do CBlow, o vô corvo fez exatamente zero dragões.'
    },
    {
      id: 2,
      category: 'Comunicação & Disciplina Tática',
      question: 'Quantas vezes o revolta falou para PastorDeCalcinha resetar?',
      options: [
        '47 vezes consecutivas em menos de 2 minutos',
        'Perdeu a conta e começou a orar em silêncio na call',
        'Até a voz falhar.'
      ],
      failRoast: 'RESPOSTA INVÁLIDA! O Revolta falou para resetar exatamente 1.482 vezes e o PastorDeCalcinha continuou na lane.'
    }
  ];

  // Specific initial complaints requested by user
  const INITIAL_COMPLAINTS = [
    {
      user: 'Peuvinii',
      text: 'Serphiroth você é melhor do que eu?',
      status: 'SEU ***** da ****',
      time: 'Há 1 min'
    },
    {
      user: 'BrilhaLux',
      text: 'Como posso sugerir uma cartinha para o cblow?',
      status: 'Encaminhado para o Bronziocre responder no próximo vídeo.',
      time: 'Há 3 min'
    },
    {
      user: 'Kiko_tesouro',
      text: 'Yoda Já pensou em fazer um CBMID?',
      status: 'Ideia registrada e solenemente ignorada pela direção do cblow.',
      time: 'Há 6 min'
    },
    {
      user: 'Luxana de Lux',
      text: 'Yodinha cria uma carta que faz os pé de chumbo ficar controlando o tempo da partida no modo treino',
      status: 'Ideia registrada e solenemente ignorada pela direção do cblow.',
      time: 'Há 11 min'
    },
    {
      user: 'Lux_sup_faz_AP',
      text: 'Yodinha uma cartinha protocolo BRO? NAH? Obriga os times a dividirem o BRO? NAH? em dois pra ele jogar nos dois times 😌',
      status: 'BRO? NAAAAAAAAAAAH',
      time: 'Há 18 min'
    }
  ];

  // DOM Elements
  let elFormPanel, elCooldownScreen, elTimerDigits, elBtnSubmit, elComplaintText, elUserNick, elComplaintTitle;
  let elTiltSlider, elTiltLabel, elCharCount, elProtocolDisplay, elChallengeModal;
  let elBtnCopyComplaint, elBtnBronziocre, elMuralFeed, elBtnSoundToggle;
  let elCountRegistered, elCountBronziocre;

  let currentChallenge = null;
  let cooldownInterval = null;
  let registeredCounter = 48914;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initRegisteredCounter();
    generateProtocol();
    bindEvents();
    renderMuralFeed();
    checkCooldownState();
  });

  function cacheElements() {
    elFormPanel = document.getElementById('savFormPanel');
    elCooldownScreen = document.getElementById('savCooldownScreen');
    elTimerDigits = document.getElementById('timerDigits');
    elBtnSubmit = document.getElementById('btnSubmitComplaint');
    elComplaintText = document.getElementById('complaintText');
    elUserNick = document.getElementById('userNick');
    elComplaintTitle = document.getElementById('complaintTitle');
    elTiltSlider = document.getElementById('tiltSlider');
    elTiltLabel = document.getElementById('tiltCurrVal');
    elCharCount = document.getElementById('charCount');
    elProtocolDisplay = document.getElementById('protocolDisplay');
    elChallengeModal = document.getElementById('modalChallenge');
    elBtnCopyComplaint = document.getElementById('btnCopyComplaint');
    elBtnBronziocre = document.getElementById('btnBronziocreLink');
    elMuralFeed = document.getElementById('muralFeed');
    elBtnSoundToggle = document.getElementById('btnSoundToggle');
    elCountRegistered = document.getElementById('countRegistered');
    elCountBronziocre = document.getElementById('countBronziocre');
  }

  // Ticker: Reclamações registradas incrementa aos poucos
  function initRegisteredCounter() {
    const saved = localStorage.getItem(STORAGE_KEY_REGISTERED_COUNT);
    if (saved) {
      registeredCounter = parseInt(saved, 10) || 48914;
    }

    updateCountersUI();

    // Incrementar aos poucos em intervalos aleatórios entre 2.5s e 4.5s
    function scheduleNextIncrement() {
      const delay = Math.floor(Math.random() * 2000) + 2500;
      setTimeout(() => {
        registeredCounter += 1;
        localStorage.setItem(STORAGE_KEY_REGISTERED_COUNT, registeredCounter.toString());
        updateCountersUI(true);
        scheduleNextIncrement();
      }, delay);
    }

    scheduleNextIncrement();
  }

  function updateCountersUI(triggerAnimation = false) {
    const formatted = registeredCounter.toLocaleString('pt-BR');
    if (elCountRegistered) {
      elCountRegistered.textContent = formatted;
      if (triggerAnimation) {
        elCountRegistered.classList.remove('number-bump');
        void elCountRegistered.offsetWidth;
        elCountRegistered.classList.add('number-bump');
      }
    }
    if (elCountBronziocre) {
      elCountBronziocre.textContent = formatted;
    }
  }

  function generateProtocol() {
    if (elProtocolDisplay) {
      const randNum = Math.floor(100000 + Math.random() * 900000);
      elProtocolDisplay.textContent = `Ticket: ${randNum}`;
    }
  }

  // Variações de acordo com a barra de tilt:
  // Até 25% = Anota ai geo
  // Até 50% = Roubaram minha catapa
  // Até 75% = 🚨 Spamando CPI 🚨 no chat
  // 100% = Bronziocre Omisso
  function getTiltStatusText(val) {
    if (val <= 25) {
      return 'Anota ai geo';
    } else if (val <= 50) {
      return 'Roubaram minha catapa';
    } else if (val <= 75) {
      return '🚨 Spamando CPI 🚨 no chat';
    } else {
      return 'Bronziocre Omisso';
    }
  }

  function bindEvents() {
    // Sound Toggle (não toca áudio ao clicar no toggle)
    if (elBtnSoundToggle) {
      updateSoundButtonUI();
      elBtnSoundToggle.addEventListener('click', () => {
        const wasEnabled = isSoundEnabled;
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem(STORAGE_KEY_SOUND, isSoundEnabled);
        updateSoundButtonUI();
        if (!wasEnabled && isSoundEnabled) {
          playYodaFonAudio();
        }
      });
    }

    // Tilt Slider change
    if (elTiltSlider && elTiltLabel) {
      elTiltSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        const status = getTiltStatusText(val);
        elTiltLabel.textContent = `${val}% — ${status}`;
      });
    }

    // Text counter
    if (elComplaintText && elCharCount) {
      elComplaintText.addEventListener('input', (e) => {
        elCharCount.textContent = e.target.value.length;
      });
    }

    // Submit complaint button
    if (elBtnSubmit) {
      elBtnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        handleSubmitAttempt();
      });
    }

    // Copy complaint button (não toca áudio)
    if (elBtnCopyComplaint) {
      elBtnCopyComplaint.addEventListener('click', () => {
        copyComplaintToClipboard();
      });
    }
  }

  function updateSoundButtonUI() {
    if (!elBtnSoundToggle) return;
    elBtnSoundToggle.innerHTML = isSoundEnabled
      ? '<span>🔊 Fon: ON</span>'
      : '<span style="opacity:0.6">🔇 Fon: OFF</span>';
  }

  // Handle Submit Attempt -> Open Challenge Modal
  function handleSubmitAttempt() {
    const nick = (elUserNick ? elUserNick.value.trim() : '') || 'RAMMUS#TAUNT';
    const title = (elComplaintTitle ? elComplaintTitle.value.trim() : '') || 'Reclamação Geral';
    const text = (elComplaintText ? elComplaintText.value.trim() : '');
    const chkAgree = document.getElementById('chkAgreeTerms');

    if (!text || text.length < 3) {
      showToast('⚠️ Digite os detalhes da sua reclamação para podermos encaminhar!', 'warning');
      if (elComplaintText) elComplaintText.focus();
      return;
    }

    if (chkAgree && !chkAgree.checked) {
      showToast('⚠️ Você precisa marcar o termo concordando que o Yoda tem sempre razão!', 'warning');
      return;
    }

    // Store complaint in localStorage for the copy button later
    const complaintObj = {
      nick: nick,
      title: title,
      text: text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    localStorage.setItem(STORAGE_KEY_LAST_COMPLAINT, JSON.stringify(complaintObj));

    // Open challenge modal
    openChallengeModal();
  }

  // Open Challenge Modal (Bulletproof Visibility)
  function openChallengeModal() {
    // Pick a random challenge from the available questions
    const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
    currentChallenge = CHALLENGES[randomIndex];

    const modalBody = document.getElementById('challengeModalBody');
    if (!modalBody || !elChallengeModal) return;

    modalBody.innerHTML = `
      <div class="challenge-modal-box">
        <span class="challenge-badge">🛡️ TRIAGEM DE SEGURANÇA SAV · ETAPA OBRIGATÓRIA</span>
        <h3 class="challenge-title">⚠️ Teste Cognitivo Obrigatório</h3>
        <p class="challenge-notice">
          Para evitar choradeira desnecessária no chat da KICK, responda à pergunta abaixo para liberar o envio da sua reclamação.
          <strong>Atenção: Caso erre, o sistema bloqueará novos chamados por 24 horas.</strong>
        </p>

        <div class="challenge-question-box">
          <div class="challenge-q-tag">Módulo: ${currentChallenge.category}</div>
          <div class="challenge-q-text">${currentChallenge.question}</div>

          <div class="challenge-options-grid" id="challengeOptionsGrid">
            ${currentChallenge.options.map((opt, idx) => `
              <button class="challenge-opt-btn" data-opt-index="${idx}">
                <span class="challenge-opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Make modal visible
    elChallengeModal.classList.add('is-visible');

    // Bind option clicks: EVERY answer fails and plays yoda_fon!
    const optButtons = modalBody.querySelectorAll('.challenge-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        handleChallengeFailure(currentChallenge.failRoast);
      });
    });
  }

  // Trigger Failure, play yoda_fon (O som de FON só deve tocar quando responder a pergunta!)
  function handleChallengeFailure(roastMessage) {
    // Play yoda_fon audio exactly here!
    playYodaFonAudio();

    const modalBody = document.getElementById('challengeModalBody');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="challenge-modal-box" style="border-color: var(--sav-red); text-align: center;">
          <div class="fail-icon-anim">🚨</div>
          <h3 class="challenge-title" style="color: var(--sav-red); font-size: 1.6rem;">❌ RESPOSTA INVÁLIDA!</h3>
          <p style="color: #fca5a5; font-size: 1.05rem; margin: 1rem 0; line-height: 1.5; font-weight: 600;">
            ${roastMessage}
          </p>
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px dashed var(--sav-red); padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">
            <div style="font-size: 0.8rem; text-transform: uppercase; color: #fca5a5; font-weight: 700;">Penalidade Imediata</div>
            <div style="font-family: var(--font-heading); font-size: 1.35rem; color: #fff; font-weight: 800; margin-top: 0.25rem;">
              COOLDOWN DE 24 HORAS ATIVADO
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
              Seu Nick e IP foram temporariamente suspensos do SAV.
            </div>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Redirecionando para a câmara de resfriamento em instantes...
          </div>
        </div>
      `;
    }

    // Shake screen
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 600);

    // Save cooldown end time (24 hours from now)
    const cooldownEnd = Date.now() + COOLDOWN_DURATION_MS;
    localStorage.setItem(STORAGE_KEY_COOLDOWN, cooldownEnd.toString());

    // Add complaint to mural
    addComplaintToMuralFromUser();

    // After 2.6 seconds, close modal and show cooldown screen
    setTimeout(() => {
      if (elChallengeModal) {
        elChallengeModal.classList.remove('is-visible');
      }
      checkCooldownState();
    }, 2600);
  }

  // Check and apply Cooldown state
  function checkCooldownState() {
    const cooldownEndStr = localStorage.getItem(STORAGE_KEY_COOLDOWN);

    if (cooldownEndStr) {
      const cooldownEnd = parseInt(cooldownEndStr, 10);
      const now = Date.now();

      if (now < cooldownEnd) {
        // Cooldown is active!
        showCooldownScreen(cooldownEnd);
        return;
      } else {
        // Cooldown has expired
        localStorage.removeItem(STORAGE_KEY_COOLDOWN);
      }
    }

    // Cooldown is not active
    showFormScreen();
  }

  function showCooldownScreen(cooldownEnd) {
    if (elFormPanel) elFormPanel.style.display = 'none';
    if (elCooldownScreen) elCooldownScreen.style.display = 'block';

    updateTimerDisplay(cooldownEnd);

    if (cooldownInterval) clearInterval(cooldownInterval);
    cooldownInterval = setInterval(() => {
      const isStillActive = updateTimerDisplay(cooldownEnd);
      if (!isStillActive) {
        clearInterval(cooldownInterval);
        localStorage.removeItem(STORAGE_KEY_COOLDOWN);
        showToast('🎉 Seu período de castigo de 24 horas terminou!', 'success');
        showFormScreen();
      }
    }, 1000);
  }

  function showFormScreen() {
    if (cooldownInterval) clearInterval(cooldownInterval);
    if (elCooldownScreen) elCooldownScreen.style.display = 'none';
    if (elFormPanel) elFormPanel.style.display = 'block';
  }

  function updateTimerDisplay(cooldownEnd) {
    const diff = cooldownEnd - Date.now();
    if (diff <= 0) {
      if (elTimerDigits) elTimerDigits.textContent = '00:00:00';
      return false;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    if (elTimerDigits) {
      elTimerDigits.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return true;
  }

  // Copy Complaint text for Bronziocre video comment
  function copyComplaintToClipboard() {
    let complaintData = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_COMPLAINT);
      if (saved) complaintData = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    const nick = complaintData && complaintData.nick ? complaintData.nick : 'RAMMUS#TAUNT';
    const title = complaintData && complaintData.title ? complaintData.title : 'Reclamação';
    const text = complaintData && complaintData.text ? complaintData.text : 'Vim aqui a mando do Yoda reclamar no último vídeo do Bronziocre!';
    const protocol = elProtocolDisplay ? elProtocolDisplay.textContent : 'Ticket: 999999';

    const fullMessage = `🚨 [SAC CBLOW - ${protocol}]\nNick KICK: ${nick}\nTítulo: ${title}\nReclamação: "${text}"\n\n#SACCBLOW #YodaMandouEuVirAqui #BronziocreOmisso #SAV`;

    navigator.clipboard.writeText(fullMessage).then(() => {
      showToast('📋 Reclamação copiada! Clique no botão vermelho e cole no último vídeo do Bronziocre!', 'success');
    }).catch(() => {
      prompt('Copie seu texto para colar no YouTube:', fullMessage);
    });
  }

  // Add the user's failed complaint to the live mural
  function addComplaintToMuralFromUser() {
    let complaintData = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_COMPLAINT);
      if (saved) complaintData = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    if (!complaintData) return;

    const newItem = {
      user: complaintData.nick,
      text: complaintData.text,
      status: 'BRO? NAAAAAAAAAAAH',
      time: 'Agora mesmo'
    };

    INITIAL_COMPLAINTS.unshift(newItem);
    renderMuralFeed();
  }

  // Render "Últimas solicitações"
  function renderMuralFeed() {
    if (!elMuralFeed) return;
    elMuralFeed.innerHTML = INITIAL_COMPLAINTS.map(item => `
      <div class="mural-item">
        <div class="mural-item-meta">
          <span class="mural-user">👤 ${escapeHtml(item.user)}</span>
          <span class="mural-time">${item.time}</span>
        </div>
        <div class="mural-text">"${escapeHtml(item.text)}"</div>
        <div class="mural-resolution">
          <span>⚖️ <strong>SAV:</strong> ${escapeHtml(item.status)}</span>
        </div>
      </div>
    `).join('');
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      background: #1e1e1b;
      border: 1px solid ${type === 'warning' ? '#f59e0b' : type === 'success' ? '#10b981' : '#d79c6d'};
      color: #fff;
      padding: 0.85rem 1.25rem;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      font-size: 0.88rem;
      animation: fadeIn 0.2s ease;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999999;
    `;
    toast.innerHTML = message;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

})();
