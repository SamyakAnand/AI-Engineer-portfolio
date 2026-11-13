import bpy
import json

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath='public/models/sam-avatar.glb')

required_visemes = [
    'viseme_sil', 'viseme_PP', 'viseme_FF', 'viseme_TH', 'viseme_DD',
    'viseme_kk', 'viseme_CH', 'viseme_SS', 'viseme_nn', 'viseme_RR',
    'viseme_aa', 'viseme_E', 'viseme_I', 'viseme_O', 'viseme_U'
]

required_arkit = [
    'eyeBlinkLeft', 'eyeBlinkRight', 'browInnerUp', 'jawOpen',
    'mouthClose', 'mouthFunnel', 'mouthPucker', 'mouthSmileLeft', 'mouthSmileRight'
]

print("=== VERIFYING SAM.exe GLB MORPH TARGETS ===")
found_keys = {}
for obj in bpy.data.objects:
    if obj.type == 'MESH' and obj.data.shape_keys:
        print(f"Mesh: {obj.name} has {len(obj.data.shape_keys.key_blocks)} shape keys.")
        for k in obj.data.shape_keys.key_blocks:
            found_keys[k.name] = obj.name

all_visemes_ok = True
for v in required_visemes:
    if v in found_keys:
        print(f"  [PASS] {v} on {found_keys[v]}")
    else:
        print(f"  [FAIL] {v} MISSING!")
        all_visemes_ok = False

all_arkit_ok = True
for a in required_arkit:
    if a in found_keys:
        print(f"  [PASS] {a} on {found_keys[a]}")
    else:
        print(f"  [FAIL] {a} MISSING!")
        all_arkit_ok = False

if all_visemes_ok and all_arkit_ok:
    print("\n>>> ALL 15 REQUIRED OCULUS VISEMES & ARKIT EXPRESSIONS VERIFIED PERFECTLY! <<<")
else:
    print("\n>>> SOME MORPH TARGETS FAILED VERIFICATION <<<")
