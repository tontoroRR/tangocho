import json
import random
import re

# JSONファイルを読み込み
with open('data/target_1900.json', 'r', encoding='utf-8') as f:
    data = json.load(f)


def tokenize(sentence):
    """単語を分割"""
    raw_tokens = re.findall(r"\w+|[^\w\s]", sentence)
    tokens = []
    for tok in raw_tokens:
        if tok in ",.!?;:" and tokens:
            tokens[-1] += tok
        else:
            tokens.append(tok)
    return tokens
    # return re.findall(r"[^\s]+", sentence)


def show_shuffled_with_numbers(tokens):
    """番号付きでシャッフル単語を表示"""
    for i, token in enumerate(tokens):
        print(f"{i + 1}. {token}", end='  ')
    print("\n")


def ask_continue():
    """ユーザーに継続確認"""
    while True:
        choice = input("👉 続けますか？ (y/n): ").strip().lower()
        if choice in ['y', 'yes']:
            return True
        elif choice in ['n', 'no']:
            return False
        else:
            print("y または n を入力してください。")


def main():
    num_questions = 5  # 出題数
    questions = random.sample(data, num_questions)

    for idx, item in enumerate(questions):
        print(f"\n【第 {idx + 1} 問】🔤 Word: {item['word']}")
        sentence = item["example"]["english"]
        tokens = tokenize(sentence)
        shuffled = tokens[:]
        random.shuffle(shuffled)

        print("以下の語を正しい順番に並べてください：")
        show_shuffled_with_numbers(shuffled)

        while True:
            print("番号をスペースで区切って入力（例：3 1 2 ...）または `?` でヒント、`q`で終了:")
            user_input = input("👉 あなたの回答: ")

            if user_input == "?":
                print(f"💡 ヒント（日本語訳）: {item['example']['japanese']}")
                continue

            if user_input.lower() == "q":
                print("👋 お疲れさまでした！")
                return

            try:
                selected_indices = list(map(int, user_input.strip().split()))
                user_tokens = [shuffled[i - 1] for i in selected_indices]
                break
            except (ValueError, IndexError):
                print("⚠️ 入力が不正です。再入力してください。")

        user_sentence = ' '.join(user_tokens).strip()
        correct_sentence = ' '.join(tokens).strip()

        print(f"\n✅ 正解:   {correct_sentence}")
        print(f"📝 あなた: {user_sentence}")

        if user_sentence == correct_sentence:
            print("⭕ 正解！")
        else:
            print("❌ 不正解")

        if not ask_continue():
            print("👋 お疲れさまでした！")
            break


if __name__ == "__main__":
    main()
