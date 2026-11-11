import json
import urllib.request
import os

# Let's inspect AvatarSample_B bundle url from our previous output:
# AvatarSample_B is usually the standard male VRoid avatar preset!
# https://vroid-mobile-assetbundle.s3-ap-northeast-1.amazonaws.com/asset/VRoidStudio/StandaloneWindows64/bundles/v10239163/avatarsamples_assets_assets/vroid/studio/data/addressableassets/avatarsamples/avatarsample_b.vroid.bytes_c0a1c9b3e0a521a598802cdd8694e97c.bundle

url_b = "https://vroid-mobile-assetbundle.s3-ap-northeast-1.amazonaws.com/asset/VRoidStudio/StandaloneWindows64/bundles/v10239163/avatarsamples_assets_assets/vroid/studio/data/addressableassets/avatarsamples/avatarsample_b.vroid.bytes_c0a1c9b3e0a521a598802cdd8694e97c.bundle"
os.makedirs("temp_bundles", exist_ok=True)
dest = os.path.join("temp_bundles", "sample_b.bundle")
if not os.path.exists(dest):
    print("Downloading AvatarSample_B bundle...")
    urllib.request.urlretrieve(url_b, dest)
    print("Downloaded:", os.path.getsize(dest), "bytes")

import UnityPy
env = UnityPy.load(dest)
print("Objects in bundle:", len(env.objects))
for obj in env.objects:
    print(f"Type: {obj.type.name}")
    if obj.type.name == "TextAsset":
        d = obj.read()
        print(f"TextAsset: name={d.name}, len={len(d.script)}")
        # Save extracted .vroid
        out_vroid = os.path.join("temp_bundles", f"{d.name}.vroid")
        with open(out_vroid, "wb") as f:
            f.write(d.script)
        print("Saved extracted vroid:", out_vroid, os.path.getsize(out_vroid))
