import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

os.makedirs("assets/sam-avatar/textures_custom", exist_ok=True)
orig_dir = "assets/sam-avatar/textures_original"
custom_dir = "assets/sam-avatar/textures_custom"

# 1. CUSTOM FACE TEXTURE (Warm olive skin, beard/mustache, forehead tilak)
face_path = os.path.join(orig_dir, "M00_000_00_Face_00.png")
if os.path.exists(face_path):
    face = Image.open(face_path).convert("RGBA")
    w, h = face.size
    
    # Warmer olive skin adjustment on skin tones
    arr = np.array(face, dtype=np.float32)
    # Target warmer olive undertone for skin pixels
    # Shift slight red and decrease harsh pale pink
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    mask = a > 50
    # Blend with warm golden-olive (#d9a982 / #c8956e)
    arr[:,:,0] = np.clip(r * 0.98 + 15, 0, 255)
    arr[:,:,1] = np.clip(g * 0.94 + 5, 0, 255)
    arr[:,:,2] = np.clip(b * 0.88 - 5, 0, 255)
    face_toned = Image.fromarray(arr.astype(np.uint8), "RGBA")
    
    # Overlay canvas for beard, mustache, tilak
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Facial UV Coordinates for VRoid Face:
    # VRoid face texture is symmetrical / unwrapped face:
    # Center of face (nose, mouth, chin) is around x = 0.5 * w = 512
    # Forehead is around y = 200 - 350
    # Eyes are around y = 420 - 540
    # Nose is around y = 580 - 650
    # Mouth is around y = 690 - 740
    # Chin & jawline is around y = 740 - 900
    
    # Forehead Tilak (Red sacred mark)
    # Placed between and slightly above eyebrows: x ~ 512, y ~ 410
    tilak_x, tilak_y = int(w * 0.5), int(h * 0.405)
    # Red vermilion color (#c82333) with soft outer glow
    draw.ellipse([tilak_x - 8, tilak_y - 12, tilak_x + 8, tilak_y + 12], fill=(200, 35, 50, 230))
    draw.ellipse([tilak_x - 4, tilak_y - 7, tilak_x + 4, tilak_y + 7], fill=(235, 60, 70, 255))
    draw.point([tilak_x, tilak_y], fill=(255, 180, 180, 255))
    
    # Mustache: philtrum and above upper lip (y: 660 - 695, x: 440 - 584)
    mustache_color = (35, 28, 25, 190)
    for i in range(120):
        mx = np.random.normal(w * 0.5, 38)
        my = np.random.normal(h * 0.672, 7)
        if 655 < my < 692 and abs(mx - w*0.5) < 70:
            draw.ellipse([mx-1.5, my-1.5, mx+1.5, my+1.5], fill=mustache_color)
            
    # Beard on chin and jawline (y: 740 - 890)
    beard_color = (30, 24, 22, 185)
    # Chin cluster
    for i in range(250):
        bx = np.random.normal(w * 0.5, 32)
        by = np.random.normal(h * 0.775, 16)
        if 745 < by < 835 and abs(bx - w*0.5) < 55:
            draw.ellipse([bx-2, by-2, bx+2, by+2], fill=beard_color)
            
    # Jawline and cheek stubble contour
    for i in range(400):
        # Left and right symmetrical jawline
        side = 1 if np.random.rand() > 0.5 else -1
        dist_x = np.random.uniform(35, 140)
        jx = w * 0.5 + side * dist_x
        # Jaw angle curves down from ears to chin
        t = dist_x / 140.0
        jy = h * (0.68 + 0.16 * (1.0 - t*0.7)) + np.random.normal(0, 14)
        if 660 < jy < 850:
            draw.ellipse([jx-1.5, jy-1.5, jx+1.5, jy+1.5], fill=(32, 26, 24, 150))
            
    # Soften beard overlay slightly for natural anime texture integration
    overlay_blur = overlay.filter(ImageFilter.GaussianBlur(0.8))
    final_face = Image.alpha_composite(face_toned, overlay_blur)
    final_face.save(os.path.join(custom_dir, "M00_000_00_Face_00.png"))
    print("Generated custom face texture!")

