let wordList = [];
let current = {};
let shuffled = [];
let answer = [];

async function loadWords() {
  const res = await fetch("../data/target_1900.json");
  wordList = await res.json();
  nextQuestion();
}

function nextQuestion() {
  document.getElementById("hint").classList.add("hidden");
  document.getElementById("result").textContent = "";
  document.getElementById("answer").textContent = "";
  answer = [];

  current = wordList[Math.floor(Math.random() * wordList.length)];
  document.getElementById("word").textContent = current.word;

  const tokens = tokenize(current.example.english);
  shuffled = [...tokens].sort(() => Math.random() - 0.5);

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  shuffled.forEach((token, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${i + 1}. ${token}`;
    btn.onclick = () => {
      answer.push(token);
      btn.disabled = true;
      updateAnswer();
    };
    choicesDiv.appendChild(btn);
  });
}

function tokenize(sentence) {
  return sentence.match(/[^\s]+/g);
}

function tokenize_old(sentence) {
  const raw = sentence.match(/\w+|[^\w\s]/g);
  const tokens = [];
  for (let i = 0; i < raw.length; i++) {
    if (",.!?;:'0123456789\"".includes(raw[i]) && tokens.length > 0) {
      tokens[tokens.length - 1] += raw[i];
    } else {
      tokens.push(raw[i]);
    }
  }
  return tokens;
}

function updateAnswer() {
  document.getElementById("answer").textContent = answer.join(" ");
}

function checkAnswer() {
  const correct = tokenize(current.example.english).join(" ");
  const user = answer.join(" ");
  const result = document.getElementById("result");
  result.textContent = (correct === user) ? "⭕ 正解！" : `❌ 不正解\n正解: ${correct}`;
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

window.onload = loadWords;
