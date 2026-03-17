import { useState, useEffect } from "react";

// ===================== TRADUCCIONES =====================
const T = {
  es: { flag:"🇪🇸", langName:"Español",   todo:"Todo", oferta:"OFERTA", mediospago:"Medios de pago", efectivo:"Efectivo", tarjeta:"Tarjeta", precios:"Precios en pesos argentinos · IVA incluido", verPedido:"🛒 Carrito", tuPedido:"Tu pedido", revisaPedido:"Revisá tu pedido", mostrarMozo:"¡Listo! Mostrá esta pantalla al mozo", instruccion:"El mozo tomará nota de tu pedido", carritoVacio:"Tu carrito está vacío", verMenu:"Ver menú", confirmar:"Confirmar y llamar al mozo", volver:"← Volver al menú", cu:"c/u", item:"item", items:"items", nuevoPedido:"Nuevo pedido",
    encuesta:"¿Cómo fue tu experiencia?", encuestaSubtitulo:"Tu opinión nos ayuda a mejorar", estrellas:"¿Cómo calificás el menú?", gusto:"¿Qué te gustó más?", falta:"¿Qué faltaría agregar?", comodidad:"¿Qué tan fácil fue usar el menú?", comentario:"Algún comentario adicional (opcional)", enviarEncuesta:"Enviar opinión", saltarEncuesta:"Saltar", graciasEncuesta:"¡Gracias por tu opinión! 🙏", facilMuyFacil:"Muy fácil", facilFacil:"Fácil", facilDificil:"Difícil",
  },
  en: { flag:"🇬🇧", langName:"English",   todo:"All", oferta:"SPECIAL", mediospago:"Payment methods", efectivo:"Cash", tarjeta:"Card", precios:"Prices in Argentine pesos · VAT included", verPedido:"🛒 Cart", tuPedido:"Your order", revisaPedido:"Review your order", mostrarMozo:"Done! Show this screen to the waiter", instruccion:"The waiter will take note of your order", carritoVacio:"Your cart is empty", verMenu:"See menu", confirmar:"Confirm & call the waiter", volver:"← Back to menu", cu:"each", item:"item", items:"items", nuevoPedido:"New order",
    encuesta:"How was your experience?", encuestaSubtitulo:"Your feedback helps us improve", estrellas:"How do you rate the menu?", gusto:"What did you like most?", falta:"What would you add?", comodidad:"How easy was it to use?", comentario:"Any additional comments (optional)", enviarEncuesta:"Send feedback", saltarEncuesta:"Skip", graciasEncuesta:"Thanks for your feedback! 🙏", facilMuyFacil:"Very easy", facilFacil:"Easy", facilDificil:"Difficult",
  },
  pt: { flag:"🇧🇷", langName:"Português", todo:"Tudo", oferta:"OFERTA", mediospago:"Formas de pagamento", efectivo:"Dinheiro", tarjeta:"Cartão", precios:"Preços em pesos argentinos · IVA incluído", verPedido:"🛒 Carrinho", tuPedido:"Seu pedido", revisaPedido:"Revise seu pedido", mostrarMozo:"Pronto! Mostre esta tela ao garçom", instruccion:"O garçom anotará seu pedido", carritoVacio:"Seu carrinho está vazio", verMenu:"Ver cardápio", confirmar:"Confirmar e chamar o garçom", volver:"← Voltar ao cardápio", cu:"un.", item:"item", items:"itens", nuevoPedido:"Novo pedido",
    encuesta:"Como foi sua experiência?", encuestaSubtitulo:"Sua opinião nos ajuda a melhorar", estrellas:"Como você avalia o cardápio?", gusto:"O que você mais gostou?", falta:"O que poderia ser adicionado?", comodidad:"Foi fácil usar o cardápio?", comentario:"Algum comentário adicional (opcional)", enviarEncuesta:"Enviar opinião", saltarEncuesta:"Pular", graciasEncuesta:"Obrigado pela sua opinião! 🙏", facilMuyFacil:"Muito fácil", facilFacil:"Fácil", facilDificil:"Difícil",
  },
  it: { flag:"🇮🇹", langName:"Italiano",  todo:"Tutto", oferta:"OFFERTA", mediospago:"Metodi di pagamento", efectivo:"Contanti", tarjeta:"Carta", precios:"Prezzi in pesos argentini · IVA inclusa", verPedido:"🛒 Carrello", tuPedido:"Il tuo ordine", revisaPedido:"Rivedi il tuo ordine", mostrarMozo:"Fatto! Mostra questo schermo al cameriere", instruccion:"Il cameriere prenderà nota del tuo ordine", carritoVacio:"Il carrello è vuoto", verMenu:"Vedi menù", confirmar:"Conferma e chiama il cameriere", volver:"← Torna al menù", cu:"cad.", item:"articolo", items:"articoli", nuevoPedido:"Nuovo ordine",
    encuesta:"Com'è stata la tua esperienza?", encuestaSubtitulo:"La tua opinione ci aiuta a migliorare", estrellas:"Come valuti il menù?", gusto:"Cosa ti è piaciuto di più?", falta:"Cosa aggiungeresti?", comodidad:"Il menù è stato facile da usare?", comentario:"Commento aggiuntivo (opzionale)", enviarEncuesta:"Invia opinione", saltarEncuesta:"Salta", graciasEncuesta:"Grazie per la tua opinione! 🙏", facilMuyFacil:"Molto facile", facilFacil:"Facile", facilDificil:"Difficile",
  },
  fr: { flag:"🇫🇷", langName:"Français",  todo:"Tout", oferta:"PROMO", mediospago:"Moyens de paiement", efectivo:"Espèces", tarjeta:"Carte", precios:"Prix en pesos argentins · TVA incluse", verPedido:"🛒 Panier", tuPedido:"Votre commande", revisaPedido:"Vérifiez votre commande", mostrarMozo:"Prêt ! Montrez cet écran au serveur", instruccion:"Le serveur notera votre commande", carritoVacio:"Votre panier est vide", verMenu:"Voir le menu", confirmar:"Confirmer et appeler le serveur", volver:"← Retour au menu", cu:"p/u", item:"article", items:"articles", nuevoPedido:"Nouvelle commande",
    encuesta:"Comment était votre expérience ?", encuestaSubtitulo:"Votre avis nous aide à nous améliorer", estrellas:"Comment évaluez-vous le menu ?", gusto:"Qu'avez-vous le plus aimé ?", falta:"Qu'ajouteriez-vous ?", comodidad:"Le menu était-il facile à utiliser ?", comentario:"Commentaire supplémentaire (optionnel)", enviarEncuesta:"Envoyer l'avis", saltarEncuesta:"Passer", graciasEncuesta:"Merci pour votre avis ! 🙏", facilMuyFacil:"Très facile", facilFacil:"Facile", facilDificil:"Difficile",
  },
  ru: { flag:"🇷🇺", langName:"Русский",    todo:"Всё", oferta:"АКЦИЯ", mediospago:"Способы оплаты", efectivo:"Наличные", tarjeta:"Карта", precios:"Цены в аргентинских песо · НДС включён", verPedido:"🛒 Корзина", tuPedido:"Ваш заказ", revisaPedido:"Проверьте ваш заказ", mostrarMozo:"Готово! Покажите экран официанту", instruccion:"Официант запишет ваш заказ", carritoVacio:"Корзина пуста", verMenu:"Смотреть меню", confirmar:"Подтвердить и позвать официанта", volver:"← Назад в меню", cu:"шт.", item:"позиция", items:"позиции", nuevoPedido:"Новый заказ",
    encuesta:"Как вам наше меню?", encuestaSubtitulo:"Ваше мнение помогает нам стать лучше", estrellas:"Как вы оцениваете меню?", gusto:"Что понравилось больше всего?", falta:"Чего не хватает?", comodidad:"Насколько удобно пользоваться?", comentario:"Дополнительный комментарий (необязательно)", enviarEncuesta:"Отправить отзыв", saltarEncuesta:"Пропустить", graciasEncuesta:"Спасибо за ваш отзыв! 🙏", facilMuyFacil:"Очень удобно", facilFacil:"Удобно", facilDificil:"Неудобно",
  },
};

