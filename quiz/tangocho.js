let current = null;

function showQuestion() {
  if (current === null) {
    finishAllWords();
    return;
  }

  document.getElementById('quiz-message').textContent = `🔹 この単語の意味は？ → ${current.word}`;
  document.getElementById('hint').textContent = '';
  document.getElementById('result').innerHTML = '';
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

initializeGame();
cmnLoadWords(words, newGame);
