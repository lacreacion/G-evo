import { Product, Category } from '@/types';

export const CANDY_CATEGORIES: Category[] = [
  { id: 'todas', name: 'Todas las Cajas', icon: '🍭' },
  { id: 'cajas-regalo', name: 'Cajas Regalo & Megamix', icon: '🎁' },
  { id: 'gomitas', name: 'Gomitas & Jelly', icon: '🐻' },
  { id: 'chocolates', name: 'Chocolatería & Bombones', icon: '🍫' },
  { id: 'acidos', name: 'Ácidos & Pica-Pica', icon: '⚡' },
  { id: 'caramelos', name: 'Caramelos & Paletas', icon: '🍭' },
  { id: 'importados', name: 'Snacks & Dulces Importados', icon: '✈️' },
  { id: 'retro', name: 'Dulces Retro & Nostálgicos', icon: '📼' },
  { id: 'sin-azucar', name: 'Sin Azúcar & Veganos', icon: '🌱' }
];

const photoPool = [
  'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80', // Gomitas de ositos
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80', // Bombones y chocolates
  'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=600&auto=format&fit=crop&q=80', // Caramelos duros colores
  'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop&q=80', // Dulces surtidos
  'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=600&auto=format&fit=crop&q=80', // Piruletas y espirales
  'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=600&auto=format&fit=crop&q=80', // Gomitas ácidas
  'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&auto=format&fit=crop&q=80', // Malvaviscos
  'https://images.unsplash.com/photo-1534432182912-63863115e106?w=600&auto=format&fit=crop&q=80', // Dulces surtidos pastel
  'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=600&auto=format&fit=crop&q=80', // Dulces y granas
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80', // Galletas y dulces
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80', // Helado y dulces
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&auto=format&fit=crop&q=80', // Gomitas de gusano
  'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=80', // Macarons y dulces
  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop&q=80', // Chocolates gourmet
  'https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&auto=format&fit=crop&q=80'  // Caramelo y sprinkles
];

const getCandyImage = (id: number): string => photoPool[id % photoPool.length];

interface RawItem {
  name: string;
  cat: string;
  price: number;
  oldPrice?: number | null;
  weight: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  flavors: string[];
  desc: string;
}

