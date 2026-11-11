"""
Test script to verify camera framing, UV projection of authentic photo,
and render quality.
"""
import bpy
import bmesh
import math
from mathutils import Vector, Euler, Matrix
import os

bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.render.resolution_x = 800
scene.render.resolution_y = 800

# Load authentic profile photo
img_path = os.path.abspath('public/portfolio/profile-samyak.png')
img = bpy.data.images.load(img_path)

# Create material with image texture
mat = bpy.data.materials.new(name='Samyak_Photo_Skin')
mat.use_nodes = True
nodes = mat.node_tree.nodes
nodes.clear()

node_out = nodes.new(type='ShaderNodeOutputMaterial')
node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
node_tex = nodes.new(type='ShaderNodeTexImage')
node_tex.image = img

# Link texture color to Base Color and Subsurface Color
mat.node_tree.links.new(node_tex.outputs['Color'], node_bsdf.inputs['Base Color'])
if 'Subsurface Weight' in node_bsdf.inputs:
    node_bsdf.inputs['Subsurface Weight'].default_value = 0.2
elif 'Subsurface' in node_bsdf.inputs:
    node_bsdf.inputs['Subsurface'].default_value = 0.2
node_bsdf.inputs['Roughness'].default_value = 0.42

mat.node_tree.links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

# Create Head Mesh
head_mesh = bpy.data.meshes.new('Test_Head_Mesh')
head_obj = bpy.data.objects.new('Test_Head', head_mesh)
bpy.context.collection.objects.link(head_obj)

bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=64, v_segments=48, radius=0.125)

# Sculpt head anatomically
for v in bm.verts:
    x = v.co.x * 0.96
    y = v.co.y * 1.15
    z = v.co.z * 1.30

    # Chin & Jaw sculpting
    if z < 0.0 and y < 0.0:
        chin_factor = max(0.0, -z / 0.16)
        x *= (1.0 - 0.24 * chin_factor)
        if z < -0.11:
            z = -0.11 + (z + 0.11) * 0.35
            y -= 0.015

    # Forehead
    if z > 0.05:
        y += 0.012 * (z / 0.16)

    # Cheeks
    if -0.02 < z < 0.06 and y < 0.0:
        cheek_factor = math.cos(z * 20.0)
        x *= (1.0 + 0.08 * cheek_factor)

    # Nose
    if -0.04 < z < 0.04 and y < -0.06 and abs(x) < 0.035:
        nose_z = 1.0 - abs(z) / 0.04
        nose_x = 1.0 - abs(x) / 0.035
        y -= 0.032 * nose_z * nose_x

    # Eye indentation
    if 0.01 < z < 0.07 and y < -0.05 and 0.025 < abs(x) < 0.08:
        socket_factor = math.sin((abs(x) - 0.025) / 0.055 * math.pi)
        y += 0.020 * socket_factor

    # Mouth groove
    if -0.07 < z < -0.04 and y < -0.07 and abs(x) < 0.04:
        y -= 0.008

    v.co = Vector((x, y, z + 1.62))

# Generate UV coordinates projected from front
uv_layer = bm.loops.layers.uv.new('UVMap')
for face in bm.faces:
    for loop in face.loops:
        co = loop.vert.co
        # Frontal planar projection matching photo framing:
        # In photo: head width ~ 400px (43%), head height ~ 480px (43%)
        u = 0.50 + (co.x / 0.26) * 0.40
        # Photo Y is inverted in UV space (V from 0 at bottom to 1 at top)
        # Head center is at Z=1.63, eyes at 1.64 (around V=0.72)
        v = 0.70 + ((co.z - 1.63) / 0.30) * 0.38
        loop[uv_layer].uv = Vector((u, v))

bm.to_mesh(head_mesh)
bm.free()

head_obj.data.materials.append(mat)
for poly in head_mesh.polygons:
    poly.use_smooth = True

# Neck & Torso
neck_mesh = bpy.data.meshes.new('Neck_Mesh')
neck_obj = bpy.data.objects.new('Neck', neck_mesh)
bpy.context.collection.objects.link(neck_obj)
bm_neck = bmesh.new()
bmesh.ops.create_cone(bm_neck, cap_ends=False, segments=32, radius1=0.085, radius2=0.075, depth=0.18, matrix=Matrix.Translation(Vector((0, 0.01, 1.48))))
bmesh.ops.create_cube(bm_neck, size=1.0, matrix=Matrix.Translation(Vector((0, 0.02, 1.30))) @ Matrix.Scale(0.50, 4, Vector((1,0,0))) @ Matrix.Scale(0.26, 4, Vector((0,1,0))) @ Matrix.Scale(0.28, 4, Vector((0,0,1))))
bm_neck.to_mesh(neck_mesh)
bm_neck.free()
neck_obj.data.materials.append(mat)
for poly in neck_mesh.polygons:
    poly.use_smooth = True

# Camera positioned at eye level (Z=1.63), distance 0.9m in front (-Y)
cam_data = bpy.data.cameras.new('Test_Cam')
cam_data.lens = 85.0
cam_obj = bpy.data.objects.new('Test_Cam', cam_data)
cam_obj.location = (0.0, -0.95, 1.63)
# To look horizontally along +Y toward origin:
# Local -Z -> +Y, Local +Y -> +Z
cam_obj.rotation_euler = Euler((math.radians(90), 0, 0), 'XYZ')
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Key light
light_key = bpy.data.lights.new('Key', 'AREA')
light_key.energy = 100.0
light_key.color = (1.0, 0.95, 0.90)
light_key.size = 0.8
light_obj = bpy.data.objects.new('Key', light_key)
light_obj.location = (0.5, -0.8, 1.85)
bpy.context.collection.objects.link(light_obj)

# Purple Rim Light
light_rim = bpy.data.lights.new('Rim', 'AREA')
light_rim.energy = 180.0
light_rim.color = (0.75, 0.15, 1.0)
light_rim.size = 0.6
light_rim_obj = bpy.data.objects.new('Rim', light_rim)
light_rim_obj.location = (-0.6, 0.7, 1.85)
bpy.context.collection.objects.link(light_rim_obj)

# Render test frame
out_path = os.path.abspath('public/branding/test_face_render.png')
scene.render.filepath = out_path
print('Rendering test to:', out_path)
bpy.ops.render.render(write_still=True)
print('Done!')
