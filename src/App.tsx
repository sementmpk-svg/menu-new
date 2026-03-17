import { useState, useEffect } from "react";

// ╔══════════════════════════════════════════════════════╗
// ║                   ⚙️  CONFIG                        ║
// ╚══════════════════════════════════════════════════════╝
const CONFIG = {
  nombre:          "Why Not",
  ciudad:          "Buenos Aires",
  subtitulo:       "Café · Bar · Restaurante",
  colorAcento:     "#C9A96E",
  sheetsUrl:       "PEGAR_URL_DE_GOOGLE_APPS_SCRIPT_AQUI",
  storageKey:      "whynot_surveys_v1",
  pagoEfectivo:    true,
  pagoMercadoPago: true,
  pagoTarjeta:     true,
};

const GOLD  = CONFIG.colorAcento;
const WHITE = "#ffffff";
const BG    = "#0A0A0A";
const SURF  = "#141414";
const SURF2 = "#1C1C1C";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT  = "#F0ECE4";
const MUTED = "rgba(240,236,228,0.45)";

// ===================== TRADUCCIONES =====================
const T = {
  es: { flag:"🇪🇸", langName:"Español",   todo:"Todo", oferta:"ESPECIAL", mediospago:"Medios de pago", efectivo:"Efectivo", tarjeta:"Tarjeta", precios:"Precios en pesos argentinos · IVA incluido", verPedido:"🛒 Carrito", tuPedido:"Tu pedido", revisaPedido:"Revisá tu pedido", mostrarMozo:"¡Listo! Mostrá esta pantalla al mozo", instruccion:"El mozo tomará nota de tu pedido", carritoVacio:"Tu carrito está vacío", verMenu:"Ver menú", confirmar:"Confirmar y llamar al mozo", volver:"← Volver", cu:"c/u", item:"item", items:"items", nuevoPedido:"Nuevo pedido", encuesta:"¿Cómo fue tu experiencia?", encuestaSubtitulo:"Tu opinión nos ayuda a mejorar", estrellas:"¿Cómo calificás el menú?", enviarEncuesta:"Enviar opinión", saltarEncuesta:"Saltar", graciasEncuesta:"¡Gracias! 🙏", facilMuyFacil:"Muy fácil", facilFacil:"Fácil", facilDificil:"Difícil" },
  en: { flag:"🇬🇧", langName:"English",   todo:"All",  oferta:"SPECIAL",  mediospago:"Payment methods", efectivo:"Cash", tarjeta:"Card", precios:"Prices in Argentine pesos · VAT included", verPedido:"🛒 Cart", tuPedido:"Your order", revisaPedido:"Review your order", mostrarMozo:"Done! Show this screen to the waiter", instruccion:"The waiter will take note of your order", carritoVacio:"Your cart is empty", verMenu:"See menu", confirmar:"Confirm & call the waiter", volver:"← Back", cu:"each", item:"item", items:"items", nuevoPedido:"New order", encuesta:"How was your experience?", encuestaSubtitulo:"Your feedback helps us improve", estrellas:"How do you rate the menu?", enviarEncuesta:"Send feedback", saltarEncuesta:"Skip", graciasEncuesta:"Thanks! 🙏", facilMuyFacil:"Very easy", facilFacil:"Easy", facilDificil:"Difficult" },
  pt: { flag:"🇧🇷", langName:"Português", todo:"Tudo", oferta:"OFERTA",   mediospago:"Formas de pagamento", efectivo:"Dinheiro", tarjeta:"Cartão", precios:"Preços em pesos argentinos · IVA incluído", verPedido:"🛒 Carrinho", tuPedido:"Seu pedido", revisaPedido:"Revise seu pedido", mostrarMozo:"Pronto! Mostre esta tela ao garçom", instruccion:"O garçom anotará seu pedido", carritoVacio:"Seu carrinho está vazio", verMenu:"Ver cardápio", confirmar:"Confirmar e chamar o garçom", volver:"← Voltar", cu:"un.", item:"item", items:"itens", nuevoPedido:"Novo pedido", encuesta:"Como foi sua experiência?", encuestaSubtitulo:"Sua opinião nos ajuda a melhorar", estrellas:"Como você avalia o cardápio?", enviarEncuesta:"Enviar opinião", saltarEncuesta:"Pular", graciasEncuesta:"Obrigado! 🙏", facilMuyFacil:"Muito fácil", facilFacil:"Fácil", facilDificil:"Difícil" },
  it: { flag:"🇮🇹", langName:"Italiano",  todo:"Tutto",oferta:"OFFERTA",  mediospago:"Metodi di pagamento", efectivo:"Contanti", tarjeta:"Carta", precios:"Prezzi in pesos argentini · IVA inclusa", verPedido:"🛒 Carrello", tuPedido:"Il tuo ordine", revisaPedido:"Rivedi il tuo ordine", mostrarMozo:"Fatto! Mostra questo schermo al cameriere", instruccion:"Il cameriere prenderà nota del tuo ordine", carritoVacio:"Il carrello è vuoto", verMenu:"Vedi menù", confirmar:"Conferma e chiama il cameriere", volver:"← Torna", cu:"cad.", item:"articolo", items:"articoli", nuevoPedido:"Nuovo ordine", encuesta:"Com'è stata la tua esperienza?", encuestaSubtitulo:"La tua opinione ci aiuta a migliorare", estrellas:"Come valuti il menù?", enviarEncuesta:"Invia opinione", saltarEncuesta:"Salta", graciasEncuesta:"Grazie! 🙏", facilMuyFacil:"Molto facile", facilFacil:"Facile", facilDificil:"Difficile" },
  fr: { flag:"🇫🇷", langName:"Français",  todo:"Tout", oferta:"PROMO",    mediospago:"Moyens de paiement", efectivo:"Espèces", tarjeta:"Carte", precios:"Prix en pesos argentins · TVA incluse", verPedido:"🛒 Panier", tuPedido:"Votre commande", revisaPedido:"Vérifiez votre commande", mostrarMozo:"Prêt ! Montrez cet écran au serveur", instruccion:"Le serveur notera votre commande", carritoVacio:"Votre panier est vide", verMenu:"Voir le menu", confirmar:"Confirmer et appeler le serveur", volver:"← Retour", cu:"p/u", item:"article", items:"articles", nuevoPedido:"Nouvelle commande", encuesta:"Comment était votre expérience ?", encuestaSubtitulo:"Votre avis nous aide à améliorer", estrellas:"Comment évaluez-vous le menu ?", enviarEncuesta:"Envoyer l'avis", saltarEncuesta:"Passer", graciasEncuesta:"Merci ! 🙏", facilMuyFacil:"Très facile", facilFacil:"Facile", facilDificil:"Difficile" },
  ru: { flag:"🇷🇺", langName:"Русский",   todo:"Всё",  oferta:"АКЦИЯ",    mediospago:"Способы оплаты", efectivo:"Наличные", tarjeta:"Карта", precios:"Цены в аргентинских песо · НДС включён", verPedido:"🛒 Корзина", tuPedido:"Ваш заказ", revisaPedido:"Проверьте ваш заказ", mostrarMozo:"Готово! Покажите экран официанту", instruccion:"Официант запишет ваш заказ", carritoVacio:"Корзина пуста", verMenu:"Смотреть меню", confirmar:"Подтвердить и позвать официанта", volver:"← Назад", cu:"шт.", item:"позиция", items:"позиции", nuevoPedido:"Новый заказ", encuesta:"Как вам наше меню?", encuestaSubtitulo:"Ваше мнение помогает нам стать лучше", estrellas:"Как вы оцениваете меню?", enviarEncuesta:"Отправить отзыв", saltarEncuesta:"Пропустить", graciasEncuesta:"Спасибо! 🙏", facilMuyFacil:"Очень удобно", facilFacil:"Удобно", facilDificil:"Неудобно" },
};

