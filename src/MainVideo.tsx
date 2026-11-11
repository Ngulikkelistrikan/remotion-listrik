import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

const scenes = [
  {eyebrow:'ENERGI DI SEKITAR KITA', title:'Bagaimana listrik\\nsampai ke rumah kita?', sub:'Perjalanan panjang energi listrik dimulai dari sini.', tag:'NGULIK KELISTRIKAN'},
  {eyebrow:'TAHAP 01 • PEMBANGKIT', title:'Energi diubah\\nmenjadi listrik', sub:'Generator mengubah energi mekanik menjadi energi listrik.', tag:'PEMBANGKIT LISTRIK'},
  {eyebrow:'TAHAP 02 • TRANSMISI', title:'Dikirim melalui\\njaringan tegangan tinggi', sub:'Tegangan tinggi membantu penyaluran daya jarak jauh dengan lebih efisien.', tag:'JARINGAN TRANSMISI'},
  {eyebrow:'TAHAP 03 • GARDU INDUK', title:'Tegangan diatur\\nsesuai kebutuhan', sub:'Transformator daya menaikkan atau menurunkan tegangan pada sistem.', tag:'GARDU INDUK'},
  {eyebrow:'TAHAP 04 • DISTRIBUSI', title:'Listrik mendekat\\nke lingkungan kita', sub:'Jaringan distribusi dan trafo distribusi menyalurkan listrik ke pelanggan.', tag:'JARINGAN DISTRIBUSI'},
  {eyebrow:'SAMPAI DI TUJUAN', title:'Kini listrik\\nsiap digunakan', sub:'Dari pembangkit hingga rumah—itulah perjalanan energi listrik.', tag:'BELAJAR LISTRIK, MEMAHAMI ENERGI.'}
];

const palette = {bg:'#061321', cyan:'#52e5f2', gold:'#ffc45b', white:'#f4f8fb', muted:'#a9bdca'};

const Glow: React.FC<{x:string;y:string;size:number;color:string;opacity?:number}> = ({x,y,size,color,opacity=0.35}) => (
  <div style={{position:'absolute',left:x,top:y,width:size,height:size,borderRadius:'50%',background:color,filter:`blur(${size/3}px)`,opacity}}/>
);

const PowerPlant: React.FC<{f:number}> = ({f}) => (
  <svg viewBox="0 0 900 620" style={{position:'absolute',width:'100%',height:'54%',bottom:'8%'}}>
    <defs>
      <linearGradient id="metal" x1="0" x2="1"><stop stopColor="#183d53"/><stop offset="1" stopColor="#36718a"/></linearGradient>
      <linearGradient id="steam" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#b9e5ef" stopOpacity=".35"/><stop offset="1" stopColor="#b9e5ef" stopOpacity="0"/></linearGradient>
    </defs>
    <path d="M0 540 H900" stroke="#2b5366" strokeWidth="4"/>
    <path d="M70 540 V340 H280 V540 M280 540 V275 H510 V540 M510 540 V365 H810 V540" fill="url(#metal)" stroke="#6ba5b7" strokeWidth="3"/>
    <path d="M95 340 L95 250 H160 V340 M175 340 V210 H240 V340 M570 365 V250 H640 V365 M660 365 V300 H760 V365" fill="#15364b" stroke="#6ba5b7" strokeWidth="3"/>
    <path d="M120 250 L130 90 H170 L185 250 M195 210 L210 45 H250 L260 210" fill="#234b5d" stroke="#8dbac5" strokeWidth="3"/>
    <path d="M135 85 Q110 40 150 5 Q190 55 165 85 M220 40 Q190 0 230 -30 Q270 5 245 40" fill="url(#steam)" opacity=".8"/>
    {Array.from({length:8}).map((_,i)=><rect key={i} x={95+i*82} y={390+(i%2)*24} width="42" height="90" rx="4" fill="#071b2a" stroke="#3c8195" strokeWidth="2"/>)}
    <path d="M315 275 H475 M330 275 V220 H460 V275 M350 220 V170 H440 V220" fill="none" stroke={palette.cyan} strokeWidth="5" opacity=".8"/>
    <circle cx={390} cy={195} r={42} fill="#0b2637" stroke={palette.gold} strokeWidth="7"/>
    <path d={`M390 153 V237 M348 195 H432`} stroke={palette.gold} strokeWidth="6" transform={`rotate(${f*1.2} 390 195)`}/>
    <path d="M0 540 Q240 510 450 540 T900 540 V620 H0Z" fill="#04101b"/>
  </svg>
);

