(function initPortalMitarbeiterChatWidget() {
  const API_BASE = 'https://backend-production-4c3c.up.railway.app';
  const STORAGE_KEY = 'mv_guest_chat_v1';
  const USER_KEY = 'mv_guest_user_v1';

  let mounted = false;

  function mountIfNeeded() {
    const path = window.location.pathname || '';
    if (!path.startsWith('/mitarbeiter')) return;
    if (mounted || document.getElementById('chat-launcher')) return;

    mounted = true;

    const style = document.createElement('style');
    style.textContent = `
    .chat-launcher{position:fixed;right:18px;bottom:18px;width:58px;height:58px;border:0;border-radius:999px;background:linear-gradient(140deg,#0a4b98,#1b78d9);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px rgba(15,59,113,.35);z-index:1100;cursor:pointer;font-size:26px;line-height:1}
    .chat-panel{position:fixed;right:18px;bottom:88px;width:min(420px,calc(100vw - 22px));max-height:min(72vh,700px);background:#fff;border:1px solid #d8e3f0;border-radius:14px;box-shadow:0 16px 40px rgba(12,40,76,.22);overflow:hidden;display:none;z-index:1100}
    .chat-panel.open{display:flex;flex-direction:column}
    .chat-head{background:#0f4f9f;color:#fff;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px}
    .chat-head h4{margin:0;font-size:17px;color:#fff}
    .chat-close{border:0;background:transparent;color:#fff;font-size:22px;line-height:1;cursor:pointer}
    .chat-messages{padding:12px;overflow:auto;background:#f5f8fc;display:flex;flex-direction:column;align-items:flex-start;gap:8px;min-height:240px;max-height:380px}
    .chat-bubble{width:fit-content;max-width:86%;border-radius:12px;padding:9px 11px;font-size:14px;line-height:1.4;word-break:break-word;border:1px solid #d6e4f3;background:#fff}
    .chat-bubble.visitor{align-self:flex-end;background:#e8f2ff;border-color:#bfd6f3}
    .chat-bubble-time{display:block;margin-top:4px;font-size:11px;color:#64748b}
    .chat-form{border-top:1px solid #dbe7f4;background:#fff;padding:10px;display:grid;gap:8px}
    .chat-form textarea{width:100%;border:1px solid #bfd2e6;border-radius:10px;min-height:70px;max-height:120px;resize:vertical;padding:9px;font-size:14px}
    .chat-form-actions{display:flex;gap:8px;align-items:center;justify-content:space-between}
    .chat-file-btn{border:1px solid #bfd2e6;background:#f8fbff;color:#0f2745;border-radius:9px;padding:8px 10px;font-size:13px}
    .chat-file-label{font-size:12px;color:#64748b;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .chat-send{border:0;background:#0f4f9f;color:#fff;border-radius:9px;padding:9px 13px;font-weight:600;cursor:pointer}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.id = 'chat-launcher';
  launcher.className = 'chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Chat öffnen');
  launcher.innerHTML = '💬';

  const panel = document.createElement('section');
  panel.id = 'chat-panel';
  panel.className = 'chat-panel';
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = `
    <header class="chat-head">
      <h4>Kundenservice-Chat</h4>
      <button id="chat-close" class="chat-close" type="button" aria-label="Chat schließen">&times;</button>
    </header>
    <div id="chat-messages" class="chat-messages"></div>
    <form id="chat-form" class="chat-form">
      <textarea id="chat-message-input" name="message" placeholder="Ihre Nachricht..." maxlength="2000"></textarea>
      <div class="chat-form-actions">
        <button id="chat-file-btn" class="chat-file-btn" type="button" disabled>Dateien (bald)</button>
        <span id="chat-file-label" class="chat-file-label">Textchat aktiv</span>
        <button class="chat-send" type="submit">Senden</button>
      </div>
    </form>
  `;

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  const closeBtn = panel.querySelector('#chat-close');
  const form = panel.querySelector('#chat-form');
  const messageInput = panel.querySelector('#chat-message-input');
  const messagesEl = panel.querySelector('#chat-messages');

  let conversationId = localStorage.getItem(STORAGE_KEY) || null;
  let pollTimer = null;

  function ensureGuestUserId() {
    let uid = localStorage.getItem(USER_KEY);
    if (!uid) {
      uid = `guest_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(USER_KEY, uid);
    }
    return uid;
  }

  function appendMessageBubble(msg) {
    const bubble = document.createElement('article');
    bubble.className = `chat-bubble ${msg.sender_type === 'user' ? 'visitor' : 'admin'}`;
    const text = document.createElement('div');
    text.textContent = msg.content || '(leer)';
    bubble.appendChild(text);
    const time = document.createElement('small');
    time.className = 'chat-bubble-time';
    const createdAt = msg.created_at ? new Date(msg.created_at) : new Date();
    time.textContent = createdAt.toLocaleString('de-DE');
    bubble.appendChild(time);
    messagesEl.appendChild(bubble);
  }

  function renderMessages(messages) {
    messagesEl.innerHTML = '';
    if (!Array.isArray(messages) || messages.length === 0) {
      const empty = document.createElement('article');
      empty.className = 'chat-bubble admin';
      empty.textContent = 'Hallo! Wie können wir Ihnen helfen?';
      messagesEl.appendChild(empty);
      return;
    }
    messages.forEach(appendMessageBubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function ensureConversation() {
    if (conversationId) return;
    const userId = ensureGuestUserId();
    const response = await fetch(`${API_BASE}/api/chat/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title: 'Portal Mitarbeiter Chat', conversationType: 'general' })
    });
    if (!response.ok) throw new Error('Chat konnte nicht gestartet werden.');
    const data = await response.json();
    conversationId = data?.conversation?.id || null;
    if (!conversationId) throw new Error('Keine Konversation-ID erhalten.');
    localStorage.setItem(STORAGE_KEY, conversationId);
  }

  async function fetchMessages() {
    if (!conversationId) return;
    const response = await fetch(`${API_BASE}/api/chat/conversations/${encodeURIComponent(conversationId)}/messages?limit=100`);
    if (!response.ok) return;
    const data = await response.json();
    renderMessages(data.messages || []);
  }

  async function sendMessage(event) {
    event.preventDefault();
    const text = (messageInput.value || '').trim();
    if (!text) return;

    try {
      await ensureConversation();
      const userId = ensureGuestUserId();
      const response = await fetch(`${API_BASE}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, userId, content: text })
      });
      if (!response.ok) throw new Error('Nachricht konnte nicht gesendet werden.');
      messageInput.value = '';
      await fetchMessages();
    } catch (_err) {
      const errorBubble = document.createElement('article');
      errorBubble.className = 'chat-bubble admin';
      errorBubble.textContent = 'Senden fehlgeschlagen. Bitte erneut versuchen.';
      messagesEl.appendChild(errorBubble);
    }
  }

  async function openPanel() {
    panel.classList.add('open');
    try {
      await ensureConversation();
      await fetchMessages();
    } catch (_err) {
      renderMessages([]);
    }
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(fetchMessages, 8000);
  }

  function closePanel() {
    panel.classList.remove('open');
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  launcher.addEventListener('click', () => {
    if (panel.classList.contains('open')) closePanel();
    else openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  form.addEventListener('submit', sendMessage);
  }

  // Initial check + SPA route-change hooks
  mountIfNeeded();
  window.addEventListener('popstate', mountIfNeeded);
  const _pushState = history.pushState;
  history.pushState = function () {
    const ret = _pushState.apply(this, arguments);
    setTimeout(mountIfNeeded, 0);
    return ret;
  };
  const _replaceState = history.replaceState;
  history.replaceState = function () {
    const ret = _replaceState.apply(this, arguments);
    setTimeout(mountIfNeeded, 0);
    return ret;
  };
})();
