
const CACHE = "static-cache-v1"
const ASSETS = ["/","/index.html"]

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS))
  )
})

self.addEventListener("fetch",e=>{
  if(e.request.url.includes("jsonplaceholder")){
    e.respondWith(
      caches.open("api-cache").then(cache=>
        fetch(e.request)
        .then(res=>{
          cache.put(e.request,res.clone())
          return res
        })
        .catch(()=>cache.match(e.request))
      )
    )
  }else{
    e.respondWith(
      caches.match(e.request).then(res=>res || fetch(e.request))
    )
  }
})
