import csv
import json


def separate_meanins(meanings):

    return meanings


# 入力ファイル名（CSV）と出力ファイル名（JSON）
csv_file = 'data/target_1900.csv'
json_file = 'data/target_1900.json'

# 結果を格納するリスト
data = []

# CSV読み込みと整形
with open(csv_file, mode='r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        if len(row) < 6:
            continue
        # 行の要素を整形して辞書化
        entry = {
                "id": int(row[0].strip()),
                "word": row[2].strip(),
                "part_of_speech": row[1].strip(),
                "meanings": [s.strip() for s in row[3].split(';')],
                "example": {
                    "english": row[4].strip(),
                    "japanese": row[5].strip()
                    }
                }
        data.append(entry)

# JSONとして保存
with open(json_file, mode='w', encoding='utf-8', newline='\n') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"変換完了：{json_file}")
