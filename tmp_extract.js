const fs=require('fs');
const files=['assets/AdminDashboard-DIn9bV81.js','assets/TaskTemplates-pK5dWkt0.js','assets/PhoneNumbers-Bdk1ULRG.js','assets/AIKnowledgeManagement-Bj95S81f.js','assets/ChatMonitoring-CF6Ltr4Z.js','assets/EmailHistory-CF6EXFQi.js','assets/EmailProviders-QDq-OhP4.js','assets/Settings-tQs9uSSS.js'];
for(const f of files){
  const s=fs.readFileSync(f,'utf8');
  const rpcs=[...s.matchAll(/\.rpc\("([^"]+)"/g)].map(m=>m[1]);
  const froms=[...s.matchAll(/\.from\("([^"]+)"\)/g)].map(m=>m[1]);
  console.log('\n# '+f);
  console.log('rpc', [...new Set(rpcs)].sort().join(', '));
  console.log('from', [...new Set(froms)].sort().join(', '));
}