# 2. CUSTOM EYEBROWS (Dark, masculine, styled)
brow_path = os.path.join(orig_dir, "M00_000_00_FaceBrow_00.png")
if os.path.exists(brow_path):
    brow = Image.open(brow_path).convert("RGBA")
    bw, bh = brow.size
    # Darken and thicken brows to match Samyak's bold masculine brow structure
    brow_arr = np.array(brow, dtype=np.float32)
    # Darken RGB toward near-black with deep warm undertone
    brow_arr[:,:,0] *= 0.25
    brow_arr[:,:,1] *= 0.22
    brow_arr[:,:,2] *= 0.20
    # Increase density of alpha
    brow_arr[:,:,3] = np.clip(brow_arr[:,:,3] * 1.35, 0, 255)
    dark_brow = Image.fromarray(brow_arr.astype(np.uint8), "RGBA")
    dark_brow.save(os.path.join(custom_dir, "M00_000_00_FaceBrow_00.png"))
    print("Generated custom eyebrow texture!")

# 3. CUSTOM EYE IRIS (Anime protagonist: rich dark amber-hazel with cyan & purple luminous rim)
iris_path = os.path.join(orig_dir, "M00_000_00_EyeIris_00.png")
if os.path.exists(iris_path):
    iris = Image.open(iris_path).convert("RGBA")
    iw, ih = iris.size
    # Create cyber-anime iris
    base_iris = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
    idraw = ImageDraw.Draw(base_iris)
    
    # Both eyes are in left and right halves
    centers = [(iw * 0.25, ih * 0.5), (iw * 0.75, ih * 0.5)]
    r_outer = min(iw, ih) * 0.38
    r_inner = r_outer * 0.45
    
    for cx, cy in centers:
        # Outer dark ring
        idraw.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], fill=(22, 18, 25, 255))
        # Deep amber/brown iris body
        idraw.ellipse([cx - r_outer*0.92, cy - r_outer*0.92, cx + r_outer*0.92, cy + r_outer*0.92], fill=(68, 42, 30, 255))
        # Inner warm hazel gradient
        idraw.ellipse([cx - r_outer*0.75, cy - r_outer*0.75, cx + r_outer*0.75, cy + r_outer*0.75], fill=(115, 75, 45, 255))
        # Subtle cyan glow crescent at bottom (futuristic accent)
        idraw.arc([cx - r_outer*0.82, cy - r_outer*0.82, cx + r_outer*0.82, cy + r_outer*0.82], start=30, end=150, fill=(0, 220, 240, 220), width=int(r_outer*0.12))
        # Subtle purple glow arc at top right
        idraw.arc([cx - r_outer*0.82, cy - r_outer*0.82, cx + r_outer*0.82, cy + r_outer*0.82], start=210, end=330, fill=(160, 60, 240, 180), width=int(r_outer*0.10))
        # Deep pupil
        idraw.ellipse([cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner], fill=(12, 10, 15, 255))
        # Central specular pinpoint
        idraw.ellipse([cx - r_inner*0.35, cy - r_inner*0.35, cx - r_inner*0.05, cy - r_inner*0.05], fill=(255, 255, 255, 230))
        
    base_iris = base_iris.filter(ImageFilter.GaussianBlur(0.6))
    base_iris.save(os.path.join(custom_dir, "M00_000_00_EyeIris_00.png"))
    print("Generated custom iris texture!")

# 4. CUSTOM HAIR (Jet black with subtle cool midnight sheen)
hair_path = os.path.join(orig_dir, "F00_000_Hair_00.png")
if os.path.exists(hair_path):
    hair = Image.open(hair_path).convert("RGBA")
    hw, hh = hair.size
    h_arr = np.array(hair, dtype=np.float32)
    # Shift base to dark midnight black with subtle blue-violet undertone
    h_arr[:,:,0] = np.clip(h_arr[:,:,0] * 0.22, 0, 255)
    h_arr[:,:,1] = np.clip(h_arr[:,:,1] * 0.22, 0, 255)
    h_arr[:,:,2] = np.clip(h_arr[:,:,2] * 0.28, 0, 255) # slight cool sheen
    dark_hair = Image.fromarray(h_arr.astype(np.uint8), "RGBA")
    dark_hair.save(os.path.join(custom_dir, "F00_000_Hair_00.png"))
    print("Generated custom hair texture!")

