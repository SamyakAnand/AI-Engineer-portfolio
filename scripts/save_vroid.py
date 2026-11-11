import UnityPy

env = UnityPy.load(r'temp_bundles\sample_b.bundle')
for obj in env.objects:
    if obj.type.name == 'TextAsset':
        raw = obj.get_raw_data()
        d = obj.read()
        # let's get the raw bytes from m_Script or reader
        # in UnityPy, obj.read_typetree() can also give raw data
        tree = obj.read_typetree()
        # m_Script in tree can be bytes or str or list
        script_data = tree.get('m_Script')
        if isinstance(script_data, str):
            # check if it is utf-8 or latin1 or raw
            data_bytes = script_data.encode('latin1')
        elif isinstance(script_data, bytes):
            data_bytes = script_data
        elif isinstance(script_data, list):
            data_bytes = bytes(script_data)
        else:
            data_bytes = bytes(script_data)
            
        print("Header bytes (first 16):", data_bytes[:16])
        with open(r'temp_bundles\AvatarSample_B.vroid', 'wb') as f:
            f.write(data_bytes)
        print("Wrote AvatarSample_B.vroid, size:", len(data_bytes))
