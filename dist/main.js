(()=>{const t=new Date,e=document.getElementById("submitBtn");document.getElementById("temps"),e.addEventListener("click",(e=>{e.preventDefault();const a=document.getElementById("city").value,n=document.getElementById("date").value,[c,i]=n.split("T"),[o,m,y]=c.split("-"),[h,u]=i.split(":"),p=new Date(o,m-1,y,h,u);(""!==a||""!==n||p<t)&&(document.getElementById("time").innerHTML=`<b>Departure in ${Math.ceil((p-t)/3600/1e3/24)} days</b>`,d(),r(a,"https://pixabay.com/api?","30776478-ff0b8818f9bba72161ebb1731").then((function(t){const e=t.hits.length,a=Math.floor(Math.random()*e);return l("/addPicture",{pic:t.hits[a].webformatURL})})).then((function(){return s()})).catch((function(t){console.log(t),alert("No pictures found")})))}));const a=async(t,e,a)=>{const n=await fetch(`${t}q=${e}&username=${a}`);try{return await n.json()}catch(t){console.log("error",t)}},n=async(t="",e={})=>{const a=await fetch(t,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({temp:e.temp,datetime:e.datetime})});try{return await a.json()}catch(t){console.log(t)}},c=async t=>{const e=await fetch("/allWeather");try{const a=await e.json(),n=document.createElement("li");n.setAttribute("id",`entry-${t+1}`),n.innerHTML=`<b>DATE:</b> ${a.datetime} <b>TEMPERATURE:</b> ${a.temp}`,document.getElementById("entries").appendChild(n)}catch(t){console.log("error",t)}},o=async(t,e,a,n)=>{const c=await fetch(`${t}&lat=${a}&lon=${n}&key=${e}`);try{return await c.json()}catch(t){console.log("error",t)}},r=async(t,e,a)=>{const n=t.split(" ").join("+"),c=await fetch(`${e}key=${a}&q=${n}`);try{return await c.json()}catch(t){console.log("error",t)}},s=async()=>{const t=await fetch("/allPictures");try{const e=await t.json(),a=document.createElement("img");a.setAttribute("id","city-pic"),a.setAttribute("src",`${e.pic}`),a.setAttribute("alt","Your city"),document.getElementById("img-container").appendChild(a)}catch(t){console.log("error",t)}},l=async(t="",e={})=>{const a=await fetch(t,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({pic:e.pic})});try{return await a.json()}catch(t){console.log(t)}},d=async()=>{for(i=0;i<16;i++)try{const t=await document.getElementById("city").value,e=await a("http://api.geonames.org/searchJSON?",t,"rohanasif1990"),r=await o("https://api.weatherbit.io/v2.0/forecast/daily?","20028a8267a24bba9a807362767bc4a7",e.geonames[0].lat,e.geonames[0].lng);n("/addWeather",{temp:r.data[i].temp,datetime:r.data[i].datetime}),c(i)}catch(t){console.log(t),alert("Please enter a valid city and a valid time")}}})();