// ╔══════════════════════════════════════════════════════╗
// ║                   🍽️  MENÚ                          ║
// ║  Agregá/editá los items del menú del cliente aquí   ║
// ║  Estructura: { categoria, nombre, descripcion,      ║
// ║    precio, disponible, emoji, promo?, t:{} }        ║
// ╚══════════════════════════════════════════════════════╝
const MENU = [
  // ── EJEMPLO — reemplazá con el menú real del cliente ──
  { categoria:"🔥 Ofertas", nombre:"Hamburguesa completa", descripcion:"Con queso y tomate", precio:4500, disponible:true, emoji:"🍔", promo:true, t:{ pt:["Hambúrguer completo","Com queijo e tomate"], en:["Full burger","With cheese and tomato"], it:["Hamburger completo","Con formaggio e pomodoro"], fr:["Burger complet","Avec fromage et tomate"], ru:["Полный бургер","С сыром и томатом"] } },
  { categoria:"🔥 Ofertas", nombre:"Sandwich de milanesa", descripcion:"Con lechuga y tomate", precio:7000, disponible:true, emoji:"🥪", promo:true, t:{ pt:["Sanduíche de milanesa","Com alface e tomate"], en:["Milanesa sandwich","With lettuce and tomato"], it:["Panino milanesa","Con lattuga e pomodoro"], fr:["Sandwich milanesa","Avec laitue et tomate"], ru:["Сэндвич миланеса","С салатом и томатом"] } },
  { categoria:"🔥 Ofertas", nombre:"Sandwich de miga", descripcion:"Jamón y queso", precio:2400, disponible:true, emoji:"🥪", promo:true, t:{ pt:["Sanduíche de miga","Presunto e queijo"], en:["Crustless sandwich","Ham and cheese"], it:["Tramezzino","Prosciutto e formaggio"], fr:["Sandwich de mie","Jambon et fromage"], ru:["Сэндвич де мига","Ветчина и сыр"] } },
  { categoria:"🔥 Ofertas", nombre:"Jugo + Tostado mixto", descripcion:"Jugo de naranja exprimido + tostado", precio:5800, disponible:true, emoji:"🍽️", promo:true, t:{ pt:["Suco + Misto quente","Suco de laranja + tostado"], en:["Juice + Toast","Fresh orange juice + toasted"], it:["Succo + Toast misto","Succo d'arancia + toast"], fr:["Jus + Toast","Jus d'orange + toast"], ru:["Сок + Тост","Свежевыжатый апельсин + тост"] } },
  { categoria:"🔥 Ofertas", nombre:"Café + Tostado mixto", descripcion:"Café s/leche + tostado mixto", precio:6000, disponible:true, emoji:"☕", promo:true, t:{ pt:["Café + Misto quente","Café c/leite + tostado"], en:["Coffee + Toast","White coffee + toasted"], it:["Caffè + Toast","Caffè con latte + toast"], fr:["Café + Toast","Café au lait + toast"], ru:["Кофе + Тост","Кофе с молоком + тост"] } },
  { categoria:"🔥 Ofertas", nombre:"Café + 2 Medialunas", descripcion:"Café s/leche + 2 medialunas", precio:5500, disponible:true, emoji:"🥐", promo:true, t:{ pt:["Café + 2 Croissants","Café c/leite + 2 croissants"], en:["Coffee + 2 Croissants","White coffee + 2 croissants"], it:["Caffè + 2 Cornetti","Caffè con latte + 2 cornetti"], fr:["Café + 2 Croissants","Café au lait + 2 croissants"], ru:["Кофе + 2 круассана","Кофе с молоком + 2 круассана"] } },
  { categoria:"☕ Cafetería", nombre:"Café", descripcion:"Espresso clásico", precio:3000, disponible:true, emoji:"☕", t:{ pt:["Café","Espresso clássico"], en:["Coffee","Classic espresso"], it:["Caffè","Espresso classico"], fr:["Café","Expresso classique"], ru:["Кофе","Классический эспрессо"] } },
  { categoria:"☕ Cafetería", nombre:"Doble", descripcion:"Doble espresso", precio:4000, disponible:true, emoji:"☕", t:{ pt:["Duplo","Duplo espresso"], en:["Double","Double espresso"], it:["Doppio","Doppio espresso"], fr:["Double","Double expresso"], ru:["Двойной","Двойной эспрессо"] } },
  { categoria:"☕ Cafetería", nombre:"Café con leche", descripcion:"Café suave con leche", precio:3300, disponible:true, emoji:"🍶", t:{ pt:["Café com leite","Café suave com leite"], en:["White coffee","Soft coffee with milk"], it:["Caffè con latte","Caffè delicato con latte"], fr:["Café au lait","Café doux avec du lait"], ru:["Кофе с молоком","Мягкий кофе с молоком"] } },
  { categoria:"☕ Cafetería", nombre:"Té", descripcion:"Té clásico", precio:2800, disponible:true, emoji:"🍵", t:{ pt:["Chá","Chá clássico"], en:["Tea","Classic tea"], it:["Tè","Tè classico"], fr:["Thé","Thé classique"], ru:["Чай","Классический чай"] } },
  { categoria:"☕ Cafetería", nombre:"Capuchino", descripcion:"Espresso con leche espumada", precio:3200, disponible:true, emoji:"☕", t:{ pt:["Cappuccino","Espresso com leite espumado"], en:["Cappuccino","Espresso with foamed milk"], it:["Cappuccino","Espresso con latte montato"], fr:["Cappuccino","Expresso avec lait mousseux"], ru:["Капучино","Эспрессо со взбитым молоком"] } },
  { categoria:"☕ Cafetería", nombre:"Submarino", descripcion:"Leche caliente con chocolate", precio:4000, disponible:true, emoji:"🍫", t:{ pt:["Submarino","Leite quente com chocolate"], en:["Submarino","Hot milk with chocolate"], it:["Submarino","Latte caldo con cioccolato"], fr:["Submarino","Lait chaud avec chocolat"], ru:["Субмарино","Горячее молоко с шоколадом"] } },
  { categoria:"🥤 Gaseosas", nombre:"Coca Cola", descripcion:"", precio:3000, disponible:true, emoji:"🥤", t:{ pt:["Coca Cola",""], en:["Coca Cola",""], it:["Coca Cola",""], fr:["Coca Cola",""], ru:["Кока-Кола",""] } },
  { categoria:"🥤 Gaseosas", nombre:"Seven Up", descripcion:"", precio:3000, disponible:true, emoji:"🍋", t:{ pt:["Seven Up",""], en:["Seven Up",""], it:["Seven Up",""], fr:["Seven Up",""], ru:["Севен Ап",""] } },
  { categoria:"🥤 Gaseosas", nombre:"Naranjada", descripcion:"", precio:3000, disponible:true, emoji:"🍊", t:{ pt:["Laranjada",""], en:["Orange soda",""], it:["Aranciata",""], fr:["Orangeade",""], ru:["Апельсиновый лимонад",""] } },
  { categoria:"🥤 Gaseosas", nombre:"Tónica", descripcion:"", precio:3000, disponible:true, emoji:"🫧", t:{ pt:["Água tônica",""], en:["Tonic water",""], it:["Acqua tonica",""], fr:["Eau tonique",""], ru:["Тоник",""] } },
  { categoria:"🥤 Gaseosas", nombre:"Agua mineral", descripcion:"", precio:2800, disponible:true, emoji:"💧", t:{ pt:["Água mineral",""], en:["Mineral water",""], it:["Acqua minerale",""], fr:["Eau minérale",""], ru:["Минеральная вода",""] } },
  { categoria:"🥤 Gaseosas", nombre:"Saborizadas", descripcion:"", precio:3000, disponible:true, emoji:"🧃", t:{ pt:["Bebidas saborizadas",""], en:["Flavored drinks",""], it:["Bibite aromatizzate",""], fr:["Boissons aromatisées",""], ru:["Ароматизированные напитки",""] } },
  { categoria:"🍹 Licuados", nombre:"Banana", descripcion:"Licuado de banana", precio:4000, disponible:true, emoji:"🍌", t:{ pt:["Vitamina de banana","Vitamina de banana"], en:["Banana smoothie","Banana smoothie"], it:["Frullato di banana","Frullato di banana"], fr:["Smoothie banane","Smoothie banane"], ru:["Банановый смузи","Банановый смузи"] } },
  { categoria:"🍹 Licuados", nombre:"Manzana", descripcion:"Licuado de manzana", precio:4000, disponible:true, emoji:"🍎", t:{ pt:["Vitamina de maçã","Vitamina de maçã"], en:["Apple smoothie","Apple smoothie"], it:["Frullato di mela","Frullato di mela"], fr:["Smoothie pomme","Smoothie pomme"], ru:["Яблочный смузи","Яблочный смузи"] } },
  { categoria:"🍹 Licuados", nombre:"Naranja exprimida", descripcion:"Exprimida al momento", precio:3000, disponible:true, emoji:"🍊", t:{ pt:["Suco de laranja","Espremido na hora"], en:["Fresh orange juice","Freshly squeezed"], it:["Succo d'arancia","Spremuto al momento"], fr:["Jus d'orange","Pressé à la minute"], ru:["Свежевыжатый апельсин","Выжимается при заказе"] } },
  { categoria:"🍺 Cervezas", nombre:"Quilmes común (1L)", descripcion:"Litro de Quilmes", precio:7000, disponible:true, emoji:"🍺", t:{ pt:["Quilmes (1L)","Litro de Quilmes"], en:["Quilmes (1L)","Liter of Quilmes"], it:["Quilmes (1L)","Litro di Quilmes"], fr:["Quilmes (1L)","Litre de Quilmes"], ru:["Килмес (1л)","Литр Килмес"] } },
  { categoria:"🍺 Cervezas", nombre:"Brahma (1L)", descripcion:"Litro de Brahma", precio:7000, disponible:true, emoji:"🍺", t:{ pt:["Brahma (1L)","Litro de Brahma"], en:["Brahma (1L)","Liter of Brahma"], it:["Brahma (1L)","Litro di Brahma"], fr:["Brahma (1L)","Litre de Brahma"], ru:["Брама (1л)","Литр Брама"] } },
  { categoria:"🥪 Sandwichería", nombre:"Jamón cocido", descripcion:"Sandwich de jamón cocido", precio:2000, disponible:true, emoji:"🥪", t:{ pt:["Presunto cozido","Sanduíche de presunto cozido"], en:["Cooked ham","Cooked ham sandwich"], it:["Prosciutto cotto","Panino con prosciutto cotto"], fr:["Jambon cuit","Sandwich au jambon cuit"], ru:["Ветчина варёная","Сэндвич с варёной ветчиной"] } },
  { categoria:"🥪 Sandwichería", nombre:"Salame milán", descripcion:"Sandwich de salame milán", precio:2000, disponible:true, emoji:"🥪", t:{ pt:["Salame milão","Sanduíche de salame milão"], en:["Milan salami","Milan salami sandwich"], it:["Salame Milano","Panino con salame Milano"], fr:["Salami de Milan","Sandwich au salami de Milan"], ru:["Салями милан","Сэндвич с салями"] } },
  { categoria:"🥪 Sandwichería", nombre:"Extra queso", descripcion:"Queso adicional", precio:500, disponible:true, emoji:"🧀", t:{ pt:["Extra queijo","Queijo adicional"], en:["Extra cheese","Additional cheese"], it:["Formaggio extra","Formaggio aggiuntivo"], fr:["Fromage extra","Fromage supplémentaire"], ru:["Дополнительный сыр","Сыр дополнительно"] } },
  { categoria:"🥖 De Miga", nombre:"Triple Jamón y Queso", descripcion:"Triple de miga con jamón y queso", precio:2400, disponible:true, emoji:"🥪", t:{ pt:["Triplo Presunto e Queijo","Triplo de miga"], en:["Triple Ham & Cheese","Triple crustless"], it:["Triplo Prosciutto","Triplo tramezzino"], fr:["Triple Jambon","Triple sandwich"], ru:["Тройной Ветчина и Сыр","Тройной сэндвич"] } },
  { categoria:"🥖 De Miga", nombre:"Jamón, Queso y Tomate", descripcion:"De miga con jamón, queso y tomate", precio:2900, disponible:true, emoji:"🥪", t:{ pt:["Presunto, Queijo e Tomate","De miga"], en:["Ham, Cheese & Tomato","Crustless"], it:["Prosciutto, Formaggio e Pomodoro","Tramezzino"], fr:["Jambon, Fromage et Tomate","Sandwich"], ru:["Ветчина, Сыр и Томат","Сэндвич де мига"] } },
  { categoria:"🥃 Whiskies", nombre:"Old Smuggler", descripcion:"Whisky escocés", precio:3500, disponible:true, emoji:"🥃", t:{ pt:["Old Smuggler","Whisky escocês"], en:["Old Smuggler","Scotch whisky"], it:["Old Smuggler","Whisky scozzese"], fr:["Old Smuggler","Whisky écossais"], ru:["Олд Смаглер","Шотландский виски"] } },
  { categoria:"🥃 Whiskies", nombre:"Criadores", descripcion:"Whisky español", precio:3500, disponible:true, emoji:"🥃", t:{ pt:["Criadores","Whisky espanhol"], en:["Criadores","Spanish whisky"], it:["Criadores","Whisky spagnolo"], fr:["Criadores","Whisky espagnol"], ru:["Криадорес","Испанский виски"] } },
  { categoria:"🥃 Whiskies", nombre:"Premium", descripcion:"Whisky premium", precio:3500, disponible:true, emoji:"🥃", t:{ pt:["Premium","Whisky premium"], en:["Premium","Premium whisky"], it:["Premium","Whisky premium"], fr:["Premium","Whisky premium"], ru:["Премиум","Премиум виски"] } },
];

