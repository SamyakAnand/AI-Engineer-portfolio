import bpy
import math

arm = bpy.data.objects.get('Armature')
b_l = arm.pose.bones.get('J_Bip_L_UpperArm')
b_r = arm.pose.bones.get('J_Bip_R_UpperArm')
b_l.rotation_mode = 'XYZ'
b_r.rotation_mode = 'XYZ'
b_l.rotation_euler = (math.radians(-70), 0, 0)
b_r.rotation_euler = (math.radians(-70), 0, 0)
bpy.context.view_layer.update()
print('Left hand pos:', arm.pose.bones.get('J_Bip_L_Hand').head)
print('Right hand pos:', arm.pose.bones.get('J_Bip_R_Hand').head)