# 5. CUSTOM TECHWEAR JACKET / HOODIE (Black cyberpunk hoodie with harness straps and purple/cyan detailing)
tops_path = os.path.join(orig_dir, "M00_008_03_Tops_01.png")
if os.path.exists(tops_path):
    tops = Image.open(tops_path).convert("RGBA")
    tw, th = tops.size
    t_arr = np.array(tops, dtype=np.float32)
    # Convert grey jacket panels to stealth matte black (#121316)
    r, g, b, a = t_arr[:,:,0], t_arr[:,:,1], t_arr[:,:,2], t_arr[:,:,3]
    t_arr[:,:,0] = np.clip(r * 0.25 + 10, 0, 255)
    t_arr[:,:,1] = np.clip(g * 0.25 + 10, 0, 255)
    t_arr[:,:,2] = np.clip(b * 0.28 + 14, 0, 255)
    black_tops = Image.fromarray(t_arr.astype(np.uint8), "RGBA")
    
    # Overlay harness straps, cyan seams, purple LED accent
    toverlay = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(toverlay)
    
    # Backpack straps on front chest (two vertical black/dark grey straps with buckle accents)
    # UV for chest: center around tw*0.5, y ~ th*0.25 - 0.75
    strap_l_x = int(tw * 0.38)
    strap_r_x = int(tw * 0.62)
    strap_width = int(tw * 0.038)
    
    for sx in [strap_l_x, strap_r_x]:
        # Main nylon webbing strap
        tdraw.rectangle([sx - strap_width//2, int(th*0.15), sx + strap_width//2, int(th*0.65)], fill=(18, 18, 22, 240))
        # Tactical edge piping
        tdraw.line([(sx - strap_width//2, int(th*0.15)), (sx - strap_width//2, int(th*0.65))], fill=(40, 42, 50, 255), width=2)
        tdraw.line([(sx + strap_width//2, int(th*0.15)), (sx + strap_width//2, int(th*0.65))], fill=(40, 42, 50, 255), width=2)
        # Buckles / MOLLE loops
        for by in range(int(th*0.25), int(th*0.60), int(th*0.08)):
            tdraw.rectangle([sx - strap_width//2 - 2, by, sx + strap_width//2 + 2, by + int(th*0.015)], fill=(50, 52, 60, 255))
            # Subtle cyan reflective stitching
            tdraw.line([(sx - strap_width//2, by + int(th*0.007)), (sx + strap_width//2, by + int(th*0.007))], fill=(0, 225, 245, 180), width=1)
            
    # Cyberpunk purple/cyan luminescent seams along collar and center zipper
    cx = int(tw * 0.5)
    # Center zipper with subtle cyan glow line
    tdraw.line([(cx - 1, int(th*0.12)), (cx - 1, int(th*0.75))], fill=(0, 230, 255, 160), width=2)
    # Chest badge: "SAM.exe" minimalist sci-fi emblem on left chest (around tw*0.30, th*0.35)
    tdraw.rectangle([int(tw*0.26), int(th*0.33), int(tw*0.34), int(th*0.37)], fill=(20, 22, 28, 220), outline=(140, 50, 255, 230), width=2)
    tdraw.line([(int(tw*0.27), int(th*0.35)), (int(tw*0.33), int(th*0.35))], fill=(0, 240, 255, 255), width=2)
    
    final_tops = Image.alpha_composite(black_tops, toverlay)
    final_tops.save(os.path.join(custom_dir, "M00_008_03_Tops_01.png"))
    print("Generated custom techwear tops texture!")

# 6. BODY SKIN (Matching warm olive skin tone for neck and hands)
body_path = os.path.join(orig_dir, "M00_000_00_Body_00.png")
if os.path.exists(body_path):
    body = Image.open(body_path).convert("RGBA")
    barr = np.array(body, dtype=np.float32)
    barr[:,:,0] = np.clip(barr[:,:,0] * 0.98 + 15, 0, 255)
    barr[:,:,1] = np.clip(barr[:,:,1] * 0.94 + 5, 0, 255)
    barr[:,:,2] = np.clip(barr[:,:,2] * 0.88 - 5, 0, 255)
    final_body = Image.fromarray(barr.astype(np.uint8), "RGBA")
    final_body.save(os.path.join(custom_dir, "M00_000_00_Body_00.png"))
    print("Generated custom body skin texture!")

# 7. TECHWEAR BOTTOMS (Stealth dark tactical pants)
bottoms_path = os.path.join(orig_dir, "M00_008_01_Bottoms_01.png")
if os.path.exists(bottoms_path):
    bottoms = Image.open(bottoms_path).convert("RGBA")
    bot_arr = np.array(bottoms, dtype=np.float32)
    bot_arr[:,:,0] = np.clip(bot_arr[:,:,0] * 0.25 + 10, 0, 255)
    bot_arr[:,:,1] = np.clip(bot_arr[:,:,1] * 0.25 + 10, 0, 255)
    bot_arr[:,:,2] = np.clip(bot_arr[:,:,2] * 0.28 + 14, 0, 255)
    final_bottoms = Image.fromarray(bot_arr.astype(np.uint8), "RGBA")
    final_bottoms.save(os.path.join(custom_dir, "M00_008_01_Bottoms_01.png"))
    print("Generated custom techwear bottoms texture!")

print("All customized textures generated successfully!")