const CAT_T: Record<string,Record<string,string>> = {
  "🔥 Ofertas":{en:"🔥 Specials",pt:"🔥 Ofertas",it:"🔥 Offerte",fr:"🔥 Promos",ru:"🔥 Акции"},
  "☕ Cafetería":{en:"☕ Coffee bar",pt:"☕ Cafeteria",it:"☕ Caffetteria",fr:"☕ Café",ru:"☕ Кафе"},
  "🥤 Gaseosas":{en:"🥤 Soft drinks",pt:"🥤 Refrigerantes",it:"🥤 Bibite",fr:"🥤 Boissons",ru:"🥤 Напитки"},
  "🍹 Licuados":{en:"🍹 Smoothies",pt:"🍹 Vitaminas",it:"🍹 Frullati",fr:"🍹 Smoothies",ru:"🍹 Смузи"},
  "🍺 Cervezas":{en:"🍺 Beers",pt:"🍺 Cervejas",it:"🍺 Birre",fr:"🍺 Bières",ru:"🍺 Пиво"},
  "🥪 Sandwichería":{en:"🥪 Sandwiches",pt:"🥪 Sanduíches",it:"🥪 Panini",fr:"🥪 Sandwichs",ru:"🥪 Сэндвичи"},
  "🥖 De Miga":{en:"🥖 Crustless",pt:"🥖 De Miga",it:"🥖 Tramezzini",fr:"🥖 Pain de mie",ru:"🥖 Бутерброды"},
  "🥃 Whiskies":{en:"🥃 Whiskies",pt:"🥃 Whiskies",it:"🥃 Whisky",fr:"🥃 Whisky",ru:"🥃 Виски"},
};

// ╔══════════════════════════════════════════════════════╗
// ║                   ⚙️  CONFIG                        ║
// ║         Editá solo esta sección para cada cliente   ║
// ╚══════════════════════════════════════════════════════╝

const CONFIG = {
  // 🏪 Datos del local
  nombre:       "NOMBRE DEL BAR",        // Nombre grande en la cabecera
  ciudad:       "Buenos Aires",           // Ciudad — aparece arriba del nombre
  subtitulo:    "Café · Bar · Resto",     // Línea debajo del nombre

  // 🎨 Colores (podés usar cualquier código hex)
  colorPrimario:  "#6AAEE0",             // Azul principal (botones, tabs activos)
  colorOscuro:    "#3A7AB8",             // Azul oscuro (hover, gradientes)
  colorAcento:    "#C8A951",             // Dorado (ofertas, detalles)

  // 💳 Medios de pago (true = mostrar, false = ocultar)
  pagoEfectivo:   true,
  pagoMercadoPago: true,
  pagoTarjeta:    true,

  // 📊 Google Sheets URL para encuestas
  sheetsUrl: "PEGAR_URL_DE_GOOGLE_APPS_SCRIPT_AQUI",

  // 🔑 Clave para panel de analytics (Storage key único por cliente)
  storageKey: "template_surveys_v1",
};

// ── Colores derivados del CONFIG ──
const BLUE      = CONFIG.colorPrimario;
const BLUE_DARK = CONFIG.colorOscuro;
const GOLD      = CONFIG.colorAcento;
const WHITE     = "#ffffff";

