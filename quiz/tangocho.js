let words = [];
let usedIds = new Set();
let current = null;
let hintStage = 0;
let correctCount = 0;
let totalCount = 0;

async function loadWords() {
  words = [];
  const res = await fetch('../data/target_1900.json');
  words = await res.json();
  pickNewWord(words);
}

function initializeGame() {
  usedIds = new Set();
  current = null;
  hintStage = 0;
  correctCount = 0;
  totalCount = 0;

  document.getElementById('word').textContent = '⏳ 準備中...';
  document.getElementById('hint').textContent = '';
  document.getElementById('result').inertHTML = '';
  updateAccuracyDisplay(correctCount, totalCount);

  showResponseButtons();
}

function pickNewWord(_words) {
  if (words.length == 0 && _words.length != words.length) {
    words = _words;
  }

  if (usedIds.size === words.length) {
    document.getElementById('word').textContent = '🎉 全ての単語を出題し終えました。';
    document.getElementById('hint').textContent = '';
    document.getElementById('result').innerHTML = '';

    showRestartButtons();
    return;
  }

  let candidate;
  do {
    candidate = words[Math.floor(Math.random() * words.length)];
  } while (usedIds.has(candidate.id));

  current = candidate;
  usedIds.add(current.id);
  hintStage = 0;
  totalCount++;

  document.getElementById('word').textContent = `🔹 この単語の意味は？ → ${current.word}`;
  document.getElementById('hint').textContent = '';
  document.getElementById('result').innerHTML = '';
}

function showHint() {
  if (!current) return;
  hintStage++;
  const hintBox = document.getElementById('hint');
  if (hintStage === 1) {
    hintBox.innerHTML = `<div>ヒント:</div>`
    hintBox.innerHTML += `<div>🟢 英語例文: ${current.example.english}</div>`;
  } else if (hintStage === 2) {
    hintBox.innerHTML += `<div>🟡 日本語訳: ${current.example.japanese}</div>`;
  } else if (hintStage === 3) {
    skipWord();
  } else {
    hintBox.textContent = `📝 これ以上ヒントはありません。`;
  }
}

function updateAccuracyDisplay(correctCount, totalCount) {
  const percent = totalCount > 0 ? (correctCount / totalCount * 100) : 0;
  const bar = document.getElementById("accuracy-bar");
  const text = document.getElementById("accuracy-text");

  bar.style.width = percent.toFixed(1) + "%";
  text.textContent = `（${totalCount}問中、${correctCount}問正解）`;
}

function showResponseButtons() {
  var btns_res = document.getElementById('button_group_response');
  var btns_cnt = document.getElementById('button_group_continue');
  var btns_rst = document.getElementById('button_group_restart');

  btns_res.style.display = 'inline-block';
  btns_cnt.style.display = 'none';
  btns_rst.style.display = 'none';
}

function showContinueButtons() {
  var btns_res = document.getElementById('button_group_response');
  var btns_cnt = document.getElementById('button_group_continue');
  var btns_rst = document.getElementById('button_group_restart');

  btns_res.style.display = 'none';
  btns_cnt.style.display = 'inline-block';
  btns_rst.style.display = 'none';
}

function showRestartButtons() {
  var btns_res = document.getElementById('button_group_response');
  var btns_cnt = document.getElementById('button_group_continue');
  var btns_rst = document.getElementById('button_group_restart');

  btns_res.style.display = 'none';
  btns_cnt.style.display = 'none';
  btns_rst.style.display = 'inline-block';
}

function markCorrect() {
  if (!current) return;
  correctCount++;
  document.getElementById('result').innerHTML = `<div>⭕ 正解: 「${current.meanings.join(' ; ')}」</div>`;
  updateAccuracyDisplay(correctCount, totalCount);
  showContinueButtons();
}

function skipWord() {
  if (!current) return;
  document.getElementById('result').innerHTML = `<div>❌ 不正解: 「${current.meanings.join(' ; ')}」</div>`;
  updateAccuracyDisplay(correctCount, totalCount);
  showContinueButtons();
}

function nextWord() {
  showResponseButtons();
  pickNewWord(words);
}

function endQuiz() {
  document.getElementById('word').innerHTML = 'お疲れさまでした！';
  document.getElementById('hint').textContent = '';
  var result = document.getElementById('result');

  result.innerHTML = `<div>📊 結果</div>`;
  result.innerHTML += `<div>正解数: ${correctCount} / 出題数: ${totalCount}</div>`;
  result.innerHTML += `<div>正解率: ${(correctCount / totalCount * 100).toFixed(1)}</div>`;

  updateAccuracyDisplay(correctCount, totalCount);

  showRestartButtons();
}

function resetGame() {
  initializeGame();
  pickNewWord(words);
}

function finishGame() {
  window.location.href = "../index.html";
}

initializeGame();
cmnLoadWords(words, pickNewWord);
