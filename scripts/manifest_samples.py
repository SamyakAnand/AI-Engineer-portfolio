import json
import urllib.request
import os

with open(r"C:\Users\samya\AppData\LocalLow\pixiv\VRoid Studio\com.unity.addressables\catalog_10239163.json", "r", encoding="utf-8") as f:
    cat = json.load(f)

thumb_urls = {}
vroid_urls = {}

for item in cat.get("m_InternalIds", []):
    if item.startswith("http"):
        lower = item.lower()
        if "avatarsamplethumbnails" in lower and ".bundle" in lower:
            # extract sample letter
            # e.g. avatarsample_a.jpg
            for letter in "abcdefghijklmnopqrstuvwxyz":
                if f"avatarsample_{letter}.jpg" in lower:
                    thumb_urls[letter.upper()] = item
        elif "avatarsamples" in lower and ".bundle" in lower:
            for letter in "abcdefghijklmnopqrstuvwxyz":
                if f"avatarsample_{letter}.vroid.bytes" in lower:
                    vroid_urls[letter.upper()] = item

print(f"Found {len(thumb_urls)} thumbnail bundles and {len(vroid_urls)} vroid bundles.")
os.makedirs("temp_samples/thumbs", exist_ok=True)
os.makedirs("temp_samples/vroids", exist_ok=True)

with open("temp_samples/samples_manifest.json", "w") as f:
    json.dump({"thumbs": thumb_urls, "vroids": vroid_urls}, f, indent=2)
print("Saved manifest!")
