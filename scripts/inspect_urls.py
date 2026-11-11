import json

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

urls = [item for item in cat.get("m_InternalIds", []) if item.startswith("http")]
print(f"Total urls: {len(urls)}")
for u in urls[:20]:
    print(u)
