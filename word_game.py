import json
import random

# JSONファイルの読み込み
with open("data/target_1900.json", "r", encoding="utf-8") as f:
    words = json.load(f)

# 出題ループ
hint_stage = 0
current = None
total_count = 0
correct_count = 0


def pick_new_word():
    global current, hint_stage, total_count
    current = random.choice(words)
    hint_stage = 0
    total_count += 1
    print(f"\n🔹 この単語の意味は？ → {current['word']}")


def show_hint():
    global hint_stage
    if current is None:
        print("まだ単語が出題されていません。")
        return
    hint_stage += 1
    if hint_stage == 1:
        print(f"🟡 英語例文: {current['example']['english']}")
    elif hint_stage == 2:
        print(f"🟢 日本語訳: {current['example']['japanese']}")
    elif hint_stage == 3:
        print(f"🔴 意味: {', '.join(current['meanings'])}")
    else:
        print("📝 これ以上ヒントはありません。")


def show_answer():
    print(f"⭕ 意味: {', '.join(current['meanings'])}")


# 初回出題
pick_new_word()

# 入力ループ
while True:
    command = input("a: 分かった / n: 次の単語 / ?: ヒント / q: 終了 > ").strip().lower()
    match command:
        case "a":
            if hint_stage < 3:
                correct_count += 1
            show_answer()
            pick_new_word()
        case "n":
            show_answer()
            pick_new_word()
        case "?":
            show_hint()
        case "q":
            if hint_stage == 0:
                total_count -= 1
            print("\n📊 結果")
            print(f"出題数: {total_count}")
            print(f"正解数: {correct_count}")
            if total_count > 0:
                rate = correct_count / total_count * 100
                print(f"正解率: {rate:.1f}%")
            else:
                print("まだ出題されていません。")
            print("終了します。")
            break
        case _:
            print("n / ? / q のいずれかを入力してください。")
