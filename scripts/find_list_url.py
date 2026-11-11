import json
import urllib.request

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

for item in cat.get("m_InternalIds", []):
    if "List.json" in item and item.startswith("http"):
        print("List URL:", item)
