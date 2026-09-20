const setupScreen = document.querySelector('#setup-screen');
const rehearsalShell = document.querySelector('#rehearsal-shell');
const startButton = document.querySelector('#start-button');
const exitButton = document.querySelector('#exit-button');
const ownerStatus = document.querySelector('#owner-status');
const ownerInputs = [...document.querySelectorAll('[data-owner]')];

const state = {
  step: 'setup',
  firstChoice: null,
  explanation: '',
  branch: null,
  secondChoice: null,
};
let speechRecognition = null;

function ownersReady() {
  return ownerInputs.every((input) => input.checked);
}

function updateOwnerGate() {
  const ready = ownersReady();
  startButton.disabled = !ready;
  ownerStatus.textContent = ready ? 'All fictional owners assigned. The rehearsal can begin.' : 'Assign all three owners to begin.';
}

function resetSession() {
  if (speechRecognition) {
    try { speechRecognition.abort(); } catch (_) {}
    speechRecognition = null;
  }
  state.step = 'setup';
  state.firstChoice = null;
  state.explanation = '';
  state.branch = null;
  state.secondChoice = null;
  ownerInputs.forEach((input) => { input.checked = false; });
  updateOwnerGate();
  rehearsalShell.classList.add('hidden');
  setupScreen.classList.remove('hidden');
  startButton.focus();
}

ownerInputs.forEach((input) => input.addEventListener('change', updateOwnerGate));
startButton.addEventListener('click', () => {
  if (!ownersReady()) return;
  setupScreen.classList.add('hidden');
  rehearsalShell.classList.remove('hidden');
  state.step = 'decision';
  renderDecision();
  document.querySelector('#rehearsal-shell').focus();
});
exitButton.addEventListener('click', resetSession);

function renderDecision() {
  document.querySelector('#step-label').textContent = 'STEP 1 OF 4';
  document.querySelector('#screen-title').textContent = 'Primary exit unavailable';
  document.querySelector('#stage').innerHTML = `
    <div class="decision-layout">
      <div class="hallway-scene" role="img" aria-label="Fictional office hallway with light debris blocking the primary exit">
        <div class="scene-overlay">
          <span>OFFICE · LEVEL 1</span>
          <strong>Primary exit blocked</strong>
          <small>Calm fictional rehearsal</small>
        </div>
      </div>
      <div class="decision-panel">
        <p class="eyebrow">Observable decision</p>
        <h2>What would you do next?</h2>
        <p>Select one response. No option creates a real-world score.</p>
        <div class="route-list" role="group" aria-label="Choose an alternative response">
          <button class="route-button" data-route="stair-b"><span class="route-icon">↗</span><span><b>Stair B</b><small>Check the marked alternate stair</small></span></button>
          <button class="route-button" data-route="elevator"><span class="route-icon">↕</span><span><b>Elevator</b><small>Move toward the elevator bank</small></span></button>
          <button class="route-button" data-route="wait"><span class="route-icon">Ⅱ</span><span><b>Wait here</b><small>Remain in the current corridor</small></span></button>
        </div>
      </div>
    </div>`;
  document.querySelectorAll('[data-route]').forEach((button) => {
    button.addEventListener('click', () => {
      state.firstChoice = button.dataset.route;
      state.step = 'explanation';
      renderExplanation();
    });
  });
}

function renderExplanation() {
  document.querySelector('#step-label').textContent = 'STEP 2 OF 4';
  document.querySelector('#screen-title').textContent = 'Explain your choice';
  document.querySelector('#stage').innerHTML = `
    <div class="explanation-card">
      <div class="selection-summary"><span>Selected response</span><strong>${routeName(state.firstChoice)}</strong></div>
      <div>
        <p class="eyebrow">Temporary voice input</p>
        <h2>Why did you choose this response?</h2>
        <p class="privacy-note">Your audio is not uploaded or saved. The temporary transcript is cleared when you exit.</p>
        <div class="voice-actions">
          <button id="voice-button" class="voice-button" type="button"><span aria-hidden="true">●</span> Start voice explanation</button>
          <span id="voice-status" role="status">Microphone is optional.</span>
        </div>
        <label class="text-label" for="explanation-input">Transcript or typed fallback</label>
        <textarea id="explanation-input" maxlength="240" rows="5" placeholder="Example: I would check whether Stair B is clear before moving."></textarea>
        <div class="input-meta"><span id="input-error" role="alert"></span><span id="char-count">0 / 240</span></div>
        <div class="form-actions">
          <button class="secondary-button" id="back-to-routes">Change response</button>
          <button class="primary-button continue-button" id="analyze-button">Continue to simulated correction</button>
        </div>
      </div>
    </div>`;
  document.querySelector('#back-to-routes').addEventListener('click', renderDecision);
  const input = document.querySelector('#explanation-input');
  const count = document.querySelector('#char-count');
  const error = document.querySelector('#input-error');
  input.value = state.explanation;
  count.textContent = `${input.value.length} / 240`;
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[<>]/g, '');
    count.textContent = `${input.value.length} / 240`;
    error.textContent = '';
  });
  document.querySelector('#voice-button').addEventListener('click', () => startVoiceInput(input));
  document.querySelector('#analyze-button').addEventListener('click', () => {
    const clean = input.value.trim().replace(/\s+/g, ' ');
    if (!clean) {
      error.textContent = 'Add a short explanation before continuing.';
      input.focus();
      return;
    }
    state.explanation = clean.slice(0, 240);
    state.branch = classifyDecision(state.firstChoice, state.explanation);
    state.step = 'correction';
    renderCorrection();
  });
}

