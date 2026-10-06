#!/usr/bin/env python3
"""Validate Rifad registries, paths, IDs, versions, and variable definitions."""
import json, re, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
TYPES=['prompts','skills','agents','workflows','solutions','templates','images','videos']
VAR_TYPES={'text','long-text','number','select','multi-select','boolean','date','url','file','json'}
errors=[]; all_ids=set()
for plural in TYPES:
    reg=ROOT/'registry'/f'{plural}.json'
    try: items=json.loads(reg.read_text())
    except Exception as e: errors.append(f'{reg}: invalid JSON: {e}'); continue
    if not isinstance(items,list): errors.append(f'{reg}: registry must be an array'); continue
    expected=plural[:-1] if plural.endswith('s') else plural
    for item in items:
        iid=item.get('id','<missing>')
        if iid in all_ids: errors.append(f'duplicate id: {iid}')
        all_ids.add(iid)
        required=['id','type','name','description','category','tags','version','status','license','author','source','path','created_at','updated_at']
        for field in required:
            if not item.get(field): errors.append(f'{iid}: missing {field}')
        if item.get('type') != expected: errors.append(f'{iid}: type must be {expected}')
        if not re.match(r'^[A-Z]+-[A-Z0-9-]+$', str(iid)): errors.append(f'{iid}: invalid ID')
        if not re.match(r'^\d+\.\d+\.\d+$', str(item.get('version',''))): errors.append(f'{iid}: invalid semver')
        p=ROOT/item.get('path','')
        if not p.exists(): errors.append(f'{iid}: missing source path {item.get("path")}')
        if 'variables' in item:
            seen=set()
            for v in item['variables']:
                for f in ['name','type','required','description']:
                    if f not in v: errors.append(f'{iid}: variable missing {f}')
                if v.get('name') in seen: errors.append(f'{iid}: duplicate variable {v.get("name")}')
                seen.add(v.get('name'))
                if v.get('type') not in VAR_TYPES: errors.append(f'{iid}: invalid variable type {v.get("type")}')
if errors:
    print('VALIDATION FAILED')
    print('\n'.join('- '+e for e in errors)); sys.exit(1)
print(f'VALIDATION PASSED: {len(all_ids)} assets across {len(TYPES)} registries')
