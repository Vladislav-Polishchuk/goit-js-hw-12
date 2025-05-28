import{S as L,a as v,i}from"./assets/vendor-B3Lscd_h.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const w=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more"),S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function p(t){const o=t.map(r=>`
        <li class="gallery-item">
          <a href="${r.largeImageURL}" class="gallery__item">
            <img class="gallery__image" src="${r.webformatURL}" alt="${r.tags}" />
          </a>
          <div class="info">
            <div class="info-block">
              <p>Likes</p>
              <b>${r.likes}</b>
            </div>
            <div class="info-block">
              <p>Views</p>
              <b>${r.views}</b>
            </div>
            <div class="info-block">
              <p>Comments</p>
              <b>${r.comments}</b>
            </div>
            <div class="info-block">
              <p>Downloads</p>
              <b>${r.downloads}</b>
            </div>
          </div>
        </li>
      `).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",o),S.refresh()}function q(){w.innerHTML=""}function g(){f.classList.remove("hidden")}function h(){f.classList.add("hidden")}function R(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}const E="50496804-e1c6d45c14416878311a59d2c",P="https://pixabay.com/api/",_=15;async function b(t,o){const r={key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:_,page:o};return(await v.get(P,{params:r})).data}const B=document.querySelector("#search-form"),$=document.querySelector(".load-more");let n="",a=1,u=0,c=0;B.addEventListener("submit",async t=>{if(t.preventDefault(),n=t.target.elements.searchQuery.value.trim(),!n){i.warning({message:"Please enter a search query.",position:"topRight"});return}a=1,q(),y(),g();try{const o=await b(n,a);if(u=o.totalHits,c=o.hits.length,o.hits.length===0){i.warning({message:"No images found. Try a different keyword.",position:"topRight"});return}p(o.hits),u>c&&R()}catch{i.error({message:"Error loading images. Please try again.",position:"topRight"})}finally{h()}});$.addEventListener("click",async()=>{a+=1,g();try{const t=await b(n,a);c+=t.hits.length,p(t.hits),M(),c>=u&&(y(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{i.error({message:"Error loading more images.",position:"topRight"})}finally{h()}});function M(){const{height:t}=document.querySelector(".gallery a").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