function startVoiceInput(input) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const status = document.querySelector('#voice-status');
  const button = document.querySelector('#voice-button');
  if (!Recognition) {
    status.textContent = 'Voice input is unavailable here. Use the typed fallback.';
    input.focus();
    return;
  }
  speechRecognition = new Recognition();
  speechRecognition.lang = 'en-US';
  speechRecognition.interimResults = false;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.onstart = () => {
    status.textContent = 'Listening… speak briefly.';
    button.textContent = 'Listening…';
    button.disabled = true;
  };
  speechRecognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.slice(0, 240);
    input.value = transcript;
    state.explanation = transcript;
    input.dispatchEvent(new Event('input'));
    status.textContent = 'Temporary transcript added. Review it before continuing.';
  };
  speechRecognition.onerror = () => {
    status.textContent = 'Microphone access did not work. Use the typed fallback.';
    input.focus();
  };
  speechRecognition.onend = () => {
    button.innerHTML = '<span aria-hidden="true">●</span> Start voice explanation';
    button.disabled = false;
    speechRecognition = null;
  };
  try { speechRecognition.start(); } catch (_) {
    status.textContent = 'Voice input could not start. Use the typed fallback.';
    input.focus();
  }
}

function routeName(route) {
  return ({ 'stair-b': 'Stair B', elevator: 'Elevator', wait: 'Wait here' })[route] || 'Unknown';
}

const branchData = {
  elevator: {
    observation: 'Selected the elevator after the primary exit became unavailable.',
    correction: 'Review why elevators are excluded in this fictional exercise.',
    retryTitle: 'Elevator unavailable',
    retryPrompt: 'Choose a marked alternate route. The elevator is not available in this retry.',
    options: ['stair-b', 'wait'],
  },
  wait: {
    observation: 'Did not select an available alternate route.',
    correction: 'Practice scanning for marked alternate exits before deciding to remain in place.',
    retryTitle: 'Route signs highlighted',
    retryPrompt: 'Two route signs are now easier to see. Choose your next action.',
    options: ['stair-b', 'elevator', 'wait'],
  },
  'stair-check-missing': {
    observation: 'Selected Stair B, but did not explain checking conditions before moving.',
    correction: 'Practice stating the route-condition check before movement.',
    retryTitle: 'Conditions changed',
    retryPrompt: 'A second obstruction is visible near Stair B. Choose your next action.',
    options: ['stair-c', 'wait'],
  },
  'stair-bounded': {
    observation: 'Selected the predefined safe alternative and described checking conditions in this simulation.',
    correction: 'Repeat the decision under one changed condition.',
    retryTitle: 'One cue changed',
    retryPrompt: 'Stair B remains marked, but a staff member reports congestion. Choose your next action.',
    options: ['stair-b', 'stair-c', 'wait'],
  },
};

function classifyDecision(route, explanation) {
  if (route === 'elevator') return 'elevator';
  if (route === 'wait') return 'wait';
  const text = explanation.toLowerCase();
  const checkWords = ['check', 'clear', 'condition', 'sign', 'smoke', 'blocked', 'safe to use', 'inspect'];
  return checkWords.some((word) => text.includes(word)) ? 'stair-bounded' : 'stair-check-missing';
}

function renderCorrection() {
  const branch = branchData[state.branch];
  document.querySelector('#step-label').textContent = 'STEP 3 OF 4';
  document.querySelector('#screen-title').textContent = 'Correction before retry';
  document.querySelector('#stage').innerHTML = `
    <div class="correction-grid">
      <article class="observation-card">
        <p class="eyebrow">Simulated adaptive output</p>
        <h2>Observed in this simulation</h2>
        <p class="observation-text">${branch.observation}</p>
        <dl class="correction-details">
          <div><dt>Corrective action</dt><dd>${branch.correction}</dd></div>
          <div><dt>Human owner</dt><dd>Tomas Leon · Fictional Civil Protection Trainer</dd></div>
        </dl>
      </article>
      <aside class="retry-card">
        <span class="retry-number">01</span>
        <p class="eyebrow">One bounded retry</p>
        <h2>${branch.retryTitle}</h2>
        <p>${branch.retryPrompt}</p>
        <button id="retry-button" class="primary-button">Begin adaptive retry</button>
      </aside>
    </div>`;
  document.querySelector('#retry-button').addEventListener('click', renderRetry);
}

