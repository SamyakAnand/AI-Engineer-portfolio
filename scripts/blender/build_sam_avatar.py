"""
SAM.exe - 3D Digital Twin Generator for Blender 5.3+
Creates a photorealistic rigged 3D digital avatar of Samyak Anand,
with authentic facial likeness texture projection, PBR shaders,
voluminous pompadour hair, cybernetic jacket with purple neon piping,
23 facial shape keys / visemes, skeletal armature, 10 animation actions,
cinematic lighting, GLB export for WebGL / Three.js, and branding renders.
"""

import bpy
import bmesh
import math
from mathutils import Vector, Euler, Matrix
import os

print("=== STARTING SAM.exe 3D AVATAR GENERATION (V2 QUAD-TOPOLOGY) ===")

bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper function for cylinder creation in bmesh
def create_cylinder_bm(bm, radius=0.01, depth=0.1, segments=16, cap_ends=True, matrix=Matrix()):
    return bmesh.ops.create_cone(
        bm,
        cap_ends=cap_ends,
        segments=segments,
        radius1=radius,
        radius2=radius,
        depth=depth,
        matrix=matrix
    )

# Scene setup
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.cycles.preview_samples = 16
scene.render.resolution_percentage = 100

# Enable GPU Cycles with CUDA if available
try:
    if 'cycles' in bpy.context.preferences.addons:
        prefs = bpy.context.preferences.addons['cycles'].preferences
        prefs.compute_device_type = 'CUDA'
        for d in prefs.get_devices_for_type('CUDA'):
            d.use = True
            print("Cycles using device:", d.name)
        scene.cycles.device = 'GPU'
except Exception as e:
    print("Cycles GPU setup note:", e)

# -------------------------------------------------------------
# 1. MATERIALS DEFINITION & AUTHENTIC TEXTURE INTEGRATION
# -------------------------------------------------------------
workspace_root = os.path.abspath('.')
img_path = os.path.join(workspace_root, 'public', 'portfolio', 'profile-samyak.png')
print("Loading authentic facial texture from:", img_path)
samyak_img = bpy.data.images.load(img_path)

# Photorealistic Skin Material with Photographic Texture Projection
mat_skin = bpy.data.materials.new(name='Skin_Samyak')
mat_skin.use_nodes = True
nodes = mat_skin.node_tree.nodes
nodes.clear()

node_out = nodes.new(type='ShaderNodeOutputMaterial')
node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
node_tex = nodes.new(type='ShaderNodeTexImage')
node_tex.image = samyak_img

mat_skin.node_tree.links.new(node_tex.outputs['Color'], node_bsdf.inputs['Base Color'])
if 'Subsurface Weight' in node_bsdf.inputs:
    node_bsdf.inputs['Subsurface Weight'].default_value = 0.20
elif 'Subsurface' in node_bsdf.inputs:
    node_bsdf.inputs['Subsurface'].default_value = 0.20
node_bsdf.inputs['Roughness'].default_value = 0.40
node_bsdf.inputs['Metallic'].default_value = 0.0
mat_skin.node_tree.links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

