import bpy
import addon_utils
import os
import math
import shutil

# Enable VRM Addon
addon_utils.enable('VRM_Addon_for_Blender-release')

# Clear existing scene completely
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj)
for mat in list(bpy.data.materials):
    bpy.data.materials.remove(mat)
for img in list(bpy.data.images):
    bpy.data.images.remove(img)

# 1. Import fresh VRM model
vrm_path = os.path.abspath('assets/sam-avatar/AvatarSample_C.vrm')
print(f"Importing {vrm_path}...")
bpy.ops.import_scene.vrm(filepath=vrm_path)

custom_tex_dir = os.path.abspath('assets/sam-avatar/textures_custom')

# Exact Material to Custom Texture Map
exact_mat_tex = {
    'M00_000_00_Face_00_SKIN': 'M00_000_00_Face_00.png',
    'M00_000_00_FaceBrow_00_FACE': 'M00_000_00_FaceBrow_00.png',
    'M00_000_00_EyeIris_00_EYE': 'M00_000_00_EyeIris_00.png',
    'F00_000_Hair_00_HAIR': 'F00_000_Hair_00.png',
    'M00_008_03_Tops_01_CLOTH': 'M00_008_03_Tops_01.png',
    'M00_000_00_Body_00_SKIN': 'M00_000_00_Body_00.png',
    'M00_008_01_Bottoms_01_CLOTH': 'M00_008_01_Bottoms_01.png',
    # Outline materials (same diffuse texture)
    'MToon Outline (M00_000_00_Face_00_SKIN)': 'M00_000_00_Face_00.png',
    'MToon Outline (F00_000_Hair_00_HAIR)': 'F00_000_Hair_00.png',
    'MToon Outline (M00_008_03_Tops_01_CLOTH)': 'M00_008_03_Tops_01.png',
    'MToon Outline (M00_000_00_Body_00_SKIN)': 'M00_000_00_Body_00.png',
    'MToon Outline (M00_008_01_Bottoms_01_CLOTH)': 'M00_008_01_Bottoms_01.png',
}

loaded_images = {}
for mat_name, filename in exact_mat_tex.items():
    p = os.path.join(custom_tex_dir, filename)
    if os.path.exists(p) and filename not in loaded_images:
        loaded_images[filename] = bpy.data.images.load(p)
        print(f"Loaded {filename}")

# Standardize materials with Principled BSDF
for mat in bpy.data.materials:
    if not mat.use_nodes:
        continue
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Check if this material has a custom texture replacement
    replacement_img = None
    if mat.name in exact_mat_tex:
        replacement_img = loaded_images.get(exact_mat_tex[mat.name])
        
    # Find existing diffuse texture node
    tex_node = None
    for n in nodes:
        if n.type == 'TEX_IMAGE' and n.image and n.image.size[0] > 16:
            iname = n.image.name.lower()
            if 'nml' not in iname and 'matcap' not in iname and 'spe' not in iname and 'out' not in iname:
                tex_node = n
                break
                
    if tex_node:
        if replacement_img:
            tex_node.image = replacement_img
            print(f"Applied custom texture {replacement_img.name} to material {mat.name}")
            
        # Ensure Principled BSDF
        bsdf = None
        for n in nodes:
            if n.type == 'BSDF_PRINCIPLED':
                bsdf = n
                break
        if not bsdf:
            bsdf = nodes.new('ShaderNodeBsdfPrincipled')
            out_node = None
            for n in nodes:
                if n.type == 'OUTPUT_MATERIAL':
                    out_node = n
                    break
            if not out_node:
                out_node = nodes.new('ShaderNodeOutputMaterial')
            links.new(bsdf.outputs['BSDF'], out_node.inputs['Surface'])
            
        links.new(tex_node.outputs['Color'], bsdf.inputs['Base Color'])
        if 'Alpha' in tex_node.outputs and 'Alpha' in bsdf.inputs:
            links.new(tex_node.outputs['Alpha'], bsdf.inputs['Alpha'])
            
        if 'Roughness' in bsdf.inputs:
            bsdf.inputs['Roughness'].default_value = 0.65
        if 'Metallic' in bsdf.inputs:
            bsdf.inputs['Metallic'].default_value = 0.05

