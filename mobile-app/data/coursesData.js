export const coursesData = {
  math: [
    {
      title: "Les fractions",
      content: "Une fraction représente une partie d'un tout. Elle s'écrit sous la forme a/b où a est le numérateur et b est le dénominateur.",
      keyPoints: [
        "Le dénominateur ne peut jamais être zéro",
        "Pour additionner des fractions, il faut le même dénominateur",
        "Simplifier une fraction = diviser le numérateur et dénominateur par leur PGCD",
      ],
      examples: [
        "1/2 + 1/2 = 2/2 = 1",
        "3/4 + 1/4 = 4/4 = 1",
        "2/6 = 1/3 (simplification par 2)",
      ],
    },
    {
      title: "Les nombres décimaux",
      content: "Un nombre décimal est un nombre qui possède une partie entière et une partie décimale, séparées par une virgule.",
      keyPoints: [
        "La virgule sépare la partie entière de la partie décimale",
        "Les chiffres après la virgule sont les dixièmes, centièmes, millièmes...",
        "Pour comparer deux décimaux, on compare d'abord les parties entières",
      ],
      examples: [
        "12,5 = 12 + 5/10",
        "0,25 = 25/100 = 1/4",
        "3,14 > 3,09 car 14 > 09",
      ],
    },
    {
      title: "Le calcul littéral",
      content: "Le calcul littéral permet d'utiliser des lettres pour représenter des nombres inconnus et simplifier des expressions.",
      keyPoints: [
        "On peut additionner ou soustraire seulement les termes de même nature",
        "a × b s'écrit simplement ab",
        "Pour développer : k(a + b) = ka + kb",
      ],
      examples: [
        "3x + 2x = 5x",
        "5(x + 2) = 5x + 10",
        "2a + 3b ne peut pas être simplifié",
      ],
    },
    {
      title: "Les aires et périmètres",
      content: "Le périmètre est la longueur du contour d'une figure. L'aire est la mesure de sa surface.",
      keyPoints: [
        "Périmètre du rectangle = 2 × (Longueur + largeur)",
        "Aire du rectangle = Longueur × largeur",
        "Aire du triangle = (base × hauteur) ÷ 2",
        "Périmètre du cercle = 2 × π × rayon",
      ],
      examples: [
        "Rectangle 5cm × 3cm : Périmètre = 16cm, Aire = 15cm²",
        "Triangle base 6cm, hauteur 4cm : Aire = 12cm²",
      ],
    },
    {
      title: "Les pourcentages",
      content: "Un pourcentage représente une proportion sur 100. Il permet de comparer des quantités.",
      keyPoints: [
        "50% = 50/100 = 1/2",
        "Pour calculer x% de A : (x × A) ÷ 100",
        "Augmenter de x% : multiplier par (1 + x/100)",
      ],
      examples: [
        "25% de 80 = (25 × 80) ÷ 100 = 20",
        "Augmenter 50 de 20% : 50 × 1,20 = 60",
      ],
    },
  ],

  french: [
    {
      title: "Les classes grammaticales",
      content: "Chaque mot appartient à une classe grammaticale qui définit sa nature et son rôle dans la phrase.",
      keyPoints: [
        "Nom : désigne une personne, un animal, une chose",
        "Verbe : exprime une action ou un état",
        "Adjectif : qualifie un nom",
        "Adverbe : modifie un verbe, un adjectif ou un autre adverbe",
        "Pronom : remplace un nom",
      ],
      examples: [
        "Le chat noir dort paisiblement.",
        "Nom : chat | Adjectif : noir | Verbe : dort | Adverbe : paisiblement",
      ],
    },
    {
      title: "Le présent de l'indicatif",
      content: "Le présent de l'indicatif exprime une action qui se déroule au moment où l'on parle, ou une vérité générale.",
      keyPoints: [
        "1er groupe (-er) : je chante, tu chantes, il chante...",
        "2ème groupe (-ir avec -issons) : je finis, tu finis, il finit...",
        "3ème groupe : verbes irréguliers à apprendre",
      ],
      examples: [
        "Je mange une pomme (1er groupe)",
        "Tu finis tes devoirs (2ème groupe)",
        "Il va à l'école (3ème groupe - verbe aller)",
      ],
    },
    {
      title: "L'accord du participe passé",
      content: "Le participe passé s'accorde différemment selon l'auxiliaire utilisé.",
      keyPoints: [
        "Avec ÊTRE : accord avec le sujet",
        "Avec AVOIR : accord avec le COD si placé avant",
        "Sans auxiliaire : accord comme un adjectif",
      ],
      examples: [
        "Elle est partie (accord avec 'elle')",
        "Les pommes que j'ai mangées (COD 'que' avant = accord)",
        "J'ai mangé des pommes (COD après = pas d'accord)",
      ],
    },
    {
      title: "Les homophones grammaticaux",
      content: "Les homophones sont des mots qui se prononcent pareil mais s'écrivent différemment.",
      keyPoints: [
        "a / à : 'a' = verbe avoir, 'à' = préposition",
        "et / est : 'et' = conjonction, 'est' = verbe être",
        "son / sont : 'son' = déterminant possessif, 'sont' = verbe être",
        "ou / où : 'ou' = choix, 'où' = lieu",
      ],
      examples: [
        "Il a une voiture. / Il va à Paris.",
        "Pierre et Paul / Il est grand",
        "Son chat / Ils sont partis",
        "Thé ou café ? / Où vas-tu ?",
      ],
    },
    {
      title: "Les types de phrases",
      content: "Il existe quatre types de phrases selon l'intention du locuteur.",
      keyPoints: [
        "Déclarative : donne une information (point .)",
        "Interrogative : pose une question (point d'interrogation ?)",
        "Exclamative : exprime un sentiment (point d'exclamation !)",
        "Impérative : donne un ordre (point . ou !)",
      ],
      examples: [
        "Le soleil brille. (déclarative)",
        "Viens-tu demain ? (interrogative)",
        "Quelle belle journée ! (exclamative)",
        "Ferme la porte. (impérative)",
      ],
    },
  ],

  history: [
    {
      title: "La Préhistoire",
      content: "La Préhistoire est la période avant l'invention de l'écriture, divisée en Paléolithique et Néolithique.",
      keyPoints: [
        "Paléolithique : chasseurs-cueilleurs nomades",
        "Néolithique : sédentarisation, agriculture, élevage",
        "Invention de l'écriture : vers -3500 en Mésopotamie",
        "Art pariétal : grottes de Lascaux",
      ],
      examples: [
        "Lucy : australopithèque découvert en Éthiopie",
        "Révolution néolithique : passage à l'agriculture",
      ],
    },
    {
      title: "L'Antiquité",
      content: "L'Antiquité commence avec l'invention de l'écriture et se termine avec la chute de l'Empire romain (476).",
      keyPoints: [
        "Égypte ancienne : pharaons, pyramides, hiéroglyphes",
        "Grèce antique : démocratie athénienne, philosophie",
        "Empire romain : conquêtes, droit romain, latin",
        "Gaule romaine : romanisation",
      ],
      examples: [
        "Jules César conquiert la Gaule en -52 (Alésia)",
        "Athènes invente la démocratie au Ve siècle avant J.-C.",
      ],
    },
    {
      title: "Le Moyen Âge",
      content: "Le Moyen Âge s'étend de 476 (chute de Rome) à 1492 (découverte de l'Amérique).",
      keyPoints: [
        "Système féodal : seigneurs, vassaux, serfs",
        "Église très puissante : cathédrales, croisades",
        "Charlemagne : empereur couronné en 800",
        "Guerre de Cent Ans (1337-1453) : France contre Angleterre",
      ],
      examples: [
        "Jeanne d'Arc libère Orléans en 1429",
        "Construction de Notre-Dame de Paris (1163-1345)",
      ],
    },
    {
      title: "Les temps modernes",
      content: "Les Temps modernes débutent en 1492 avec les grandes découvertes.",
      keyPoints: [
        "1492 : Christophe Colomb découvre l'Amérique",
        "Renaissance : renouveau culturel et artistique",
        "Réforme protestante : Martin Luther (1517)",
        "Monarchie absolue en France : Louis XIV",
      ],
      examples: [
        "Château de Versailles : symbole du pouvoir absolu",
        "Léonard de Vinci : artiste de la Renaissance",
      ],
    },
    {
      title: "La géographie de la France",
      content: "La France métropolitaine a une superficie de 550 000 km² avec des reliefs variés.",
      keyPoints: [
        "6 grands massifs : Alpes, Pyrénées, Jura, Vosges, Massif central, Ardennes",
        "4 fleuves principaux : Seine, Loire, Garonne, Rhône",
        "Climat tempéré avec 4 nuances régionales",
        "18 régions depuis 2016",
      ],
      examples: [
        "Mont Blanc : point culminant (4 808 m)",
        "Loire : plus long fleuve (1 006 km)",
      ],
    },
    {
      title: "L'Union Européenne",
      content: "L'Union Européenne est une organisation politique et économique de 27 pays européens.",
      keyPoints: [
        "Créée en 1957 (Traité de Rome) avec 6 pays",
        "27 États membres aujourd'hui",
        "Monnaie unique : l'euro (20 pays)",
        "Capitales : Bruxelles, Strasbourg, Luxembourg",
      ],
      examples: [
        "Libre circulation des personnes et des marchandises",
        "Parlement européen à Strasbourg",
      ],
    },
  ],
};
