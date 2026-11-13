import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

custom_dir = "assets/sam-avatar/textures_custom"
orig_dir = "assets/sam-avatar/textures_original"

face = Image.open(os.path.join(orig_dir, "M00_000_00_Face_00.png")).convert("RGBA")
w, h = face.size
arr = np.array(face, dtype=np.float32)

# Warm olive-golden skin tone matching Samyak's portrait
arr[:,:,0] = np.clip(arr[:,:,0] * 0.95 + 6, 0, 255)
arr[:,:,1] = np.clip(arr[:,:,1] * 0.90 + 4, 0, 255)
arr[:,:,2] = np.clip(arr[:,:,2] * 0.82 + 2, 0, 255)
face_toned = Image.fromarray(arr.astype(np.uint8), "RGBA")

overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# 1. Forehead Tilak (x=512, y=442 - right between eyebrows in the open parted forehead area)
tx, ty = int(w * 0.5), int(h * 0.442)
draw.ellipse([tx - 7, ty - 11, tx + 7, ty + 11], fill=(215, 30, 40, 245))
draw.ellipse([tx - 4, ty - 6, tx + 4, ty + 6], fill=(245, 65, 75, 255))
draw.ellipse([tx - 2, ty - 3, tx + 2, ty + 3], fill=(255, 220, 220, 255))

# 2. Authentic Anime Styled Beard & Mustache
stubble_tone = (40, 32, 28)
beard_mask = Image.new("L", (w, h), 0)
bdraw = ImageDraw.Draw(beard_mask)

# Mustache: curved band across philtrum
bdraw.polygon([
    (w*0.5 - 6, h*0.718), (w*0.5 - 75, h*0.730), (w*0.5 - 70, h*0.748),
    (w*0.5 - 6, h*0.746)
], fill=150)
bdraw.polygon([
    (w*0.5 + 6, h*0.718), (w*0.5 + 75, h*0.730), (w*0.5 + 70, h*0.748),
    (w*0.5 + 6, h*0.746)
], fill=150)

# Chin beard & Goatee: soft rounded coverage over chin
bdraw.ellipse([w*0.5 - 55, h*0.795, w*0.5 + 55, h*0.875], fill=140)
# Soul patch
bdraw.polygon([(w*0.5 - 8, h*0.772), (w*0.5 + 8, h*0.772), (w*0.5, h*0.795)], fill=130)

# Jawline band
left_jaw = [
    (w*0.5 - 45, h*0.840), (w*0.5 - 130, h*0.815), (w*0.5 - 200, h*0.750),
    (w*0.5 - 185, h*0.740), (w*0.5 - 120, h*0.795), (w*0.5 - 40, h*0.825)
]
right_jaw = [
    (w*0.5 + 45, h*0.840), (w*0.5 + 130, h*0.815), (w*0.5 + 200, h*0.750),
    (w*0.5 + 185, h*0.740), (w*0.5 + 120, h*0.795), (w*0.5 + 40, h*0.825)
]
bdraw.polygon(left_jaw, fill=110)
bdraw.polygon(right_jaw, fill=110)

beard_mask_blurred = beard_mask.filter(ImageFilter.GaussianBlur(4.0))

mask_np = np.array(beard_mask_blurred, dtype=np.float32) / 255.0
beard_rgba = np.zeros((h, w, 4), dtype=np.uint8)
beard_rgba[:,:,0] = stubble_tone[0]
beard_rgba[:,:,1] = stubble_tone[1]
beard_rgba[:,:,2] = stubble_tone[2]
beard_rgba[:,:,3] = (mask_np * 180).astype(np.uint8)
beard_img = Image.fromarray(beard_rgba, "RGBA")

final_face = Image.alpha_composite(face_toned, overlay)
final_face = Image.alpha_composite(final_face, beard_img)
final_face.save(os.path.join(custom_dir, "M00_000_00_Face_00.png"))
print("Saved refined face skin with visible tilak!")