const THEMES = {
  light:{ bg:"#F6F4F1", bgCard:"#FFFFFF", bgPromo:"#FEFAF0", bgTab:"#EEF5FB", bgTabActive:BLUE_DARK, bgFooter:"#EEF5FB", textDark:"#0D1B2A", textMid:"#7A90A4", textPrice:BLUE_DARK, textPricePromo:GOLD, border:"#E2EAF0", borderItem:"#EDF2F7", emojiDark:"#EEF5FB" },
  dark:{ bg:"#0D1B2A", bgCard:"#142030", bgPromo:"#1E2A15", bgTab:"#142030", bgTabActive:BLUE_DARK, bgFooter:"#142030", textDark:"#EEF5FB", textMid:"#6A8AA4", textPrice:"#7ABCEE", textPricePromo:"#D4A94A", border:"#1E2E40", borderItem:"#1A2838", emojiDark:"#1E2E40" },
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
  try{fetch(SHEETS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({fecha:s.fecha,estrellas:s.estrellas,idioma_util:s.idioma_util,comodidad:s.comodidad,volveria:s.volveria,comentario:s.comentario,idioma:s.lang})});}catch{}
}

// ===================== FIREWORKS =====================
function Fireworks(){
  const particles=Array.from({length:12},(_,i)=>i);
  return(
    <div style={{position:"relative",height:80,overflow:"visible",marginBottom:8}}>
      <style>{`${particles.map(i=>{const a=(i/12)*360,r=a*(Math.PI/180),x=Math.cos(r)*60,y=Math.sin(r)*60;return `@keyframes burst${i}{0%{transform:translate(0,0) scale(0);opacity:1}100%{transform:translate(${x}px,${y}px) scale(1.2);opacity:0}}.fw${i}{animation:burst${i} 1.2s ease-out ${(i*0.08).toFixed(2)}s infinite;}`;}).join("")}`}</style>
      {particles.map(i=>{const colors=[GOLD,BLUE,"#27ae60","#e74c3c","#9b59b6","#e67e22"];const color=colors[i%colors.length];const size=i%3===0?10:i%3===1?8:6;return <div key={i} className={`fw${i}`} style={{position:"absolute",left:"calc(50% - 5px)",top:"calc(50% - 5px)",width:size,height:size,borderRadius:"50%",background:color}}/>;})}</div>
  );
}

// ===================== ENCUESTA =====================
// Textos multilingues para la encuesta
const ENC_T = {
  titulo:   {es:"¿Cómo fue tu experiencia?", en:"How was your experience?", pt:"Como foi sua experiência?", it:"Com'è stata la tua esperienza?", fr:"Comment était votre expérience ?", ru:"Как вам наше меню?"},
  sub:      {es:"Tu opinión nos ayuda a mejorar", en:"Your feedback helps us improve", pt:"Sua opinião nos ajuda a melhorar", it:"La tua opinione ci aiuta a migliorare", fr:"Votre avis nous aide à améliorer", ru:"Ваше мнение помогает нам стать лучше"},
  q1:       {es:"¿Cómo calificás el menú?", en:"How do you rate the menu?", pt:"Como você avalia o cardápio?", it:"Come valuti il menù?", fr:"Comment évaluez-vous le menu ?", ru:"Как вы оцениваете меню?"},
  q2:       {es:"¿El menú en tu idioma fue útil?", en:"Was the menu in your language helpful?", pt:"O cardápio no seu idioma foi útil?", it:"Il menù nella tua lingua è stato utile?", fr:"Le menu dans votre langue était-il utile ?", ru:"Меню на вашем языке было полезным?"},
  q2a:      {es:"🌍 Sí, mucho", en:"🌍 Yes, very much", pt:"🌍 Sim, muito", it:"🌍 Sì, molto", fr:"🌍 Oui, beaucoup", ru:"🌍 Да, очень"},
  q2b:      {es:"🤔 Más o menos", en:"🤔 Somewhat", pt:"🤔 Mais ou menos", it:"🤔 Abbastanza", fr:"🤔 Un peu", ru:"🤔 Частично"},
  q2c:      {es:"❌ No tanto", en:"❌ Not really", pt:"❌ Não muito", it:"❌ Non molto", fr:"❌ Pas vraiment", ru:"❌ Не очень"},
  q3:       {es:"¿Qué tan fácil fue navegar?", en:"How easy was it to navigate?", pt:"Foi fácil navegar?", it:"È stato facile navigare?", fr:"Était-il facile de naviguer ?", ru:"Удобно ли было пользоваться?"},
  q3a:      {es:"😊 Muy fácil", en:"😊 Very easy", pt:"😊 Muito fácil", it:"😊 Molto facile", fr:"😊 Très facile", ru:"😊 Очень удобно"},
  q3b:      {es:"🙂 Normal", en:"🙂 Normal", pt:"🙂 Normal", it:"🙂 Normale", fr:"🙂 Normal", ru:"🙂 Нормально"},
  q3c:      {es:"😕 Me confundí", en:"😕 Got confused", pt:"😕 Me confundi", it:"😕 Mi sono confuso", fr:"😕 Je me suis perdu", ru:"😕 Запутался"},
  q4:       {es:"¿Usarías este menú de nuevo?", en:"Would you use this menu again?", pt:"Usaria este cardápio de novo?", it:"Useresti di nuovo questo menù?", fr:"Utiliseriez-vous ce menu à nouveau ?", ru:"Воспользовались бы снова?"},
  q4a:      {es:"👍 Sí, claro", en:"👍 Yes, definitely", pt:"👍 Sim, claro", it:"👍 Sì, certo", fr:"👍 Oui, bien sûr", ru:"👍 Да, конечно"},
  q4b:      {es:"📄 Prefiero papel", en:"📄 Prefer paper", pt:"📄 Prefiro papel", it:"📄 Preferisco carta", fr:"📄 Je préfère papier", ru:"📄 Предпочитаю бумажное"},
  q4c:      {es:"🤷 Me da igual", en:"🤷 Doesn't matter", pt:"🤷 Tanto faz", it:"🤷 Non importa", fr:"🤷 Peu importe", ru:"🤷 Всё равно"},
  q5:       {es:"Comentario adicional (opcional)", en:"Additional comment (optional)", pt:"Comentário adicional (opcional)", it:"Commento aggiuntivo (opzionale)", fr:"Commentaire supplémentaire (optionnel)", ru:"Дополнительный комментарий (необязательно)"},
  enviar:   {es:"Enviar opinión", en:"Send feedback", pt:"Enviar opinião", it:"Invia opinione", fr:"Envoyer l'avis", ru:"Отправить отзыв"},
  saltar:   {es:"Saltar", en:"Skip", pt:"Pular", it:"Salta", fr:"Passer", ru:"Пропустить"},
  gracias:  {es:"¡Gracias por tu opinión! 🙏", en:"Thanks for your feedback! 🙏", pt:"Obrigado pela sua opinião! 🙏", it:"Grazie per la tua opinione! 🙏", fr:"Merci pour votre avis ! 🙏", ru:"Спасибо за ваш отзыв! 🙏"},
};
function et(key:keyof typeof ENC_T, lang:Lang){return ENC_T[key][lang]??ENC_T[key].es;}