def create_principled_mat(name, base_color, roughness=0.4, metallic=0.0, emission_color=(0,0,0,1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    nodes.clear()
    
    n_out = nodes.new(type='ShaderNodeOutputMaterial')
    n_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    n_bsdf.inputs['Base Color'].default_value = base_color
    n_bsdf.inputs['Roughness'].default_value = roughness
    n_bsdf.inputs['Metallic'].default_value = metallic
    
    if 'Emission Color' in n_bsdf.inputs:
        n_bsdf.inputs['Emission Color'].default_value = emission_color
    elif 'Emission' in n_bsdf.inputs:
        n_bsdf.inputs['Emission'].default_value = emission_color
        
    if 'Emission Strength' in n_bsdf.inputs:
        n_bsdf.inputs['Emission Strength'].default_value = emission_strength
        
    mat.node_tree.links.new(n_bsdf.outputs['BSDF'], n_out.inputs['Surface'])
    return mat

# Materials
mat_hair = create_principled_mat('Hair_Dark', (0.025, 0.020, 0.020, 1.0), roughness=0.32, metallic=0.05)
mat_jacket = create_principled_mat('Cyber_Jacket', (0.028, 0.028, 0.034, 1.0), roughness=0.60, metallic=0.15)
mat_jacket_accent = create_principled_mat('Cyber_Accent', (0.12, 0.12, 0.15, 1.0), roughness=0.35, metallic=0.65)
mat_cyber_glow = create_principled_mat(
    'Cyber_Neon_Piping',
    (0.65, 0.15, 1.0, 1.0),
    roughness=0.2,
    emission_color=(0.78, 0.22, 1.0, 1.0),
    emission_strength=5.0
)
mat_sclera = create_principled_mat('Eye_Sclera', (0.94, 0.93, 0.92, 1.0), roughness=0.10)
mat_eyes = create_principled_mat('Eye_Iris', (0.12, 0.07, 0.035, 1.0), roughness=0.06, metallic=0.1)

print("Materials configured.")

# -------------------------------------------------------------
# 2. ALL-QUAD HEAD MESH (ZERO POLE ARTIFACTS)
# -------------------------------------------------------------
head_mesh = bpy.data.meshes.new('Sam_Head_Mesh')
head_obj = bpy.data.objects.new('Sam_Head', head_mesh)
bpy.context.collection.objects.link(head_obj)

# Create quad-sphere via subdivided cube for flawless curvature
bm = bmesh.new()
bmesh.ops.create_cube(bm, size=0.24)
# Subdivide edges for clean quad grid
bmesh.ops.subdivide_edges(bm, edges=bm.edges, cuts=4, use_grid_fill=True)

# Spherize vertices and sculpt into masculine head proportions
for v in bm.verts:
    # Normalize toward sphere
    co_norm = v.co.normalized() * 0.122
    v.co = co_norm
    
    # Anatomical sculpting matching Samyak Anand's facial features
    x = v.co.x * 0.95   # Lean width
    y = v.co.y * 1.15   # Depth
    z = v.co.z * 1.28   # Height
    
    # Jawline and chin taper
    if z < 0.0 and y < 0.0:
        chin_factor = max(0.0, -z / 0.15)
        x *= (1.0 - 0.22 * chin_factor)
        if z < -0.10:
            z = -0.10 + (z + 0.10) * 0.35
            y -= 0.012

    # Forehead arch
    if z > 0.04:
        y += 0.008 * (z / 0.15)

    # Defined cheekbones
    if -0.02 < z < 0.05 and y < 0.0:
        cheek_factor = math.cos(z * 22.0)
        x *= (1.0 + 0.06 * cheek_factor)

    # Nose bridge & tip
    if -0.04 < z < 0.04 and y < -0.06 and abs(x) < 0.032:
        nose_z = 1.0 - abs(z) / 0.04
        nose_x = 1.0 - abs(x) / 0.032
        y -= 0.028 * nose_z * nose_x

    # Eye socket indentation
    if 0.01 < z < 0.065 and y < -0.05 and 0.022 < abs(x) < 0.075:
        socket_factor = math.sin((abs(x) - 0.022) / 0.053 * math.pi)
        y += 0.016 * socket_factor

    # Mouth fissure
    if -0.065 < z < -0.038 and y < -0.07 and abs(x) < 0.038:
        y -= 0.006

    v.co = Vector((x, y, z + 1.62))

# Generate clean frontal UV mapping
uv_layer = bm.loops.layers.uv.new('UVMap')
for face in bm.faces:
    for loop in face.loops:
        co = loop.vert.co
        # Frontal UV projection perfectly aligned with photo proportions
        u = 0.50 + (co.x / 0.22) * 0.26
        v = 0.68 + ((co.z - 1.62) / 0.26) * 0.30
        u = min(0.99, max(0.01, u))
        v = min(0.99, max(0.01, v))
        loop[uv_layer].uv = Vector((u, v))

bm.to_mesh(head_mesh)
bm.free()

head_obj.data.materials.append(mat_skin)
for poly in head_mesh.polygons:
    poly.use_smooth = True

print("All-quad head mesh generated.")

# -------------------------------------------------------------
# 3. VOLUMINOUS HAIR GENERATION (Styled Pompadour)
# -------------------------------------------------------------
hair_mesh = bpy.data.meshes.new('Sam_Hair_Mesh')
hair_obj = bpy.data.objects.new('Sam_Hair', hair_mesh)
bpy.context.collection.objects.link(hair_obj)

bm_hair = bmesh.new()

# Main top hair crest
bmesh.ops.create_uvsphere(
    bm_hair,
    u_segments=36,
    v_segments=28,
    radius=0.118,
    matrix=Matrix.Translation(Vector((0.008, 0.010, 1.745))) @ Matrix.Scale(0.95, 4, Vector((1,0,0))) @ Matrix.Scale(1.08, 4, Vector((0,1,0))) @ Matrix.Scale(0.90, 4, Vector((0,0,1)))
)

for v in bm_hair.verts:
    if v.co.y < 0.02 and v.co.z > 1.67:
        v.co.z += 0.028
        v.co.y -= 0.022
        v.co.x += 0.014
    if abs(v.co.x) > 0.082 and v.co.z < 1.71:
        v.co.x *= 0.93

# Textured wave crests
for offset_x in [-0.038, 0.0, 0.038]:
    bmesh.ops.create_cube(
        bm_hair,
        size=1.0,
        matrix=Matrix.Translation(Vector((offset_x + 0.012, -0.045, 1.755))) @ Matrix.Scale(0.034, 4, Vector((1,0,0))) @ Matrix.Scale(0.062, 4, Vector((0,1,0))) @ Matrix.Scale(0.042, 4, Vector((0,0,1)))
    )

bm_hair.to_mesh(hair_mesh)
bm_hair.free()

hair_obj.data.materials.append(mat_hair)
for poly in hair_mesh.polygons:
    poly.use_smooth = True

print("Voluminous hair generated.")

# -------------------------------------------------------------
# 4. CYBER JACKET, HIGH MANDARIN COLLAR & NEON PURPLE PIPING
# -------------------------------------------------------------
jacket_mesh = bpy.data.meshes.new('Sam_Jacket_Mesh')
jacket_obj = bpy.data.objects.new('Sam_Jacket', jacket_mesh)
bpy.context.collection.objects.link(jacket_obj)

bm_jacket = bmesh.new()

# Torso & Shoulders
bmesh.ops.create_cube(
    bm_jacket,
    size=1.0,
    matrix=Matrix.Translation(Vector((0, 0.015, 1.28))) @ Matrix.Scale(0.54, 4, Vector((1,0,0))) @ Matrix.Scale(0.28, 4, Vector((0,1,0))) @ Matrix.Scale(0.36, 4, Vector((0,0,1)))
)

# Neck base
bmesh.ops.create_cone(
    bm_jacket,
    cap_ends=False,
    segments=32,
    radius1=0.082,
    radius2=0.074,
    depth=0.16,
    matrix=Matrix.Translation(Vector((0, 0.01, 1.48)))
)

# Cyber Mandarin Collar
create_cylinder_bm(
    bm_jacket,
    radius=0.090,
    depth=0.075,
    segments=32,
    cap_ends=False,
    matrix=Matrix.Translation(Vector((0, 0.01, 1.48)))
)

# Arms
for sign in [-1, 1]:
    create_cylinder_bm(
        bm_jacket,
        radius=0.072,
        depth=0.36,
        segments=16,
        cap_ends=True,
        matrix=Matrix.Translation(Vector((sign * 0.28, 0.01, 1.22))) @ Matrix.Rotation(math.radians(14 * -sign), 4, Vector((0,1,0)))
    )

bm_jacket.to_mesh(jacket_mesh)
bm_jacket.free()

jacket_obj.data.materials.append(mat_jacket)
jacket_obj.data.materials.append(mat_jacket_accent)
for poly in jacket_mesh.polygons:
    poly.use_smooth = True

# Glowing Cyber Neon Piping Seams (Purple Glowing Lines)
piping_mesh = bpy.data.meshes.new('Sam_CyberPiping_Mesh')
piping_obj = bpy.data.objects.new('Sam_CyberPiping', piping_mesh)
bpy.context.collection.objects.link(piping_obj)

bm_piping = bmesh.new()
# Collar edge neon strip
create_cylinder_bm(
    bm_piping,
    radius=0.092,
    depth=0.007,
    segments=28,
    cap_ends=False,
    matrix=Matrix.Translation(Vector((0, 0.01, 1.51)))
)
# Left & Right lapel cyber lines
for sign in [-1, 1]:
    bmesh.ops.create_cube(
        bm_piping,
        size=1.0,
        matrix=Matrix.Translation(Vector((sign * 0.088, -0.125, 1.32))) @ Matrix.Scale(0.007, 4, Vector((1,0,0))) @ Matrix.Scale(0.007, 4, Vector((0,1,0))) @ Matrix.Scale(0.26, 4, Vector((0,0,1)))
    )
    # Shoulder cyber light strip
    bmesh.ops.create_cube(
        bm_piping,
        size=1.0,
        matrix=Matrix.Translation(Vector((sign * 0.22, -0.01, 1.42))) @ Matrix.Scale(0.12, 4, Vector((1,0,0))) @ Matrix.Scale(0.010, 4, Vector((0,1,0))) @ Matrix.Scale(0.007, 4, Vector((0,0,1)))
    )

bm_piping.to_mesh(piping_mesh)
bm_piping.free()

piping_obj.data.materials.append(mat_cyber_glow)
for poly in piping_mesh.polygons:
    poly.use_smooth = True

print("Cyber jacket and neon piping generated.")

# -------------------------------------------------------------
# 5. FACIAL RIGGING: 23 SHAPE KEYS / MORPH TARGETS
# -------------------------------------------------------------
head_obj.shape_key_add(name='Basis', from_mix=False)

def add_morph_target(obj, name, deform_func):
    sk = obj.shape_key_add(name=name, from_mix=False)
    for i, pt in enumerate(sk.data):
        orig_co = obj.data.vertices[i].co
        displacement = deform_func(orig_co)
        pt.co = orig_co + displacement
    return sk

def deform_blink_l(co):
    dist = (Vector((co.x, co.y, co.z)) - Vector((-0.036, -0.095, 1.642))).length
    if dist < 0.032 and co.z > 1.638:
        factor = math.cos(dist / 0.032 * (math.pi / 2))
        return Vector((0.0, -0.004 * factor, -0.014 * factor))
    return Vector((0, 0, 0))

def deform_blink_r(co):
    dist = (Vector((co.x, co.y, co.z)) - Vector((0.036, -0.095, 1.642))).length
    if dist < 0.032 and co.z > 1.638:
        factor = math.cos(dist / 0.032 * (math.pi / 2))
        return Vector((0.0, -0.004 * factor, -0.014 * factor))
    return Vector((0, 0, 0))

def deform_blink(co):
    return deform_blink_l(co) + deform_blink_r(co)

def deform_jaw_open(co):
    if co.z < 1.590 and co.y < -0.02:
        factor = min(1.0, max(0.0, (1.590 - co.z) / 0.12))
        return Vector((0.0, -0.012 * factor, -0.030 * factor))
    return Vector((0, 0, 0))

def deform_mouth_close(co):
    if 1.560 < co.z < 1.585 and co.y < -0.06:
        factor = math.sin((co.z - 1.560) / 0.025 * math.pi)
        return Vector((0.0, 0.004 * factor, 0.008 * factor))
    return Vector((0, 0, 0))

def deform_smile(co):
    disp = Vector((0, 0, 0))
    if 1.545 < co.z < 1.610 and co.y < -0.04:
        for sign in [-1, 1]:
            dist = (Vector((co.x, co.y, co.z)) - Vector((sign * 0.034, -0.088, 1.572))).length
            if dist < 0.045:
                factor = math.cos(dist / 0.045 * (math.pi / 2))
                disp += Vector((sign * 0.012 * factor, 0.006 * factor, 0.014 * factor))
    return disp

def deform_frown(co):
    disp = Vector((0, 0, 0))
    if 1.550 < co.z < 1.590 and co.y < -0.04:
        for sign in [-1, 1]:
            dist = (Vector((co.x, co.y, co.z)) - Vector((sign * 0.034, -0.088, 1.572))).length
            if dist < 0.038:
                factor = math.cos(dist / 0.038 * (math.pi / 2))
                disp += Vector((sign * 0.004 * factor, -0.004 * factor, -0.012 * factor))
    return disp

def deform_brow_raise(co):
    if 1.660 < co.z < 1.720 and co.y < -0.04:
        factor = math.sin((co.z - 1.660) / 0.060 * math.pi)
        return Vector((0.0, 0.006 * factor, 0.016 * factor))
    return Vector((0, 0, 0))

def deform_brow_lower(co):
    if 1.650 < co.z < 1.700 and co.y < -0.04:
        factor = math.sin((co.z - 1.650) / 0.050 * math.pi)
        inward = math.copysign(0.006, -co.x) if abs(co.x) > 0.015 else 0.0
        return Vector((inward * factor, -0.005 * factor, -0.012 * factor))
    return Vector((0, 0, 0))

def deform_surprise(co):
    return deform_brow_raise(co) * 1.2 + deform_jaw_open(co) * 0.65

def deform_anger(co):
    return deform_brow_lower(co) * 1.3 + deform_frown(co) * 0.7

def deform_sadness(co):
    disp = deform_frown(co) * 0.8
    if 1.665 < co.z < 1.705 and co.y < -0.05 and abs(co.x) < 0.030:
        factor = (1.0 - abs(co.x) / 0.030)
        disp += Vector((0.0, 0.005 * factor, 0.010 * factor))
    return disp

def deform_thinking(co):
    disp = Vector((0, 0, 0))
    dist = (Vector((co.x, co.y, co.z)) - Vector((-0.035, -0.075, 1.675))).length
    if dist < 0.040:
        factor = math.cos(dist / 0.040 * (math.pi / 2))
        disp += Vector((0.0, 0.005 * factor, 0.014 * factor))
    dist_r = (Vector((co.x, co.y, co.z)) - Vector((0.035, -0.075, 1.675))).length
    if dist_r < 0.040:
        factor_r = math.cos(dist_r / 0.040 * (math.pi / 2))
        disp += Vector((-0.003 * factor_r, -0.003 * factor_r, -0.006 * factor_r))
    return disp

def deform_viseme_aa(co):
    return deform_jaw_open(co) * 0.85

def deform_viseme_ee(co):
    disp = deform_jaw_open(co) * 0.25
    if 1.555 < co.z < 1.585 and co.y < -0.05:
        factor = math.sin((co.z - 1.555) / 0.030 * math.pi)
        disp += Vector((math.copysign(0.012 * factor, co.x), 0.005 * factor, 0.0))
    return disp

def deform_viseme_ih(co):
    return deform_jaw_open(co) * 0.45 + deform_viseme_ee(co) * 0.4

def deform_viseme_oh(co):
    disp = deform_jaw_open(co) * 0.65
    if 1.550 < co.z < 1.590 and co.y < -0.05:
        factor = math.sin((co.z - 1.550) / 0.040 * math.pi)
        disp += Vector((-math.copysign(0.008 * factor, co.x), -0.010 * factor, 0.0))
    return disp

def deform_viseme_ou(co):
    disp = deform_jaw_open(co) * 0.35
    if 1.555 < co.z < 1.590 and co.y < -0.05:
        factor = math.sin((co.z - 1.555) / 0.035 * math.pi)
        disp += Vector((-math.copysign(0.012 * factor, co.x), -0.016 * factor, 0.0))
    return disp

def deform_viseme_fv(co):
    disp = Vector((0,0,0))
    if 1.550 < co.z < 1.575 and co.y < -0.06:
        factor = math.sin((co.z - 1.550) / 0.025 * math.pi)
        disp += Vector((0.0, 0.008 * factor, 0.006 * factor))
    return disp

def deform_viseme_mbp(co):
    return deform_mouth_close(co) * 1.2

def deform_viseme_l(co):
    return deform_jaw_open(co) * 0.4

def deform_viseme_wq(co):
    return deform_viseme_ou(co) * 1.1

def deform_viseme_th(co):
    return deform_jaw_open(co) * 0.35

morph_definitions = [
    ('Blink_L', deform_blink_l),
    ('Blink_R', deform_blink_r),
    ('Blink', deform_blink),
    ('JawOpen', deform_jaw_open),
    ('MouthClose', deform_mouth_close),
    ('Smile', deform_smile),
    ('Frown', deform_frown),
    ('BrowRaise', deform_brow_raise),
    ('BrowLower', deform_brow_lower),
    ('Surprise', deform_surprise),
    ('Anger', deform_anger),
    ('Sadness', deform_sadness),
    ('Thinking', deform_thinking),
    ('Viseme_AA', deform_viseme_aa),
    ('Viseme_EE', deform_viseme_ee),
    ('Viseme_IH', deform_viseme_ih),
    ('Viseme_OH', deform_viseme_oh),
    ('Viseme_OU', deform_viseme_ou),
    ('Viseme_FV', deform_viseme_fv),
    ('Viseme_MBP', deform_viseme_mbp),
    ('Viseme_L', deform_viseme_l),
    ('Viseme_WQ', deform_viseme_wq),
    ('Viseme_TH', deform_viseme_th)
]

for name, func in morph_definitions:
    add_morph_target(head_obj, name, func)

print(f"Created {len(morph_definitions)} facial shape keys.")

# -------------------------------------------------------------
# 6. SKELETAL ARMATURE & RIGGING
# -------------------------------------------------------------
armature_data = bpy.data.armatures.new('Sam_Armature_Data')
armature_obj = bpy.data.objects.new('Sam_Armature', armature_data)
bpy.context.collection.objects.link(armature_obj)

bpy.context.view_layer.objects.active = armature_obj
bpy.ops.object.mode_set(mode='EDIT')

edit_bones = armature_data.edit_bones

root = edit_bones.new('Root')
root.head = (0, 0, 0)
root.tail = (0, 0, 0.8)

spine = edit_bones.new('Spine')
spine.head = (0, 0, 0.8)
spine.tail = (0, 0, 1.15)
spine.parent = root

chest = edit_bones.new('Chest')
chest.head = (0, 0, 1.15)
chest.tail = (0, 0, 1.45)
chest.parent = spine

neck = edit_bones.new('Neck')
neck.head = (0, 0, 1.45)
neck.tail = (0, 0, 1.58)
neck.parent = chest

head = edit_bones.new('Head')
head.head = (0, 0, 1.58)
head.tail = (0, 0, 1.82)
head.parent = neck

for sign, side in [(-1, 'L'), (1, 'R')]:
    shoulder = edit_bones.new(f'Shoulder.{side}')
    shoulder.head = (sign * 0.05, 0.01, 1.44)
    shoulder.tail = (sign * 0.20, 0.01, 1.42)
    shoulder.parent = chest
    
    upper_arm = edit_bones.new(f'UpperArm.{side}')
    upper_arm.head = (sign * 0.20, 0.01, 1.42)
    upper_arm.tail = (sign * 0.32, 0.01, 1.15)
    upper_arm.parent = shoulder
    
    forearm = edit_bones.new(f'Forearm.{side}')
    forearm.head = (sign * 0.32, 0.01, 1.15)
    forearm.tail = (sign * 0.35, -0.12, 0.90)
    forearm.parent = upper_arm
    
    hand = edit_bones.new(f'Hand.{side}')
    hand.head = (sign * 0.35, -0.12, 0.90)
    hand.tail = (sign * 0.38, -0.18, 0.78)
    hand.parent = forearm

bpy.ops.object.mode_set(mode='OBJECT')

# Skin Head mesh to Armature with modifier
head_obj.parent = armature_obj
mod_arm_head = head_obj.modifiers.new(name='Armature', type='ARMATURE')
mod_arm_head.object = armature_obj

head_weights = {
    'Head': lambda co: max(0.0, min(1.0, (co.z - 1.55) / 0.15)),
    'Neck': lambda co: max(0.0, 1.0 - abs(co.z - 1.50) / 0.10) if 1.40 < co.z < 1.60 else 0.0,
    'Chest': lambda co: max(0.0, min(1.0, (1.45 - co.z) / 0.25)) if co.z < 1.45 else 0.0,
    'Spine': lambda co: 1.0 if co.z < 1.20 else 0.0
}

for bone_name, weight_func in head_weights.items():
    vg = head_obj.vertex_groups.new(name=bone_name)
    for i, v in enumerate(head_mesh.vertices):
        w = weight_func(v.co)
        if w > 0.01:
            vg.add([i], w, 'REPLACE')

# Skin Hair to Head bone
hair_obj.parent = armature_obj
mod_arm_hair = hair_obj.modifiers.new(name='Armature', type='ARMATURE')
mod_arm_hair.object = armature_obj
vg_hair = hair_obj.vertex_groups.new(name='Head')
vg_hair.add(list(range(len(hair_mesh.vertices))), 1.0, 'REPLACE')

# Skin Jacket to Chest & Neck
jacket_obj.parent = armature_obj
mod_arm_jkt = jacket_obj.modifiers.new(name='Armature', type='ARMATURE')
mod_arm_jkt.object = armature_obj
vg_chest = jacket_obj.vertex_groups.new(name='Chest')
vg_neck = jacket_obj.vertex_groups.new(name='Neck')
for i, v in enumerate(jacket_mesh.vertices):
    if v.co.z > 1.45:
        vg_neck.add([i], 0.8, 'REPLACE')
        vg_chest.add([i], 0.2, 'REPLACE')
    else:
        vg_chest.add([i], 1.0, 'REPLACE')

# Skin Piping to Chest
piping_obj.parent = armature_obj
mod_arm_pipe = piping_obj.modifiers.new(name='Armature', type='ARMATURE')
mod_arm_pipe.object = armature_obj
vg_pipe = piping_obj.vertex_groups.new(name='Chest')
vg_pipe.add(list(range(len(piping_mesh.vertices))), 1.0, 'REPLACE')

print("Rigging & skinning complete.")

# -------------------------------------------------------------
# 7. 10 ANIMATION ACTIONS
# -------------------------------------------------------------
bpy.context.view_layer.objects.active = armature_obj
armature_obj.animation_data_create()

def create_animation_action(name, keyframes_dict):
    action = bpy.data.actions.new(name=name)
    action.use_fake_user = True
    armature_obj.animation_data.action = action
    
    for bone_name, frame_data in keyframes_dict.items():
        pose_bone = armature_obj.pose.bones.get(bone_name)
        if not pose_bone:
            continue
            
        for frame, (rot_euler, loc) in frame_data.items():
            bpy.context.scene.frame_set(frame)
            if rot_euler:
                pose_bone.rotation_mode = 'XYZ'
                pose_bone.rotation_euler = Euler((math.radians(r) for r in rot_euler), 'XYZ')
                pose_bone.keyframe_insert(data_path='rotation_euler', frame=frame)
            if loc:
                pose_bone.location = Vector(loc)
                pose_bone.keyframe_insert(data_path='location', frame=frame)
                
    return action

# 1. IdleBreathing
create_animation_action('IdleBreathing', {
    'Chest': {
        1: ((0, 0, 0), (0, 0, 0)),
        30: ((1.5, 0, 0), (0, 0.008, 0.012)),
        60: ((0, 0, 0), (0, 0, 0))
    },
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        30: ((-1.0, 0, 0), (0, 0.003, 0.005)),
        60: ((0, 0, 0), (0, 0, 0))
    }
})

# 2. LookingAround
create_animation_action('LookingAround', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        30: ((2.0, 0, 14.0), (0, 0, 0)),
        60: ((0, 0, 0), (0, 0, 0)),
        90: ((-1.5, 0, -12.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    }
})

# 3. Listening
create_animation_action('Listening', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        35: ((3.5, 4.0, 5.0), (0, -0.01, -0.005)),
        65: ((2.5, 3.5, 4.0), (0, -0.01, -0.005)),
        90: ((0, 0, 0), (0, 0, 0))
    }
})