const RAW_CANDY_ITEMS: RawItem[] = [
  // Cajas Regalo & Megamix (15 items)
  {
    name: "Caja Mega Fiesta Dulce 1.5kg",
    cat: "cajas-regalo",
    price: 34.99,
    oldPrice: 42.00,
    weight: "1500g",
    badge: "Bestseller 🔥",
    rating: 4.9,
    reviews: 210,
    flavors: ["Frutas Mixtas", "Chocolate", "Caramelo"],
    desc: "Nuestra caja insignia con más de 60 variedades de dulces, gomitas y chocolates premium empacados con lazo y confeti."
  },
  {
    name: "Caja Sorpresa Cumpleaños Neón",
    cat: "cajas-regalo",
    price: 29.50,
    oldPrice: 35.00,
    weight: "1000g",
    badge: "Más Vendido",
    rating: 4.8,
    reviews: 145,
    flavors: ["Tutti Frutti", "Fresa Ácida", "Mora Azul"],
    desc: "Decorada con confeti metálico, globos sorpresa y dulces explosivos para celebrar a lo grande."
  },
  {
    name: "Caja San Valentín 'Sweet Love'",
    cat: "cajas-regalo",
    price: 38.00,
    oldPrice: 45.00,
    weight: "850g",
    badge: "Edición Limitada",
    rating: 5.0,
    reviews: 89,
    flavors: ["Fresa con Crema", "Chocolate Rubí", "Vainilla"],
    desc: "Caja en forma de corazón con bombones artesanales y gomitas con glitter comestible."
  },
  {
    name: "Caja Deluxe Dulce Infinito 2kg",
    cat: "cajas-regalo",
    price: 49.99,
    oldPrice: 59.99,
    weight: "2000g",
    badge: "Megapack",
    rating: 4.9,
    reviews: 178,
    flavors: ["Variedad Global", "Exóticos", "Chocolates"],
    desc: "La experiencia dulce definitiva. 2 kilos de golosinas importadas y nacionales empacadas a mano."
  },
  {
    name: "Caja Amigo Secreto Candy Bag",
    cat: "cajas-regalo",
    price: 18.50,
    oldPrice: 22.00,
    weight: "600g",
    badge: "Favorito",
    rating: 4.7,
    reviews: 94,
    flavors: ["Mix Tropical", "Malvavisco", "Caramelo"],
    desc: "El detalle perfecto para regalar en oficina o reuniones. Presentación premium con lazo."
  },
  {
    name: "Caja Arcoíris Pastel Party Box",
    cat: "cajas-regalo",
    price: 26.00,
    oldPrice: 31.00,
    weight: "800g",
    badge: "Tendencia",
    rating: 4.8,
    reviews: 112,
    flavors: ["Algodón de Azúcar", "Melocotón", "Limonada Rosa"],
    desc: "Golosinas seleccionadas en tonalidades pastel, estéticamente irresistible y deliciosa."
  },
  {
    name: "Caja Cine & Palomitas Dulces Box",
    cat: "cajas-regalo",
    price: 24.50,
    oldPrice: null,
    weight: "900g",
    badge: "Noche de Pelis",
    rating: 4.6,
    reviews: 83,
    flavors: ["Caramelo Salado", "Mantequilla", "Choco-Crisp"],
    desc: "Palomitas gourmet acarameladas combinadas con gomitas de refresco y regalices."
  },
  {
    name: "Caja Unicorn Fantasy Sparkle Box",
    cat: "cajas-regalo",
    price: 31.00,
    oldPrice: 36.50,
    weight: "750g",
    badge: "Top Niños & Fans",
    rating: 4.9,
    reviews: 162,
    flavors: ["Malvavisco Azul", "Uva Mágica", "Frambuesa"],
    desc: "Gomitas en forma de estrellas y unicornios con destellos perlados y aroma a chicle."
  },
  {
    name: "Caja Spa Dulce 'Anti-Stress'",
    cat: "cajas-regalo",
    price: 27.90,
    oldPrice: null,
    weight: "700g",
    badge: "Regalo Ideal",
    rating: 4.7,
    reviews: 74,
    flavors: ["Manzanilla Miel", "Menta Suave", "Chocolate 70%"],
    desc: "Dulces relajantes, gomitas suaves y chocolates premium para consentirse al final del día."
  },
  {
    name: "Caja Grados & Éxitos Congratulations",
    cat: "cajas-regalo",
    price: 33.00,
    oldPrice: 39.00,
    weight: "950g",
    badge: "Celebración",
    rating: 4.8,
    reviews: 67,
    flavors: ["Oro Caramelo", "Chocoberry", "Avellana"],
    desc: "Presentación elegante en negro y dorado con golosinas gourmet para festejar triunfos."
  },
  {
    name: "Caja Baby Shower Sweet Welcome",
    cat: "cajas-regalo",
    price: 25.50,
    oldPrice: null,
    weight: "800g",
    badge: "Eventos",
    rating: 4.8,
    reviews: 58,
    flavors: ["Fresa Milkshake", "Vainilla Nube", "Mora Suave"],
    desc: "Suaves bombones y nubes esponjosas en colores pasteles ideales para celebraciones de bebés."
  },
  {
    name: "Caja Gamer Energy Rush Candy Box",
    cat: "cajas-regalo",
    price: 28.50,
    oldPrice: 34.00,
    weight: "850g",
    badge: "Gamer Choice 🎮",
    rating: 4.9,
    reviews: 230,
    flavors: ["Bebida Energética", "Cítricos Sour", "Cola Power"],
    desc: "Gomitas y masticables diseñados para no engrasar los controles y brindar energía deliciosa."
  },
  {
    name: "Caja Picnic Dulce de Primavera",
    cat: "cajas-regalo",
    price: 23.00,
    oldPrice: null,
    weight: "700g",
    badge: "Fresco",
    rating: 4.6,
    reviews: 49,
    flavors: ["Frutas del Bosque", "Cereza", "Naranja Dulce"],
    desc: "Empaque tipo canasta de mimbre con dulces frutales que no se derriten al aire libre."
  },
  {
    name: "Caja Halloween Spooky Sweet Box",
    cat: "cajas-regalo",
    price: 29.00,
    oldPrice: 35.00,
    weight: "950g",
    badge: "Especial Temporada",
    rating: 4.9,
    reviews: 188,
    flavors: ["Calabaza Especiada", "Mora Negra", "Gusanos Ácidos"],
    desc: "Caja coleccionable con formas divertidas de colmillos, ojos de gelatina y pociones dulces."
  },
  {
    name: "Caja Navideña Winter Wonderland",
    cat: "cajas-regalo",
    price: 36.00,
    oldPrice: 44.00,
    weight: "1100g",
    badge: "Edición Navideña",
    rating: 5.0,
    reviews: 215,
    flavors: ["Bastón de Menta", "Canela Dulce", "Chocolate Blanco"],
    desc: "La magia de la navidad en una caja con lazo rojo, bastoncillos y malvaviscos en muñeco de nieve."
  },

  // Gomitas & Jelly (16 items)
  {
    name: "Caja Ositos Azucarados Premium 1kg",
    cat: "gomitas",
    price: 19.99,
    oldPrice: 24.50,
    weight: "1000g",
    badge: "Clásico Top",
    rating: 4.9,
    reviews: 310,
    flavors: ["Fresa", "Manzana", "Piña", "Limón", "Naranja"],
    desc: "Nuestros ositos más jugosos elaborados con zumo natural de fruta concentrado."
  },
  {
    name: "Caja Gusanos Neón Ácido-Dulces",
    cat: "gomitas",
    price: 18.00,
    oldPrice: null,
    weight: "800g",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 195,
    flavors: ["Cereza-Limón", "Fresa-Uva", "Naranja-Lima"],
    desc: "Divertidos gusanos bicolores con capa de azúcar chispeante y textura elástica perfecta."
  },
  {
    name: "Caja Botellitas de Cola Fizz 850g",
    cat: "gomitas",
    price: 17.50,
    oldPrice: 21.00,
    weight: "850g",
    badge: "Favorito Retro",
    rating: 4.7,
    reviews: 142,
    flavors: ["Cola Clásica", "Cola Cereza", "Cola Vainilla"],
    desc: "Gomitas translúcidas con el auténtico sabor burbujeante a refresco de cola."
  },
  {
    name: "Caja Tiburones Azules Berry Jelly",
    cat: "gomitas",
    price: 21.00,
    oldPrice: null,
    weight: "900g",
    badge: "Sensación TikTok",
    rating: 4.9,
    reviews: 280,
    flavors: ["Frambuesa Azul", "Crema Marshmallow"],
    desc: "Cuerpo azul brillante sabor frambuesa con base de suave malvavisco blanco."
  },
  {
    name: "Caja Tajadas de Sandía con Semillitas",
    cat: "gomitas",
    price: 16.50,
    oldPrice: 19.50,
    weight: "750g",
    badge: "Frutal",
    rating: 4.8,
    reviews: 122,
    flavors: ["Sandía Refrescante"],
    desc: "Gomitas rellenas con centro líquido sabor sandía fresca y cobertura crocante azucarada."
  },
  {
    name: "Caja Frutitas del Bosque Silvestre",
    cat: "gomitas",
    price: 18.90,
    oldPrice: null,
    weight: "800g",
    badge: "Gourmet",
    rating: 4.7,
    reviews: 88,
    flavors: ["Mora Silvestre", "Frambuesa", "Arándano"],
    desc: "Forma idéntica a bayas naturales con pequeñas bolitas crujientes en el exterior."
  },
  {
    name: "Caja Anillos de Durazno Suaves 900g",
    cat: "gomitas",
    price: 17.80,
    oldPrice: 21.50,
    weight: "900g",
    badge: "Top Sabor",
    rating: 4.9,
    reviews: 176,
    flavors: ["Melocotón Dulce", "Crema"],
    desc: "Anillos suaves cubiertos de azúcar con aroma intenso a durazno maduro."
  },
  {
    name: "Caja Cerezas Dobles Brillantes",
    cat: "gomitas",
    price: 16.90,
    oldPrice: null,
    weight: "700g",
    badge: "Clásico",
    rating: 4.6,
    reviews: 95,
    flavors: ["Cereza Silvestre"],
    desc: "Gomitas dobles unidas por tallo verde con un brillo tentador y textura firme."
  },
  {
    name: "Caja Ranitas Tropicales con Vientre Nube",
    cat: "gomitas",
    price: 19.00,
    oldPrice: 23.00,
    weight: "800g",
    badge: "Divertido",
    rating: 4.8,
    reviews: 134,
    flavors: ["Maracuyá", "Kiwi", "Mango"],
    desc: "Ranitas de colores vivos con base cremosa sabor nata y frutas exóticas."
  },
  {
    name: "Caja Dientes de Vampiro Espumosos",
    cat: "gomitas",
    price: 15.50,
    oldPrice: null,
    weight: "650g",
    badge: "Party Time",
    rating: 4.5,
    reviews: 79,
    flavors: ["Fresa & Nata"],
    desc: "Divertidas dentaduras gomosas ideales para fiestas y fotos temáticas."
  },
  {
    name: "Caja Pulpos Espaciales Neón 800g",
    cat: "gomitas",
    price: 20.50,
    oldPrice: 25.00,
    weight: "800g",
    badge: "Novedad",
    rating: 4.9,
    reviews: 110,
    flavors: ["Uva Espacial", "Limonada Eléctrica"],
    desc: "Gomitas con tentáculos elásticos y múltiples combinaciones de color flúor."
  },
  {
    name: "Caja Platanitos Glaseados Dulces",
    cat: "gomitas",
    price: 16.00,
    oldPrice: null,
    weight: "700g",
    badge: "Vintage",
    rating: 4.6,
    reviews: 64,
    flavors: ["Plátano Maduro", "Azúcar Glass"],
    desc: "Textura suave tipo marshmallow con capa exterior dulce crocante."
  },
  {
    name: "Caja Huevitos Fritos Dulces 750g",
    cat: "gomitas",
    price: 17.00,
    oldPrice: 20.00,
    weight: "750g",
    badge: "Popular",
    rating: 4.7,
    reviews: 104,
    flavors: ["Yema Melocotón", "Clara Nata"],
    desc: "La clásica golosina con clara blanca de textura nube y yema de gelatina frutal."
  },
  {
    name: "Caja Fresitas Silvestres con Pepitas",
    cat: "gomitas",
    price: 18.20,
    oldPrice: null,
    weight: "800g",
    badge: "Fruta Real",
    rating: 4.8,
    reviews: 91,
    flavors: ["Fresa de Huerto"],
    desc: "Elaboradas con puré de fresas y un toque de acidez equilibrado."
  },
  {
    name: "Caja Labios Dulces Sugar Kiss 700g",
    cat: "gomitas",
    price: 16.80,
    oldPrice: 19.90,
    weight: "700g",
    badge: "Romántico",
    rating: 4.7,
    reviews: 82,
    flavors: ["Cereza Roja", "Frambuesa Intensa"],
    desc: "Gomitas en forma de labios con cobertura azucarada fina y fragancia cautivadora."
  },
  {
    name: "Caja Gomitas Ositos Colosales Jumbo 1.2kg",
    cat: "gomitas",
    price: 27.50,
    oldPrice: 33.00,
    weight: "1200g",
    badge: "Tamaño Gigante 🐻",
    rating: 4.9,
    reviews: 195,
    flavors: ["Mora Azul", "Fresa Silvestre", "Piña Colada"],
    desc: "Ositos gigantes de 8cm cada uno, jugosos, elásticos y con triple concentración frutal."
  },

  // Chocolatería & Bombones (16 items)
  {
    name: "Caja Bombones Belgas Rellenos 32 pzas",
    cat: "chocolates",
    price: 32.50,
    oldPrice: 39.00,
    weight: "500g",
    badge: "Gourmet Oro",
    rating: 5.0,
    reviews: 265,
    flavors: ["Praliné Avellana", "Ganache Maracuyá", "Caramelo Salé"],
    desc: "Bombones de chocolate con leche y oscuro 72% elaborados por maestros chocolateros."
  },
  {
    name: "Caja Trufas Suizas de Caramelo Salado",
    cat: "chocolates",
    price: 28.00,
    oldPrice: 33.50,
    weight: "450g",
    badge: "Bestseller Choco",
    rating: 4.9,
    reviews: 198,
    flavors: ["Fleur de Sel", "Chocolate Suizo 60%"],
    desc: "Espolvoreadas con cacao puro en polvo y rellenas con caramelo fluido fundente."
  },
  {
    name: "Caja Choco-Pretzels Dulce & Salado",
    cat: "chocolates",
    price: 22.00,
    oldPrice: 26.00,
    weight: "600g",
    badge: "Favorito Snack",
    rating: 4.8,
    reviews: 147,
    flavors: ["Chocolate con Leche", "Sal Marina"],
    desc: "Pretzels horneados súper crujientes bañados generosamente en triple capa de chocolate."
  },
  {
    name: "Caja Rocas de Almendra y Chocolate Ruby",
    cat: "chocolates",
    price: 29.90,
    oldPrice: null,
    weight: "400g",
    badge: "Exclusivo",
    rating: 4.9,
    reviews: 114,
    flavors: ["Chocolate Rubí Rosa", "Almendra Tostada"],
    desc: "Chocolate naturalmente rosa con notas de bayas ácidas y almendras tostadas al punto."
  },
  {
    name: "Caja Chocolatinas Artesanales del Mundo",
    cat: "chocolates",
    price: 35.00,
    oldPrice: 42.00,
    weight: "700g",
    badge: "Edición Cacao",
    rating: 4.9,
    reviews: 156,
    flavors: ["Ecuador 80%", "Madagascar 70%", "Ghana Milk"],
    desc: "Degustación de mini tabletas monororigen con notas aromáticas florales y frutales."
  },
  {
    name: "Caja Monedas de Oro Macizo Choco-Suizo",
    cat: "chocolates",
    price: 19.50,
    oldPrice: null,
    weight: "500g",
    badge: "Clásico Niños",
    rating: 4.7,
    reviews: 86,
    flavors: ["Chocolate con Leche Suave"],
    desc: "Envueltas en brillante foil dorado metálico con alto contenido de leche entera."
  },
  {
    name: "Caja Bolitas Crunch de Malva & Chocolate",
    cat: "chocolates",
    price: 21.50,
    oldPrice: 25.00,
    weight: "550g",
    badge: "Adictivo",
    rating: 4.8,
    reviews: 138,
    flavors: ["Malvavisco", "Galleta Graham", "Chocolate"],
    desc: "Inspiradas en los s'mores de fogata: centro suave con cobertura crujiente."
  },
  {
    name: "Caja Enjambres de Cereal & Choco Blanco",
    cat: "chocolates",
    price: 18.00,
    oldPrice: null,
    weight: "500g",
    badge: "Crujiente",
    rating: 4.6,
    reviews: 73,
    flavors: ["Vainilla Bourbon", "Cereal de Maíz"],
    desc: "Bocados ultracrujientes con chocolate blanco cremoso y granos tostados."
  },
  {
    name: "Caja Bombones Corazón Red Velvet",
    cat: "chocolates",
    price: 27.50,
    oldPrice: 32.00,
    weight: "420g",
    badge: "Romance",
    rating: 4.9,
    reviews: 125,
    flavors: ["Red Velvet", "Queso Crema Dulce", "Cacao"],
    desc: "Corazones rojos aterciopelados con relleno cremoso que evoca el famoso pastel."
  },
  {
    name: "Caja Fresas Liofilizadas en Chocolate Doble",
    cat: "chocolates",
    price: 26.00,
    oldPrice: 31.00,
    weight: "400g",
    badge: "Top Ventas",
    rating: 5.0,
    reviews: 240,
    flavors: ["Fresa Crujiente", "Chocolate con Leche & Blanco"],
    desc: "Fresas enteras deshidratadas al frío que estallan de sabor dentro del chocolate."
  },
  {
    name: "Caja Tabletas Mini Gourmet con Pistacho",
    cat: "chocolates",
    price: 31.00,
    oldPrice: null,
    weight: "500g",
    badge: "Premium Dubai",
    rating: 5.0,
    reviews: 320,
    flavors: ["Crema de Pistacho", "Kataifi Crujiente", "Chocolate"],
    desc: "La viral receta estilo Dubai: pasta de pistacho esmeralda y fideos crujientes."
  },
  {
    name: "Caja Grageas de Café Tostado con Chocolate",
    cat: "chocolates",
    price: 20.00,
    oldPrice: 24.00,
    weight: "450g",
    badge: "Coffee Lovers",
    rating: 4.8,
    reviews: 109,
    flavors: ["Café Arábica", "Chocolate Oscuro"],
    desc: "Granos de café 100% arábica seleccionados recubiertos de chocolate negro."
  },
  {
    name: "Caja Barquillos Rellenos de Crema Avellana",
    cat: "chocolates",
    price: 19.00,
    oldPrice: null,
    weight: "600g",
    badge: "Merienda",
    rating: 4.7,
    reviews: 94,
    flavors: ["Gianduja", "Oblea Horneada"],
    desc: "Barquillos crocantes estilo pirouette rellenos hasta el borde."
  },
  {
    name: "Caja Fondue Party Kit Chocolatoso",
    cat: "chocolates",
    price: 36.50,
    oldPrice: 44.00,
    weight: "900g",
    badge: "Experiencia",
    rating: 4.9,
    reviews: 167,
    flavors: ["Chocolate Fondue 65%", "Marshmallows", "Grisines"],
    desc: "Incluye discos para fundir en microondas o baño maría y brochetas para dippear."
  },
  {
    name: "Caja Macizos de Gianduja Italiana 24 pzas",
    cat: "chocolates",
    price: 28.50,
    oldPrice: null,
    weight: "480g",
    badge: "Tradición",
    rating: 4.8,
    reviews: 77,
    flavors: ["Avellana del Piamonte", "Cacao"],
    desc: "La clásica forma de barca del Gianduiotto que se disuelve instantáneamente en el paladar."
  },
  {
    name: "Caja Choco-Fresas en Láminas de Oro Comestible 24k",
    cat: "chocolates",
    price: 45.00,
    oldPrice: 55.00,
    weight: "450g",
    badge: "Lujo & Exclusivo ✨",
    rating: 5.0,
    reviews: 88,
    flavors: ["Chocolate Oscuro 70%", "Fresa Deshidratada", "Oro 24k"],
    desc: "Fresas enteras bañadas en doble chocolate belga y coronadas a mano con copos de oro comestible."
  },

  // Ácidos & Pica-Pica (15 items)
  {
    name: "Caja Danger Sour Megapack Extremo",
    cat: "acidos",
    price: 24.00,
    oldPrice: 29.50,
    weight: "800g",
    badge: "Reto Ácido ⚡",
    rating: 4.9,
    reviews: 340,
    flavors: ["Manzana Tóxica", "Limón Lágrima", "Cereza Negra"],
    desc: "Sólo para valientes. Tres niveles de ácido que pondrán a prueba tus papilas."
  },
  {
    name: "Caja Mangos Enchilados con Chamoy Real",
    cat: "acidos",
    price: 22.50,
    oldPrice: 27.00,
    weight: "750g",
    badge: "Pica-Rico",
    rating: 4.9,
    reviews: 285,
    flavors: ["Mango Natural", "Chile piquín", "Chamoy ciruela"],
    desc: "Tiras jugosas de mango deshidratado cubiertas con nuestra receta secreta de chamoy."
  },
  {
    name: "Caja Sandía Pica Rica con Tajín Box",
    cat: "acidos",
    price: 19.90,
    oldPrice: 23.50,
    weight: "700g",
    badge: "Top México",
    rating: 4.8,
    reviews: 194,
    flavors: ["Sandía Jugosa", "Limón Picosito"],
    desc: "Gomitas de sandía azucaradas rebosadas en mezcla de chiles secos y limón deshidratado."
  },
  {
    name: "Caja Cinturones Ácidos Arcoíris 1 metro",
    cat: "acidos",
    price: 21.00,
    oldPrice: null,
    weight: "850g",
    badge: "Favorito Niños",
    rating: 4.8,
    reviews: 210,
    flavors: ["Multifrutas Ácidas"],
    desc: "Largas tiras multicolores recubiertas de cristal de ácido málico chispeante."
  },
  {
    name: "Caja Skittles Liofilizados Freeze-Dried Sour",
    cat: "acidos",
    price: 25.50,
    oldPrice: 30.00,
    weight: "350g",
    badge: "Viral TikTok 🔥",
    rating: 5.0,
    reviews: 412,
    flavors: ["Lima Ácida", "Mora Silvestre", "Mandarina"],
    desc: "Golosinas infladas al vacío: textura super crujiente que se deshace en segundos."
  },
  {
    name: "Caja Botellas Toxic Fizz Soda 800g",
    cat: "acidos",
    price: 18.50,
    oldPrice: null,
    weight: "800g",
    badge: "Efervescente",
    rating: 4.7,
    reviews: 118,
    flavors: ["Naranjada Ácida", "Lima Fizz", "Uva Eléctrica"],
    desc: "Rellenas de polvo efervescente que explota en burbujas ácidas en la boca."
  },
  {
    name: "Caja Gomitas Tamalitos de Tamarindo Dulce",
    cat: "acidos",
    price: 17.50,
    oldPrice: 20.00,
    weight: "650g",
    badge: "Artesanal",
    rating: 4.8,
    reviews: 130,
    flavors: ["Pulpa de Tamarindo", "Azúcar Morena"],
    desc: "Receta tradicional de tamarindo 100% natural envuelto en celofán rústico."
  },
  {
    name: "Caja Pulparindos & Salsagheti Fiesta Box",
    cat: "acidos",
    price: 23.00,
    oldPrice: 28.00,
    weight: "780g",
    badge: "Combo Fiesta",
    rating: 4.9,
    reviews: 220,
    flavors: ["Tamarindo Extra Picante", "Sandía Chamoy"],
    desc: "Tiras tipo espagueti dulce con sobre de salsa líquida sabor tamarindo para bañar."
  },
  {
    name: "Caja Chupetines Ojo del Diablo Pica Pica",
    cat: "acidos",
    price: 16.00,
    oldPrice: null,
    weight: "600g",
    badge: "Halloween",
    rating: 4.6,
    reviews: 87,
    flavors: ["Fresa Fuego", "Cereza Salada"],
    desc: "Paletas macizas con centro líquido sorpresa extremadamente agridulce."
  },
  {
    name: "Caja Manzanas Verdes Ácido Crunch",
    cat: "acidos",
    price: 18.20,
    oldPrice: 21.00,
    weight: "750g",
    badge: "Intenso",
    rating: 4.7,
    reviews: 99,
    flavors: ["Granny Smith Ácida"],
    desc: "Rebanadas gomosas con el auténtico sabor astringente de manzana verde fresca."
  },
  {
    name: "Caja Polvos Pica-Pica Efervescentes Pop",
    cat: "acidos",
    price: 15.00,
    oldPrice: null,
    weight: "500g",
    badge: "Diversión",
    rating: 4.7,
    reviews: 105,
    flavors: ["Cola Pop", "Limonada", "Fresa Fizz"],
    desc: "Sobres individuales con palitos de caramelo para sumergir en polvos mágicos."
  },
  {
    name: "Caja Rollitos de Fruta Enchilados Chamoy",
    cat: "acidos",
    price: 20.00,
    oldPrice: 24.00,
    weight: "600g",
    badge: "Snack Urbano",
    rating: 4.8,
    reviews: 142,
    flavors: ["Frutas Mixtas", "Chile Tajín"],
    desc: "Rollos tipo fruit roll-up sazonados con capa uniforme de chamoy artesanal."
  },
  {
    name: "Caja Limones Confitados Agridulces 700g",
    cat: "acidos",
    price: 17.00,
    oldPrice: null,
    weight: "700g",
    badge: "Cítrico",
    rating: 4.6,
    reviews: 62,
    flavors: ["Cáscara de Limón", "Sal & Chile"],
    desc: "Pieles finas de limón cristalizadas con textura gomosa y final picoso."
  },
  {
    name: "Caja Pepinos Gomosos con Chamoy y Chile",
    cat: "acidos",
    price: 18.50,
    oldPrice: 22.00,
    weight: "720g",
    badge: "Refrescante",
    rating: 4.7,
    reviews: 84,
    flavors: ["Pepino Fresco", "Chile Limón"],
    desc: "Original combinación de verdura fresca con el clásico sabor callejero latino."
  },
  {
    name: "Caja Mega Gomas Moras Negras Super Sour",
    cat: "acidos",
    price: 19.50,
    oldPrice: null,
    weight: "800g",
    badge: "Nuevo",
    rating: 4.8,
    reviews: 73,
    flavors: ["Blackberry Sour Shock"],
    desc: "Gomitas negras oscuras que tiñen la lengua con ácido cítrico de liberación lenta."
  },

  // Caramelos & Paletas (14 items)
  {
    name: "Caja Paletas Espirales Arcoíris Gigantes",
    cat: "caramelos",
    price: 26.50,
    oldPrice: 32.00,
    weight: "900g",
    badge: "Icónico 🍭",
    rating: 4.9,
    reviews: 215,
    flavors: ["Frutti Pop", "Fresa Silvestre"],
    desc: "Paletones redondos de feria hechos a mano con rayas psicodélicas vibrantes."
  },
  {
    name: "Caja Caramelos Mantequilla Butterscotch 1kg",
    cat: "caramelos",
    price: 21.00,
    oldPrice: 25.50,
    weight: "1000g",
    badge: "Receta Antigua",
    rating: 4.9,
    reviews: 178,
    flavors: ["Mantequilla Cocida", "Azúcar Moreno de Caña"],
    desc: "El clásico caramelo duro traslúcido dorado que se funde suavemente."
  },
  {
    name: "Caja Bastones de Caramelo Menta Bicolor",
    cat: "caramelos",
    price: 18.00,
    oldPrice: null,
    weight: "650g",
    badge: "Navideño / Anual",
    rating: 4.7,
    reviews: 95,
    flavors: ["Hierbabuena Helada", "Menta Piperita"],
    desc: "Bastoncillos crujientes rayados en blanco y carmín con frescura mentolada."
  },
  {
    name: "Caja Piruletas de Corazón Translúcidas",
    cat: "caramelos",
    price: 16.50,
    oldPrice: 19.50,
    weight: "500g",
    badge: "San Valentín",
    rating: 4.8,
    reviews: 110,
    flavors: ["Cereza Cristal", "Fresa Brillante"],
    desc: "Caramelo macizo con transparencia de rubí empaquetadas individualmente."
  },
  {
    name: "Caja Chupetines Rellenos de Chicle Pop",
    cat: "caramelos",
    price: 19.80,
    oldPrice: 23.00,
    weight: "850g",
    badge: "Top Escolar",
    rating: 4.8,
    reviews: 160,
    flavors: ["Cereza", "Uva", "Mandarina"],
    desc: "Paleta dura con centro masticable para hacer bombas gigantes de chicle."
  },
  {
    name: "Caja Caramelos Blandos Toffee Inglés 800g",
    cat: "caramelos",
    price: 22.00,
    oldPrice: 26.50,
    weight: "800g",
    badge: "Gourmet",
    rating: 4.9,
    reviews: 140,
    flavors: ["Toffee de Nata", "Vainilla Real"],
    desc: "Masticables suaves que no se pegan a los dientes, con sabor a dulce de leche inglés."
  },
  {
    name: "Caja Macizos de Eucalipto y Miel de Abeja",
    cat: "caramelos",
    price: 17.00,
    oldPrice: null,
    weight: "700g",
    badge: "Garganta & Aliento",
    rating: 4.7,
    reviews: 82,
    flavors: ["Miel de Azahar", "Eucalipto Fresco"],
    desc: "Alivio y dulzura natural elaborada con miel de abeja pura cosechada."
  },
  {
    name: "Caja Gomitas de Oblea y Caramelo Mexicano",
    cat: "caramelos",
    price: 18.50,
    oldPrice: 22.00,
    weight: "600g",
    badge: "Tradicional",
    rating: 4.8,
    reviews: 104,
    flavors: ["Cajeta de Cabra", "Oblea de Trigo"],
    desc: "Mini obleas de colores rellenas de cajeta quemada tradicional."
  },
  {
    name: "Caja Paletas Giratorias con Luz LED Neon",
    cat: "caramelos",
    price: 25.00,
    oldPrice: 30.00,
    weight: "600g",
    badge: "Party Glow ✨",
    rating: 4.9,
    reviews: 175,
    flavors: ["Frambuesa Eléctrica", "Mango Solar"],
    desc: "Mango con luz LED multicolor incorporada que ilumina la paleta al comerla."
  },
  {
    name: "Caja Caramelos de Violeta Florales 500g",
    cat: "caramelos",
    price: 24.00,
    oldPrice: null,
    weight: "500g",
    badge: "Delicadeza",
    rating: 4.7,
    reviews: 68,
    flavors: ["Violeta Natural", "Azúcar Glacé"],
    desc: "La famosa joya dulce en forma de flor con fragancia botánica única."
  },
  {
    name: "Caja Masticables de Yogur Frutal 750g",
    cat: "caramelos",
    price: 18.00,
    oldPrice: 21.00,
    weight: "750g",
    badge: "Cremoso",
    rating: 4.8,
    reviews: 98,
    flavors: ["Yogur Fresa", "Yogur Melocotón"],
    desc: "Caramelos masticables extra suaves con fermentos y toque cremoso de yogur."
  },
  {
    name: "Caja Paletas de Caramelo con Flores Comestibles",
    cat: "caramelos",
    price: 30.00,
    oldPrice: 36.00,
    weight: "450g",
    badge: "Arte Dulce",
    rating: 5.0,
    reviews: 84,
    flavors: ["Lavanda Limón", "Rosa Silvestre"],
    desc: "Piezas artesanales de isomalt cristalino con pétalos naturales encapsulados."
  },
  {
    name: "Caja Caramelos Rellenos de Fruta Líquida 800g",
    cat: "caramelos",
    price: 19.50,
    oldPrice: null,
    weight: "800g",
    badge: "Sorpresa",
    rating: 4.6,
    reviews: 92,
    flavors: ["Cereza", "Albaricoque", "Grosella"],
    desc: "Cáscara dura que al morderla libera una gota líquida de pulpa dulce."
  },
  {
    name: "Caja Paletas Galácticas con Polvo de Estrellas",
    cat: "caramelos",
    price: 24.90,
    oldPrice: 29.90,
    weight: "600g",
    badge: "Mágico ✨",
    rating: 4.9,
    reviews: 142,
    flavors: ["Uva Cósmica", "Frambuesa Espacial", "Algodón de Azúcar"],
    desc: "Caramelos translúcidos con efecto de nebulosa interior y destellos brillantes comestibles."
  },

  // Snacks & Dulces Importados (13 items)
  {
    name: "Caja Dulces Japoneses Kawaii Mix Box",
    cat: "importados",
    price: 36.00,
    oldPrice: 44.00,
    weight: "850g",
    badge: "Import Direct 🇯🇵",
    rating: 5.0,
    reviews: 312,
    flavors: ["Matcha Dulce", "Ramune Soda", "Uva Kyoho"],
    desc: "Selección exclusiva de snacks de Tokio: KitKats exóticos, gummies y caramelos sorpresa."
  },
  {
    name: "Caja USA American Candy Retro Box",
    cat: "importados",
    price: 34.00,
    oldPrice: 40.00,
    weight: "950g",
    badge: "American Hits 🇺🇸",
    rating: 4.9,
    reviews: 260,
    flavors: ["Peanut Butter", "Red Vines", "Twizzlers"],
    desc: "Reese's, Nerds, Milk Duds, Jolly Ranchers y los snacks más famosos de Estados Unidos."
  },
  {
    name: "Caja Alfajores & Dulces de Argentina Box",
    cat: "importados",
    price: 32.00,
    oldPrice: 38.00,
    weight: "800g",
    badge: "Delicia Austral 🇦🇷",
    rating: 4.9,
    reviews: 185,
    flavors: ["Dulce de Leche Repostero", "Nuez", "Merengue"],
    desc: "Alfajores triples bañados en chocolate negro, blanco y conitos de dulce de leche."
  },
  {
    name: "Caja Pocky & Pejoy Sticks Mania 10 Sabores",
    cat: "importados",
    price: 26.50,
    oldPrice: 31.00,
    weight: "600g",
    badge: "Snack Favorito",
    rating: 4.8,
    reviews: 190,
    flavors: ["Cookies & Cream", "Chocolate Fresa", "Banana Choco"],
    desc: "Los famosos palitos crujientes japoneses con cobertura cremosa en variedad de sabores."
  },
  {
    name: "Caja Regalos de Turquía 'Turkish Delights'",
    cat: "importados",
    price: 29.50,
    oldPrice: 35.00,
    weight: "650g",
    badge: "Milenario 🇹🇷",
    rating: 4.8,
    reviews: 112,
    flavors: ["Agua de Rosas", "Pistacho", "Granada"],
    desc: "Auténticos bocados de Lokum espolvoreados con azúcar impalpable traídos de Estambul."
  },
  {
    name: "Caja Dulces Coreanos K-Drama Snack Box",
    cat: "importados",
    price: 35.00,
    oldPrice: 41.00,
    weight: "800g",
    badge: "K-Pop Box 🇰🇷",
    rating: 4.9,
    reviews: 245,
    flavors: ["Choco Pie Malvavisco", "Melón Helado", "Gochujang Dulce"],
    desc: "Golosinas que aparecen en tus doramas y series favoritas de Corea del Sur."
  },
  {
    name: "Caja Stroopwafels Holandeses con Caramelo",
    cat: "importados",
    price: 23.50,
    oldPrice: 28.00,
    weight: "720g",
    badge: "Gourmet 🇳🇱",
    rating: 4.9,
    reviews: 145,
    flavors: ["Canela & Sirope de Azúcar Moreno"],
    desc: "Waffles delgados que se calientan sobre la taza de café para derretir su relleno."
  },
  {
    name: "Caja Obleas de Cajeta de Celaya Tradición",
    cat: "importados",
    price: 21.00,
    oldPrice: null,
    weight: "650g",
    badge: "Latinoamérica 🇲🇽",
    rating: 4.8,
    reviews: 98,
    flavors: ["Leche de Cabra Quemada", "Vainilla"],
    desc: "Empacadas al vacío para conservar la frescura y la textura elástica del caramelo."
  },
  {
    name: "Caja Gomitas Haribo Goldbären de Alemania",
    cat: "importados",
    price: 22.00,
    oldPrice: 26.00,
    weight: "1000g",
    badge: "Fórmula Original 🇩🇪",
    rating: 4.9,
    reviews: 205,
    flavors: ["Frutas Europeas", "Extractos de Plantas"],
    desc: "La receta original de Bonn sin colorantes artificiales y con sabor más concentrado."
  },
  {
    name: "Caja Chupa Chups Bouquet Mundial 50 pzas",
    cat: "importados",
    price: 25.00,
    oldPrice: 30.00,
    weight: "800g",
    badge: "España 🇪🇸",
    rating: 4.8,
    reviews: 130,
    flavors: ["Fresas con Crema", "Sandía", "Chocolate Vainilla"],
    desc: "Bouquet decorativo con las paletas más icónicas diseñadas por Salvador Dalí."
  },
  {
    name: "Caja Barquillos Napolitanos de Viena Manner",
    cat: "importados",
    price: 24.50,
    oldPrice: null,
    weight: "600g",
    badge: "Austria 🇦🇹",
    rating: 4.7,
    reviews: 87,
    flavors: ["Avellana Europea", "Cacao Fino"],
    desc: "Cinco capas de barquillo crujiente con cuatro capas de crema de avellana."
  },
  {
    name: "Caja Chicles Marukawa de Japón 8 Sabores",
    cat: "importados",
    price: 18.00,
    oldPrice: 22.00,
    weight: "450g",
    badge: "Cute 🍬",
    rating: 4.7,
    reviews: 140,
    flavors: ["Melón Verde", "Fresa", "Naranja", "Uva"],
    desc: "Cajitas coleccionables con bolitas de chicle de sabor intenso y duradero."
  },
  {
    name: "Caja Dulces Escandinavos Nordic Berries & Salmiak",
    cat: "importados",
    price: 28.00,
    oldPrice: 34.00,
    weight: "750g",
    badge: "Escandinavia 🇸🇪",
    rating: 4.7,
    reviews: 110,
    flavors: ["Lingonberry", "Cloudberry", "Regaliz Nórdico"],
    desc: "Auténticos caramelos y gominolas de arándanos rojos y moras boreales traídos de Suecia."
  },

  // Dulces Retro & Nostálgicos (13 items)
  {
    name: "Caja Máquina del Tiempo 80s & 90s Box",
    cat: "retro",
    price: 31.00,
    oldPrice: 37.00,
    weight: "900g",
    badge: "Pura Nostalgia 📼",
    rating: 4.9,
    reviews: 275,
    flavors: ["Chicle Bazooka", "Caramelo Sugus", "Pop Rocks"],
    desc: "Los dulces que marcaron tu infancia reunidos en una caja con diseño de casete retro."
  },
  {
    name: "Caja Dispensadores PEZ Colección Vintage",
    cat: "retro",
    price: 27.00,
    oldPrice: 32.50,
    weight: "500g",
    badge: "Coleccionista",
    rating: 4.8,
    reviews: 135,
    flavors: ["Limón Clásico", "Fresa", "Naranja"],
    desc: "Incluye 4 dispensadores de personajes clásicos y 12 repuestos de pastillas dulces."
  },
  {
    name: "Caja Chicles en Cinta Bubble Tape Metros",
    cat: "retro",
    price: 19.50,
    oldPrice: 23.00,
    weight: "600g",
    badge: "90s Hit",
    rating: 4.7,
    reviews: 154,
    flavors: ["Original Bubble Gum", "Frambuesa Neón"],
    desc: "Ruedas dispensadoras de 1.8 metros de chicle para cortar el trozo que desees."
  },
  {
    name: "Caja Relojes & Pulseras de Caramelo Candy Jewelry",
    cat: "retro",
    price: 16.50,
    oldPrice: 19.00,
    weight: "550g",
    badge: "Divertido",
    rating: 4.6,
    reviews: 95,
    flavors: ["Tiza Dulce Pastel"],
    desc: "Joyería comestible elástica con cuentas de caramelo duro con sabor a frutas."
  },
  {
    name: "Caja Polvos Pop Rocks Peta Zetas 20 sobres",
    cat: "retro",
    price: 20.00,
    oldPrice: 24.00,
    weight: "400g",
    badge: "Chispeante",
    rating: 4.8,
    reviews: 180,
    flavors: ["Fresa Explosiva", "Cola Popping"],
    desc: "Caramelo carbonatado que chasquea y explota ruidosamente en contacto con la saliva."
  },
  {
    name: "Caja Chupetes de Anillo Ring Pop Party",
    cat: "retro",
    price: 18.00,
    oldPrice: 21.50,
    weight: "500g",
    badge: "Fiesta",
    rating: 4.7,
    reviews: 128,
    flavors: ["Diamante Fresa", "Zafiro Mora Azul"],
    desc: "Caramelo con forma de gema gigante montado sobre un anillo plástico de dedo."
  },
  {
    name: "Caja Cigarrillos de Chicle con Humo de Azúcar",
    cat: "retro",
    price: 15.50,
    oldPrice: null,
    weight: "450g",
    badge: "Retro Puro",
    rating: 4.5,
    reviews: 76,
    flavors: ["Menta Clásica"],
    desc: "Al soplar sale una nubecita de azúcar glass simulando humo. Un clásico inolvidable."
  },
  {
    name: "Caja Cuellitos de Caramelo Masticable Sugus",
    cat: "retro",
    price: 17.50,
    oldPrice: 20.00,
    weight: "800g",
    badge: "Favorito Familiar",
    rating: 4.8,
    reviews: 142,
    flavors: ["Piña", "Fresa", "Limón", "Naranja"],
    desc: "Caramelos masticables cuadrados envueltos individualmente en su papel distintivo."
  },
  {
    name: "Caja Botellitas de Cera Rellenas de Jarabe Dulce",
    cat: "retro",
    price: 22.00,
    oldPrice: 26.00,
    weight: "550g",
    badge: "Curioso",
    rating: 4.6,
    reviews: 89,
    flavors: ["Cereza", "Lima", "Mora"],
    desc: "Muerde la tapita de cera y bebe el jarabe dulce líquido del interior."
  },
  {
    name: "Caja Obleas de Moneda con Sorpresa Interior",
    cat: "retro",
    price: 16.00,
    oldPrice: null,
    weight: "500g",
    badge: "Ecolar",
    rating: 4.5,
    reviews: 67,
    flavors: ["Oblea Crujiente", "Polvito Dulce"],
    desc: "Platillos voladores de oblea crujiente rellenos de polvo ácido que se deshace."
  },
  {
    name: "Caja Malvaviscos Trenzados Gigantes 700g",
    cat: "retro",
    price: 19.00,
    oldPrice: 22.50,
    weight: "700g",
    badge: "Nube Dulce",
    rating: 4.7,
    reviews: 102,
    flavors: ["Vainilla & Fresa Suave"],
    desc: "Trenzas esponjosas de cuatro colores con elasticidad y suavidad máxima."
  },
  {
    name: "Caja Tabletas Masticables Fizzers & Parma",
    cat: "retro",
    price: 18.50,
    oldPrice: null,
    weight: "600g",
    badge: "UK Clásico",
    rating: 4.6,
    reviews: 80,
    flavors: ["Frutas Ácidas Efervescentes"],
    desc: "Rollos de pastillas de caramelo efervescente que se derriten lentamente."
  },
  {
    name: "Caja Mix Retro Arcade 8-Bits 1kg",
    cat: "retro",
    price: 33.50,
    oldPrice: 39.50,
    weight: "1000g",
    badge: "Colección Gamer",
    rating: 5.0,
    reviews: 215,
    flavors: ["Chicle Globo", "Caramelo Efervescente", "Gomas Pixel"],
    desc: "Caja metálica coleccionable en forma de arcade con golosinas pixeladas de los años 80 y 90."
  },

  // Sin Azúcar & Veganos (13 items)
  {
    name: "Caja Gomitas Veganas Pectina Frutal 800g",
    cat: "sin-azucar",
    price: 24.50,
    oldPrice: 29.00,
    weight: "800g",
    badge: "100% Vegano 🌱",
    rating: 4.9,
    reviews: 184,
    flavors: ["Granada Silvestre", "Mango", "Maracuyá"],
    desc: "Sin gelatina animal, elaboradas con pectina de frutas naturales y colorantes de cúrcuma y espirulina."
  },
  {
    name: "Caja Choco-Crisps Keto Cero Azúcar 500g",
    cat: "sin-azucar",
    price: 26.00,
    oldPrice: 31.50,
    weight: "500g",
    badge: "Keto Friendly 🥑",
    rating: 4.8,
    reviews: 145,
    flavors: ["Chocolate 75%", "Eritritol & Stevia", "Crisp de Almendra"],
    desc: "Endulzadas naturalmente con índice glucémico cero y menos de 2g de carbs netos por porción."
  },
  {
    name: "Caja Ositos Sugar-Free Frutas del Huerto",
    cat: "sin-azucar",
    price: 21.00,
    oldPrice: 25.00,
    weight: "750g",
    badge: "Diabéticos Apto",
    rating: 4.7,
    reviews: 122,
    flavors: ["Manzana", "Cereza", "Naranja", "Limón"],
    desc: "El mismo sabor jugoso tradicional pero completamente libre de azúcares añadidos."
  },
  {
    name: "Caja Bombones Sin Azúcar Praliné Avellana",
    cat: "sin-azucar",
    price: 28.00,
    oldPrice: 33.00,
    weight: "400g",
    badge: "Cero Culpa",
    rating: 4.9,
    reviews: 167,
    flavors: ["Avellana Tostada", "Cacao de Origen"],
    desc: "Cremosos bombones endulzados con maltitol que sorprenden por su textura sedosa."
  },
  {
    name: "Caja Caramelos Duros con Isomalt Frutal",
    cat: "sin-azucar",
    price: 18.50,
    oldPrice: null,
    weight: "650g",
    badge: "Dientes Sanos",
    rating: 4.7,
    reviews: 93,
    flavors: ["Fresa Salvaje", "Menta Fresca"],
    desc: "No provocan caries y cuidan el esmalte dental gracias a su formulación con isomalt."
  },
  {
    name: "Caja Malvaviscos Veganos Plant-Based 600g",
    cat: "sin-azucar",
    price: 23.00,
    oldPrice: 27.50,
    weight: "600g",
    badge: "Plant Based",
    rating: 4.8,
    reviews: 110,
    flavors: ["Vainilla Clásica"],
    desc: "Ideales para tostar en fogata o poner en chocolate caliente sin ingredientes de origen animal."
  },
  {
    name: "Caja Barritas de Dátiles & Choco Raw 12 pzas",
    cat: "sin-azucar",
    price: 25.00,
    oldPrice: 29.50,
    weight: "540g",
    badge: "Raw & Natural",
    rating: 4.9,
    reviews: 136,
    flavors: ["Dátil Medjool", "Nueces", "Cacao Crudo"],
    desc: "Snack energético 100% natural sin gluten, sin aditivos y sin azúcares refinados."
  },
  {
    name: "Caja Regaliz Negro & Rojo Vegano 700g",
    cat: "sin-azucar",
    price: 20.00,
    oldPrice: null,
    weight: "700g",
    badge: "Vegano",
    rating: 4.6,
    reviews: 79,
    flavors: ["Raíz de Regaliz Puro", "Frambuesa"],
    desc: "Cintas tradicionales masticables sin cera de abejas ni aditivos lácteos."
  },
  {
    name: "Caja Chicles Biodegradables 100% Árbol de Chicle",
    cat: "sin-azucar",
    price: 19.00,
    oldPrice: 22.00,
    weight: "400g",
    badge: "Eco-Friendly 🌿",
    rating: 4.8,
    reviews: 115,
    flavors: ["Menta Silvestre", "Canela Natural"],
    desc: "Chicle vegetal de selva maya, libre de plásticos y endulzado con xilitol protector dental."
  },
  {
    name: "Caja Trufas Veganas de Aguacate & Choco Negro",
    cat: "sin-azucar",
    price: 29.00,
    oldPrice: 35.00,
    weight: "420g",
    badge: "Gourmet Saludable",
    rating: 4.8,
    reviews: 88,
    flavors: ["Cacao 80%", "Crema de Aguacate", "Vainilla"],
    desc: "Textura cremosa inigualable gracias a grasas saludables vegetales no hidrogenadas."
  },
  {
    name: "Caja Gomitas Ácidas Veganas de Vitamina C",
    cat: "sin-azucar",
    price: 22.50,
    oldPrice: null,
    weight: "600g",
    badge: "Con Vitaminas",
    rating: 4.7,
    reviews: 96,
    flavors: ["Cítricos Mixtos", "Acerola"],
    desc: "Un capricho dulce que aporta el 100% de la vitamina C diaria recomendada."
  },
  {
    name: "Caja Fruta Deshidratada Crujiente Crispy Fruit",
    cat: "sin-azucar",
    price: 21.00,
    oldPrice: 24.50,
    weight: "450g",
    badge: "100% Fruta",
    rating: 4.9,
    reviews: 140,
    flavors: ["Plátano", "Manzana", "Fresas"],
    desc: "Solo un ingrediente: fruta real deshidratada al punto crujiente sin frituras ni almíbares."
  },
  {
    name: "Caja Mini Drops de Chocolate con Monkfruit",
    cat: "sin-azucar",
    price: 23.50,
    oldPrice: 28.00,
    weight: "500g",
    badge: "Monk Fruit",
    rating: 4.8,
    reviews: 104,
    flavors: ["Chocolate 60%", "Fruto del Monje"],
    desc: "Gotas de chocolate versátiles para comer solas o añadir a repostería keto."
  }
];

export const CANDY_PRODUCTS: Product[] = RAW_CANDY_ITEMS.map((item, index) => {
  const id = index + 1;
  const skuPadded = String(id).padStart(3, '0');
  const sku = `SH-BOX-${skuPadded}`;
  const categoryObj = CANDY_CATEGORIES.find(c => c.id === item.cat);

  return {
    id: id,
    sku: sku,
    name: item.name,
    category: item.cat,
    categoryName: categoryObj ? categoryObj.name : 'Dulces',
    price: item.price,
    oldPrice: item.oldPrice,
    weight: item.weight,
    badge: item.badge,
    rating: item.rating,
    reviews: item.reviews,
    flavors: item.flavors,
    description: item.desc,
    image: getCandyImage(id),
    gEvo: {
      gEvoId: `GEVO-PROD-${skuPadded}`,
      barcode: `750982341${skuPadded}`,
      stock: 35 + (id % 20),
      syncStatus: 'synced',
      dynamicImageEndpoint: `https://cdn.g-evo.io/assets/sweethouse/products/${sku}/hero.webp`,
      lastModified: '2026-10-30T20:00:00Z'
    }
  };
});