function renderRetry() {
  const branch = branchData[state.branch];
  document.querySelector('#step-label').textContent = 'STEP 4 OF 4';
  document.querySelector('#screen-title').textContent = branch.retryTitle;
  const optionLabels = { 'stair-b': 'Stair B', 'stair-c': 'Stair C', elevator: 'Elevator', wait: 'Wait and reassess' };
  document.querySelector('#stage').innerHTML = `
    <div class="retry-stage">
      <div class="changed-cue"><span>CHANGED CONDITION</span><strong>${branch.retryPrompt}</strong></div>
      <div class="retry-options" role="group" aria-label="Choose a response for the adaptive retry">
        ${branch.options.map((route) => `<button class="route-button" data-retry-route="${route}"><span class="route-icon">→</span><span><b>${optionLabels[route]}</b><small>Record this simulated decision</small></span></button>`).join('')}
      </div>
    </div>`;
  document.querySelectorAll('[data-retry-route]').forEach((button) => {
    button.addEventListener('click', () => {
      state.secondChoice = button.dataset.retryRoute;
      state.step = 'result';
      renderResult();
    });
  });
}

const prohibitedClaims = ['ready', 'readiness', 'compliant', 'compliance', 'competent', 'competence', 'safe', 'safety score', 'certified', 'certification', 'survival', 'survival probability', 'risk reduction', 'lower risk', 'earthquake-ready'];

function renderResult() {
  const branch = branchData[state.branch];
  const secondName = ({ 'stair-b': 'Stair B', 'stair-c': 'Stair C', elevator: 'Elevator', wait: 'Wait and reassess' })[state.secondChoice];
  document.querySelector('#step-label').textContent = 'SIMULATION COMPLETE';
  document.querySelector('#screen-title').textContent = 'Performance in simulation';
  document.querySelector('#stage').innerHTML = `
    <div class="result-layout">
      <article class="result-card">
        <div class="result-boundary"><strong>PERFORMANCE IN SIMULATION</strong><span>No readiness, compliance, competence, safety, survival, certification, or risk conclusion.</span></div>
        <p class="eyebrow">Allowlisted observation summary</p>
        <h2>One decision. One correction. One retry.</h2>
        <ol class="result-timeline">
          <li><span>First decision</span><strong>${routeName(state.firstChoice)}</strong></li>
          <li><span>Observed behavior</span><strong>${branch.observation}</strong></li>
          <li><span>Human-owned correction</span><strong>${branch.correction}</strong><small>Tomas Leon · Fictional trainer</small></li>
          <li><span>Retry decision</span><strong>${secondName}</strong></li>
        </ol>
        <button id="restart-button" class="primary-button">Run fictional rehearsal again</button>
      </article>
      <aside class="guard-card">
        <p class="eyebrow">Boundary demonstration</p>
        <h2>See a label the simulation must reject</h2>
        <p>This is a system example, not your statement and not part of your result.</p>
        <div class="claim-example"><span>Example of a prohibited label</span><strong>“Ready for a real earthquake”</strong></div>
        <button id="claim-button" class="secondary-button">Show why this label is not allowed</button>
        <div id="claim-result" class="claim-result" aria-live="polite"></div>
      </aside>
    </div>`;
  document.querySelector('#restart-button').addEventListener('click', () => {
    state.firstChoice = null;
    state.explanation = '';
    state.branch = null;
    state.secondChoice = null;
    renderDecision();
  });
  document.querySelector('#claim-button').addEventListener('click', checkClaim);
}

function checkClaim() {
  const result = document.querySelector('#claim-result');
  const example = 'Ready for a real earthquake';
  const prohibited = prohibitedClaims.some((term) => example.toLowerCase().includes(term));
  result.className = prohibited ? 'claim-result blocked' : 'claim-result allowed';
  result.innerHTML = prohibited
    ? '<strong>Example blocked.</strong><span>“Ready for a real earthquake” would turn one simulation into a real-world readiness claim. The permitted label is “Performance in simulation.”</span>'
    : '<strong>Permitted bounded label.</strong><span>This wording describes the source of the observation without making a real-world claim.</span>';
}

updateOwnerGate();
