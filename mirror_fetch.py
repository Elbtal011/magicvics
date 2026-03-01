import re, requests, urllib.parse
from pathlib import Path

base='https://magicvics.lockigesbrusthaar.cloud'
out=Path(r'C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror')
(out/'assets').mkdir(parents=True,exist_ok=True)
(out/'fonts').mkdir(parents=True,exist_ok=True)
seen=set()
queue=['/','/assets/index-CKZAQd6b.js','/assets/index-UPhXffZa.css','/fonts/Balothine.woff2','/fonts/DanielaParadise.woff2','/fonts/Richykid.woff2','/fonts/Tremors-Regular.woff2']
pat=re.compile(r"""(?:(?:src|href|url)\s*[:=]\s*|url\()\s*['\"]?([^'\")\s]+)|([/][A-Za-z0-9_\-./]+\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|map))""")

session=requests.Session()
headers={'User-Agent':'Mozilla/5.0'}

while queue:
    p=queue.pop(0)
    if p in seen:
        continue
    seen.add(p)
    url=urllib.parse.urljoin(base,p)
    try:
        r=session.get(url,headers=headers,timeout=20)
    except Exception as e:
        print('ERR',p,e)
        continue
    if r.status_code!=200:
        print('MISS',p,r.status_code)
        continue
    lp = out / (p.lstrip('/') or 'index.html')
    if p=='/':
        lp=out/'index.html'
    lp.parent.mkdir(parents=True,exist_ok=True)
    lp.write_bytes(r.content)
    ctype=r.headers.get('content-type','')
    print('OK',p,ctype)

    text=None
    if any(t in ctype for t in ['javascript','text','json','css','svg']) or lp.suffix in ['.js','.css','.html','.svg','.map']:
        try:
            text=r.text
        except Exception:
            text=None
    if text:
        for m in pat.finditer(text):
            cand=m.group(1) or m.group(2)
            if not cand:
                continue
            cand=cand.strip('"\' )')
            if cand.startswith(('data:','http://','https://','//')):
                continue
            rp=urllib.parse.urlparse(urllib.parse.urljoin(p,cand)).path
            if rp.startswith('/') and rp not in seen and (
                rp.startswith('/assets/') or rp.startswith('/fonts/') or re.search(r'\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|css|js|map)$',rp)
            ):
                queue.append(rp)

# external google font css + font files
for gu in ['https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap']:
    try:
        rr=session.get(gu,headers=headers,timeout=20)
        if rr.status_code==200:
            gp=out/'external'/'fonts.googleapis.com'/'css2_family_Inter.css'
            gp.parent.mkdir(parents=True,exist_ok=True)
            gp.write_text(rr.text,encoding='utf-8')
            print('OK',gu)
            for wu in re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)',rr.text):
                wu=wu.strip('"\'')
                fr=session.get(wu,headers=headers,timeout=20)
                if fr.status_code==200:
                    up=urllib.parse.urlparse(wu)
                    fp=out/'external'/'fonts.gstatic.com'/up.path.lstrip('/')
                    fp.parent.mkdir(parents=True,exist_ok=True)
                    fp.write_bytes(fr.content)
                    print('OK',wu)
    except Exception as e:
        print('google err',e)

print('done',len(seen),'seen')
