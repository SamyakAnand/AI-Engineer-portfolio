import bpy
import addon_utils
import os
import math
import shutil

# Enable VRM Addon
addon_utils.enable('VRM_Addon_for_Blender-release')

# Clear existing objects in default scene
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj)

# 1. Import VRM model
vrm_path = os.path.abspath('assets/sam-avatar/AvatarSample_C.vrm')
print(f"Loading VRM from {vrm_path}...")
bpy.ops.import_scene.vrm(filepath=vrm_path)

custom_tex_dir = os.path.abspath('assets/sam-avatar/textures_custom')

# 2. Swap materials/textures to our custom SAM textures
tex_map = {
    'M00_000_00_Face_00': 'M00_000_00_Face_00.png',
    'M00_000_00_FaceBrow_00': 'M00_000_00_FaceBrow_00.png',
    'M00_000_00_EyeIris_00': 'M00_000_00_EyeIris_00.png',
    'F00_000_Hair_00': 'F00_000_Hair_00.png',
    'M00_008_03_Tops_01': 'M00_008_03_Tops_01.png',
    'M00_000_00_Body_00': 'M00_000_00_Body_00.png',
    'M00_008_01_Bottoms_01': 'M00_008_01_Bottoms_01.png',
}

loaded_images = {}
for base_name, filename in tex_map.items():
    p = os.path.join(custom_tex_dir, filename)
    if os.path.exists(p):
        img = bpy.data.images.load(p)
        loaded_images[base_name] = img
        print(f"Loaded custom texture: {base_name} -> {filename}")

# Convert materials to standard Principled BSDF so GLTF/GLB export preserves all textures in Three.js
for mat in bpy.data.materials:
    if not mat.use_nodes:
        continue
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Find existing main texture node
    tex_node = None
    for n in nodes:
        if n.type == 'TEX_IMAGE' and n.image and n.image.size[0] > 16:
            # Check if this is the diffuse texture (not normal, not matcap)
            if 'nml' not in n.image.name.lower() and 'matcap' not in n.image.name.lower() and 'spe' not in n.image.name.lower() and 'out' not in n.image.name.lower():
                tex_node = n
                break
                
    if tex_node:
        # Check if our custom image should be plugged in directly
        for base_name, new_img in loaded_images.items():
            if base_name in tex_node.image.name:
                tex_node.image = new_img
                print(f"Assigned custom image directly to node {tex_node.name} in {mat.name}: {new_img.name}")
                break
                
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
            
        # Hook diffuse texture to Base Color
        links.new(tex_node.outputs['Color'], bsdf.inputs['Base Color'])
        if 'Alpha' in tex_node.outputs and 'Alpha' in bsdf.inputs:
            links.new(tex_node.outputs['Alpha'], bsdf.inputs['Alpha'])
            
        if 'Roughness' in bsdf.inputs:
            bsdf.inputs['Roughness'].default_value = 0.65
        if 'Metallic' in bsdf.inputs:
            bsdf.inputs['Metallic'].default_value = 0.05
        print(f"Standardized PBR material for Three.js: {mat.name}")

# 3. Create Oculus viseme and ARKit morph targets on Face mesh
face = bpy.data.objects.get('Face')
if face and face.data.shape_keys:
    kb = face.data.shape_keys.key_blocks
    
    # Helper to create a combined shape key from existing keys with weights
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

    # Standard Oculus Visemes:
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
        # ARKit shapes expected by Talking Avatar:
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

# 6. Set up camera & lighting for high-quality preview renders
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderEngine') else 'BLENDER_EEVEE'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.film_transparent = True

# Add Key Light (Warm soft fill)
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 80.0
key_light_data.size = 1.5
key_light_data.color = (1.0, 0.95, 0.9)
key_light = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
bpy.context.collection.objects.link(key_light)
key_light.location = (0.6, -1.2, 1.8)

# Add Cyberpunk Cyan Rim Light (Left)
cyan_light_data = bpy.data.lights.new(name="Cyan_Rim", type='SPOT')
cyan_light_data.energy = 120.0
cyan_light_data.color = (0.0, 0.85, 1.0)
cyan_light_data.spot_size = math.radians(65)
cyan_light = bpy.data.objects.new(name="Cyan_Rim", object_data=cyan_light_data)
bpy.context.collection.objects.link(cyan_light)
cyan_light.location = (-1.2, 0.8, 1.6)

# Add Cyberpunk Purple Rim Light (Right)
purple_light_data = bpy.data.lights.new(name="Purple_Rim", type='SPOT')
purple_light_data.energy = 130.0
purple_light_data.color = (0.7, 0.2, 1.0)
purple_light_data.spot_size = math.radians(65)
purple_light = bpy.data.objects.new(name="Purple_Rim", object_data=purple_light_data)
bpy.context.collection.objects.link(purple_light)
purple_light.location = (1.2, 0.8, 1.6)

# Camera setup
cam_data = bpy.data.cameras.new(name="AvatarCamera")
cam_data.lens = 75 # cinematic portrait focal length
cam = bpy.data.objects.new(name="AvatarCamera", object_data=cam_data)
bpy.context.collection.objects.link(cam)
scene.camera = cam

# Set Head / Face focus height (head is ~ 1.45m)
head_height = 1.42

renders_dir = os.path.abspath('assets/sam-avatar/renders')
os.makedirs(renders_dir, exist_ok=True)
art_dir = r'C:\Users\samya\.gemini\antigravity\brain\4310beb6-6eaa-4f17-ab60-2f237f828fb7'
branding_dir = os.path.abspath('public/branding')
os.makedirs(branding_dir, exist_ok=True)

# 1. Front View (Chest-up Portrait)
cam.location = (0.0, -1.35, head_height)
cam.rotation_euler = (math.radians(88), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-front.png')
bpy.ops.render.render(write_still=True)
print("Rendered Front View!")

# 2. Three-Quarter View (Cinematic 45 degree angle)
cam.location = (0.75, -1.15, head_height + 0.05)
cam.rotation_euler = (math.radians(86), 0, math.radians(33))
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-threequarter.png')
bpy.ops.render.render(write_still=True)
print("Rendered Three-Quarter View!")

# 3. Close-up Face View (Showing expression, eyes, beard, tilak)
cam.location = (0.0, -0.75, head_height + 0.02)
cam.rotation_euler = (math.radians(89), 0, 0)
scene.render.filepath = os.path.join(renders_dir, 'sam-avatar-face-closeup.png')
bpy.ops.render.render(write_still=True)
print("Rendered Face Close-up View!")

# Copy renders to branding and artifact folder
for r_name in ['sam-avatar-front.png', 'sam-avatar-threequarter.png', 'sam-avatar-face-closeup.png']:
    src = os.path.join(renders_dir, r_name)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(art_dir, r_name))
        print(f"Copied {r_name} to artifact directory!")

# Save primary preview for branding
shutil.copy(os.path.join(renders_dir, 'sam-avatar-threequarter.png'), os.path.join(branding_dir, 'sam-avatar-preview.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-avatar-transparent.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-face-closeup.png'), os.path.join(branding_dir, 'sam-chatbot-icon.png'))
shutil.copy(os.path.join(renders_dir, 'sam-avatar-front.png'), os.path.join(branding_dir, 'sam-social-avatar.png'))
print("All branding assets generated!")
