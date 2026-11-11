import json

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

for i, item in enumerate(cat.get("m_InternalIds", [])):
    if "AvatarSample_" in item and ".bundle" in item and "thumbnails" not in item.lower():
        print(f"[{i}] {item}")
