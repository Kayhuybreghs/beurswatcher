// Temporary private-network bridge to the built application, never the dev server.
import http from 'node:http';
import {randomBytes,timingSafeEqual} from 'node:crypto';
const host=process.argv[2];
if(!host||!(/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(host))||!/^\d+\.\d+\.\d+\.\d+$/.test(host))throw Error('Provide the computer’s private Wi-Fi IPv4 address.');
const port=5174,upstream=5186,token=randomBytes(24).toString('base64url'),expires=Date.now()+12*3600000,origin=`http://${host}:${port}`;
const equal=value=>{if(typeof value!=='string')return false;const a=Buffer.from(value),b=Buffer.from(token);return a.length===b.length&&timingSafeEqual(a,b);};
const server=http.createServer((req,res)=>{
 res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');
 if(Date.now()>expires){res.writeHead(410);return res.end('Deze tijdelijke preview is verlopen.');}
 if(req.headers.host!==`${host}:${port}`){res.writeHead(400);return res.end('Ongeldige previewhost.');}
 const url=new URL(req.url,origin),entry=url.searchParams.get('preview');
 if(entry&&equal(entry)){res.setHeader('Set-Cookie',`bw_preview=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200`);url.searchParams.delete('preview');res.writeHead(303,{Location:url.pathname+url.search,'Cache-Control':'no-store'});return res.end();}
 const cookie=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('bw_preview='))?.slice(11);
 if(!equal(cookie)){res.writeHead(401,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});return res.end('<!doctype html><html lang="nl"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Beurswatcher preview</title><body style="font-family:system-ui;padding:40px;color:#0c3260"><h1>Beurswatcher preview</h1><p>Open de volledige persoonlijke testlink om deze tijdelijke preview te bekijken.</p></body></html>');}
 if(!['GET','HEAD','POST','DELETE'].includes(req.method)){res.writeHead(405);return res.end();}
 if(['POST','DELETE'].includes(req.method)&&req.headers.origin!==origin){res.writeHead(403);return res.end('Ongeldige herkomst.');}
 if(/^\/(?:@|__|\.env|node_modules|app\/|src\/)/.test(url.pathname)){res.writeHead(404);return res.end();}
 const headers={...req.headers,host:`127.0.0.1:${upstream}`};delete headers.connection;delete headers['x-forwarded-host'];delete headers['x-forwarded-proto'];delete headers['x-forwarded-for'];
 headers.cookie=(req.headers.cookie||'').split(';').filter(c=>!c.trim().startsWith('bw_preview=')).join(';');
 if(headers.origin===origin)headers.origin=`http://127.0.0.1:${upstream}`;
 const proxy=http.request({hostname:'127.0.0.1',port:upstream,path:url.pathname+url.search,method:req.method,headers},up=>{const out={...up.headers,'referrer-policy':'no-referrer','cache-control':'no-store'};delete out['set-cookie'];delete out.connection;if(out.location?.startsWith(`http://127.0.0.1:${upstream}`))out.location=out.location.replace(`http://127.0.0.1:${upstream}`,origin);res.writeHead(up.statusCode||502,out);up.pipe(res);});
 proxy.on('error',()=>{if(!res.headersSent)res.writeHead(502);res.end('De lokale website wordt gestart. Probeer het zo opnieuw.');});
 let bytes=0;req.on('data',chunk=>{bytes+=chunk.length;if(bytes>16384){proxy.destroy();if(!res.headersSent)res.writeHead(413);res.end('Invoer te groot.');req.destroy();}});req.pipe(proxy);req.on('aborted',()=>proxy.destroy());
});
server.requestTimeout=20000;server.headersTimeout=10000;
server.listen(port,host,()=>console.log(`PHONE_PREVIEW=${origin}/?preview=${token}\nPrivate LAN preview; computer and both processes must stay on. Expires after 12 hours. No upload or public tunnel.`));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