const Transmission: React.FC<{f:number}> = ({f}) => (
  <svg viewBox="0 0 900 620" style={{position:'absolute',width:'100%',height:'55%',bottom:'8%'}}>
    <path d="M0 540 H900" stroke="#34596b" strokeWidth="4"/>
    {[170,450,730].map((x,i)=><g key={x} stroke="#75a7b8" strokeWidth="7" fill="none">
      <path d={`M${x} 535 L${x-72} 90 L${x+72} 90 Z M${x-55} 195 H${x+55} M${x-47} 275 H${x+47} M${x-35} 360 H${x+35} M${x-20} 445 H${x+20} M${x-100} 195 H${x+100} M${x-88} 275 H${x+88}`}/>
      <path d={`M${x-100} 195 L${x+100} 275 M${x+100} 195 L${x-88} 275 M${x-55} 275 L${x+35} 360 M${x+55} 275 L${x-35} 360`}/>
    </g>)}
    {[130,410,690].map((x,i)=><g key={x} stroke={palette.cyan} strokeWidth="3" fill="none"><path d={`M${x} 195 Q${x+140} 160 ${x+280} 195`} strokeDasharray="8 12" opacity=".8"/></g>)}
    <circle cx={((f*4)%900)} cy="190" r="10" fill={palette.gold} />
    <circle cx={((f*4+300)%900)} cy="190" r="7" fill={palette.gold} opacity=".7"/>
  </svg>
);

const Substation: React.FC<{f:number}> = ({f}) => (
  <svg viewBox="0 0 900 620" style={{position:'absolute',width:'100%',height:'52%',bottom:'10%'}}>
    <path d="M0 535 H900" stroke="#34596b" strokeWidth="4"/>
    {[120,300,480,660].map((x,i)=><g key={x}>
      <rect x={x} y={300-(i%2)*35} width="115" height="235" rx="8" fill="#15384c" stroke="#65a6b9" strokeWidth="4"/>
      <path d={`M${x+20} ${320-(i%2)*35} V${270-(i%2)*35} H${x+95} V${320-(i%2)*35}`} fill="none" stroke={palette.cyan} strokeWidth="5"/>
      <circle cx={x+57} cy={390-(i%2)*35} r="28" fill="#092132" stroke={palette.gold} strokeWidth="6"/>
      <path d={`M${x+57} ${362-(i%2)*35} V${418-(i%2)*35}`} stroke={palette.gold} strokeWidth="4"/>
    </g>)}
    <path d="M60 235 H830 M90 210 V235 M270 210 V235 M450 210 V235 M630 210 V235 M810 210 V235" stroke="#a9c7d1" strokeWidth="7" fill="none"/>
    <path d={`M60 235 H830`} stroke={palette.cyan} strokeWidth="3" strokeDasharray="10 14" strokeDashoffset={-f*2}/>
    <path d="M60 535 V235 M830 535 V235" stroke="#6c9aaa" strokeWidth="5"/>
  </svg>
);

const Home: React.FC<{f:number}> = ({f}) => (
  <svg viewBox="0 0 900 620" style={{position:'absolute',width:'100%',height:'52%',bottom:'8%'}}>
    <path d="M0 535 H900" stroke="#34596b" strokeWidth="4"/>
    <path d="M170 310 L450 95 L730 310 V535 H170Z" fill="#173d52" stroke="#8dbac5" strokeWidth="5"/>
    <path d="M125 315 L450 65 L775 315" fill="none" stroke={palette.gold} strokeWidth="15" strokeLinejoin="round"/>
    <rect x="390" y="365" width="120" height="170" fill="#0a2233" stroke="#6da3b5" strokeWidth="4"/>
    <rect x="225" y="345" width="95" height="95" fill="#092638" stroke={palette.cyan} strokeWidth="5"/>
    <rect x="580" y="345" width="95" height="95" fill="#092638" stroke={palette.cyan} strokeWidth="5"/>
    <path d="M273 345 V440 M225 392 H320 M628 345 V440 M580 392 H675" stroke="#6da3b5" strokeWidth="3"/>
    <path d="M450 95 V25" stroke="#7da9b7" strokeWidth="6"/>
    <circle cx="450" cy="25" r="16" fill={palette.gold} opacity={.7+.3*Math.sin(f/8)}/>
    <path d="M0 535 Q240 500 450 535 T900 535 V620 H0Z" fill="#04101b"/>
  </svg>
);

