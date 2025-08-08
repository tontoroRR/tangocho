let current = {};
let shuffled = [];
let answer = [];

function showQuestion() {
  if (current === null) {
    finishAllWords();
    return;
  }

  document.getElementById('hint').classList.add('hidden');
  document.getElementById('result').innerHTML = '';
  document.getElementById('answer').textContent = '';
  answer = [];

  document.getElementById('quiz-message').textContent = `${current.word} を使った文章を正しく並び変えよう！`;

  const tokens = tokenize(current.example.english);
  shuffled = [...tokens].sort(() => Math.random() - 0.5);

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  shuffled.forEach((token, i) => {
    const btn = document.createElement('button');
    btn.textContent = token;
    btn.onclick = () => {
      answer.push(token);
      btn.disabled = true;
      updateAnswer();
    };
    choicesDiv.appendChild(btn);
  });

  showResponseButtons();
}

function tokenize(sentence) {
  return sentence.match(/[^\s]+/g);
}

function updateAnswer() {
  document.getElementById("answer").textContent = answer.join(" ");
}

function checkAnswer() {
  const correct = current.example.english; // tokenize(current.example.english).join(" ");
  const user = answer.join(" ");
  const result = document.getElementById("result");

  if (correct === user) {
    correctCount++;
    result.textContent = `⭕ 正解！: 意味「${current.example.japanese}」`;
  } else {
    result.textContent = `❌ 不正解: 回答「${correct}」`;
  }

  updateAccuracyDisplay(correctCount, totalCount);
  showContinueButtons();
}

function skipQuestion() {
  if (!current) return;
  document.getElementById('result').innerHTML = `<div>❌ 回答: 「${current.example.english}」</div>`;
  updateAccuracyDisplay(correctCount, totalCount);
  showContinueButtons();
}

function showHint() {
  const hint = document.getElementById("hint");
  hint.textContent = `ヒント: ${current.example.japanese}`;
  hint.classList.remove("hidden");
}

function resetAnswer() {
  answer = [];
  updateAnswer();

  // 選択肢のボタンをすべて再度有効化
  const btns = document.querySelectorAll("#choices button");
  btns.forEach(btn => {
    btn.disabled = false;
  });
}

function quitGame() {
  document.getElementById("result").textContent = "👋 ゲームを終了しました。お疲れさまでした！";

  // ボタンをすべて無効化
  const btns = document.querySelectorAll("button");
  btns.forEach(btn => {
    btn.disabled = true;
  });

  // 明示的にヒント欄も閉じる
  document.getElementById("hint").classList.add("hidden");
}

initializeGame();
cmnLoadWords(words, newGame);