// ===================== MENÚ =====================
// ── Reemplazá con el menú real del cliente ──
const MENU = [
  { categoria:"Especiales", nombre:"Plato especial del día", descripcion:"Consultá con el mozo", precio:1500, disponible:true, emoji:"⭐", promo:true, t:{ en:["Daily special","Ask the waiter"], pt:["Prato especial do dia","Pergunte ao garçom"], it:["Piatto speciale del giorno","Chiedi al cameriere"], fr:["Plat du jour","Demandez au serveur"], ru:["Блюдо дня","Спросите официанта"] } },
  { categoria:"Entradas", nombre:"Entrada de la casa", descripcion:"Preparación del chef", precio:800, disponible:true, emoji:"🥗", t:{ en:["House starter","Chef's preparation"], pt:["Entrada da casa","Preparação do chef"], it:["Antipasto della casa","Preparazione dello chef"], fr:["Entrée maison","Préparation du chef"], ru:["Фирменная закуска","Приготовление шефа"] } },
  { categoria:"Principales", nombre:"Plato principal", descripcion:"Con guarnición incluida", precio:2200, disponible:true, emoji:"🍽️", t:{ en:["Main course","With side dish included"], pt:["Prato principal","Com acompanhamento incluído"], it:["Piatto principale","Con contorno incluso"], fr:["Plat principal","Avec accompagnement inclus"], ru:["Основное блюдо","С гарниром"] } },
  { categoria:"Bebidas", nombre:"Agua mineral", descripcion:"", precio:400, disponible:true, emoji:"💧", t:{ en:["Mineral water",""], pt:["Água mineral",""], it:["Acqua minerale",""], fr:["Eau minérale",""], ru:["Минеральная вода",""] } },
  { categoria:"Bebidas", nombre:"Vino de la casa", descripcion:"Tinto o blanco", precio:900, disponible:true, emoji:"🍷", t:{ en:["House wine","Red or white"], pt:["Vinho da casa","Tinto ou branco"], it:["Vino della casa","Rosso o bianco"], fr:["Vin maison","Rouge ou blanc"], ru:["Вино дня","Красное или белое"] } },
];

const CAT_T: Record<string,Record<string,string>> = {
  "Especiales": {en:"Specials",    pt:"Especiais",  it:"Speciali",   fr:"Spéciaux",  ru:"Акции"},
  "Entradas":   {en:"Starters",    pt:"Entradas",   it:"Antipasti",  fr:"Entrées",   ru:"Закуски"},
  "Principales":{en:"Main courses",pt:"Principais", it:"Principali", fr:"Plats",     ru:"Основные"},
  "Bebidas":    {en:"Drinks",      pt:"Bebidas",    it:"Bevande",    fr:"Boissons",  ru:"Напитки"},
  "Postres":    {en:"Desserts",    pt:"Sobremesas", it:"Dolci",      fr:"Desserts",  ru:"Десерты"},
};

function formatPeso(n:number){return "$"+n.toLocaleString("es-AR");}
type Lang="es"|"en"|"pt"|"it"|"fr"|"ru";
type CartItem={nombre:string;emoji:string;precio:number;cantidad:number;t?:Record<string,string[]>};
type Survey={estrellas:number;idioma_util:string;comodidad:string;volveria:string;comentario:string;lang:string;fecha:string};