function Encuesta({lang,dark,onSubmit,onSkip}:{lang:Lang,dark:boolean,onSubmit:(s:Survey)=>void,onSkip:()=>void}){
  const th=dark?THEMES.dark:THEMES.light;
  const [estrellas,setEstrellas]=useState(0);
  const [hoverStar,setHoverStar]=useState(0);
  const [idiomaUtil,setIdiomaUtil]=useState("");
  const [comodidad,setComodidad]=useState("");
  const [volveria,setVolveria]=useState("");
  const [comentario,setComentario]=useState("");
  const [enviado,setEnviado]=useState(false);

  function handleSubmit(){
    const s:Survey={estrellas,idioma_util:idiomaUtil,comodidad,volveria,comentario,lang,fecha:new Date().toLocaleString("es-AR")};
    saveSurvey(s);setEnviado(true);setTimeout(()=>onSubmit(s),1500);
  }

  const btnStyle=(active:boolean,color:string)=>({
    flex:1,padding:"14px 6px",borderRadius:12,
    border:`1.5px solid ${active?color:th.border}`,
    background:active?color:th.bgCard,
    color:active?WHITE:th.textMid,
    fontSize:13,cursor:"pointer",fontFamily:"inherit",
    transition:"all 0.2s",display:"flex",flexDirection:"column" as const,
    alignItems:"center" as const,gap:4,lineHeight:1.3,textAlign:"center" as const,
  });

  if(enviado)return(
    <div style={{textAlign:"center",padding:"60px 20px",color:th.textDark}}>
      <div style={{fontSize:72,marginBottom:12}}>🙏</div>
      <div style={{fontSize:20,fontWeight:"bold",color:"#27ae60"}}>{et("gracias",lang)}</div>
    </div>
  );

  return(
    <div style={{padding:"0 0 40px",width:"100%",overflowX:"hidden"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${BLUE_DARK},#1a4a8a)`,padding:"28px 20px 24px",textAlign:"center",color:WHITE}}>
        <div style={{fontSize:32,marginBottom:6}}>💬</div>
        <div style={{fontSize:18,fontWeight:"bold",marginBottom:4}}>{et("titulo",lang)}</div>
        <div style={{fontSize:13,opacity:0.8}}>{et("sub",lang)}</div>
      </div>

      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:14}}>

        {/* ⭐ ESTRELLAS */}
        <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:10,letterSpacing:2,textTransform:"uppercase"}}>{et("q1",lang)}</div>
          <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
            {[1,2,3,4,5].map(n=>(<button key={n} onClick={()=>setEstrellas(n)} onMouseEnter={()=>setHoverStar(n)} onMouseLeave={()=>setHoverStar(0)} style={{background:"none",border:"none",cursor:"pointer",fontSize:44,lineHeight:1,transition:"transform 0.15s",transform:(hoverStar||estrellas)>=n?"scale(1.15)":"scale(1)",filter:(hoverStar||estrellas)>=n?"none":"grayscale(1) opacity(0.35)",flex:1,padding:"8px 0",touchAction:"manipulation"}}>⭐</button>))}
          </div>
          {estrellas>0&&<div style={{textAlign:"center",marginTop:6,fontSize:13,color:BLUE_DARK,fontWeight:"bold"}}>
            {["😔","😐","🙂","😊","🤩"][estrellas-1]} {[{es:"Muy malo",en:"Very bad",pt:"Muito ruim",it:"Pessimo",fr:"Très mauvais",ru:"Очень плохо"},{es:"Regular",en:"Poor",pt:"Ruim",it:"Così così",fr:"Passable",ru:"Плохо"},{es:"Bueno",en:"Good",pt:"Bom",it:"Buono",fr:"Bien",ru:"Хорошо"},{es:"Muy bueno",en:"Very good",pt:"Muito bom",it:"Molto buono",fr:"Très bien",ru:"Очень хорошо"},{es:"Excelente",en:"Excellent",pt:"Excelente",it:"Eccellente",fr:"Excellent",ru:"Отлично"}][estrellas-1][lang]}
          </div>}
        </div>

        {/* 🌍 IDIOMA ÚTIL */}
        <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>{et("q2",lang)}</div>
          <div style={{display:"flex",gap:8}}>
            {[{id:"si",label:et("q2a",lang)},{id:"mas_o_menos",label:et("q2b",lang)},{id:"no",label:et("q2c",lang)}].map(op=>(
              <button key={op.id} onClick={()=>setIdiomaUtil(op.id)} style={btnStyle(idiomaUtil===op.id, BLUE_DARK)}>
                <span style={{fontSize:18}}>{op.label.split(" ")[0]}</span>
                <span style={{fontSize:11}}>{op.label.split(" ").slice(1).join(" ")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 📱 NAVEGACIÓN */}
        <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>{et("q3",lang)}</div>
          <div style={{display:"flex",gap:8}}>
            {[{id:"muy_facil",label:et("q3a",lang)},{id:"normal",label:et("q3b",lang)},{id:"confuso",label:et("q3c",lang)}].map(op=>(
              <button key={op.id} onClick={()=>setComodidad(op.id)} style={btnStyle(comodidad===op.id, "#27ae60")}>
                <span style={{fontSize:18}}>{op.label.split(" ")[0]}</span>
                <span style={{fontSize:11}}>{op.label.split(" ").slice(1).join(" ")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 👍 VOLVERÍA */}
        <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>{et("q4",lang)}</div>
          <div style={{display:"flex",gap:8}}>
            {[{id:"si",label:et("q4a",lang)},{id:"papel",label:et("q4b",lang)},{id:"igual",label:et("q4c",lang)}].map(op=>(
              <button key={op.id} onClick={()=>setVolveria(op.id)} style={btnStyle(volveria===op.id, GOLD)}>
                <span style={{fontSize:18}}>{op.label.split(" ")[0]}</span>
                <span style={{fontSize:11}}>{op.label.split(" ").slice(1).join(" ")}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 💬 COMENTARIO */}
        <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>{et("q5",lang)}</div>
          <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="..." rows={3} style={{width:"100%",padding:"12px",borderRadius:10,border:`1.5px solid ${th.border}`,background:th.bgCard,color:th.textDark,fontSize:14,fontFamily:"inherit",resize:"none",outline:"none",boxSizing:"border-box"}}/>
        </div>

        <button onClick={handleSubmit} disabled={estrellas===0} style={{width:"100%",padding:"16px",background:estrellas>0?`linear-gradient(to right,${BLUE},${BLUE_DARK})`:"#ccc",color:WHITE,border:"none",borderRadius:14,fontSize:16,fontWeight:"bold",cursor:estrellas>0?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.3s"}}>{et("enviar",lang)}</button>
        <button onClick={onSkip} style={{width:"100%",padding:"12px",background:"transparent",color:th.textMid,border:`1px solid ${th.border}`,borderRadius:14,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{et("saltar",lang)}</button>
      </div>
    </div>
  );
}

// ===================== ADMIN PANEL =====================
function AdminPanel({dark,onClose}:{dark:boolean,onClose:()=>void}){
  const th=dark?THEMES.dark:THEMES.light;
  const surveys=loadSurveys();const total=surveys.length;
  const avgStars=total>0?(surveys.reduce((s,x)=>s+x.estrellas,0)/total).toFixed(1):"—";
  const starDist=[1,2,3,4,5].map(n=>({n,count:surveys.filter(s=>s.estrellas===n).length}));
  const langDist=(["es","en","pt","it","fr","ru"] as Lang[]).map(l=>({l,count:surveys.filter(s=>s.lang===l).length,flag:T[l].flag}));
  const comentarios=surveys.filter(s=>s.comentario.trim().length>0);
  const stat3=(field:"idioma_util"|"comodidad"|"volveria",ids:string[])=>ids.map(id=>({id,count:surveys.filter(s=>s[field]===id).length}));
  const idiomaStats=stat3("idioma_util",["si","mas_o_menos","no"]);
  const comodStats=stat3("comodidad",["muy_facil","normal","confuso"]);
  const volveriaStats=stat3("volveria",["si","papel","igual"]);
  const block=(title:string,items:{id:string,label:string,emoji:string,count:number}[],color:string)=>(
    <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
      <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>{title}</div>
      <div style={{display:"flex",gap:8}}>{items.map(c=>(<div key={c.id} style={{flex:1,textAlign:"center",background:th.bgCard,borderRadius:12,padding:"12px 6px",border:`1px solid ${c.count>0?color:th.border}`}}><div style={{fontSize:20,marginBottom:4}}>{c.emoji}</div><div style={{fontSize:11,color:th.textMid,marginBottom:6}}>{c.label}</div><div style={{fontSize:26,fontWeight:"bold",color:c.count>0?color:th.textMid}}>{c.count}</div></div>))}</div>
    </div>
  );
  return(
    <div style={{minHeight:"100vh",background:th.bg,fontFamily:"Georgia,serif",maxWidth:480,margin:"0 auto",paddingBottom:40,width:"100%"}}>
      <div style={{background:`linear-gradient(135deg,${BLUE_DARK},#1a4a8a)`,padding:"24px 20px",color:WHITE,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:10,letterSpacing:3,opacity:0.7,marginBottom:4}}>PANEL PRIVADO</div><div style={{fontSize:20,fontWeight:"bold"}}>📊 Resultados</div></div>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",color:WHITE,borderRadius:20,padding:"8px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>✕</button>
      </div>
      <div style={{padding:"20px 16px",display:"flex",flexDirection:"column",gap:14}}>
        {total===0?(<div style={{textAlign:"center",padding:"60px 20px",color:th.textMid}}><div style={{fontSize:48}}>📭</div><div style={{marginTop:12,fontSize:16}}>Sin respuestas aún</div></div>):(
          <>
            {/* Resumen */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:th.bgTab,borderRadius:14,padding:"16px",textAlign:"center",border:`1px solid ${th.border}`}}><div style={{fontSize:36,fontWeight:"bold",color:BLUE}}>{total}</div><div style={{fontSize:12,color:th.textMid,marginTop:4}}>Respuestas</div></div>
              <div style={{background:th.bgTab,borderRadius:14,padding:"16px",textAlign:"center",border:`1px solid ${th.border}`}}><div style={{fontSize:36,fontWeight:"bold",color:GOLD}}>⭐{avgStars}</div><div style={{fontSize:12,color:th.textMid,marginTop:4}}>Promedio</div></div>
            </div>
            {/* Estrellas */}
            <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
              <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>Estrellas</div>
              {[...starDist].reverse().map(({n,count})=>(<div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:12,color:th.textMid,minWidth:20}}>{n}★</span><div style={{flex:1,height:12,background:th.border,borderRadius:8,overflow:"hidden"}}><div style={{height:"100%",width:total>0?`${(count/total)*100}%`:"0%",background:n>=4?GOLD:BLUE,borderRadius:8}}/></div><span style={{fontSize:12,color:th.textDark,minWidth:20,textAlign:"right"}}>{count}</span></div>))}
            </div>
            {/* Idioma útil */}
            {block("🌍 ¿El idioma fue útil?",[
              {id:"si",label:"Sí, mucho",emoji:"🌍",count:idiomaStats[0].count},
              {id:"mas_o_menos",label:"Más o menos",emoji:"🤔",count:idiomaStats[1].count},
              {id:"no",label:"No tanto",emoji:"❌",count:idiomaStats[2].count},
            ],BLUE_DARK)}
            {/* Navegación */}
            {block("📱 Facilidad de navegación",[
              {id:"muy_facil",label:"Muy fácil",emoji:"😊",count:comodStats[0].count},
              {id:"normal",label:"Normal",emoji:"🙂",count:comodStats[1].count},
              {id:"confuso",label:"Confuso",emoji:"😕",count:comodStats[2].count},
            ],"#27ae60")}
            {/* Volvería */}
            {block("👍 ¿Usaría de nuevo?",[
              {id:"si",label:"Sí, claro",emoji:"👍",count:volveriaStats[0].count},
              {id:"papel",label:"Prefiere papel",emoji:"📄",count:volveriaStats[1].count},
              {id:"igual",label:"Da igual",emoji:"🤷",count:volveriaStats[2].count},
            ],GOLD)}
            {/* Idiomas */}
            <div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
              <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>Idiomas usados</div>
              <div style={{display:"flex",gap:12,justifyContent:"center"}}>{langDist.filter(l=>l.count>0).map(l=>(<div key={l.l} style={{textAlign:"center"}}><div style={{fontSize:26}}>{l.flag}</div><div style={{fontSize:16,fontWeight:"bold",color:th.textDark}}>{l.count}</div></div>))}</div>
            </div>
            {/* Comentarios */}
            {comentarios.length>0&&(<div style={{background:th.bgTab,borderRadius:14,padding:"16px",border:`1px solid ${th.border}`}}>
              <div style={{fontSize:11,fontWeight:"bold",color:th.textMid,marginBottom:12,letterSpacing:2,textTransform:"uppercase"}}>Comentarios</div>
              {comentarios.slice(-5).reverse().map((s,i)=>(<div key={i} style={{background:th.bgCard,borderRadius:10,padding:"12px",marginBottom:8,border:`1px solid ${th.border}`}}><div style={{fontSize:11,color:th.textMid,marginBottom:4}}>{s.fecha} · {T[s.lang as Lang]?.flag} · {"⭐".repeat(s.estrellas)}</div><div style={{fontSize:13,color:th.textDark}}>"{s.comentario}"</div></div>))}
            </div>)}
            <button onClick={()=>{if(confirm("¿Borrar todos los datos?")){localStorage.removeItem(STORAGE_KEY);onClose();}}} style={{width:"100%",padding:"12px",background:"transparent",color:"#e74c3c",border:"1px solid #e74c3c",borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Borrar todos los datos</button>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== APP PRINCIPAL =====================
export default function App(){
  const [lang,setLang]=useState<Lang>("es");
  const [dark,setDark]=useState(false);
  const [activeCategory,setActiveCategory]=useState("all");
  const [loaded,setLoaded]=useState(false);
  const [carrito,setCarrito]=useState<CartItem[]>([]);
  const [showCarrito,setShowCarrito]=useState(false);
  const [pedidoEnviado,setPedidoEnviado]=useState(false);
  const [showCheck,setShowCheck]=useState(false);
  const [showEncuesta,setShowEncuesta]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [adminTaps,setAdminTaps]=useState(0);
  const [langSelected,setLangSelected]=useState(false);
  const [langAnim,setLangAnim]=useState(false);

  function chooseLang(l:Lang){
    setLang(l);setLangAnim(true);
    setTimeout(()=>{
      setLangSelected(true);window.scrollTo(0,0);
      const vp=document.querySelector("meta[name=viewport]") as HTMLMetaElement;
      if(vp){vp.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";setTimeout(()=>{vp.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0";},50);}
    },500);
  }

  useEffect(()=>{setTimeout(()=>setLoaded(true),100);},[]);
  useEffect(()=>{if(pedidoEnviado){setTimeout(()=>setShowCheck(true),100);}else{setShowCheck(false);}},[pedidoEnviado]);

  function handleFooterTap(){const next=adminTaps+1;setAdminTaps(next);if(next>=5){setShowAdmin(true);setAdminTaps(0);}}

  const th=dark?THEMES.dark:THEMES.light;
  const t=T[lang];
  const totalItems=carrito.reduce((s,i)=>s+i.cantidad,0);
  const totalPrecio=carrito.reduce((s,i)=>s+i.precio*i.cantidad,0);

  function getNombre(item:any){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function getCartNombre(item:CartItem){if(lang==="es")return item.nombre;return item.t?.[lang]?.[0]??item.nombre;}
  function getDesc(item:any){if(lang==="es")return item.descripcion;return item.t?.[lang]?.[1]??item.descripcion;}
  function getCat(cat:string){return CAT_T[cat]?.[lang]??cat;}
  function agregarItem(item:any){setCarrito(prev=>{const e=prev.find(c=>c.nombre===item.nombre);if(e)return prev.map(c=>c.nombre===item.nombre?{...c,cantidad:c.cantidad+1}:c);return[...prev,{nombre:item.nombre,emoji:item.emoji,precio:item.precio,cantidad:1,t:item.t}];});}
  function quitarItem(nombre:string){setCarrito(prev=>{const e=prev.find(c=>c.nombre===nombre);if(e&&e.cantidad>1)return prev.map(c=>c.nombre===nombre?{...c,cantidad:c.cantidad-1}:c);return prev.filter(c=>c.nombre!==nombre);});}
  function cantidadEnCarrito(nombre:string){return carrito.find(c=>c.nombre===nombre)?.cantidad||0;}
  function nuevosPedido(){setCarrito([]);setPedidoEnviado(false);setShowCarrito(false);setShowEncuesta(false);}

  const categories=["all",...Array.from(new Set(MENU.map(i=>i.categoria)))];
  const filtered=activeCategory==="all"?MENU:MENU.filter(i=>i.categoria===activeCategory);
  const grouped=filtered.reduce((acc:Record<string,typeof MENU>,item)=>{if(!acc[item.categoria])acc[item.categoria]=[];acc[item.categoria].push(item);return acc;},{});

  // ===== PANTALLA IDIOMA =====
  if(!langSelected){
    const LANGS:[Lang,string,string][]=[["es","🇪🇸","Bienvenido"],["en","🇬🇧","Welcome"],["pt","🇧🇷","Bem-vindo"],["it","🇮🇹","Benvenuto"],["fr","🇫🇷","Bienvenue"],["ru","🇷🇺","Добро пожаловать"]];
    return(
      <div style={{position:"fixed",inset:0,background:"#F6F4F1",fontFamily:"'Georgia',serif",overflow:"hidden"}}>
        {/* SVG background blobs */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 480 900" preserveAspectRatio="xMidYMid slice">
          <path d="M480,0 L480,200 Q420,230 360,180 Q290,125 220,160 Q150,195 80,140 Q30,100 0,120 L0,0 Z" fill={BLUE} opacity="0.7"/>
          <path d="M0,700 Q60,660 130,700 Q200,740 260,690 Q330,640 400,680 Q450,705 480,690 L480,900 L0,900 Z" fill={BLUE} opacity="0.6"/>
          <path d="M380,880 Q420,820 460,860 L480,900 Z" fill={BLUE} opacity="0.4"/>
          <path d="M0,150 Q80,120 160,160 Q240,200 320,155 Q400,110 480,150" fill="none" stroke={BLUE} strokeWidth="1" opacity="0.3"/>
          <path d="M0,700 Q100,670 200,700 Q300,730 400,695 Q450,680 480,700" fill="none" stroke={BLUE} strokeWidth="1" opacity="0.3"/>
        </svg>

        <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",padding:"40px 28px",boxSizing:"border-box"}}>
          {/* Logo */}
          <div style={{textAlign:"center",marginBottom:44,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
            <div style={{fontSize:11,letterSpacing:6,color:BLUE_DARK,textTransform:"uppercase",marginBottom:8}}>✦ {CONFIG.ciudad} ✦</div>
            <div style={{fontSize:13,letterSpacing:5,color:BLUE_DARK,opacity:0.7,textTransform:"uppercase",marginBottom:2}}>Bar</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:60,fontWeight:"bold",color:"#0D1B2A",letterSpacing:-1,lineHeight:1}}>{CONFIG.nombre}</div>
            <div style={{height:1.5,background:`linear-gradient(to right,transparent,${GOLD},transparent)`,margin:"14px auto",width:160}}/>
            <div style={{fontSize:11,letterSpacing:2,color:"#7A90A4",textTransform:"uppercase"}}>Elegí tu idioma · Choose your language</div>
          </div>

          {/* Lang buttons */}
          <div style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:10,opacity:langAnim?0:1,transition:"opacity 0.4s"}}>
            {LANGS.map(([code,flag,sub],i)=>(
              <button key={code} onClick={()=>chooseLang(code)} style={{width:"100%",padding:"16px 20px",background:"rgba(255,255,255,0.85)",border:`1.5px solid ${BLUE}30`,borderRadius:14,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:16,boxShadow:"0 2px 12px rgba(58,122,184,0.1)",backdropFilter:"blur(8px)",animation:`fadeInUp 0.5s ease ${i*0.07}s both`,transition:"all 0.2s"}}>
                <span style={{fontSize:30,lineHeight:1,flexShrink:0}}>{flag}</span>
                <div style={{textAlign:"left",flex:1}}>
                  <div style={{fontSize:17,fontWeight:"bold",color:"#0D1B2A"}}>{T[code].langName}</div>
                  <div style={{fontSize:12,color:"#7A90A4",marginTop:1}}>{sub}</div>
                </div>
                <span style={{fontSize:18,color:BLUE,flexShrink:0}}>›</span>
              </button>
            ))}
          </div>
          <div style={{marginTop:32,fontSize:10,color:"#aaa",letterSpacing:3,textTransform:"uppercase",opacity:langAnim?0:1,transition:"opacity 0.4s"}}>MENÚ DIGITAL</div>
        </div>
        <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ===== ADMIN =====
  if(showAdmin) return <AdminPanel dark={dark} onClose={()=>setShowAdmin(false)}/>;

  // ===== CARRITO =====
  if(showCarrito){
    if(showEncuesta) return(
      <div style={{minHeight:"100vh",background:th.bg,maxWidth:480,margin:"0 auto",overflowX:"hidden"}}>
        <Encuesta lang={lang} dark={dark} onSubmit={()=>{setShowEncuesta(false);nuevosPedido();}} onSkip={()=>{setShowEncuesta(false);nuevosPedido();}}/>
      </div>
    );
    return(
      <div style={{minHeight:"100vh",background:th.bg,width:"100%",maxWidth:"100vw",margin:"0 auto",fontFamily:"Georgia,serif",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {/* Header carrito */}
        <div style={{background:`linear-gradient(135deg,${BLUE_DARK},#1a4a8a)`,padding:"20px",color:WHITE,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <button onClick={()=>setShowCarrito(false)} style={{background:"rgba(255,255,255,0.15)",border:"none",color:WHITE,borderRadius:20,padding:"8px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>{t.volver}</button>
          <div style={{fontSize:16,fontWeight:"bold"}}>{t.tuPedido}</div>
          <div style={{width:70}}/>
        </div>

        {pedidoEnviado?(
          <div style={{padding:"40px 20px",textAlign:"center",flex:1}}>
            {showCheck&&<Fireworks/>}
            <div style={{fontSize:56,margin:"16px 0",animation:showCheck?"popIn 0.5s ease":"none"}}>🎉</div>
            <div style={{background:"#eafaf1",borderRadius:16,padding:"20px",margin:"20px 0",border:"2px solid #27ae60"}}>
              <div style={{fontSize:18,fontWeight:"bold",color:"#27ae60",marginBottom:6}}>{t.mostrarMozo}</div>
              <div style={{fontSize:13,color:"#555"}}>{t.instruccion}</div>
            </div>
            <div style={{background:th.bgTab,borderRadius:14,padding:"16px",marginBottom:16,border:`1px solid ${th.border}`,textAlign:"left"}}>
              <div style={{fontSize:11,letterSpacing:3,color:th.textMid,textTransform:"uppercase",marginBottom:12}}>📋 Detalle del pedido</div>
              {carrito.map((item,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${th.borderItem}`}}><span style={{fontSize:14,color:th.textDark}}>{item.emoji} {item.nombre} ×{item.cantidad}</span><span style={{fontSize:14,fontWeight:"bold",color:BLUE_DARK}}>{formatPeso(item.precio*item.cantidad)}</span></div>))}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:12,paddingTop:8,borderTop:`2px solid ${th.border}`}}><span style={{fontSize:15,fontWeight:"bold",color:th.textDark}}>TOTAL</span><span style={{fontSize:15,fontWeight:"bold",color:BLUE_DARK}}>{formatPeso(totalPrecio)}</span></div>
            </div>
            <button onClick={()=>setShowEncuesta(true)} style={{width:"100%",padding:"16px",background:`linear-gradient(to right,${BLUE},${BLUE_DARK})`,color:WHITE,border:"none",borderRadius:14,fontSize:15,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>💬 {t.encuesta}</button>
            <button onClick={nuevosPedido} style={{width:"100%",padding:"14px",background:"transparent",color:th.textMid,border:`1px solid ${th.border}`,borderRadius:14,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.nuevoPedido}</button>
            <style>{`@keyframes popIn{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}`}</style>
          </div>
        ):(
          <div style={{padding:"20px",flex:1,minHeight:"calc(100vh - 65px)"}}>
            <div style={{fontSize:13,color:th.textMid,marginBottom:16}}>{t.revisaPedido}</div>
            {carrito.length===0?(<div style={{textAlign:"center",padding:"60px 20px",color:th.textMid}}><div style={{fontSize:48}}>🛒</div><div style={{marginTop:12}}>{t.carritoVacio}</div><button onClick={()=>setShowCarrito(false)} style={{marginTop:20,padding:"12px 28px",background:BLUE_DARK,color:WHITE,border:"none",borderRadius:30,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>{t.verMenu}</button></div>):(
              <>
                {carrito.map((item,idx)=>(<div key={idx} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${th.borderItem}`}}>
                  <span style={{fontSize:24}}>{item.emoji}</span>
                  <div style={{flex:1}}><div style={{fontSize:15,fontWeight:"bold",color:th.textDark}}>{getCartNombre(item)}</div><div style={{fontSize:12,color:th.textMid,marginTop:2}}>{formatPeso(item.precio)} {t.cu}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button onClick={()=>quitarItem(item.nombre)} style={{width:28,height:28,borderRadius:"50%",border:`1.5px solid ${BLUE}`,background:"transparent",color:BLUE_DARK,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:15,fontWeight:"bold",color:th.textDark,minWidth:16,textAlign:"center"}}>{item.cantidad}</span>
                    <button onClick={()=>agregarItem(item)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:BLUE_DARK,color:WHITE,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <div style={{fontSize:15,fontWeight:"bold",color:BLUE_DARK,minWidth:70,textAlign:"right"}}>{formatPeso(item.precio*item.cantidad)}</div>
                </div>))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",borderTop:`2px solid ${th.border}`,marginTop:8}}><span style={{fontSize:16,fontWeight:"bold",color:th.textDark}}>TOTAL</span><span style={{fontSize:16,fontWeight:"bold",color:BLUE_DARK}}>{formatPeso(totalPrecio)}</span></div>
                <button onClick={()=>setPedidoEnviado(true)} style={{width:"100%",padding:"16px",background:`linear-gradient(to right,${BLUE},${BLUE_DARK})`,color:WHITE,border:"none",borderRadius:14,fontSize:16,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit",marginTop:8}}>📋 {t.confirmar}</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // ===== MENÚ PRINCIPAL =====
  return(
    <div style={{background:th.bg,fontFamily:"Georgia,serif",color:th.textDark,minHeight:"100vh",maxWidth:480,margin:"0 auto",overflowX:"hidden",width:"100%",position:"relative"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        html,body,#root{overflow-x:hidden;width:100%;max-width:100vw;}
        body{position:relative;overflow-x:hidden;}
      `}</style>

      {/* TOP BAR */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",position:"relative",zIndex:5}}>
        <button onClick={()=>setLangSelected(false)} style={{background:"rgba(255,255,255,0.85)",border:`1px solid ${BLUE}40`,color:BLUE_DARK,borderRadius:20,padding:"5px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:12,display:"flex",alignItems:"center",gap:6,backdropFilter:"blur(8px)"}}>
          <span>{T[lang].flag}</span><span>{T[lang].langName}</span>
        </button>
        <button onClick={()=>setDark(d=>!d)} style={{background:"rgba(255,255,255,0.85)",border:`1px solid ${th.border}`,borderRadius:"50%",width:32,height:32,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}}>{dark?"☀️":"🌙"}</button>
      </div>

      {/* HEADER — Editorial */}
      <div style={{background:dark?"#0D1B2A":"#FAFAF8",padding:"28px 24px 24px",borderBottom:`1px solid ${th.border}`,position:"relative"}}>
        <div style={{position:"absolute",top:28,right:24,display:"flex",flexDirection:"column",gap:0}}>
          {[BLUE, dark?"#142030":"#FAFAF8", BLUE].map((c,i)=>(<div key={i} style={{width:28,height:5,background:c}}/>))}
        </div>
        <div style={{fontSize:10,letterSpacing:5,color:BLUE,textTransform:"uppercase",marginBottom:4,fontWeight:500}}>{CONFIG.ciudad}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:72,fontWeight:300,color:dark?"#EEF5FB":"#0D1B2A",letterSpacing:-3,lineHeight:0.9,marginBottom:16}}>{CONFIG.nombre}</div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:BLUE,flexShrink:0}}/>
          <div style={{fontSize:11,letterSpacing:3,color:dark?"#4A6A84":"#AAAAAA",textTransform:"uppercase",fontWeight:300}}>{CONFIG.subtitulo}</div>
          <div style={{flex:1,height:1,background:th.border}}/>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",padding:"12px 14px",gap:6,marginTop:0,width:"100%",boxSizing:"border-box"}}>
        {categories.map(cat=>{
          const active=activeCategory===cat;
          const label=cat==="all"?t.todo:getCat(cat);
          return(<button key={cat} onClick={()=>setActiveCategory(cat)} style={{flexShrink:0,padding:"7px 14px",borderRadius:30,border:`1.5px solid ${active?BLUE_DARK:th.border}`,background:active?BLUE_DARK:th.bgCard,color:active?WHITE:th.textMid,fontSize:12,fontWeight:active?600:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",transition:"all 0.2s",boxShadow:active?`0 2px 10px ${BLUE_DARK}40`:"none"}}>{label}</button>);
        })}
      </div>

      {/* MENU ITEMS */}
      <div style={{paddingBottom:100,overflowX:"hidden",width:"100%"}}>
        {Object.entries(grouped).map(([cat,catItems],gi)=>(
          <div key={cat} style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:`all 0.5s ease ${0.1+gi*0.08}s`,overflow:"hidden"}}>
            {/* Section header */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"18px 16px 8px"}}>
              <div style={{fontSize:10,letterSpacing:4,color:th.textMid,textTransform:"uppercase",fontWeight:500,whiteSpace:"nowrap"}}>{getCat(cat)}</div>
              <div style={{flex:1,height:1,background:`linear-gradient(to right,${th.border},transparent)`}}/>
            </div>

            {/* Items */}
            {(catItems as any[]).map((item,idx)=>{
              const cant=cantidadEnCarrito(item.nombre);
              return(
                <div key={idx} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderBottom:`1px solid ${th.borderItem}`,background:item.promo?th.bgPromo:th.bgCard,borderLeft:item.promo?`3px solid ${GOLD}`:"3px solid transparent",transition:"background 0.3s",overflow:"hidden",width:"100%",boxSizing:"border-box",minWidth:0}}>
                  {/* Emoji */}
                  <div style={{width:46,height:46,minWidth:46,borderRadius:12,background:item.promo?`${GOLD}18`:th.emojiDark,border:item.promo?`1px solid ${GOLD}40`:`1px solid ${th.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>
                    {item.emoji}
                  </div>
                  {/* Info */}
                  <div style={{flex:1,minWidth:0}}>
                    {item.promo&&<div style={{fontSize:9,letterSpacing:2,color:GOLD,fontWeight:"bold",textTransform:"uppercase",marginBottom:2}}>{t.oferta}</div>}
                    <div style={{fontSize:15,color:th.textDark,fontWeight:600,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{getNombre(item)}</div>
                    {getDesc(item)?<div style={{fontSize:11,color:th.textMid,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontStyle:"italic"}}>{getDesc(item)}</div>:null}
                    <div style={{fontSize:item.promo?16:14,fontWeight:"bold",color:item.promo?th.textPricePromo:th.textPrice,marginTop:4}}>{formatPeso(item.precio)}</div>
                  </div>
                  {/* Botones */}
                  {item.disponible&&(cant===0?(
                    <button onClick={()=>agregarItem(item)} style={{flexShrink:0,width:34,height:34,minWidth:34,borderRadius:"50%",border:`1.5px solid ${BLUE}`,background:"transparent",color:BLUE_DARK,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",marginRight:2}}>+</button>
                  ):(
                    <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,marginRight:2}}>
                      <button onClick={()=>quitarItem(item.nombre)} style={{width:28,height:28,minWidth:28,borderRadius:"50%",border:`1.5px solid ${BLUE}`,background:"transparent",color:BLUE_DARK,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:14,fontWeight:"bold",color:th.textDark,minWidth:14,textAlign:"center"}}>{cant}</span>
                      <button onClick={()=>agregarItem(item)} style={{width:28,height:28,minWidth:28,borderRadius:"50%",border:"none",background:BLUE_DARK,color:WHITE,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}

        {/* FOOTER */}
        <div onClick={handleFooterTap} style={{margin:"28px 16px 0",padding:"20px",borderRadius:14,border:`1px solid ${th.border}`,background:th.bgFooter,cursor:"default"}}>
          <div style={{fontSize:10,letterSpacing:3,color:BLUE_DARK,textTransform:"uppercase",marginBottom:14,fontWeight:600}}>{t.mediospago}</div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            {([[CONFIG.pagoEfectivo?" 💵":null,t.efectivo],[CONFIG.pagoMercadoPago?"📱":null,"Mercado Pago"],[CONFIG.pagoTarjeta?"💳":null,t.tarjeta]] as [string|null,string][]).filter(([icon])=>icon!==null).map(([icon,label],i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <span style={{fontSize:24}}>{icon}</span>
                <span style={{fontSize:11,color:th.textDark,fontWeight:500}}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,paddingTop:14,borderTop:`1px solid ${th.border}`,fontSize:10,color:th.textMid,letterSpacing:1,textAlign:"center"}}>{t.precios}</div>
        </div>

        <div style={{textAlign:"center",margin:"16px 0 8px",fontSize:10,color:th.textMid,letterSpacing:3,textTransform:"uppercase"}}>MENÚ DIGITAL ✦ MENUDIGITAL.AR</div>
      </div>

      {/* CART BUTTON */}
      {totalItems>0&&(
        <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:100,width:"calc(100% - 32px)",maxWidth:448}}>
          <button onClick={()=>setShowCarrito(true)} style={{width:"100%",padding:"16px 20px",background:dark?`#142030`:`linear-gradient(to right,${BLUE},${BLUE_DARK})`,color:WHITE,border:dark?`1.5px solid ${BLUE_DARK}`:"none",borderRadius:14,fontSize:15,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:`0 6px 24px ${BLUE_DARK}66`}}>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"3px 12px",fontSize:13}}>🛒 {totalItems} {totalItems===1?t.item:t.items}</span>
            <span style={{opacity:0.8,fontSize:13}}>{t.verPedido}</span>
            <span style={{fontWeight:"bold",fontSize:16}}>{formatPeso(totalPrecio)}</span>
          </button>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
