import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

os.makedirs("assets/sam-avatar/textures_custom", exist_ok=True)
orig_dir = "assets/sam-avatar/textures_original"
custom_dir = "assets/sam-avatar/textures_custom"

# 1. REFINED FACE TEXTURE
face_path = os.path.join(orig_dir, "M00_000_00_Face_00.png")
face = Image.open(face_path).convert("RGBA")
w, h = face.size

# Warm olive skin tone adjustment
arr = np.array(face, dtype=np.float32)
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
# Warm olive-golden tone matching authentic South Asian skin in photo
# Base skin color in orig is around (248, 222, 205)
# Shift toward warm radiant olive (230, 192, 168)
arr[:,:,0] = np.clip(r * 0.94 + 5, 0, 255)
arr[:,:,1] = np.clip(g * 0.88 + 5, 0, 255)
arr[:,:,2] = np.clip(b * 0.80 + 3, 0, 255)
face_toned = Image.fromarray(arr.astype(np.uint8), "RGBA")

overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Forehead Tilak (Red sacred mark at x=512, y=390, size ~ 18x26)
tx, ty = int(w * 0.5), int(h * 0.390)
draw.ellipse([tx - 9, ty - 14, tx + 9, ty + 14], fill=(210, 30, 45, 240))
draw.ellipse([tx - 5, ty - 8, tx + 5, ty + 8], fill=(245, 65, 75, 255))
draw.point([tx, ty - 1], fill=(255, 210, 210, 255))
draw.point([tx, ty], fill=(255, 255, 255, 255))

# Elegant, clean anime beard & mustache (matching Samyak's groomed beard):
# Mustache: between nose (y=655) and mouth (y=755). Target y=705 to 742, x=440 to 584.
# Soft mustache gradient shape
mustache_color = (38, 28, 26, 210)
# Left mustache wing
draw.polygon([(w*0.5 - 5, h*0.725), (w*0.5 - 65, h*0.728), (w*0.5 - 60, h*0.742), (w*0.5 - 10, h*0.742)], fill=mustache_color)
# Right mustache wing
draw.polygon([(w*0.5 + 5, h*0.725), (w*0.5 + 65, h*0.728), (w*0.5 + 60, h*0.742), (w*0.5 + 10, h*0.742)], fill=mustache_color)

# Soul patch (small triangle under lower lip, y=775 to 795)
draw.polygon([(w*0.5 - 8, h*0.772), (w*0.5 + 8, h*0.772), (w*0.5, h*0.798)], fill=(38, 28, 26, 190))

# Chin beard (rounded neat boxed beard on chin, y=810 to 875, x=450 to 574)
draw.ellipse([w*0.5 - 45, h*0.810, w*0.5 + 45, h*0.875], fill=(35, 25, 24, 215))

# Jawline beard paths (connecting chin up towards ears along jawline contour)
# Left jaw beard
draw.polygon([
    (w*0.5 - 40, h*0.840),
    (w*0.5 - 130, h*0.805),
    (w*0.5 - 200, h*0.740),
    (w*0.5 - 195, h*0.755),
    (w*0.5 - 125, h*0.825),
    (w*0.5 - 35, h*0.865)
], fill=(35, 25, 24, 185))

# Right jaw beard
draw.polygon([
    (w*0.5 + 40, h*0.840),
    (w*0.5 + 130, h*0.805),
    (w*0.5 + 200, h*0.740),
    (w*0.5 + 195, h*0.755),
    (w*0.5 + 125, h*0.825),
    (w*0.5 + 35, h*0.865)
], fill=(35, 25, 24, 185))

# Soften the beard with slight blur for high-end anime cel-shaded look
overlay_blurred = overlay.filter(ImageFilter.GaussianBlur(2.2))
final_face = Image.alpha_composite(face_toned, overlay_blurred)
final_face.save(os.path.join(custom_dir, "M00_000_00_Face_00.png"))
print("Refined Face texture saved!")

# 2. REFINED IRIS TEXTURE (Rich dark espresso/amber brown with subtle cyan glow)
orig_iris = Image.open(os.path.join(orig_dir, "M00_000_00_EyeIris_00.png")).convert("RGBA")
iw, ih = orig_iris.size
# Let's adjust orig_iris colors:
i_arr = np.array(orig_iris, dtype=np.float32)
r, g, b, a = i_arr[:,:,0], i_arr[:,:,1], i_arr[:,:,2], i_arr[:,:,3]
# Convert the bright red to deep warm hazel brown:
# Red in orig was ~200, we want brown/amber: R~110, G~70, B~45
mask = a > 20
i_arr[:,:,0] = np.clip(r * 0.55 + 15, 0, 255)
i_arr[:,:,1] = np.clip(r * 0.38 + 10, 0, 255)
i_arr[:,:,2] = np.clip(r * 0.22 + 10, 0, 255)
brown_iris = Image.fromarray(i_arr.astype(np.uint8), "RGBA")

# Add cyber accent: subtle cyan rim light arc at bottom of both irises
cyber_overlay = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(cyber_overlay)
centers = [(iw * 0.252, ih * 0.505), (iw * 0.748, ih * 0.505)]
r_iris = 92
for cx, cy in centers:
    # Subtle glowing cyan arc at bottom edge
    cdraw.arc([cx - r_iris, cy - r_iris, cx + r_iris, cy + r_iris], start=45, end=135, fill=(0, 220, 245, 190), width=6)
    # Subtle purple arc at top
    cdraw.arc([cx - r_iris, cy - r_iris, cx + r_iris, cy + r_iris], start=225, end=315, fill=(170, 50, 255, 140), width=5)

cyber_overlay = cyber_overlay.filter(ImageFilter.GaussianBlur(1.5))
final_iris = Image.alpha_composite(brown_iris, cyber_overlay)
final_iris.save(os.path.join(custom_dir, "M00_000_00_EyeIris_00.png"))
print("Refined Iris texture saved!")

# 3. REFINED HAIR TEXTURE (Voluminous dark hair with subtle cool sheen)
hair = Image.open(os.path.join(orig_dir, "F00_000_Hair_00.png")).convert("RGBA")
hw, hh = hair.size
h_arr = np.array(hair, dtype=np.float32)
# Deep natural espresso black
h_arr[:,:,0] = np.clip(h_arr[:,:,0] * 0.28 + 12, 0, 255)
h_arr[:,:,1] = np.clip(h_arr[:,:,1] * 0.28 + 12, 0, 255)
h_arr[:,:,2] = np.clip(h_arr[:,:,2] * 0.35 + 16, 0, 255) # cool undertone
dark_hair = Image.fromarray(h_arr.astype(np.uint8), "RGBA")
dark_hair.save(os.path.join(custom_dir, "F00_000_Hair_00.png"))
print("Refined Hair texture saved!")