const SHEETS_URL = CONFIG.sheetsUrl;
const STORAGE_KEY = CONFIG.storageKey;
function loadSurveys():Survey[]{try{const d=localStorage.getItem(STORAGE_KEY);return d?JSON.parse(d):[];}catch{return [];}}
function saveSurvey(s:Survey){
  try{const all=loadSurveys();all.push(s);localStorage.setItem(STORAGE_KEY,JSON.stringify(all));}catch{}
  try{fetch(SHEETS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});}catch{}
}

// ===================== FIREWORKS =====================
function Fireworks(){
  const p=Array.from({length:12},(_,i)=>i);
  return(
    <div style={{position:"relative",height:80,overflow:"visible",marginBottom:8}}>
      <style>{`${p.map(i=>{const a=(i/12)*360,r=a*(Math.PI/180),x=Math.cos(r)*60,y=Math.sin(r)*60;return `@keyframes burst${i}{0%{transform:translate(0,0) scale(0);opacity:1}100%{transform:translate(${x}px,${y}px) scale(1.2);opacity:0}}.fw${i}{animation:burst${i} 1.2s ease-out ${(i*0.08).toFixed(2)}s infinite;}`;}).join("")}`}</style>
      {p.map(i=>{const cols=[GOLD,"#fff","#e74c3c","#27ae60","#9b59b6","#e67e22"];const c=cols[i%cols.length];const s=i%3===0?10:i%3===1?8:6;return <div key={i} className={`fw${i}`} style={{position:"absolute",left:"calc(50% - 5px)",top:"calc(50% - 5px)",width:s,height:s,borderRadius:"50%",background:c}}/>;})}</div>
  );
}

// ===================== ENCUESTA =====================
const ENC_T = {
  titulo:  {es:"¿Cómo fue tu experiencia?",en:"How was your experience?",pt:"Como foi sua experiência?",it:"Com'è stata la tua esperienza?",fr:"Comment était votre expérience ?",ru:"Как вам наше меню?"},
  sub:     {es:"Tu opinión nos ayuda a mejorar",en:"Your feedback helps us improve",pt:"Sua opinião nos ajuda a melhorar",it:"La tua opinione ci aiuta a migliorare",fr:"Votre avis nous aide à améliorer",ru:"Ваше мнение помогает нам стать лучше"},
  q1:      {es:"¿Cómo calificás el menú?",en:"How do you rate the menu?",pt:"Como você avalia o cardápio?",it:"Come valuti il menù?",fr:"Comment évaluez-vous le menu ?",ru:"Как вы оцениваете меню?"},
  q2:      {es:"¿El menú en tu idioma fue útil?",en:"Was the menu in your language helpful?",pt:"O cardápio no seu idioma foi útil?",it:"Il menù nella tua lingua è stato utile?",fr:"Le menu dans votre langue était-il utile ?",ru:"Меню на вашем языке было полезным?"},
  q2a:     {es:"🌍 Sí, mucho",en:"🌍 Yes, very much",pt:"🌍 Sim, muito",it:"🌍 Sì, molto",fr:"🌍 Oui, beaucoup",ru:"🌍 Да, очень"},
  q2b:     {es:"🤔 Más o menos",en:"🤔 Somewhat",pt:"🤔 Mais ou menos",it:"🤔 Abbastanza",fr:"🤔 Un peu",ru:"🤔 Частично"},
  q2c:     {es:"❌ No tanto",en:"❌ Not really",pt:"❌ Não muito",it:"❌ Non molto",fr:"❌ Pas vraiment",ru:"❌ Не очень"},
  q3:      {es:"¿Qué tan fácil fue navegar?",en:"How easy was it to navigate?",pt:"Foi fácil navegar?",it:"È stato facile navigare?",fr:"Était-il facile de naviguer ?",ru:"Удобно ли было пользоваться?"},
  q3a:     {es:"😊 Muy fácil",en:"😊 Very easy",pt:"😊 Muito fácil",it:"😊 Molto facile",fr:"😊 Très facile",ru:"😊 Очень удобно"},
  q3b:     {es:"🙂 Normal",en:"🙂 Normal",pt:"🙂 Normal",it:"🙂 Normale",fr:"🙂 Normal",ru:"🙂 Нормально"},
  q3c:     {es:"😕 Me confundí",en:"😕 Got confused",pt:"😕 Me confundi",it:"😕 Mi sono confuso",fr:"😕 Je me suis perdu",ru:"😕 Запутался"},
  q4:      {es:"¿Usarías este menú de nuevo?",en:"Would you use this menu again?",pt:"Usaria este cardápio de novo?",it:"Useresti di nuovo questo menù?",fr:"Utiliseriez-vous ce menu à nouveau ?",ru:"Воспользовались бы снова?"},
  q4a:     {es:"👍 Sí, claro",en:"👍 Yes, definitely",pt:"👍 Sim, claro",it:"👍 Sì, certo",fr:"👍 Oui, bien sûr",ru:"👍 Да, конечно"},
  q4b:     {es:"📄 Prefiero papel",en:"📄 Prefer paper",pt:"📄 Prefiro papel",it:"📄 Preferisco carta",fr:"📄 Je préfère papier",ru:"📄 Предпочитаю бумажное"},
  q4c:     {es:"🤷 Me da igual",en:"🤷 Doesn't matter",pt:"🤷 Tanto faz",it:"🤷 Non importa",fr:"🤷 Peu importe",ru:"🤷 Всё равно"},
  q5:      {es:"Comentario (opcional)",en:"Comment (optional)",pt:"Comentário (opcional)",it:"Commento (opzionale)",fr:"Commentaire (optionnel)",ru:"Комментарий (необязательно)"},
  enviar:  {es:"Enviar opinión",en:"Send feedback",pt:"Enviar opinião",it:"Invia opinione",fr:"Envoyer l'avis",ru:"Отправить отзыв"},
  saltar:  {es:"Saltar",en:"Skip",pt:"Pular",it:"Salta",fr:"Passer",ru:"Пропустить"},
  gracias: {es:"¡Gracias por tu opinión! 🙏",en:"Thanks for your feedback! 🙏",pt:"Obrigado pela sua opinião! 🙏",it:"Grazie per la tua opinione! 🙏",fr:"Merci pour votre avis ! 🙏",ru:"Спасибо за ваш отзыв! 🙏"},
};
function et(key:keyof typeof ENC_T,lang:Lang){return ENC_T[key][lang]??ENC_T[key].es;}

