import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

# 1. RE-GENERATE CLEAN, GORGEOUS ANIME TEXTURES
custom_dir = "assets/sam-avatar/textures_custom"
orig_dir = "assets/sam-avatar/textures_original"
os.makedirs(custom_dir, exist_ok=True)

# FACE SKIN (Warm radiant olive tone, subtle realistic anime beard & mustache, clean tilak)
face = Image.open(os.path.join(orig_dir, "M00_000_00_Face_00.png")).convert("RGBA")
w, h = face.size
arr = np.array(face, dtype=np.float32)
# Warm olive-golden South Asian skin tone
arr[:,:,0] = np.clip(arr[:,:,0] * 0.95 + 8, 0, 255)
arr[:,:,1] = np.clip(arr[:,:,1] * 0.90 + 4, 0, 255)
arr[:,:,2] = np.clip(arr[:,:,2] * 0.82 + 2, 0, 255)
face_toned = Image.fromarray(arr.astype(np.uint8), "RGBA")

overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Forehead Tilak (x=512, y=390, red oval with white highlight)
tx, ty = int(w * 0.5), int(h * 0.395)
draw.ellipse([tx - 7, ty - 12, tx + 7, ty + 12], fill=(215, 35, 45, 245))
draw.ellipse([tx - 4, ty - 7, tx + 4, ty + 7], fill=(245, 70, 75, 255))
draw.ellipse([tx - 2, ty - 3, tx + 2, ty + 3], fill=(255, 220, 220, 255))

# Soft, stylized anime beard and mustache:
# Nose is at y=655, mouth is at y=755, chin is at y=810-880.
# Mustache (soft oval arc above mouth slit, y=715 to 745)
draw.ellipse([w*0.5 - 65, h*0.718, w*0.5 - 8, h*0.744], fill=(36, 26, 24, 180))
draw.ellipse([w*0.5 + 8, h*0.718, w*0.5 + 65, h*0.744], fill=(36, 26, 24, 180))

# Chin goatee (soft oval on chin, y=805 to 870)
draw.ellipse([w*0.5 - 45, h*0.805, w*0.5 + 45, h*0.870], fill=(34, 25, 23, 195))

# Soul patch (under mouth, y=772 to 790)
draw.ellipse([w*0.5 - 12, h*0.772, w*0.5 + 12, h*0.792], fill=(36, 26, 24, 160))

# Jawline shadow/stubble (subtle curve along jaw)
jaw_points = [
    (w*0.5 - 180, h*0.760), (w*0.5 - 130, h*0.810), (w*0.5 - 50, h*0.850),
    (w*0.5 + 50, h*0.850), (w*0.5 + 130, h*0.810), (w*0.5 + 180, h*0.760),
    (w*0.5 + 160, h*0.785), (w*0.5 + 120, h*0.835), (w*0.5, h*0.880),
    (w*0.5 - 120, h*0.835), (w*0.5 - 160, h*0.785)
]
draw.polygon(jaw_points, fill=(35, 25, 24, 140))

# High quality Gaussian blur on overlay so facial hair integrates seamlessly into 3D anime face
overlay_blur = overlay.filter(ImageFilter.GaussianBlur(3.5))
final_face = Image.alpha_composite(face_toned, overlay_blur)
final_face.save(os.path.join(custom_dir, "M00_000_00_Face_00.png"))
print("Generated clean custom face skin!")

# EYEBROWS (Dark, styled masculine brows)
brow = Image.open(os.path.join(orig_dir, "M00_000_00_FaceBrow_00.png")).convert("RGBA")
bw, bh = brow.size
barr = np.array(brow, dtype=np.float32)
# Darken toward deep espresso/black
barr[:,:,0] *= 0.20
barr[:,:,1] *= 0.18
barr[:,:,2] *= 0.16
barr[:,:,3] = np.clip(barr[:,:,3] * 1.3, 0, 255)
dark_brow = Image.fromarray(barr.astype(np.uint8), "RGBA")
dark_brow.save(os.path.join(custom_dir, "M00_000_00_FaceBrow_00.png"))
print("Generated clean dark eyebrows!")

# EYE IRIS (Anime protagonist: rich hazel-brown with glowing cyan crescent)
iris = Image.open(os.path.join(orig_dir, "M00_000_00_EyeIris_00.png")).convert("RGBA")
iw, ih = iris.size
iarr = np.array(iris, dtype=np.float32)
# Shift base red to rich hazel/amber brown
iarr[:,:,0] = np.clip(iarr[:,:,0] * 0.55 + 20, 0, 255)
iarr[:,:,1] = np.clip(iarr[:,:,0] * 0.40 + 15, 0, 255)
iarr[:,:,2] = np.clip(iarr[:,:,0] * 0.22 + 10, 0, 255)
brown_iris = Image.fromarray(iarr.astype(np.uint8), "RGBA")

# Add glowing cyan cyber crescent on bottom rim of each iris
c_overlay = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(c_overlay)
for cx in [iw * 0.252, iw * 0.748]:
    cy = ih * 0.505
    cdraw.arc([cx - 95, cy - 95, cx + 95, cy + 95], start=40, end=140, fill=(0, 230, 255, 230), width=8)
    cdraw.arc([cx - 95, cy - 95, cx + 95, cy + 95], start=220, end=320, fill=(180, 70, 255, 170), width=6)
c_overlay = c_overlay.filter(ImageFilter.GaussianBlur(1.8))
final_iris = Image.alpha_composite(brown_iris, c_overlay)
final_iris.save(os.path.join(custom_dir, "M00_000_00_EyeIris_00.png"))
print("Generated clean anime cyber iris!")

# HAIR (Glossy espresso black)
hair = Image.open(os.path.join(orig_dir, "F00_000_Hair_00.png")).convert("RGBA")
hw, hh = hair.size
harr = np.array(hair, dtype=np.float32)
harr[:,:,0] = np.clip(harr[:,:,0] * 0.28 + 10, 0, 255)
harr[:,:,1] = np.clip(harr[:,:,1] * 0.28 + 10, 0, 255)
harr[:,:,2] = np.clip(harr[:,:,2] * 0.35 + 16, 0, 255)
dark_hair = Image.fromarray(harr.astype(np.uint8), "RGBA")
dark_hair.save(os.path.join(custom_dir, "F00_000_Hair_00.png"))
print("Generated clean hair texture!")

print("All refined custom textures generated!")
