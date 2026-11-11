import json

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

print("LocatorId:", cat.get("m_LocatorId"))
for i, item in enumerate(cat.get("m_InternalIds", [])):
    if "AvatarSample" in item or ".bundle" in item:
        print(f"[{i}] {item}")
