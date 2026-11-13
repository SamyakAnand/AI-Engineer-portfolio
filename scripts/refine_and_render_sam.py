import bpy
import os
import math
import shutil

blend_path = os.path.abspath('assets/sam-avatar/sam-avatar-refined.blend')
print(f"Opening {blend_path}...")
bpy.ops.wm.open_mainfile(filepath=blend_path)

custom_tex_dir = os.path.abspath('assets/sam-avatar/textures_custom')

# 1. Reload refined textures directly onto materials
tex_files = {
    'Face': 'M00_000_00_Face_00.png',
    'Brow': 'M00_000_00_FaceBrow_00.png',
    'EyeIris': 'M00_000_00_EyeIris_00.png',
    'Hair': 'F00_000_Hair_00.png',
    'Tops': 'M00_008_03_Tops_01.png',
    'Body': 'M00_000_00_Body_00.png',
    'Bottoms': 'M00_008_01_Bottoms_01.png',
}

loaded_images = {}
for key, fname in tex_files.items():
    p = os.path.join(custom_tex_dir, fname)
    if os.path.exists(p):
        img = bpy.data.images.load(p, check_existing=False)
        loaded_images[key] = img
        print(f"Loaded {key}: {img.name} ({img.size[0]}x{img.size[1]})")

for mat in bpy.data.materials:
    if not mat.use_nodes:
        continue
    for n in mat.node_tree.nodes:
        if n.type == 'TEX_IMAGE' and n.image:
            iname = n.image.name
            for key, new_img in loaded_images.items():
                # match main diffuse image
                if key in iname and 'nml' not in iname.lower() and 'spe' not in iname.lower() and 'out' not in iname.lower() and 'matcap' not in iname.lower():
                    n.image = new_img
                    print(f"Updated node {n.name} in material {mat.name} to {new_img.name}")
                    break

# 2. Sweep front bangs to the right & lift to reveal forehead & tilak
hair = bpy.data.objects.get('Hair001')
if hair:
    for v in hair.data.vertices:
        world_co = hair.matrix_world @ v.co
        # Front bangs hanging low over forehead
        if world_co.y < -0.075 and world_co.z < 1.65:
            # Lift up and sweep right
            v.co.z += 0.040
            v.co.x += 0.025
            v.co.y += 0.012
    hair.data.update()
    print("Adjusted hair: front bangs swept to side revealing forehead!")

# 3. Rotate arms into natural relaxed standing pose
arm_obj = bpy.data.objects.get('Armature')
if arm_obj:
    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.mode_set(mode='POSE')
    
    # Left arm relax
    b_l = arm_obj.pose.bones.get('J_Bip_L_UpperArm')
    if b_l:
        b_l.rotation_mode = 'XYZ'
        b_l.rotation_euler = (math.radians(10), math.radians(5), math.radians(-62))
        
    # Right arm relax
    b_r = arm_obj.pose.bones.get('J_Bip_R_UpperArm')
    if b_r:
        b_r.rotation_mode = 'XYZ'
        b_r.rotation_euler = (math.radians(10), math.radians(-5), math.radians(62))
        
    bpy.ops.object.mode_set(mode='OBJECT')
    print("Relaxed arms from T-pose to natural standing posture!")

# 4. Save refined Blender file
bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print("Saved updated blend file!")

# 5. Export updated GLB to public/models/sam-avatar.glb
glb_path = os.path.abspath('public/models/sam-avatar.glb')
bpy.ops.export_scene.gltf(
    filepath=glb_path,
    export_format='GLB',
    use_selection=False,
    export_apply=False,
    export_yup=True,
    export_texcoords=True,
    export_normals=True,
    export_tangents=False,
    export_materials='EXPORT',
    export_morph=True,
    export_morph_normal=True,
    export_morph_tangent=False,
    export_skins=True,
    export_animations=True
)
print(f"Exported updated GLB: {glb_path} ({os.path.getsize(glb_path)} bytes)")

# 6. Render setup
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.film_transparent = True

# Clear old lights & cameras
for obj in list(scene.objects):
    if obj.type in ['LIGHT', 'CAMERA']:
        bpy.data.objects.remove(obj)

# Add Key Light (Warm soft fill)
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 85.0
key_light_data.size = 1.8
key_light_data.color = (1.0, 0.96, 0.92)
key_light = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
scene.collection.objects.link(key_light)
key_light.location = (0.5, -1.2, 1.8)

# Add Cyberpunk Cyan Rim Light (Left)
cyan_light_data = bpy.data.lights.new(name="Cyan_Rim", type='SPOT')
cyan_light_data.energy = 150.0
cyan_light_data.color = (0.0, 0.88, 1.0)
cyan_light_data.spot_size = math.radians(65)
cyan_light = bpy.data.objects.new(name="Cyan_Rim", object_data=cyan_light_data)
scene.collection.objects.link(cyan_light)
cyan_light.location = (-1.1, 0.8, 1.7)

# Add Cyberpunk Purple Rim Light (Right)
purple_light_data = bpy.data.lights.new(name="Purple_Rim", type='SPOT')
purple_light_data.energy = 150.0
purple_light_data.color = (0.7, 0.15, 1.0)
purple_light_data.spot_size = math.radians(65)
purple_light = bpy.data.objects.new(name="Purple_Rim", object_data=purple_light_data)
scene.collection.objects.link(purple_light)
purple_light.location = (1.1, 0.8, 1.7)

# Camera setup
cam_data = bpy.data.cameras.new(name="AvatarCamera")
cam_data.lens = 75
cam = bpy.data.objects.new(name="AvatarCamera", object_data=cam_data)
scene.collection.objects.link(cam)
scene.camera = cam

head_center_z = 1.62
renders_dir = os.path.abspath('assets/sam-avatar/renders')
art_dir = r'C:\Users\samya\.gemini\antigravity\brain\4310beb6-6eaa-4f17-ab60-2f237f828fb7'
branding_dir = os.path.abspath('public/branding')

# 1. Front View (Chest-up Portrait)
cam.location = (0.0, -1.15, head_center_z - 0.05)
cam.rotation_euler = (math.radians(90), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-front.png')
bpy.ops.render.render(write_still=True)
print("Rendered Front View!")

# 2. Three-Quarter View (Cinematic 30 degree angle)
cam.location = (0.55, -1.05, head_center_z - 0.02)
cam.rotation_euler = (math.radians(88), 0, math.radians(28))
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-threequarter.png')
bpy.ops.render.render(write_still=True)
print("Rendered Three-Quarter View!")

# 3. Close-up Face View (Showing expression, eyes, beard, tilak)
cam.location = (0.0, -0.62, head_center_z)
cam.rotation_euler = (math.radians(90), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-face-closeup.png')
bpy.ops.render.render(write_still=True)
print("Rendered Face Close-up View!")

# Copy renders
for r_name in ['sam-avatar-front.png', 'sam-avatar-threequarter.png', 'sam-avatar-face-closeup.png']:
    src = os.path.join(renders_dir, r_name)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(art_dir, r_name))
        print(f"Copied {r_name} to artifact directory!")

shutil.copy(os.path.join(renders_dir, 'sam-avatar-threequarter.png'), os.path.join(branding_dir, 'sam-avatar-preview.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-avatar-transparent.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-face-closeup.png'), os.path.join(branding_dir, 'sam-chatbot-icon.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-social-avatar.png'))
print("All assets finalized successfully!")
