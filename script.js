const $=id=>document.getElementById(id);
function set(id,v){$(id).textContent=v}

set("heroBride",WEDDING.bride.name); set("heroGroom",WEDDING.groom.name);
set("brideName",WEDDING.bride.name); set("brideParents",WEDDING.bride.parents); set("brideExtra",WEDDING.bride.extra);
set("groomName",WEDDING.groom.name); set("groomParents",WEDDING.groom.parents); set("groomExtra",WEDDING.groom.extra);
set("nikahDate",WEDDING.nikah.date); set("nikahTime",WEDDING.nikah.time); set("venue1",WEDDING.nikah.venue); set("address1",WEDDING.nikah.address);
set("valimaDate",WEDDING.valima.date); set("valimaTime",WEDDING.valima.time); set("venue2",WEDDING.valima.venue); set("address2",WEDDING.valima.address);
$("map1").href=WEDDING.nikah.map; $("map2").href=WEDDING.valima.map;
$("finalNames").textContent=`${WEDDING.bride.name} & ${WEDDING.groom.name}`;
$("familyList").innerHTML=WEDDING.family.map(x=>`<div>${x}</div>`).join("");

const music=$("music"), musicBtn=$("musicBtn");
$("openBtn").onclick=async()=>{
  $("opening").classList.add("opened"); $("invitation").classList.remove("hidden");
  setTimeout(()=>go("welcome"),900);
  try{await music.play(); musicBtn.classList.add("on")}catch(e){}
};
musicBtn.onclick=async()=>{if(music.paused){try{await music.play()}catch(e){} musicBtn.classList.add("on")}else{music.pause();musicBtn.classList.remove("on")}};

function go(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}

/* Scratch cards: touch + mouse, three hearts */
document.querySelectorAll(".scratch-heart canvas").forEach((canvas,i)=>{
  const c=canvas.getContext("2d"), d=devicePixelRatio||1, box=canvas.getBoundingClientRect();
  function size(){const r=canvas.parentElement.getBoundingClientRect();canvas.width=r.width*d;canvas.height=r.height*d; c.setTransform(d,0,0,d,0,0); c.fillStyle="#d9a9b9";c.fillRect(0,0,r.width,r.height); c.fillStyle="rgba(255,255,255,.35)"; for(let x=0;x<r.width;x+=18)for(let y=0;y<r.height;y+=18){c.beginPath();c.arc(x,y,2,0,7);c.fill()}}
  size(); addScratch(canvas,c,i);
});
function addScratch(canvas,c,i){
 let down=false,last=null;
 const point=e=>{const r=canvas.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top}};
 const scratch=e=>{if(!down)return;const p=point(e);c.globalCompositeOperation="destination-out";c.beginPath();c.arc(p.x,p.y,24,0,Math.PI*2);c.fill();last=p};
 ["pointerdown","touchstart"].forEach(ev=>canvas.addEventListener(ev,e=>{down=true;scratch(e)},{passive:false}));
 ["pointermove","touchmove"].forEach(ev=>canvas.addEventListener(ev,e=>{scratch(e);if(e.cancelable)e.preventDefault()},{passive:false}));
 ["pointerup","pointercancel","touchend"].forEach(ev=>canvas.addEventListener(ev,()=>{down=false}));
}
function revealAll(){
 document.querySelectorAll(".scratch-heart canvas").forEach(c=>{c.style.opacity=0});
 $("revealedDate").textContent=`${WEDDING.nikah.date} • ${WEDDING.nikah.time}`;
}

/* Countdown */
function countdown(){
 const t=new Date(WEDDING.nikah.iso).getTime(), n=Date.now(), diff=Math.max(0,t-n);
 const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
 $("countdown").innerHTML=[["Days",d],["Hours",h],["Minutes",m],["Seconds",s]].map(x=>`<div><b>${String(x[1]).padStart(2,"0")}</b><small>${x[0]}</small></div>`).join("");
}
countdown();setInterval(countdown,1000);

/* Scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.18});
document.querySelectorAll(".section").forEach(x=>io.observe(x));