# 2. Relax Arms to natural standing posture
arm_obj = bpy.data.objects.get('Armature')
if arm_obj:
    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.mode_set(mode='POSE')
    
    b_l = arm_obj.pose.bones.get('J_Bip_L_UpperArm')
    if b_l:
        b_l.rotation_mode = 'XYZ'
        b_l.rotation_euler = (math.radians(-70), 0, 0)
        
    b_r = arm_obj.pose.bones.get('J_Bip_R_UpperArm')
    if b_r:
        b_r.rotation_mode = 'XYZ'
        b_r.rotation_euler = (math.radians(-70), 0, 0)
        
    bpy.ops.object.mode_set(mode='OBJECT')
    print("Relaxed arms from T-pose to natural standing posture!")

# 3. Create Oculus viseme and ARKit morph targets on Face mesh
face = bpy.data.objects.get('Face')
if face and face.data.shape_keys:
    kb = face.data.shape_keys.key_blocks
    
    def create_combined_viseme(name, recipe):
        for k in kb:
            k.value = 0.0
        for k_name, weight in recipe.items():
            for k in kb:
                if k_name in k.name:
                    k.value = weight
                    break
        new_key = face.shape_key_add(name=name, from_mix=True)
        for k in kb:
            k.value = 0.0
        print(f"Created viseme shape key: {name}")
        return new_key

    viseme_recipes = {
        'viseme_sil': {},
        'viseme_PP': {'Fcl_MTH_Close': 1.0},
        'viseme_FF': {'Fcl_MTH_Close': 0.6, 'Fcl_MTH_I': 0.35},
        'viseme_TH': {'Fcl_MTH_I': 0.45, 'Fcl_MTH_A': 0.2},
        'viseme_DD': {'Fcl_MTH_I': 0.5, 'Fcl_MTH_A': 0.15},
        'viseme_kk': {'Fcl_MTH_A': 0.35, 'Fcl_MTH_E': 0.3},
        'viseme_CH': {'Fcl_MTH_U': 0.5, 'Fcl_MTH_I': 0.35},
        'viseme_SS': {'Fcl_MTH_I': 0.75},
        'viseme_nn': {'Fcl_MTH_I': 0.45},
        'viseme_RR': {'Fcl_MTH_U': 0.8, 'Fcl_MTH_O': 0.3},
        'viseme_aa': {'Fcl_MTH_A': 1.0},
        'viseme_E':  {'Fcl_MTH_E': 1.0},
        'viseme_I':  {'Fcl_MTH_I': 1.0},
        'viseme_O':  {'Fcl_MTH_O': 1.0},
        'viseme_U':  {'Fcl_MTH_U': 1.0},
        'eyeBlinkLeft':  {'Fcl_EYE_Close_L': 1.0},
        'eyeBlinkRight': {'Fcl_EYE_Close_R': 1.0},
        'browInnerUp':   {'Fcl_BRW_Fun': 0.6, 'Fcl_BRW_Surprised': 0.4},
        'jawOpen':       {'Fcl_MTH_A': 1.0},
        'mouthClose':    {'Fcl_MTH_Close': 1.0},
        'mouthFunnel':   {'Fcl_MTH_O': 0.85, 'Fcl_MTH_U': 0.35},
        'mouthPucker':   {'Fcl_MTH_U': 1.0},
        'mouthSmileLeft':  {'Fcl_MTH_Joy': 0.8},
        'mouthSmileRight': {'Fcl_MTH_Joy': 0.8},
    }
    
    for v_name, recipe in viseme_recipes.items():
        if v_name in kb:
            continue
        create_combined_viseme(v_name, recipe)

# 4. Save Blender refinement project
os.makedirs('assets/sam-avatar', exist_ok=True)
blend_path = os.path.abspath('assets/sam-avatar/sam-avatar-refined.blend')
bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print(f"Saved refined Blender project to {blend_path}")

# 5. Export full GLB to public/models/sam-avatar.glb
os.makedirs('public/models', exist_ok=True)
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
print(f"Exported finalized GLB to {glb_path} ({os.path.getsize(glb_path)} bytes)!")

# 6. Render 3 cinematic preview angles
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.film_transparent = True

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
