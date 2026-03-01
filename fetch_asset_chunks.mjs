import fs from 'fs';
import path from 'path';

const root='C:/Users/adminMJ/.openclaw/workspace/magicvics-mirror';
const listPath=path.join(root,'root-js-list.txt');
if(!fs.existsSync(listPath)){console.log('no list'); process.exit(0)}
const names=fs.readFileSync(listPath,'utf8').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
let ok=0, miss=0;
for(const n of names){
  const u=`https://magicvics.lockigesbrusthaar.cloud/assets/${n}`;
  const ac=new AbortController();
  const to=setTimeout(()=>ac.abort(),12000);
  try{
    const r=await fetch(u,{signal:ac.signal,headers:{'User-Agent':'Mozilla/5.0'}});
    clearTimeout(to);
    const ct=r.headers.get('content-type')||'';
    if(r.ok && !ct.includes('text/html')){
      const ab=await r.arrayBuffer();
      const dest=path.join(root,'assets',n);
      fs.mkdirSync(path.dirname(dest),{recursive:true});
      fs.writeFileSync(dest,Buffer.from(ab));
      ok++;
      console.log('OK',n,ct);
    } else { miss++; }
  }catch{ miss++; }
}
console.log(`done ok=${ok} miss=${miss}`);
