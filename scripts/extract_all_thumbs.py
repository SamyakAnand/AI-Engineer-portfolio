import json
import urllib.request
import os
import UnityPy

with open("temp_samples/samples_manifest.json") as f:
    manifest = json.load(f)

thumbs = manifest["thumbs"]

for letter, url in sorted(thumbs.items()):
    bundle_path = f"temp_samples/thumbs/{letter}.bundle"
    png_path = f"temp_samples/thumbs/{letter}.png"
    if not os.path.exists(png_path):
        if not os.path.exists(bundle_path):
            urllib.request.urlretrieve(url, bundle_path)
        env = UnityPy.load(bundle_path)
        for obj in env.objects:
            if obj.type.name == "Texture2D":
                img = obj.read().image
                img.save(png_path)
                print(f"Saved {letter}.png ({img.size})")
                break
