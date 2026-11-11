import UnityPy
import glob
import os

bundles = glob.glob(r"D:\vdriod\VRoidStudio_Data\StreamingAssets\aa\StandaloneWindows64\*.bundle")
for b in bundles:
    env = UnityPy.load(b)
    types = {}
    names = []
    for obj in env.objects:
        t = obj.type.name
        types[t] = types.get(t, 0) + 1
        if t in ["TextAsset", "MonoBehaviour"]:
            try:
                d = obj.read()
                names.append((t, getattr(d, 'name', '')))
            except:
                pass
    print(f"Bundle {os.path.basename(b)}: types={types}, sample names={names[:5]}")
