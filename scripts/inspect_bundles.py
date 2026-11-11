import UnityPy
import glob
import os

bundles = glob.glob(r"D:\vdriod\VRoidStudio_Data\StreamingAssets\aa\StandaloneWindows64\*.bundle")
print("Found bundles:", len(bundles))
for b in bundles:
    env = UnityPy.load(b)
    for obj in env.objects:
        if obj.type.name in ["TextAsset", "Texture2D"]:
            try:
                data = obj.read()
                name = getattr(data, "name", "")
                if "vroid" in name.lower() or "avatar" in name.lower():
                    size = len(getattr(data, "script", b""))
                    print(f"[{obj.type.name}] {name} (size: {size}) in {os.path.basename(b)}")
            except Exception as e:
                pass
