import random

# テキストファイルのパス
file_path = 'data.txt'

# ハッシュを作成する辞書
word_hash = {}

# テキストファイルを読み込む
with open(file_path, 'r', encoding='utf-8') as file:
    for line in file:
        # 行の前後の空白を除去し、カンマで分割
        parts = line.strip().split(",")
        
        # 英単語をキー、日本語訳をリストとして値に設定
        if len(parts) > 1:  # カンマで分割できているか確認
            word_hash[parts[0]] = parts[1:]

# モード選択
print("モードを選んでください:")
print("1. 英単語を表示して、日本語訳を表示する")
print("2. 日本語訳のいずれか一つを表示して、英単語を表示する")

mode = input("モードの番号を入力してください（1または2）: ").strip()

# モード1: 英単語を表示して日本語訳を表示
if mode == '1':
    # 英単語のリストをランダムにシャッフル
    words = list(word_hash.keys())
    random.shuffle(words)

    # ランダムな順番で英単語を表示
    for word in words:
        print(f"英単語: {word}")
        
        # ユーザーに「つづけますか？」を確認
        user_input = input("つづけますか？（Y/N): ").strip().lower()
        
        if user_input == 'y':
            # 日本語訳をカンマ区切りで一行に表示
            translations = ", ".join(word_hash[word])
            print(f"日本語訳: {translations}\n")
        elif user_input == 'n':
            print("お疲れさまでした")
            break
        else:
            print("無効な入力です。'Y' または 'N' を入力してください。\n")

# モード2: 日本語訳を表示して英単語を表示
elif mode == '2':
    # 日本語訳のリストを作成（日本語訳ごとにその英単語を取得）
    translation_to_word = {}
    for word, translations in word_hash.items():
        for translation in translations:
            translation_to_word[translation] = word
    
    # 日本語訳のリストをランダムにシャッフル
    translations = list(translation_to_word.keys())
    random.shuffle(translations)

    # ランダムな順番で日本語訳を表示
    for translation in translations:
        print(f"日本語訳: {translation}")
        
        # ユーザーに「つづけますか？」を確認
        user_input = input("つづけますか？（Y/N): ").strip().lower()
        
        if user_input == 'y':
            # 対応する英単語を表示
            word = translation_to_word[translation]
            print(f"英単語: {word}\n")
        elif user_input == 'n':
            print("お疲れさまでした")
            break
        else:
            print("無効な入力です。'Y' または 'N' を入力してください。\n")
else:
    print("無効なモード番号です。プログラムを終了します。")