const SceneArt: React.FC<{index:number;f:number}> = ({index,f}) => {
  if(index===1) return <PowerPlant f={f}/>;
  if(index===2) return <Transmission f={f}/>;
  if(index===3) return <Substation f={f}/>;
  if(index>=4) return <Home f={f}/>;
  return <PowerPlant f={f}/>;
};

export const MainVideo: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const sceneIndex=Math.min(5,Math.floor(frame/300));
  const local=frame%300;
  const scene=scenes[sceneIndex];
  const entrance=spring({frame:local,fps,config:{damping:18,stiffness:80}});
  const fade=interpolate(local,[0,18,278,300],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const drift=interpolate(local,[0,300],[24,-24]);
  return <AbsoluteFill style={{background:palette.bg,color:palette.white,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 60%, #12394b 0%, #081c2c 45%, #040c16 100%)'}}/>
    <Glow x="12%" y="17%" size={300} color="#0c9ab0" opacity={.22}/>
    <Glow x="68%" y="38%" size={260} color="#d68c35" opacity={.14}/>
    <div style={{position:'absolute',inset:0,opacity:.12,backgroundImage:'linear-gradient(rgba(120,190,210,.2) 1px, transparent 1px),linear-gradient(90deg,rgba(120,190,210,.2) 1px, transparent 1px)',backgroundSize:'72px 72px',transform:`translateY(${drift}px)`}}/>
    <div style={{position:'absolute',top:90,left:72,right:72,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:fade}}>
      <div style={{fontSize:24,fontWeight:800,letterSpacing:4,color:palette.cyan}}>NGULIK<span style={{color:palette.white}}> KELISTRIKAN</span></div>
      <div style={{fontSize:18,color:palette.muted,letterSpacing:3}}>01 / 06</div>
    </div>
    <SceneArt index={sceneIndex} f={frame}/>
    <div style={{position:'absolute',left:72,right:72,top:sceneIndex===0?'27%':'18%',opacity:fade,transform:`translateY(${(1-entrance)*45}px)`}}>
      <div style={{fontSize:22,fontWeight:700,letterSpacing:5,color:palette.cyan,marginBottom:24}}>{scene.eyebrow}</div>
      <div style={{fontSize:sceneIndex===0?76:70,lineHeight:1.08,fontWeight:900,letterSpacing:-2,whiteSpace:'pre-line',textShadow:'0 8px 30px rgba(0,0,0,.4)'}}>{scene.title}</div>
      <div style={{width:110,height:6,background:palette.gold,marginTop:30,marginBottom:24,borderRadius:5}}/>
      <div style={{fontSize:30,lineHeight:1.4,color:palette.muted,maxWidth:850}}>{scene.sub}</div>
    </div>
    <div style={{position:'absolute',bottom:95,left:72,right:72,opacity:fade}}>
      <div style={{fontSize:18,letterSpacing:4,color:palette.gold,fontWeight:800,marginBottom:18}}>{scene.tag}</div>
      <div style={{height:5,background:'rgba(255,255,255,.18)',borderRadius:5,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${(frame/1800)*100}%`,background:palette.cyan,boxShadow:'0 0 16px #52e5f2'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:14,fontSize:17,color:palette.muted,letterSpacing:2}}>
        <span>BELAJAR LISTRIK, MEMAHAMI ENERGI.</span><span>SHORTS • 9:16</span>
      </div>
    </div>
    <div style={{position:'absolute',inset:24,border:'1px solid rgba(115,190,210,.16)',pointerEvents:'none'}}/>
  </AbsoluteFill>;
};
