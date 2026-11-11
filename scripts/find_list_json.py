import json

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

for i, x in enumerate(cat.get("m_InternalIds", [])):
    if "list.json" in x.lower():
        print(f"[{i}] {x}")
        # print subsequent items
        for j in range(max(0, i-5), min(len(cat["m_InternalIds"]), i+10)):
            print(f"  [{j}] {cat['m_InternalIds'][j]}")