function Encuesta({lang,onSubmit,onSkip}:{lang:Lang,onSubmit:(s:Survey)=>void,onSkip:()=>void}){
  const [estrellas,setEstrellas]=useState(0);const [hoverStar,setHoverStar]=useState(0);
  const [idiomaUtil,setIdiomaUtil]=useState("");const [comodidad,setComodidad]=useState("");
  const [volveria,setVolveria]=useState("");const [comentario,setComentario]=useState("");
  const [enviado,setEnviado]=useState(false);
  function handleSubmit(){const s:Survey={estrellas,idioma_util:idiomaUtil,comodidad,volveria,comentario,lang,fecha:new Date().toLocaleString("es-AR")};saveSurvey(s);setEnviado(true);setTimeout(()=>onSubmit(s),1500);}
  const btnS=(active:boolean,col:string)=>({flex:1,padding:"12px 4px",border:`1px solid ${active?col:BORDER}`,background:active?col:"transparent",color:active?BG:MUTED,fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column" as const,alignItems:"center" as const,gap:4,transition:"all 0.2s",letterSpacing:1});
  if(enviado)return(<div style={{textAlign:"center",padding:"60px 20px",color:TEXT}}><div style={{fontSize:64,marginBottom:12}}>🙏</div><div style={{fontFamily:"'Bodoni Moda',serif",fontSize:22,fontStyle:"italic",color:GOLD}}>{et("gracias",lang)}</div></div>);
  return(
    <div style={{background:BG,minHeight:"100vh",fontFamily:"'Montserrat',sans-serif",color:TEXT,paddingBottom:60}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap');`}</style>
      <div style={{background:SURF,borderBottom:`1px solid ${BORDER}`,padding:"28px 20px",textAlign:"center"}}>
        <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:28,fontStyle:"italic",color:WHITE,marginBottom:6}}>{et("titulo",lang)}</div>
        <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase"}}>{et("sub",lang)}</div>
      </div>
      <div style={{padding:"24px 16px",display:"flex",flexDirection:"column",gap:16,maxWidth:480,margin:"0 auto"}}>
        {/* Estrellas */}
        <div style={{background:SURF,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{et("q1",lang)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>
            {[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setEstrellas(n)} onMouseEnter={()=>setHoverStar(n)} onMouseLeave={()=>setHoverStar(0)} style={{background:"none",border:"none",cursor:"pointer",fontSize:40,lineHeight:1,transition:"transform 0.15s",transform:(hoverStar||estrellas)>=n?"scale(1.2)":"scale(1)",filter:(hoverStar||estrellas)>=n?"none":"grayscale(1) opacity(0.25)",flex:1,padding:"6px 0",touchAction:"manipulation"}}>⭐</button>))}
          </div>
        </div>
        {/* Idioma */}
        <div style={{background:SURF,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{et("q2",lang)}</div>
          <div style={{display:"flex",gap:6}}>{[{id:"si",l:"q2a"},{id:"mas_o_menos",l:"q2b"},{id:"no",l:"q2c"}].map(op=>(<button key={op.id} onClick={()=>setIdiomaUtil(op.id)} style={btnS(idiomaUtil===op.id,GOLD)}><span style={{fontSize:16}}>{et(op.l as keyof typeof ENC_T,lang).split(" ")[0]}</span><span>{et(op.l as keyof typeof ENC_T,lang).split(" ").slice(1).join(" ")}</span></button>))}</div>
        </div>
        {/* Navegación */}
        <div style={{background:SURF,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{et("q3",lang)}</div>
          <div style={{display:"flex",gap:6}}>{[{id:"muy_facil",l:"q3a"},{id:"normal",l:"q3b"},{id:"confuso",l:"q3c"}].map(op=>(<button key={op.id} onClick={()=>setComodidad(op.id)} style={btnS(comodidad===op.id,"#82ca8a")}><span style={{fontSize:16}}>{et(op.l as keyof typeof ENC_T,lang).split(" ")[0]}</span><span>{et(op.l as keyof typeof ENC_T,lang).split(" ").slice(1).join(" ")}</span></button>))}</div>
        </div>
        {/* Volvería */}
        <div style={{background:SURF,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:14}}>{et("q4",lang)}</div>
          <div style={{display:"flex",gap:6}}>{[{id:"si",l:"q4a"},{id:"papel",l:"q4b"},{id:"igual",l:"q4c"}].map(op=>(<button key={op.id} onClick={()=>setVolveria(op.id)} style={btnS(volveria===op.id,GOLD)}><span style={{fontSize:16}}>{et(op.l as keyof typeof ENC_T,lang).split(" ")[0]}</span><span>{et(op.l as keyof typeof ENC_T,lang).split(" ").slice(1).join(" ")}</span></button>))}</div>
        </div>
        {/* Comentario */}
        <div style={{background:SURF,padding:"20px",border:`1px solid ${BORDER}`}}>
          <div style={{fontSize:10,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:10}}>{et("q5",lang)}</div>
          <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="..." rows={3} style={{width:"100%",padding:"12px",background:SURF2,border:`1px solid ${BORDER}`,color:TEXT,fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box"}}/>
        </div>
        <button onClick={handleSubmit} disabled={estrellas===0} style={{width:"100%",padding:"16px",background:estrellas>0?GOLD:"#333",color:estrellas>0?BG:MUTED,border:"none",fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:estrellas>0?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.3s"}}>{et("enviar",lang)}</button>
        <button onClick={onSkip} style={{width:"100%",padding:"12px",background:"transparent",color:MUTED,border:`1px solid ${BORDER}`,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{et("saltar",lang)}</button>
      </div>
    </div>
  );
}

// ===================== ADMIN PANEL =====================
function AdminPanel({onClose}:{onClose:()=>void}){
  const surveys=loadSurveys();const total=surveys.length;
  const avgStars=total>0?(surveys.reduce((s,x)=>s+x.estrellas,0)/total).toFixed(1):"—";
  const starDist=[1,2,3,4,5].map(n=>({n,count:surveys.filter(s=>s.estrellas===n).length}));
  const langDist=(["es","en","pt","it","fr","ru"] as Lang[]).map(l=>({l,count:surveys.filter(s=>s.lang===l).length,flag:T[l].flag}));
  const comentarios=surveys.filter(s=>s.comentario?.trim().length>0);
  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'Montserrat',sans-serif",color:TEXT,paddingBottom:40}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;1,400&family=Montserrat:wght@300;400;500;600&display=swap');`}</style>
      <div style={{background:SURF,borderBottom:`1px solid ${BORDER}`,padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:9,letterSpacing:4,color:MUTED,textTransform:"uppercase",marginBottom:4}}>PANEL PRIVADO</div><div style={{fontFamily:"'Bodoni Moda',serif",fontSize:22,fontStyle:"italic",color:WHITE}}>Resultados</div></div>
        <button onClick={onClose} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"8px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:11,letterSpacing:2}}>✕ CERRAR</button>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:12,maxWidth:480,margin:"0 auto"}}>
        {total===0?(<div style={{textAlign:"center",padding:"60px 20px",color:MUTED}}><div style={{fontSize:48}}>📭</div><div style={{marginTop:12}}>Sin respuestas aún</div></div>):(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{background:SURF,padding:"16px",border:`1px solid ${BORDER}`,textAlign:"center"}}><div style={{fontFamily:"'Bodoni Moda',serif",fontSize:40,color:GOLD}}>{total}</div><div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginTop:4}}>Respuestas</div></div>
              <div style={{background:SURF,padding:"16px",border:`1px solid ${BORDER}`,textAlign:"center"}}><div style={{fontFamily:"'Bodoni Moda',serif",fontSize:40,color:GOLD}}>⭐{avgStars}</div><div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginTop:4}}>Promedio</div></div>
            </div>
            <div style={{background:SURF,padding:"16px",border:`1px solid ${BORDER}`}}>
              <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:12}}>Estrellas</div>
              {[...starDist].reverse().map(({n,count})=>(<div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:MUTED,minWidth:20}}>{n}★</span><div style={{flex:1,height:8,background:SURF2,overflow:"hidden"}}><div style={{height:"100%",width:total>0?`${(count/total)*100}%`:"0%",background:n>=4?GOLD:"#444",transition:"width 0.5s"}}/></div><span style={{fontSize:11,color:TEXT,minWidth:20,textAlign:"right"}}>{count}</span></div>))}
            </div>
            <div style={{background:SURF,padding:"16px",border:`1px solid ${BORDER}`}}>
              <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:12}}>Idiomas</div>
              <div style={{display:"flex",gap:16,justifyContent:"center"}}>{langDist.filter(l=>l.count>0).map(l=>(<div key={l.l} style={{textAlign:"center"}}><div style={{fontSize:24}}>{l.flag}</div><div style={{fontFamily:"'Bodoni Moda',serif",fontSize:18,color:GOLD}}>{l.count}</div></div>))}</div>
            </div>
            {comentarios.length>0&&(<div style={{background:SURF,padding:"16px",border:`1px solid ${BORDER}`}}>
              <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:12}}>Comentarios</div>
              {comentarios.slice(-5).reverse().map((s,i)=>(<div key={i} style={{borderBottom:`1px solid ${BORDER}`,padding:"10px 0"}}><div style={{fontSize:10,color:MUTED,marginBottom:4}}>{s.fecha} · {T[s.lang as Lang]?.flag} · {"⭐".repeat(s.estrellas)}</div><div style={{fontSize:13,fontStyle:"italic",fontFamily:"'Bodoni Moda',serif",color:TEXT}}>"{s.comentario}"</div></div>))}
            </div>)}
            <button onClick={()=>{if(confirm("¿Borrar todos los datos?")){localStorage.removeItem(STORAGE_KEY);onClose();}}} style={{width:"100%",padding:"12px",background:"transparent",color:"#ca8078",border:"1px solid rgba(202,128,120,0.3)",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>🗑️ Borrar todos los datos</button>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== APP PRINCIPAL =====================
export default function App(){
  const [lang,setLang]=useState<Lang>("es");
  const [langSelected,setLangSelected]=useState(false);
  const [langAnim,setLangAnim]=useState(false);
  const [activeCategory,setActiveCategory]=useState("all");
  const [carrito,setCarrito]=useState<CartItem[]>([]);
  const [showCarrito,setShowCarrito]=useState(false);
  const [pedidoEnviado,setPedidoEnviado]=useState(false);
  const [showCheck,setShowCheck]=useState(false);
  const [showEncuesta,setShowEncuesta]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [adminTaps,setAdminTaps]=useState(0);
  const [loaded,setLoaded]=useState(false);

  useEffect(()=>{setTimeout(()=>setLoaded(true),100);},[]);
  useEffect(()=>{if(pedidoEnviado)setTimeout(()=>setShowCheck(true),100);else setShowCheck(false);},[pedidoEnviado]);

  function chooseLang(l:Lang){setLang(l);setLangAnim(true);setTimeout(()=>{setLangSelected(true);window.scrollTo(0,0);},500);}
  function handleFooterTap(){const n=adminTaps+1;setAdminTaps(n);if(n>=5){setShowAdmin(true);setAdminTaps(0);}}

  const t=T[lang];
  const totalItems=carrito.reduce((s,i)=>s+i.cantidad,0);
  const totalPrecio=carrito.reduce((s,i)=>s+i.precio*i.cantidad,0);

  function getNombre(item:any){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function getDesc(item:any){if(lang==="es")return item.descripcion;return item.t?.[lang]?.[1]??item.descripcion;}
  function getCat(cat:string){return cat==="all"?t.todo:(CAT_T[cat]?.[lang]??cat);}
  function getCartNombre(item:CartItem){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function agregarItem(item:any){setCarrito(prev=>{const e=prev.find(c=>c.nombre===item.nombre);if(e)return prev.map(c=>c.nombre===item.nombre?{...c,cantidad:c.cantidad+1}:c);return[...prev,{nombre:item.nombre,emoji:item.emoji,precio:item.precio,cantidad:1,t:item.t}];});}
  function quitarItem(nombre:string){setCarrito(prev=>{const e=prev.find(c=>c.nombre===nombre);if(e&&e.cantidad>1)return prev.map(c=>c.nombre===nombre?{...c,cantidad:c.cantidad-1}:c);return prev.filter(c=>c.nombre!==nombre);});}
  function cantidadEnCarrito(nombre:string){return carrito.find(c=>c.nombre===nombre)?.cantidad||0;}
  function nuevosPedido(){setCarrito([]);setPedidoEnviado(false);setShowCarrito(false);setShowEncuesta(false);}

  const categories=["all",...Array.from(new Set(MENU.map(i=>i.categoria)))];
  const filtered=activeCategory==="all"?MENU:MENU.filter(i=>i.categoria===activeCategory);
  const grouped=filtered.reduce((acc:Record<string,typeof MENU>,item)=>{if(!acc[item.categoria])acc[item.categoria]=[];acc[item.categoria].push(item);return acc;},{});

  const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap');`;

  // ── PANTALLA IDIOMA ──
  if(!langSelected){
    const LANGS:[Lang,string,string][]=[["es","🇪🇸","Bienvenido"],["en","🇬🇧","Welcome"],["pt","🇧🇷","Bem-vindo"],["it","🇮🇹","Benvenuto"],["fr","🇫🇷","Bienvenue"],["ru","🇷🇺","Добро пожаловать"]];
    return(
      <div style={{position:"fixed",inset:0,background:BG,fontFamily:"'Montserrat',sans-serif",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
        <style>{`${FONTS} @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{textAlign:"center",marginBottom:40,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          <div style={{fontSize:9,letterSpacing:6,color:GOLD,textTransform:"uppercase",marginBottom:12}}>{CONFIG.ciudad}</div>
          <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:72,fontStyle:"italic",color:WHITE,lineHeight:0.9,marginBottom:16}}>{CONFIG.nombre}</div>
          <div style={{height:1,background:`linear-gradient(to right,transparent,${GOLD},transparent)`,margin:"0 auto",width:160,marginBottom:16}}/>
          <div style={{fontSize:9,letterSpacing:4,color:MUTED,textTransform:"uppercase"}}>Elegí tu idioma · Choose your language</div>
        </div>
        <div style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:8,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
          {LANGS.map(([code,flag,sub],i)=>(
            <button key={code} onClick={()=>chooseLang(code)} style={{width:"100%",padding:"14px 20px",background:SURF,border:`1px solid ${BORDER}`,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:16,animation:`fadeInUp 0.5s ease ${i*0.07}s both`,transition:"border-color 0.2s"}}>
              <span style={{fontSize:26,lineHeight:1,flexShrink:0}}>{flag}</span>
              <div style={{textAlign:"left",flex:1}}>
                <div style={{fontSize:14,fontWeight:500,color:WHITE,letterSpacing:1}}>{T[code].langName}</div>
                <div style={{fontSize:11,color:MUTED,marginTop:2,fontStyle:"italic",fontFamily:"'Bodoni Moda',serif"}}>{sub}</div>
              </div>
              <span style={{fontSize:16,color:GOLD,flexShrink:0}}>›</span>
            </button>
          ))}
        </div>
        <div style={{marginTop:28,fontSize:9,color:MUTED,letterSpacing:4,textTransform:"uppercase",opacity:langAnim?0:1,transition:"opacity 0.4s"}}>MENÚ DIGITAL</div>
      </div>
    );
  }

  if(showAdmin) return <AdminPanel onClose={()=>setShowAdmin(false)}/>;

  // ── CARRITO ──
  if(showCarrito){
    if(showEncuesta) return(
      <div style={{background:BG,minHeight:"100vh",width:"100%",overflowX:"hidden"}}>
        <Encuesta lang={lang} onSubmit={()=>{setShowEncuesta(false);nuevosPedido();}} onSkip={()=>{setShowEncuesta(false);nuevosPedido();}}/>
      </div>
    );
    return(
      <div style={{background:BG,minHeight:"100vh",width:"100%",fontFamily:"'Montserrat',sans-serif",color:TEXT,display:"flex",flexDirection:"column",overflowX:"hidden"}}>
        <style>{FONTS}</style>
        <div style={{background:SURF,borderBottom:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <button onClick={()=>setShowCarrito(false)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,padding:"7px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{t.volver}</button>
          <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:18,fontStyle:"italic",color:WHITE}}>{t.tuPedido}</div>
          <div style={{width:80}}/>
        </div>
        {pedidoEnviado?(
          <div style={{padding:"40px 20px",textAlign:"center",flex:1}}>
            {showCheck&&<Fireworks/>}
            <div style={{fontSize:56,margin:"16px 0"}}>🎉</div>
            <div style={{background:SURF,padding:"20px",margin:"20px 0",border:`1px solid rgba(130,202,138,0.3)`}}>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:18,fontStyle:"italic",color:"#82ca8a",marginBottom:6}}>{t.mostrarMozo}</div>
              <div style={{fontSize:11,color:MUTED,letterSpacing:1}}>{t.instruccion}</div>
            </div>
            <div style={{background:SURF,padding:"16px",marginBottom:16,border:`1px solid ${BORDER}`,textAlign:"left"}}>
              <div style={{fontSize:9,letterSpacing:3,color:MUTED,textTransform:"uppercase",marginBottom:12}}>📋 Detalle del pedido</div>
              {carrito.map((item,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${BORDER}`}}><span style={{fontSize:13,color:TEXT}}>{item.emoji} {item.nombre} ×{item.cantidad}</span><span style={{fontSize:13,fontWeight:600,color:GOLD}}>{formatPeso(item.precio*item.cantidad)}</span></div>))}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:12,paddingTop:8,borderTop:`1px solid ${GOLD}33`}}><span style={{fontSize:13,fontWeight:600,letterSpacing:2,color:TEXT}}>TOTAL</span><span style={{fontFamily:"'Bodoni Moda',serif",fontSize:16,color:GOLD}}>{formatPeso(totalPrecio)}</span></div>
            </div>
            <button onClick={()=>setShowEncuesta(true)} style={{width:"100%",padding:"14px",background:GOLD,color:BG,border:"none",fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>💬 {t.encuesta}</button>
            <button onClick={nuevosPedido} style={{width:"100%",padding:"12px",background:"transparent",color:MUTED,border:`1px solid ${BORDER}`,fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.nuevoPedido}</button>
          </div>
        ):(
          <div style={{padding:"20px",flex:1,minHeight:"calc(100vh - 65px)"}}>
            <div style={{fontSize:10,letterSpacing:2,color:MUTED,marginBottom:20,textTransform:"uppercase"}}>{t.revisaPedido}</div>
            {carrito.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:MUTED}}>
                <div style={{fontSize:48}}>🛒</div>
                <div style={{marginTop:12,fontFamily:"'Bodoni Moda',serif",fontSize:18,fontStyle:"italic"}}>{t.carritoVacio}</div>
                <button onClick={()=>setShowCarrito(false)} style={{marginTop:20,padding:"10px 28px",background:GOLD,color:BG,border:"none",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{t.verMenu}</button>
              </div>
            ):(
              <>
                {carrito.map((item,idx)=>(
                  <div key={idx} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${BORDER}`}}>
                    <span style={{fontSize:22}}>{item.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:15,color:WHITE}}>{getCartNombre(item)}</div>
                      <div style={{fontSize:11,color:MUTED,marginTop:2}}>{formatPeso(item.precio)} {t.cu}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={()=>quitarItem(item.nombre)} style={{width:28,height:28,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:14,fontWeight:600,color:WHITE,minWidth:16,textAlign:"center"}}>{item.cantidad}</span>
                      <button onClick={()=>agregarItem(item)} style={{width:28,height:28,border:`1px solid ${GOLD}`,background:"transparent",color:GOLD,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                    <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:15,color:GOLD,minWidth:70,textAlign:"right"}}>{formatPeso(item.precio*item.cantidad)}</div>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",borderTop:`1px solid ${GOLD}33`,marginTop:8}}>
                  <span style={{fontSize:12,fontWeight:600,letterSpacing:3,color:TEXT,textTransform:"uppercase"}}>TOTAL</span>
                  <span style={{fontFamily:"'Bodoni Moda',serif",fontSize:18,color:GOLD}}>{formatPeso(totalPrecio)}</span>
                </div>
                <button onClick={()=>setPedidoEnviado(true)} style={{width:"100%",padding:"16px",background:GOLD,color:BG,border:"none",fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:8}}>📋 {t.confirmar}</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── MENÚ PRINCIPAL ──
  return(
    <div style={{background:BG,fontFamily:"'Montserrat',sans-serif",color:TEXT,minHeight:"100vh",maxWidth:480,margin:"0 auto",overflowX:"hidden",width:"100%"}}>
      <style>{`${FONTS} *{box-sizing:border-box;margin:0;padding:0;} ::-webkit-scrollbar{display:none;} html,body,#root{overflow-x:hidden;width:100%;}`}</style>

      {/* HERO */}
      <div style={{position:"relative",height:320,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",overflow:"hidden",padding:"24px"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, #111 0%, #0a0a0a 100%)"}}/>
        {/* Декоративные линии */}
        <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 40px,${BORDER} 40px,${BORDER} 41px)`,opacity:0.3}}/>
        <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          <div style={{fontSize:9,letterSpacing:6,color:GOLD,textTransform:"uppercase",opacity:0.85}}>{CONFIG.ciudad}</div>
          <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:88,fontStyle:"italic",color:WHITE,lineHeight:0.88,letterSpacing:-2}}>{CONFIG.nombre}</div>
          <div style={{fontSize:9,letterSpacing:7,textTransform:"uppercase",color:MUTED,marginTop:8}}>{CONFIG.subtitulo}</div>
        </div>
        {/* Топбар */}
        <div style={{position:"absolute",top:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:5}}>
          <button onClick={()=>setLangSelected(false)} style={{background:"rgba(20,20,20,0.9)",border:`1px solid ${BORDER}`,color:MUTED,padding:"5px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:11,display:"flex",alignItems:"center",gap:6,backdropFilter:"blur(8px)"}}>
            <span>{T[lang].flag}</span><span style={{letterSpacing:1}}>{T[lang].langName}</span>
          </button>
        </div>
      </div>

      {/* NAV TABS */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,10,0.97)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${BORDER}`,display:"flex",overflowX:"auto",scrollbarWidth:"none" as const,WebkitOverflowScrolling:"touch" as any}}>
        {categories.map(cat=>{
          const active=activeCategory===cat;
          return(<button key={cat} onClick={()=>setActiveCategory(cat)} style={{flexShrink:0,fontSize:10,fontWeight:500,letterSpacing:2,textTransform:"uppercase",color:active?TEXT:MUTED,padding:"0 16px",height:46,background:"transparent",border:"none",borderBottom:`2px solid ${active?GOLD:"transparent"}`,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",transition:"all 0.2s"}}>{getCat(cat)}</button>);
        })}
      </nav>

      {/* MENU ITEMS */}
      <div style={{paddingBottom:100}}>
        {Object.entries(grouped).map(([cat,catItems],gi)=>(
          <div key={cat} style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:`all 0.5s ease ${gi*0.08}s`}}>
            {/* Section header */}
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"28px 16px 12px",borderBottom:`1px solid ${BORDER}`}}>
              <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:34,fontStyle:"italic",color:WHITE,lineHeight:1}}>{getCat(cat)}</div>
              <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:MUTED,paddingBottom:4}}>{cat}</div>
            </div>

            {/* Items */}
            <div style={{display:"flex",flexDirection:"column",gap:1}}>
              {(catItems as any[]).map((item,idx)=>{
                const cant=cantidadEnCarrito(item.nombre);
                return(
                  <div key={idx} style={{background:SURF,padding:"14px 16px 12px",position:"relative",borderLeft:item.promo?`2px solid ${GOLD}`:"2px solid transparent"}}>
                    {item.promo&&<div style={{fontSize:8,letterSpacing:2,color:GOLD,textTransform:"uppercase",marginBottom:4}}>{t.oferta}</div>}
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:5}}>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:17,color:WHITE,lineHeight:1.3}}>{getNombre(item)}</div>
                        {getDesc(item)?<div style={{fontFamily:"'Bodoni Moda',serif",fontSize:12,fontStyle:"italic",color:MUTED,marginTop:4,lineHeight:1.6}}>{getDesc(item)}</div>:null}
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,flexShrink:0}}>
                        <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:17,fontWeight:600,color:GOLD,whiteSpace:"nowrap"}}>{formatPeso(item.precio)}</div>
                        {item.disponible&&(cant===0?(
                          <button onClick={()=>agregarItem(item)} style={{width:28,height:28,border:`1px solid ${GOLD}`,background:"transparent",color:GOLD,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>+</button>
                        ):(
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <button onClick={()=>quitarItem(item.nombre)} style={{width:24,height:24,border:`1px solid ${BORDER}`,background:"transparent",color:MUTED,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                            <span style={{fontSize:13,fontWeight:600,color:WHITE,minWidth:14,textAlign:"center"}}>{cant}</span>
                            <button onClick={()=>agregarItem(item)} style={{width:24,height:24,border:`1px solid ${GOLD}`,background:"transparent",color:GOLD,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"20px 16px 0"}}>
              <div style={{flex:1,height:1,background:BORDER}}/>
              <span style={{color:GOLD,fontSize:11,opacity:0.45}}>✦</span>
              <div style={{flex:1,height:1,background:BORDER}}/>
            </div>
          </div>
        ))}

        {/* FOOTER */}
        <footer onClick={handleFooterTap} style={{marginTop:36,borderTop:`1px solid ${BORDER}`,padding:"24px 16px 48px",textAlign:"center",cursor:"default"}}>
          <div style={{fontFamily:"'Bodoni Moda',serif",fontSize:22,fontStyle:"italic",color:MUTED,marginBottom:10}}>{CONFIG.nombre}</div>
          {(CONFIG.pagoEfectivo||CONFIG.pagoMercadoPago||CONFIG.pagoTarjeta)&&(
            <div style={{display:"flex",justifyContent:"center",gap:20,marginBottom:12}}>
              {CONFIG.pagoEfectivo&&<div style={{fontSize:10,letterSpacing:2,color:MUTED,textTransform:"uppercase"}}>💵 {t.efectivo}</div>}
              {CONFIG.pagoMercadoPago&&<div style={{fontSize:10,letterSpacing:2,color:MUTED,textTransform:"uppercase"}}>📱 Mercado Pago</div>}
              {CONFIG.pagoTarjeta&&<div style={{fontSize:10,letterSpacing:2,color:MUTED,textTransform:"uppercase"}}>💳 {t.tarjeta}</div>}
            </div>
          )}
          <div style={{fontSize:9,letterSpacing:2,color:MUTED,opacity:0.5}}>{t.precios}</div>
          <div style={{marginTop:14,fontFamily:"'Bodoni Moda',serif",fontSize:13,fontStyle:"italic",color:GOLD,opacity:0.5}}>Menú Digital</div>
        </footer>
      </div>

      {/* CART BUTTON */}
      {totalItems>0&&(
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:100,width:"calc(100% - 32px)",maxWidth:448}}>
          <button onClick={()=>setShowCarrito(true)} style={{width:"100%",padding:"16px 20px",background:GOLD,color:BG,border:"none",fontSize:11,fontWeight:600,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:`0 8px 32px ${GOLD}44`}}>
            <span>{totalItems} {totalItems===1?t.item:t.items}</span>
            <span>{t.verPedido}</span>
            <span>{formatPeso(totalPrecio)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
