import { createContext, useContext, useState } from "react";

export const translations = {
  en: {
    nav: {
      hotel: "Hotel",
      restaurant: "Restaurant",
      reservation: "Reservation",
      contact: "Contact",
    },

    hero: {
      tagline: "An Alpine Refuge Since the 19th Century",
      cta: "Hotel",
      ctaAlt: "Restaurant",
    },

    about: {
      eyebrow: "Welcome",
      titleMain: "Zum Schwarzen",
      titleItalic: "Bären",
      p1: "Hotel & Restaurant zum Schwarzen Bären is located at the entrance to Andermatt. In the winter it is walking distance to the Gemsstock cable car station where the ski bus stops that takes you to the Nätschen Gondola station. Further, it is a 2 min walk to the center of town where you can find all necessary services.",
      p2: "Our Hotel is small & cozy, with carefully renovated rooms. We offer a hearty & rustic breakfast that is included in the room price. In the evening you can dine at our restaurant featuring seasonal & locally sourced Italian cuisine with a touch of Switzerland. Our Restaurant has been awarded 14 Gault Millau points.",
    },

    story: {
      eyebrow: "A Message from the Team",
      quote:
        "This longevity makes us extra proud to have the opportunity to carry on the traditions of this property and to continue to welcome guests and spoil them with our cuisine and hospitality.\n\nI have spent the last seven years working in the gastronomy scene in Andermatt and I am delighted to take over the operations of the Bären with my new company Val Ursera Hospitality AG.\n\nTogether with a young and talented team I am very much looking forward to writing the next chapter of this amazing story.\n\nWe are excited to welcome you in our house very soon.",
      signature: "Johan Granvik & the Bären Team",
    },

    hotel: {
      eyebrow: "Hotel",
      titleMain: "Boutique Hotel",
      titleItalic: "Andermatt",
      intro:
        "In the carefully renovated old wood building, you will find comfortable rooms to relax and recharge.",
      cta: "View Available Rooms",
    },

    restaurant: {
      eyebrow: "Restaurant",
      titleMain: "Italian Soul,",
      titleItalic: "Alpine Spirit",
      intro:
        "In our restaurant we will take you on a culinary journey to the heart of Italy. You are also more than welcome to enjoy an apéro, a small bite to eat or a delicious coffee.",
      chefEyebrow: "Head Chef",
      chefName: "Daniel Schiavetta",
      chefPoints: "14 Gault Millau Points",
      chefBio:
        "Chef Daniel Schiavetta and his team have created a menu that respects the seasons and local producers whenever possible. The dishes are inspired by Italian cuisine and reinvented in a creative way. All dishes are completely home-made, and much of the produce comes directly from local farms or from nature itself.",
      hoursTitle: "Opening Hours",
      footer: "※  Kitchen open Wednesday – Sunday · 18:00 – 21:00  ※",
      reserveBtn: "Reserve a Table",
      menuCta:    "View Our Menu",
    },

    menu: {
      tastingMenus: "Tasting Menus",
      forWholeParty: "For the whole party",
      alaCarteTitle: "À La Carte",
      kidsTitle: "Kids Menu",
      allergyNote:
        "All prices in CHF incl. 8.1% VAT · If you have questions about allergies contact our staff",
    },

    wines: {
      eyebrow: "La Cantina",
      titleMain: "The",
      titleItalic: "Wine List",
    },

    contact: {
      eyebrow: "Reserve",
      titleMain: "Plan Your",
      titleItalic: "Stay",
      intro:
        "Whether you are booking one of our rooms or reserving a table for the evening, our team will respond within 24 hours to confirm your request.",
      type: "Reservation Type",
      typeRoom: "Room Booking",
      typeTable: "Table Reservation",
      date: "Date",
      time: "Time",
      timeSelect: "Select time",
      guests: "Number of Guests",
      email: "Email",
      requests: "Special Requests",
      requestsPlaceholder:
        "Dietary requirements, celebrations, accessibility needs…",
      cta: "Send Request",
      errorGeneral: "Something went wrong. Please try again.",
      errorConnection: "Connection error. Please check your internet connection and try again.",
      guestSingular: "guest",
      guestPlural: "guests",
      name: "Full Name",
      namePlaceholder: "Your name",
      roomType: "Room Type",
      checkIn: "Check-in",
      checkOut: "Check-out",
      adults: "Adults",
      kids: "Children (0–17)",
      kidAgeOf: "Child",
      kidAgeRequired: "age",
      kidAgeSelectPlaceholder: "Age (required)",
      kidAgeYear: "year",
      kidAgeYears: "years",
      maxGuests: "max",
      submitting: "Sending…",
      validationPrefix: "Please fill in:",
      validationEmail: "Please enter a valid email address.",
      dateClosedError: "The restaurant is closed on Mondays and Tuesdays.",
      groupInfo:
        "For groups larger than 6 or private events, please write us directly at",
      modalEyebrow: "Request Received",
      modalTitle: "Thank You.",
      modalText:
        "Your request has been received. Our team will be in touch within 24 hours to confirm your booking.",
      modalClose: "Close",
    },

    footer: {
      visit: "Find Us",
      hours: "Hours",
      contact: "Contact",
      hoursMain: "Wednesday – Sunday",
      hoursClosed: "Monday – Tuesday closed",
      copyright: "Boutique Hotel & Ristorante · Andermatt",
    },

    interior: {
      quote: "High altitude, deep flavors.",
    },

    location: {
      eyebrow: "Andermatt · 1444 m · Uri · Switzerland",
    },
  },

  de: {
    nav: {
      hotel: "Hotel",
      restaurant: "Restaurant",
      reservation: "Reservierung",
      contact: "Kontakt",
    },

    hero: {
      tagline: "Ein Alpines Refugium seit dem 19. Jahrhundert",
      cta: "Hotel",
      ctaAlt: "Restaurant",
    },

    about: {
      eyebrow: "Willkommen",
      titleMain: "Zum Schwarzen",
      titleItalic: "Bären",
      p1: "Das Hotel & Restaurant zum Schwarzen Bären liegt am Eingang von Andermatt. Im Winter ist es fußläufig zur Gemsstock-Seilbahnstation, wo der Skibus hält, der Sie zur Nätschen-Gondolstation bringt. Außerdem ist es nur 2 Minuten zu Fuß ins Zentrum der Stadt, wo Sie alle notwendigen Dienstleistungen finden.",
      p2: "Unser Hotel ist klein & gemütlich, mit sorgfältig renovierten Zimmern. Wir bieten ein herzhaftes & rustikales Frühstück, das im Zimmerpreis inbegriffen ist. Am Abend können Sie in unserem Restaurant speisen, das saisonale & lokal bezogene italienische Küche mit einem Hauch Schweiz bietet. Unser Restaurant wurde mit 14 Gault Millau Punkten ausgezeichnet.",
    },

    story: {
      eyebrow: "Eine Botschaft vom Team",
      quote:
        "Diese Langlebigkeit macht uns besonders stolz, die Möglichkeit zu haben, die Traditionen dieses Anwesens fortzuführen und weiterhin Gäste willkommen zu heißen und sie mit unserer Küche und Gastfreundschaft zu verwöhnen.\n\nIch habe die letzten sieben Jahre in der Gastronomie in Andermatt gearbeitet und freue mich sehr, den Betrieb des Bären mit meiner neuen Gesellschaft Val Ursera Hospitality AG zu übernehmen.\n\nZusammen mit einem jungen und talentierten Team freue ich mich sehr darauf, das nächste Kapitel dieser erstaunlichen Geschichte zu schreiben.\n\nWir freuen uns darauf, Sie sehr bald in unserem Haus begrüßen zu dürfen.",
      signature: "Johan Granvik & das Bären-Team",
    },

    hotel: {
      eyebrow: "Hotel",
      titleMain: "Boutique Hotel",
      titleItalic: "Andermatt",
      intro:
        "Im sorgfältig renovierten alten Holzgebäude finden Sie komfortable Zimmer zum Entspannen und Erholen.",
      cta: "Zimmer ansehen",
    },

    restaurant: {
      eyebrow: "Restaurant",
      titleMain: "Italienische Seele,",
      titleItalic: "Alpiner Geist",
      intro:
        "In unserem Restaurant nehmen wir Sie mit auf eine kulinarische Reise ins Herz Italiens. Sie sind auch herzlich willkommen, einen Apéro, eine Kleinigkeit zu essen oder einen köstlichen Kaffee zu genießen.",
      chefEyebrow: "Küchenchef",
      chefName: "Daniel Schiavetta",
      chefPoints: "14 Gault Millau Punkte",
      chefBio:
        "Küchenchef Daniel Schiavetta und sein Team haben eine Speisekarte kreiert, die die Jahreszeiten und lokale Produzenten nach Möglichkeit respektiert. Die Gerichte sind von der italienischen Küche inspiriert und auf kreative Weise neu erfunden. Alle Gerichte sind vollständig hausgemacht, und ein Großteil der Zutaten stammt direkt von lokalen Bauernhöfen oder aus der Natur.",
      hoursTitle: "Öffnungszeiten",
      footer: "※  Küche geöffnet Mittwoch – Sonntag · 18:00 – 21:00  ※",
      reserveBtn: "Tisch reservieren",
      menuCta:    "Speisekarte ansehen",
    },

    menu: {
      tastingMenus: "Degustationsmenüs",
      forWholeParty: "Für die gesamte Gesellschaft",
      alaCarteTitle: "À La Carte",
      kidsTitle: "Kinderkarte",
      allergyNote:
        "Alle Preise in CHF inkl. 8.1% MwSt · Bei Fragen zu Allergien wenden Sie sich bitte an unser Personal",
    },

    wines: {
      eyebrow: "La Cantina",
      titleMain: "Die",
      titleItalic: "Weinkarte",
    },

    contact: {
      eyebrow: "Reservieren",
      titleMain: "Ihren Aufenthalt",
      titleItalic: "planen",
      intro:
        "Ob Sie eines unserer Zimmer buchen oder einen Tisch für den Abend reservieren möchten — unser Team meldet sich innerhalb von 24 Stunden.",
      type: "Art der Reservierung",
      typeRoom: "Zimmerreservierung",
      typeTable: "Tischreservierung",
      date: "Datum",
      time: "Uhrzeit",
      timeSelect: "Uhrzeit wählen",
      guests: "Anzahl der Gäste",
      email: "E-Mail",
      requests: "Besondere Wünsche",
      requestsPlaceholder: "Ernährungsanforderungen, Feiern, Barrierefreiheit…",
      cta: "Anfrage senden",
      errorGeneral: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      errorConnection: "Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      guestSingular: "Person",
      guestPlural: "Personen",
      name: "Vollständiger Name",
      namePlaceholder: "Ihr Name",
      roomType: "Zimmertyp",
      checkIn: "Check-in",
      checkOut: "Check-out",
      adults: "Erwachsene",
      kids: "Kinder (0–17)",
      kidAgeOf: "Kind",
      kidAgeRequired: "Alter",
      kidAgeSelectPlaceholder: "Alter (Pflichtfeld)",
      kidAgeYear: "Jahr",
      kidAgeYears: "Jahre",
      maxGuests: "max",
      submitting: "Wird gesendet…",
      validationPrefix: "Bitte ausfüllen:",
      validationEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      dateClosedError: "Das Restaurant ist montags und dienstags geschlossen.",
      groupInfo:
        "Für Gruppen über 6 Personen oder private Veranstaltungen schreiben Sie uns direkt an",
      modalEyebrow: "Anfrage erhalten",
      modalTitle: "Vielen Dank.",
      modalText:
        "Ihre Anfrage ist eingegangen. Unser Team meldet sich innerhalb von 24 Stunden zur Bestätigung Ihrer Buchung.",
      modalClose: "Schließen",
    },

    footer: {
      visit: "Besuchen",
      hours: "Öffnungszeiten",
      contact: "Kontakt",
      hoursMain: "Mittwoch – Sonntag",
      hoursClosed: "Montag – Dienstag geschlossen",
      copyright: "Boutique Hotel & Ristorante · Andermatt",
    },

    interior: {
      quote: "Grosse Höhen, tiefe Aromen.",
    },

    location: {
      eyebrow: "Andermatt · 1444 m · Uri · Schweiz",
    },
  },

  fr: {
    nav: {
      hotel: "Hôtel",
      restaurant: "Restaurant",
      reservation: "Réservation",
      contact: "Contact",
    },

    hero: {
      tagline: "Un Refuge Alpin depuis le 19ème Siècle",
      cta: "Hôtel",
      ctaAlt: "Restaurant",
    },

    about: {
      eyebrow: "Bienvenue",
      titleMain: "Zum Schwarzen",
      titleItalic: "Bären",
      p1: "L'Hôtel & Restaurant zum Schwarzen Bären est situé à l'entrée d'Andermatt. En hiver, il est à distance de marche de la station du téléphérique du Gemsstock où s'arrête le bus de ski qui vous emmène à la station de la Nätschen Gondola. De plus, il y a seulement 2 minutes à pied jusqu'au centre-ville où vous trouverez tous les services nécessaires.",
      p2: "Notre hôtel est petit & cosy, avec des chambres soigneusement rénovées. Nous proposons un petit-déjeuner copieux & rustique inclus dans le prix de la chambre. Le soir, vous pouvez dîner dans notre restaurant proposant une cuisine italienne de saison & locale avec une touche suisse. Notre restaurant a été récompensé par 14 points Gault Millau.",
    },

    story: {
      eyebrow: "Un Message de l'Équipe",
      quote:
        "Cette longévité nous rend particulièrement fiers d'avoir l'opportunité de perpétuer les traditions de cette propriété et de continuer à accueillir les hôtes et à les gâter avec notre cuisine et notre hospitalité.\n\nJ'ai passé les sept dernières années dans la scène gastronomique d'Andermatt et je suis ravi de reprendre les opérations du Bären avec ma nouvelle société Val Ursera Hospitality AG.\n\nEnsemble avec une équipe jeune et talentueuse, j'ai hâte d'écrire le prochain chapitre de cette histoire incroyable.\n\nNous sommes impatients de vous accueillir très prochainement dans notre maison.",
      signature: "Johan Granvik & l'Équipe du Bären",
    },

    hotel: {
      eyebrow: "Hôtel",
      titleMain: "Boutique Hôtel",
      titleItalic: "Andermatt",
      intro:
        "Dans le vieux bâtiment en bois soigneusement rénové, vous trouverez des chambres confortables pour vous détendre et vous ressourcer.",
      cta: "Voir les Chambres Disponibles",
    },

    restaurant: {
      eyebrow: "Restaurant",
      titleMain: "Âme Italienne,",
      titleItalic: "Esprit Alpin",
      intro:
        "Dans notre restaurant, nous vous emmènerons dans un voyage culinaire au cœur de l'Italie. Vous êtes également les bienvenus pour savourer un apéritif, une petite collation ou un délicieux café.",
      chefEyebrow: "Chef de Cuisine",
      chefName: "Daniel Schiavetta",
      chefPoints: "14 Points Gault Millau",
      chefBio:
        "Le Chef Daniel Schiavetta et son équipe ont créé un menu qui respecte les saisons et les producteurs locaux dans la mesure du possible. Les plats s'inspirent de la cuisine italienne et sont réinventés de manière créative. Tous les plats sont entièrement faits maison, et une grande partie des produits provient directement de fermes locales ou de la nature elle-même.",
      hoursTitle: "Horaires d'Ouverture",
      footer: "※  Cuisine ouverte Mercredi – Dimanche · 18:00 – 21:00  ※",
      reserveBtn: "Réserver une Table",
      menuCta:    "Voir Notre Menu",
    },

    menu: {
      tastingMenus: "Menus Dégustation",
      forWholeParty: "Pour toute la tablée",
      alaCarteTitle: "À La Carte",
      kidsTitle: "Menu Enfants",
      allergyNote:
        "Tous les prix en CHF incl. 8.1% TVA · Pour toute question concernant les allergies, contactez notre personnel",
    },

    wines: {
      eyebrow: "La Cantina",
      titleMain: "La",
      titleItalic: "Carte des Vins",
    },

    contact: {
      eyebrow: "Réserver",
      titleMain: "Planifiez Votre",
      titleItalic: "Séjour",
      intro:
        "Que vous réserviez l'une de nos chambres ou une table pour la soirée, notre équipe vous répondra dans les 24 heures pour confirmer votre demande.",
      type: "Type de Réservation",
      typeRoom: "Réservation de Chambre",
      typeTable: "Réservation de Table",
      date: "Date",
      time: "Heure",
      timeSelect: "Sélectionner l'heure",
      guests: "Nombre de Convives",
      email: "E-mail",
      requests: "Demandes Spéciales",
      requestsPlaceholder:
        "Régimes alimentaires, célébrations, besoins d'accessibilité…",
      cta: "Envoyer la Demande",
      errorGeneral: "Une erreur s'est produite. Veuillez réessayer.",
      errorConnection: "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.",
      guestSingular: "convive",
      guestPlural: "convives",
      name: "Nom Complet",
      namePlaceholder: "Votre nom",
      roomType: "Type de Chambre",
      checkIn: "Arrivée",
      checkOut: "Départ",
      adults: "Adultes",
      kids: "Enfants (0–17)",
      kidAgeOf: "Enfant",
      kidAgeRequired: "âge",
      kidAgeSelectPlaceholder: "Âge (obligatoire)",
      kidAgeYear: "an",
      kidAgeYears: "ans",
      maxGuests: "max",
      submitting: "Envoi en cours…",
      validationPrefix: "Veuillez remplir :",
      validationEmail: "Veuillez saisir une adresse e-mail valide.",
      dateClosedError: "Le restaurant est fermé le lundi et le mardi.",
      groupInfo:
        "Pour les groupes de plus de 6 personnes ou les événements privés, veuillez nous écrire directement à",
      modalEyebrow: "Demande Reçue",
      modalTitle: "Merci.",
      modalText:
        "Votre demande a bien été reçue. Notre équipe vous contactera dans les 24 heures pour confirmer votre réservation.",
      modalClose: "Fermer",
    },

    footer: {
      visit: "Nous Trouver",
      hours: "Horaires",
      contact: "Contact",
      hoursMain: "Mercredi – Dimanche",
      hoursClosed: "Lundi – Mardi fermé",
      copyright: "Boutique Hotel & Ristorante · Andermatt",
    },

    interior: {
      quote: "Haute altitude, saveurs profondes.",
    },

    location: {
      eyebrow: "Andermatt · 1444 m · Uri · Suisse",
    },
  },

  it: {
    nav: {
      hotel: "Hotel",
      restaurant: "Ristorante",
      reservation: "Prenotazione",
      contact: "Contatto",
    },

    hero: {
      tagline: "Un Rifugio Alpino dal 19° Secolo",
      cta: "Hotel",
      ctaAlt: "Ristorante",
    },

    about: {
      eyebrow: "Benvenuti",
      titleMain: "Zum Schwarzen",
      titleItalic: "Bären",
      p1: "L'Hotel & Ristorante zum Schwarzen Bären si trova all'ingresso di Andermatt. In inverno è raggiungibile a piedi dalla stazione della funivia del Gemsstock, dove si ferma il bus degli sciatori che vi porta alla stazione della Nätschen Gondola. Inoltre, è a soli 2 minuti a piedi dal centro città, dove troverete tutti i servizi necessari.",
      p2: "Il nostro hotel è piccolo & accogliente, con camere accuratamente ristrutturate. Offriamo una ricca & rustica colazione inclusa nel prezzo della camera. La sera potete cenare nel nostro ristorante con cucina italiana stagionale & a km zero con un tocco svizzero. Il nostro ristorante è stato premiato con 14 punti Gault Millau.",
    },

    story: {
      eyebrow: "Un Messaggio dal Team",
      quote:
        "Questa longevità ci rende particolarmente orgogliosi di avere l'opportunità di portare avanti le tradizioni di questa proprietà e di continuare ad accogliere gli ospiti viziandoli con la nostra cucina e ospitalità.\n\nHo trascorso gli ultimi sette anni nella scena gastronomica di Andermatt e sono felice di rilevare la gestione del Bären con la mia nuova società Val Ursera Hospitality AG.\n\nInsieme a un team giovane e talentuoso, non vedo l'ora di scrivere il prossimo capitolo di questa straordinaria storia.\n\nSiamo entusiasti di darvi il benvenuto nella nostra casa molto presto.",
      signature: "Johan Granvik & il Team del Bären",
    },

    hotel: {
      eyebrow: "Hotel",
      titleMain: "Boutique Hotel",
      titleItalic: "Andermatt",
      intro:
        "Nel vecchio edificio in legno accuratamente ristrutturato, troverete confortevoli camere per rilassarvi e ricaricarvi.",
      cta: "Vedi le Camere Disponibili",
    },

    restaurant: {
      eyebrow: "Ristorante",
      titleMain: "Anima Italiana,",
      titleItalic: "Spirito Alpino",
      intro:
        "Nel nostro ristorante vi porteremo in un viaggio culinario nel cuore dell'Italia. Siete anche benvenuti a gustare un aperitivo, uno spuntino o un delizioso caffè.",
      chefEyebrow: "Chef di Cucina",
      chefName: "Daniel Schiavetta",
      chefPoints: "14 Punti Gault Millau",
      chefBio:
        "Lo Chef Daniel Schiavetta e il suo team hanno creato un menu che rispetta le stagioni e i produttori locali quando possibile. I piatti sono ispirati alla cucina italiana e reinventati in modo creativo. Tutti i piatti sono completamente fatti in casa, e gran parte degli ingredienti proviene direttamente da fattorie locali o dalla natura stessa.",
      hoursTitle: "Orari di Apertura",
      footer: "※  Cucina aperta Mercoledì – Domenica · 18:00 – 21:00  ※",
      reserveBtn: "Prenota un Tavolo",
      menuCta:    "Vedi il Nostro Menu",
    },

    menu: {
      tastingMenus: "Menu Degustazione",
      forWholeParty: "Per tutto il tavolo",
      alaCarteTitle: "À La Carte",
      kidsTitle: "Menu Bambini",
      allergyNote:
        "Tutti i prezzi in CHF incl. 8.1% IVA · Per domande sulle allergie contattate il nostro personale",
    },

    wines: {
      eyebrow: "La Cantina",
      titleMain: "La",
      titleItalic: "Carta dei Vini",
    },

    contact: {
      eyebrow: "Prenota",
      titleMain: "Pianifica il Tuo",
      titleItalic: "Soggiorno",
      intro:
        "Che stiate prenotando una delle nostre camere o un tavolo per la serata, il nostro team risponderà entro 24 ore per confermare la vostra richiesta.",
      type: "Tipo di Prenotazione",
      typeRoom: "Prenotazione Camera",
      typeTable: "Prenotazione Tavolo",
      date: "Data",
      time: "Ora",
      timeSelect: "Seleziona l'ora",
      guests: "Numero di Ospiti",
      email: "E-mail",
      requests: "Richieste Speciali",
      requestsPlaceholder:
        "Esigenze alimentari, celebrazioni, necessità di accessibilità…",
      cta: "Invia Richiesta",
      errorGeneral: "Si è verificato un errore. Per favore riprova.",
      errorConnection: "Errore di connessione. Controlla la tua connessione internet e riprova.",
      guestSingular: "ospite",
      guestPlural: "ospiti",
      name: "Nome Completo",
      namePlaceholder: "Il tuo nome",
      roomType: "Tipo di Camera",
      checkIn: "Check-in",
      checkOut: "Check-out",
      adults: "Adulti",
      kids: "Bambini (0–17)",
      kidAgeOf: "Bambino",
      kidAgeRequired: "età",
      kidAgeSelectPlaceholder: "Età (obbligatorio)",
      kidAgeYear: "anno",
      kidAgeYears: "anni",
      maxGuests: "max",
      submitting: "Invio…",
      validationPrefix: "Si prega di compilare:",
      validationEmail: "Inserire un indirizzo e-mail valido.",
      dateClosedError: "Il ristorante è chiuso il lunedì e il martedì.",
      groupInfo:
        "Per gruppi superiori a 6 persone o eventi privati, scriveteci direttamente a",
      modalEyebrow: "Richiesta Ricevuta",
      modalTitle: "Grazie.",
      modalText:
        "La vostra richiesta è stata ricevuta. Il nostro team vi contatterà entro 24 ore per confermare la prenotazione.",
      modalClose: "Chiudi",
    },

    footer: {
      visit: "Trovaci",
      hours: "Orari",
      contact: "Contatto",
      hoursMain: "Mercoledì – Domenica",
      hoursClosed: "Lunedì – Martedì chiuso",
      copyright: "Boutique Hotel & Ristorante · Andermatt",
    },

    interior: {
      quote: "Alta quota, sapori profondi.",
    },

    location: {
      eyebrow: "Andermatt · 1444 m · Uri · Svizzera",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