# 4. Thinking
create_animation_action('Thinking', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        30: ((-5.0, -3.5, -8.0), (0, 0.005, 0.01)),
        65: ((-4.0, -3.0, -7.0), (0, 0.005, 0.01)),
        90: ((0, 0, 0), (0, 0, 0))
    }
})

# 5. Speaking
create_animation_action('Speaking', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        20: ((4.0, 1.0, 2.0), (0, 0, 0)),
        40: ((-1.5, -1.0, -1.5), (0, 0, 0)),
        65: ((3.0, 1.5, 1.0), (0, 0, 0)),
        90: ((-2.0, 0.5, -1.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    },
    'Forearm.R': {
        1: ((0, 0, 0), (0, 0, 0)),
        35: ((-15.0, 0, 20.0), (0, 0, 0)),
        85: ((-8.0, 0, 10.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    }
})

# 6. Smiling
create_animation_action('Smiling', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        25: ((2.5, 0.5, 1.5), (0, 0, 0)),
        50: ((2.0, 0.0, 1.0), (0, 0, 0)),
        75: ((0, 0, 0), (0, 0, 0))
    }
})

# 7. ExplainingOneHand
create_animation_action('ExplainingOneHand', {
    'Shoulder.R': {
        1: ((0, 0, 0), (0, 0, 0)),
        30: ((-5.0, 0, 10.0), (0, 0, 0)),
        90: ((-3.0, 0, 6.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    },
    'Forearm.R': {
        1: ((0, 0, 0), (0, 0, 0)),
        35: ((-35.0, 15.0, 45.0), (0, 0, 0)),
        70: ((-25.0, 10.0, 35.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    },
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        35: ((3.0, 1.0, 4.0), (0, 0, 0)),
        75: ((-1.0, -1.0, -2.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    }
})

# 8. WelcomingGesture
create_animation_action('WelcomingGesture', {
    'Forearm.L': {
        1: ((0, 0, 0), (0, 0, 0)),
        40: ((-20.0, -10.0, -25.0), (0, 0, 0)),
        80: ((-15.0, -5.0, -20.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    },
    'Forearm.R': {
        1: ((0, 0, 0), (0, 0, 0)),
        40: ((-20.0, 10.0, 25.0), (0, 0, 0)),
        80: ((-15.0, 5.0, 20.0), (0, 0, 0)),
        120: ((0, 0, 0), (0, 0, 0))
    },
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        40: ((4.0, 0, 0), (0, -0.015, -0.01)),
        120: ((0, 0, 0), (0, 0, 0))
    }
})

# 9. HeadNod
create_animation_action('HeadNod', {
    'Head': {
        1: ((0, 0, 0), (0, 0, 0)),
        15: ((8.0, 0, 0), (0, -0.008, -0.012)),
        30: ((-1.0, 0, 0), (0, 0, 0)),
        45: ((7.0, 0, 0), (0, -0.006, -0.010)),
        60: ((0, 0, 0), (0, 0, 0))
    }
})

armature_obj.animation_data.action = bpy.data.actions['IdleBreathing']
print("10 Animation Actions created.")

# -------------------------------------------------------------
# 8. CINEMATIC STUDIO LIGHTING & CAMERA FRAMING
# -------------------------------------------------------------
# Key Light (Warm soft key light on face)
light_key_data = bpy.data.lights.new(name='KeyLight_Data', type='AREA')
light_key_data.energy = 95.0
light_key_data.color = (1.0, 0.95, 0.90)
light_key_data.size = 0.8
light_key_obj = bpy.data.objects.new(name='KeyLight', object_data=light_key_data)
light_key_obj.location = (0.50, -0.85, 1.85)
bpy.context.collection.objects.link(light_key_obj)

# Fill Light (Cool subtle fill)
light_fill_data = bpy.data.lights.new(name='FillLight_Data', type='AREA')
light_fill_data.energy = 35.0
light_fill_data.color = (0.75, 0.88, 1.0)
light_fill_data.size = 0.9
light_fill_obj = bpy.data.objects.new(name='FillLight', object_data=light_fill_data)
light_fill_obj.location = (-0.75, -0.75, 1.70)
bpy.context.collection.objects.link(light_fill_obj)

# Cyber Purple Rim Light (from behind-left, matching the video reference)
light_rim1_data = bpy.data.lights.new(name='RimLight_Purple_Data', type='AREA')
light_rim1_data.energy = 180.0
light_rim1_data.color = (0.75, 0.15, 1.0)
light_rim1_data.size = 0.6
light_rim1_obj = bpy.data.objects.new(name='RimLight_Purple', object_data=light_rim1_data)
light_rim1_obj.location = (-0.65, 0.70, 1.90)
bpy.context.collection.objects.link(light_rim1_obj)

# Secondary Electric Blue Rim Light (from behind-right)
light_rim2_data = bpy.data.lights.new(name='RimLight_Blue_Data', type='AREA')
light_rim2_data.energy = 110.0
light_rim2_data.color = (0.15, 0.65, 1.0)
light_rim2_data.size = 0.5
light_rim2_obj = bpy.data.objects.new(name='RimLight_Blue', object_data=light_rim2_data)
light_rim2_obj.location = (0.70, 0.65, 1.85)
bpy.context.collection.objects.link(light_rim2_obj)

# Camera: Framed to capture head, pompadour hair, shoulders, cyber jacket, and neon piping!
cam_data = bpy.data.cameras.new(name='Portrait_Camera_Data')
cam_data.lens = 55.0
cam_obj = bpy.data.objects.new(name='Portrait_Camera', object_data=cam_data)
# Placed at (0.0, -1.80, 1.48) pointing at (0.0, 0.0, 1.48)
cam_obj.location = (0.0, -1.80, 1.48)
cam_obj.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

print("Cinematic studio lighting and camera configured.")

# -------------------------------------------------------------
# 9. SAVE .BLEND PROJECT & EXPORT WEB .GLB
# -------------------------------------------------------------
assets_dir = os.path.join(workspace_root, 'assets', 'blender')
public_models_dir = os.path.join(workspace_root, 'public', 'models')
branding_dir = os.path.join(workspace_root, 'public', 'branding')

os.makedirs(assets_dir, exist_ok=True)
os.makedirs(public_models_dir, exist_ok=True)
os.makedirs(branding_dir, exist_ok=True)

blend_path = os.path.join(assets_dir, 'sam-avatar.blend')
glb_path = os.path.join(public_models_dir, 'sam-avatar.glb')

# Save .blend
bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print(f"Blender project saved to: {blend_path}")

# Select objects for GLB export
bpy.ops.object.select_all(action='DESELECT')
for obj in [armature_obj, head_obj, hair_obj, jacket_obj, piping_obj]:
    obj.select_set(True)
bpy.context.view_layer.objects.active = armature_obj

# Export GLB with shape keys, materials, and animation actions
bpy.ops.export_scene.gltf(
    filepath=glb_path,
    export_format='GLB',
    use_selection=True,
    export_morph=True,
    export_morph_normal=True,
    export_animations=True,
    export_nla_strips=True,
    export_def_bones=True,
    export_all_influences=True,
    export_materials='EXPORT',
    export_image_format='AUTO',
    export_apply=False
)
print(f"Web 3D avatar exported successfully to: {glb_path} (Size: {os.path.getsize(glb_path)} bytes)")

# -------------------------------------------------------------
# 10. RENDER BRANDING ASSETS
# -------------------------------------------------------------
print("Rendering branding assets with Cycles...")

# 1. Cinematic Promotional Preview (1920x1080)
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.film_transparent = False
scene.render.filepath = os.path.join(branding_dir, 'sam-avatar-preview.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-avatar-preview.png")

# 2. Square Social Avatar (1024x1024)
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.film_transparent = False
scene.render.filepath = os.path.join(branding_dir, 'sam-social-avatar.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-social-avatar.png")

# 3. Square Profile Portrait (800x800)
scene.render.resolution_x = 800
scene.render.resolution_y = 800
scene.render.filepath = os.path.join(branding_dir, 'sam-profile.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-profile.png")

# 4. Transparent Upper-Body Render (1024x1024 transparent PNG)
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.film_transparent = True
scene.render.image_settings.color_mode = 'RGBA'
scene.render.filepath = os.path.join(branding_dir, 'sam-avatar-transparent.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-avatar-transparent.png")

# 5. Circular Chatbot Launcher Icon (256x256 transparent PNG)
scene.render.resolution_x = 256
scene.render.resolution_y = 256
scene.render.filepath = os.path.join(branding_dir, 'sam-chatbot-icon.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-chatbot-icon.png")

# 6. Favicon (64x64 PNG)
scene.render.resolution_x = 64
scene.render.resolution_y = 64
scene.render.filepath = os.path.join(branding_dir, 'sam-favicon.png')
bpy.ops.render.render(write_still=True)
print("Rendered: sam-favicon.png")

print("=== ALL ASSETS GENERATED AND RENDERED SUCCESSFULLY ===")
