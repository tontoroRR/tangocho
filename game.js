let vocabulary = [];
let originalMode = null;
let currentMode = null;
let currentWord = null;
let currentQuestion = 0;

// サーバー上のCSVファイル（data.txt）を読み込む
fetch('data.txt')
    .then(response => response.text())
    .then(data => {
        parseCSV(data);
    })
    .catch(error => {
        console.error("CSVファイルの読み込みに失敗しました:", error);
        alert("CSVファイルの読み込みに失敗しました。");
    });

// CSVデータをパースする
function parseCSV(csvData) {
    Papa.parse(csvData, {
        complete: function(results) {
            vocabulary = results.data.map(row => {
                if (row.length >= 2) {
                    return {
                        english: row[0].trim(),
                        japanese: row.slice(1).map(item => item.trim())
                    };
                }
            }).filter(item => item !== undefined);

            console.log("単語帳データが読み込まれました:", vocabulary);
            document.getElementById('fileUpload').style.display = 'none';
            document.getElementById('modeSelection').style.display = 'block';
        },
        skipEmptyLines: true
    });
}

// ゲームの開始
function startGame(mode) {
    originalMode = mode;
    currentQuestion = 0;
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    nextQuestion();
}

// 次の問題を表示
function nextQuestion() {
    // ユーザー入力のフィードバックをリセット
    document.getElementById('feedback').textContent = '';
    document.getElementById('answerInput').value = '';

    // ランダムに単語を選ぶ
    currentWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
  
    currentMode = originalMode;

    // currentModeが3の場合のみ出題ごとにランダムにモードを切り替える
    if (currentMode === 3) {
        currentMode = Math.random() < 0.5 ? 1 : 2;  // ランダムにモードを切り替え
    }

    if (currentMode === 1) {
        // 英単語 → 日本語訳
        document.getElementById('question').textContent = "英単語: " + currentWord.english;
    } else if (currentMode === 2) {
        // 日本語訳 → 英単語
        const randomJapanese = currentWord.japanese[Math.floor(Math.random() * currentWord.japanese.length)];
        document.getElementById('question').textContent = "日本語訳: " + randomJapanese;
    }
}

// 答えをチェック
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    let correctAnswer = false;
    let correctAnswers = [];

    if (currentMode === 1) {
        // 英単語 → 日本語訳
        for (let japanese of currentWord.japanese) {
            if (userAnswer === japanese.trim().toLowerCase()) {
                correctAnswer = true;
                break;
            }
            correctAnswers.push(japanese.trim());
        }
    } else if (currentMode === 2) {
        // 日本語訳 → 英単語
        if (userAnswer === currentWord.english.toLowerCase()) {
            correctAnswer = true;
        }
        correctAnswers.push(currentWord.english);
    }

    // フィードバックの表示
    if (correctAnswer) {
        document.getElementById('feedback').textContent = "正解です！";
    } else {
        document.getElementById('feedback').textContent = "不正解です。正しい答えは: " + correctAnswers.join(", ");
    }

    // 次の問題に進むボタンを表示
    document.getElementById('nextButton').style.display = 'inline';
}
// 答えをチェック
function checkAnswer2() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    let correctAnswer = false;

    if (currentMode === 1 || currentMode === 3) {
        // 英単語 → 日本語訳
        for (let japanese of currentWord.japanese) {
            if (userAnswer === japanese.trim().toLowerCase()) {
                correctAnswer = true;
                break;
            }
        }
    } else if (currentMode === 2) {
        // 日本語訳 → 英単語
        if (userAnswer === currentWord.english.toLowerCase()) {
            correctAnswer = true;
        }
    }

    // フィードバックの表示
    if (correctAnswer) {
        document.getElementById('feedback').textContent = "正解です！";
    } else {
        document.getElementById('feedback').textContent = "不正解です。";
    }

    // 次の問題に進むボタンを表示
    document.getElementById('nextButton').style.display = 'inline';
}

// ゲームを終了
function exitGame() {
    document.getElementById('modeSelection').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
}

// 初期状態
document.getElementById('nextButton').style.display = 'none';
