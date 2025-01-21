import random

# テキストファイルのパス
file_path = 'data.txt'

# ハッシュを作成する辞書
word_hash = {}

# テキストファイルを読み込む
with open(file_path, 'r', encoding='utf-8') as file:
    print(file_path)
    for line in file:
        # 行の前後の空白を除去し、カンマで分割
        parts = line.strip().split(",")
        
        # 英単語をキー、日本語訳をリストとして値に設定
        if len(parts) > 1:  # カンマで分割できているか確認
            word_hash[parts[0]] = parts[1:]
            print(word_hash)

# 英単語のリストをランダムにシャッフル
words = list(word_hash.keys())
random.shuffle(words)

# ランダムな順番で英単語を表示
for word in words:
    print(f"英単語: {word}")
    
    # ユーザーに「つづけますか？」を確認
    user_input = input("つづけますか？（Y/N): ").strip().lower()
    
    if user_input == 'y':
        # 日本語訳を表示
        translations = word_hash[word]
        print(f"日本語訳: {', '.join(translations)}\n")
    elif user_input == 'n':
        print("お疲れさまでした")
        break
    else:
        print("無効な入力です。'Y' または 'N' を入力してください。\n")
