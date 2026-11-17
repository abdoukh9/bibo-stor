const $ = (id) => document.getElementById(id);
const products = [
  {category:"men", price:129, names:{ar:"تيشيرت أساسي",fr:"T-shirt basique",en:"Basic T-shirt",es:"Camiseta básica"}, tags:{ar:"رجالي / ملابس",fr:"HOMME / VÊTEMENTS",en:"MEN / CLOTHING",es:"HOMBRE / ROPA"}},
  {category:"women", price:249, names:{ar:"إطلالة أنيقة",fr:"Tenue élégante",en:"Elegant outfit",es:"Conjunto elegante"}, tags:{ar:"نسائي / ملابس",fr:"FEMME / VÊTEMENTS",en:"WOMEN / CLOTHING",es:"MUJER / ROPA"}},
  {category:"shoes", price:399, names:{ar:"حذاء رياضي",fr:"Chaussures sport",en:"Sport sneakers",es:"Zapatillas deportivas"}, tags:{ar:"أحذية / رياضي",fr:"CHAUSSURES / SPORT",en:"SHOES / SPORT",es:"CALZADO / DEPORTE"}},
  {category:"men", price:459, names:{ar:"جاكيت عصري",fr:"Veste moderne",en:"Modern jacket",es:"Chaqueta moderna"}, tags:{ar:"رجالي / معاطف",fr:"HOMME / VESTES",en:"MEN / OUTERWEAR",es:"HOMBRE / ABRIGOS"}}
];
const text = {
ar:{
notice:"✨ عروض الافتتاح — اكتشف تشكيلتنا الجديدة",home:"الرئيسية",products:"المنتجات",about:"من نحن",
heroEyebrow:"BIBO STOR — المجموعة الجديدة",heroTitle:"أناقتك تبدأ<br>من هنا.",heroText:"اكتشف أحدث الملابس والأحذية بلمسة عصرية وأسعار مناسبة.",shop:"تسوق الآن ←",
perks:["🚚 توصيل لجميع المدن","💳 الدفع عند الاستلام (تجريبي)","💬 خدمة الزبناء"],
sectionEyebrow:"اختر إطلالتك",sectionTitle:"تسوق حسب الفئة",filters:["الكل","رجال","نساء","أحذية"],add:"أضف إلى السلة",
hint:"* المنتجات والصور والأسعار تجريبية، وسنغيّرها عندما تزودنا بمنتجاتك الحقيقية.",
bannerEyebrow:"BIBO STOR",bannerTitle:"اختر أسلوبك.<br>اترك بصمتك.",bannerText:"قطع مختارة لترافقك كل يوم.",
copyright:"© 2026 BIBO STOR",demo:"نسخة عرض تجريبية",cart:"🛍️ السلة",cartTitle:"سلة التسوق",empty:"السلة فارغة حالياً.",total:"المجموع:",
name:"الاسم الكامل",phone:"رقم الهاتف",address:"المدينة والعنوان",send:"إرسال طلب تجريبي",cartHint:"لن يتم إرسال طلب حقيقي أو تحصيل أي مبلغ في هذه النسخة.",
remove:"حذف",demoAlert:"هذا نموذج تجريبي فقط؛ لم يتم إرسال طلب حقيقي أو حفظ بياناتك.",currency:"درهم"
},
fr:{
notice:"✨ Offre de lancement — découvrez notre collection",home:"Accueil",products:"Produits",about:"À propos",
heroEyebrow:"BIBO STOR — NOUVELLE COLLECTION",heroTitle:"Votre style commence<br>ici.",heroText:"Découvrez des vêtements et chaussures modernes à des prix accessibles.",shop:"Acheter maintenant ←",
perks:["🚚 Livraison dans toutes les villes","💳 Paiement à la livraison (démo)","💬 Service client"],
sectionEyebrow:"TROUVEZ VOTRE STYLE",sectionTitle:"Acheter par catégorie",filters:["Tout","Homme","Femme","Chaussures"],add:"Ajouter au panier",
hint:"* Les produits, photos et prix sont fictifs. Nous les remplacerons lorsque vous fournirez votre catalogue.",
bannerEyebrow:"BIBO STOR",bannerTitle:"Choisissez votre style.<br>Laissez votre empreinte.",bannerText:"Des pièces choisies pour vous accompagner chaque jour.",
copyright:"© 2026 BIBO STOR",demo:"Version de démonstration",cart:"🛍️ Panier",cartTitle:"Votre panier",empty:"Votre panier est vide.",total:"Total :",
name:"Nom complet",phone:"Numéro de téléphone",address:"Ville et adresse",send:"Envoyer une commande démo",cartHint:"Aucune commande réelle ne sera envoyée et aucun paiement ne sera effectué.",
remove:"Supprimer",demoAlert:"Ceci est une démonstration. Aucune commande n’a été envoyée et vos données ne sont pas enregistrées.",currency:"MAD"
},
en:{
notice:"✨ Launch collection — discover our latest styles",home:"Home",products:"Products",about:"About",
heroEyebrow:"BIBO STOR — NEW COLLECTION",heroTitle:"Your style starts<br>here.",heroText:"Discover modern clothing and shoes at accessible prices.",shop:"Shop now ←",
perks:["🚚 Delivery across Morocco","💳 Cash on delivery (demo)","💬 Customer support"],
sectionEyebrow:"CHOOSE YOUR LOOK",sectionTitle:"Shop by category",filters:["All","Men","Women","Shoes"],add:"Add to cart",
hint:"* Products, photos and prices are demo content. We will replace them when you provide your real catalogue.",
bannerEyebrow:"BIBO STOR",bannerTitle:"Choose your style.<br>Make your mark.",bannerText:"Selected pieces to accompany you every day.",
copyright:"© 2026 BIBO STOR",demo:"Demo storefront",cart:"🛍️ Cart",cartTitle:"Shopping cart",empty:"Your cart is empty.",total:"Total:",
name:"Full name",phone:"Phone number",address:"City and address",send:"Submit demo order",cartHint:"No real order will be sent and no payment will be collected.",
remove:"Remove",demoAlert:"This is a demo only. No order was sent and your details were not saved.",currency:"MAD"
},
es:{
notice:"✨ Oferta de lanzamiento — descubre nuestra colección",home:"Inicio",products:"Productos",about:"Nosotros",
heroEyebrow:"BIBO STOR — NUEVA COLECCIÓN",heroTitle:"Tu estilo empieza<br>aquí.",heroText:"Descubre ropa y calzado moderno a precios accesibles.",shop:"Comprar ahora ←",
perks:["🚚 Envíos a todas las ciudades","💳 Pago contra entrega (demo)","💬 Atención al cliente"],
sectionEyebrow:"ELIGE TU ESTILO",sectionTitle:"Comprar por categoría",filters:["Todo","Hombre","Mujer","Calzado"],add:"Añadir al carrito",
hint:"* Los productos, fotos y precios son de demostración. Los cambiaremos cuando nos facilites tu catálogo real.",
bannerEyebrow:"BIBO STOR",bannerTitle:"Elige tu estilo.<br>Deja tu huella.",bannerText:"Prendas seleccionadas para acompañarte cada día.",
copyright:"© 2026 BIBO STOR",demo:"Tienda de demostración",cart:"🛍️ Carrito",cartTitle:"Tu carrito",empty:"Tu carrito está vacío.",total:"Total:",
name:"Nombre completo",phone:"Número de teléfono",address:"Ciudad y dirección",send:"Enviar pedido de prueba",cartHint:"No se enviará ningún pedido real ni se realizará ningún cobro.",
remove:"Eliminar",demoAlert:"Esto es solo una demostración. No se ha enviado ningún pedido ni se han guardado tus datos.",currency:"MAD"
}
};
let lang = "ar";
let cart = [];
try { cart = JSON.parse(localStorage.getItem("biboDemoCart") || "[]"); } catch (_) { cart = []; }
const money = n => lang === "ar" ? n + " درهم" : lang === "en" ? "MAD " + n : n + " MAD";
function saveCart(){ try { localStorage.setItem("biboDemoCart", JSON.stringify(cart)); } catch (_) {} }
function renderCart(){
  const t = text[lang];
  $("count").textContent = cart.reduce((sum,item)=>sum+item.qty,0);
  $("items").innerHTML = cart.length ? cart.map(item=>{
    const p=products[item.id];
    return '<div class="cartline"><span>'+p.names[lang]+' × '+item.qty+'</span><b>'+money(p.price*item.qty)+' <button type="button" data-remove="'+item.id+'" aria-label="'+t.remove+'">×</button></b><div class="qty"><button type="button" data-qty="'+item.id+'" data-delta="-1">−</button><span>'+item.qty+'</span><button type="button" data-qty="'+item.id+'" data-delta="1">+</button></div></div>';
  }).join("") : t.empty;
  $("total").textContent = money(cart.reduce((sum,item)=>sum+products[item.id].price*item.qty,0));
}
function renderLanguage(){
  const t=text[lang];
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.querySelector(".notice").textContent=t.notice;
  document.querySelectorAll("nav a").forEach((a,i)=>a.textContent=[t.home,t.products,t.about][i]);
  document.querySelector(".hero .eyebrow").textContent=t.heroEyebrow;
  document.querySelector(".hero h1").innerHTML=t.heroTitle;
  document.querySelector(".hero p").textContent=t.heroText;
  document.querySelector(".hero .cta").textContent=t.shop;
  document.querySelectorAll(".perks span").forEach((el,i)=>el.textContent=t.perks[i]);
  document.querySelector(".heading .eyebrow").textContent=t.sectionEyebrow;
  document.querySelector(".heading h2").textContent=t.sectionTitle;
  document.querySelectorAll("[data-filter]").forEach((el,i)=>el.textContent=t.filters[i]);
  document.querySelectorAll(".product").forEach((card,i)=>{
    card.querySelector(".details small").textContent=products[i].tags[lang];
    card.querySelector(".details h3").textContent=products[i].names[lang];
    card.querySelector(".details b").textContent=money(products[i].price);
    const btn=card.querySelector(".add");
    btn.textContent=t.add;
    btn.dataset.name=products[i].names[lang];
  });
  document.querySelector(".section .hint").textContent=t.hint;
  document.querySelector(".banner .eyebrow").textContent=t.bannerEyebrow;
  document.querySelector(".banner h2").innerHTML=t.bannerTitle;
  document.querySelector(".banner p").textContent=t.bannerText;
  document.querySelector("footer > span").textContent=t.copyright;
  document.querySelector("footer small").textContent=t.demo;
  $("showCart").innerHTML=t.cart+' <span id="count">0</span>';
  document.querySelector(".carthead h2").textContent=t.cartTitle;
  document.querySelector("#cart > p").innerHTML=t.total+' <strong id="total">0</strong>';
  const fields=$("order").querySelectorAll("input");
  fields[0].placeholder=t.name; fields[1].placeholder=t.phone; fields[2].placeholder=t.address;
  $("order").querySelector("button").textContent=t.send;
  $("cart").querySelector(".hint").textContent=t.cartHint;
  renderCart();
}
document.addEventListener("click",e=>{
  const add=e.target.closest(".add");
  if(add){
    const id=Array.from(document.querySelectorAll(".product .add")).indexOf(add);
    const existing=cart.find(x=>x.id===id);
    if(existing) existing.qty++; else cart.push({id,qty:1});
    saveCart();renderCart();openCart();
  }
  const remove=e.target.closest("[data-remove]");
  if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));saveCart();renderCart();}
  const qty=e.target.closest("[data-qty]");
  if(qty){const item=cart.find(x=>x.id===Number(qty.dataset.qty));if(item){item.qty+=Number(qty.dataset.delta);if(item.qty<1)cart=cart.filter(x=>x!==item);saveCart();renderCart();}}
  const filter=e.target.closest("[data-filter]");
  if(filter){
    document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));
    filter.classList.add("active");
    document.querySelectorAll(".product").forEach(card=>card.hidden=filter.dataset.filter!=="all"&&card.dataset.cat!==filter.dataset.filter);
  }
});
function openCart(){$("cart").classList.add("open");$("shade").classList.add("show");}
function closeCart(){$("cart").classList.remove("open");$("shade").classList.remove("show");}
$("showCart").addEventListener("click",openCart);
$("hideCart").addEventListener("click",closeCart);
$("shade").addEventListener("click",closeCart);
$("lang").addEventListener("change",e=>{lang=e.target.value;renderLanguage();});
$("order").addEventListener("submit",e=>{e.preventDefault();alert(text[lang].demoAlert);e.target.reset();});
renderLanguage();