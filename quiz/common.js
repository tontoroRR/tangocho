let words = [];
let usedIds = new Set();
let correctCount = 0;
let totalCount = 0;
let hintStage = 0;

async function cmnLoadWords(words, fnPickWord) {
  words = [];
  const res = await fetch('../data/target_1900.json');
  words = await res.json();
  fnPickWord(words);
}

function initializeGame() {
  usedIds = new Set();
  current = null;
  hintStage = 0;
  correctCount = 0;
  totalCount = 0;

  document.getElementById('quiz-message').textContent = '⏳ 準備中...';
  document.getElementById('quiz-area').style.display = 'inline-block';
  document.getElementById('hint').textContent = '';
  document.getElementById('result').inertHTML = '';
  updateAccuracyDisplay(correctCount, totalCount);

  showResponseButtons();
}

function newGame(_words) {
  pickNew(_words);
  showQuestion();
}

function pickNew(_words) {
  if (words.length == 0 && _words.length != words.length) {
    words = _words;
  }

  if (usedIds.size === words.length) {
    current = null;
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
}

function finishAllWords() {
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('quiz-message').textContent = '🎉 全ての単語を出題し終えました。';
    document.getElementById('hint').textContent = '';
    document.getElementById('result').innerHTML = '';

    showRestartButtons();
}

function updateAccuracyDisplay(correctCount, totalCount) {
  const percent = totalCount > 0 ? (correctCount / totalCount * 100) : 0;
  const bar = document.getElementById("accuracy-bar");
  const text = document.getElementById("accuracy-text");

  bar.style.width = percent.toFixed(1) + "%";
  text.textContent = `（${totalCount}問中、${correctCount}問正解）`;
}

function nextQuestion() {
  showResponseButtons();
  newGame(words);
}

function endQuiz() {
  document.getElementById('quiz-message').innerHTML = '🎉お疲れさまでした！';
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('button_group_restart').style.display = 'inline-block';

  var result = document.getElementById('result');
  result.innerHTML = `<div>📊 結果</div>`;
  result.innerHTML += `<div>正解数: ${correctCount} / 出題数: ${totalCount}</div>`;
  result.innerHTML += `<div>正解率: ${(correctCount / totalCount * 100).toFixed(1)}</div>`;

  updateAccuracyDisplay(correctCount, totalCount);
}

function resetGame() {
  initializeGame();
  newGame(words);
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

function finishGame() {
  window.location.href = "../index.html";
}
