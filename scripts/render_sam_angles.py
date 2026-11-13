import bpy
import os
import math
import shutil

# Open the refined blend file
blend_path = os.path.abspath('assets/sam-avatar/sam-avatar-refined.blend')
print(f"Opening {blend_path}...")
bpy.ops.wm.open_mainfile(filepath=blend_path)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.film_transparent = True

# Add Key Light (Warm soft fill)
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 100.0
key_light_data.size = 1.5
key_light_data.color = (1.0, 0.96, 0.92)
key_light = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
bpy.context.collection.objects.link(key_light)
key_light.location = (0.5, -1.2, 1.7)

# Add Cyberpunk Cyan Rim Light (Left)
cyan_light_data = bpy.data.lights.new(name="Cyan_Rim", type='SPOT')
cyan_light_data.energy = 160.0
cyan_light_data.color = (0.0, 0.85, 1.0)
cyan_light_data.spot_size = math.radians(65)
cyan_light = bpy.data.objects.new(name="Cyan_Rim", object_data=cyan_light_data)
bpy.context.collection.objects.link(cyan_light)
cyan_light.location = (-1.1, 0.8, 1.6)

# Add Cyberpunk Purple Rim Light (Right)
purple_light_data = bpy.data.lights.new(name="Purple_Rim", type='SPOT')
purple_light_data.energy = 160.0
purple_light_data.color = (0.68, 0.15, 1.0)
purple_light_data.spot_size = math.radians(65)
purple_light = bpy.data.objects.new(name="Purple_Rim", object_data=purple_light_data)
bpy.context.collection.objects.link(purple_light)
purple_light.location = (1.1, 0.8, 1.6)

# Camera setup
cam_data = bpy.data.cameras.new(name="AvatarCamera")
cam_data.lens = 70
cam = bpy.data.objects.new(name="AvatarCamera", object_data=cam_data)
bpy.context.collection.objects.link(cam)
scene.camera = cam

head_height = 1.38

renders_dir = os.path.abspath('assets/sam-avatar/renders')
os.makedirs(renders_dir, exist_ok=True)
art_dir = r'C:\Users\samya\.gemini\antigravity\brain\4310beb6-6eaa-4f17-ab60-2f237f828fb7'
branding_dir = os.path.abspath('public/branding')
os.makedirs(branding_dir, exist_ok=True)

# 1. Front View (Chest-up Portrait)
cam.location = (0.0, -1.25, head_height)
cam.rotation_euler = (math.radians(90), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-front.png')
bpy.ops.render.render(write_still=True)
print("Rendered Front View!")

# 2. Three-Quarter View (Cinematic 30 degree angle)
cam.location = (0.60, -1.15, head_height + 0.03)
cam.rotation_euler = (math.radians(88), 0, math.radians(28))
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-threequarter.png')
bpy.ops.render.render(write_still=True)
print("Rendered Three-Quarter View!")

# 3. Close-up Face View (Showing expression, eyes, beard, tilak)
cam.location = (0.0, -0.65, head_height + 0.01)
cam.rotation_euler = (math.radians(90), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-face-closeup.png')
bpy.ops.render.render(write_still=True)
print("Rendered Face Close-up View!")

# Copy renders to branding and artifact folder
for r_name in ['sam-avatar-front.png', 'sam-avatar-threequarter.png', 'sam-avatar-face-closeup.png']:
    src = os.path.join(renders_dir, r_name)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(art_dir, r_name))
        print(f"Copied {r_name} to artifact directory!")

# Save primary previews for branding
shutil.copy(os.path.join(renders_dir, 'sam-avatar-threequarter.png'), os.path.join(branding_dir, 'sam-avatar-preview.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-avatar-transparent.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-face-closeup.png'), os.path.join(branding_dir, 'sam-chatbot-icon.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-social-avatar.png'))
print("All branding assets generated and copied successfully!")
