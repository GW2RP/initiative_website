var express = require('express');
var router = express.Router();

const showdown = require('showdown');
const converter = new showdown.Converter();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('codex', { title: 'Codex', nav_active: 'nav-codex' });
});

router.get('/lore', function(req, res, next) {
  let availableEntries = listLoreEntries();
  res.render('lore', { title: 'Lore', nav_active: 'nav-codex-lore', entries: availableEntries });
});

router.get('/lore/ajouter', function(req, res, next) {
  res.render('index', { title: 'Ajout dans le Lore' });
})

router.get('/lore/:entryName', function(req, res, next) {
  let entry = getLoreEntry(req.params.entryName);
  if (entry) {
    let page = converter.makeHtml(entry.page.trim());
    return res.render('lore', { title: entry.name, nav_active: 'nav-codex-lore', content: page });
  } else {
    return res.render('lore', { title: 'Lore', nav_active: 'nav-codex-lore', error: { code: "404", message: `${req.params.entryName} n'existe pas dans le Lore du Codex.`} })
  }
});

router.get('/bestiaire', function(req, res, next) {
  let availableEntries = listBestiaryEntries();
  res.render('bestiary', { title: 'bestiaire', nav_active: 'nav-codex-bestiary', entries: availableEntries });
});

router.get('/bestiaire/ajouter', function(req, res, next) {
  res.render('index', { title: 'Ajout dans le Bestiaire' });
})

router.get('/bestiaire/:entryName', function(req, res, next) {
  let entry = getBestiaryEntry(req.params.entryName);
  if (entry) {
    let page = converter.makeHtml(entry.page.trim());
    let linkedSheets = getSheetsForEntity(entry._id);
    return res.render('bestiary', { title: entry.name, nav_active: 'nav-codex-bestiary', content: page, sheets: linkedSheets });
  } else {
    return res.render('bestiary', { title: 'Bestiaire', nav_active: 'nav-codex-bestiary', error: { code: "404", message: `${req.params.entryName} n'existe pas dans le Bestiaire du Codex.`} })
  }
});

router.get('/fiches', function(req, res, next) {
  let sheets = getSheets();
  res.render('sheet', { title: 'Fiches', nav_active: 'nav-codex-sheets', sheets: sheets });
});

router.get('/fiches/ajouter', function(req, res, next) {
  res.render('new_sheet', { title: 'Nouvelle fiche', nav_active: 'nav-codex-sheets' });
})

router.get('/fiches/:npcId', function(req, res, next) {
  let sheet = getSheet(req.params.npcId);
  if (sheet) {
    return res.render('sheet', { title: sheet.name, nav_active: 'nav-codex-sheets', sheet: sheet });
  } else {
    return res.redirect('/codex');
  }
})

module.exports = router;



///////////////////////////////////////////
function getLoreEntry(entryName) {
  for (let entry of loreEntries) {
    if (entry.name === entryName) {
      return entry;
    }
  }
  return null;
}

function listLoreEntries() {
  let entries = [];
  for (let entry of loreEntries) {
    entries.push(entry.name);
  }
  return entries;
}

function getBestiaryEntry(entryName) {
  for (let entry of bestiaryEntries) {
    if (entry.name === entryName) {
      return entry;
    }
  }
  return null;
}

function listBestiaryEntries() {
  let entries = [];
  for (let entry of bestiaryEntries) {
    entries.push(entry.name);
  }
  return entries;
}

function getSheetsForEntity(entityId) {
  let sheets = [];
  for (let sheet of npcSheets) {
    if (sheet.entity === entityId) {
      sheets.push(sheet);
    }
  }
  return sheets;
}

function getSheet(npcId) {
  for (let npc of npcSheets) {
    if (npc._id === npcId) {
      return npc;
    }
  }
  return null;
}

function getSheets() {
  let entries = [];
  for (let entry in npcSheets) {
    let sheet = npcSheets[entry];
    entries.push({ name: sheet.name, _id: sheet._id });
  }
  return entries;
}

///////////////////////////////////////////
let loreEntries = [
  {
    _id: "1896adadza5dazd8azd",
    name: "Le Blanc Manteau",
    page: "#Le Blanc Manteau\nLe blanc manteau était un ordre de fanatiques.  \n> Les invisibles me paaaaaarlent !  \n\n[lien vers le wiki](http://github.com)  \n![GW2 mini](https://cdn.discordapp.com/attachments/354769463175806986/426873481171435540/unknown.png)"
  }
]

let bestiaryEntries = [
  {
    _id: "19az5da5zzd96azda",
    name: "Eveillés",
    page: "Les éveillés sont des enflures envoyés par Palawa Joko."
  },
  {
    _id: "168ad59zafaz",
    name: "Démons Sombres",
    page: "Les aatxes sont des démons de l'Outre-Monde.."
  }
]

let npcSheets = [
  {
    _id: "15d94azd8buief",
    created_by: "15d94azd8buief",
    entity: "168ad59zafaz",
    created_date: new Date(),
    name: "Aatxe Gardien",
    category: "solo",
    type: "créature monstrueuse cauchemardesque",
    color: "#1A8E15",
    caracteristics: {
      "force": {
        value: 30,
        description: "Une force brutale."
      },
      "dextérité": {
        value: 10
      },
      "intelligence": {
        value: 5
      },
      "sagesse": {
        value: 10
      },
      "charisme": {
        value: 20
      }
    },
    properties: {},
    skills: {
      "Interruption bondissante": {
        caracteristic: "dextérité",
        value: 40,
        description: "L'aatxe retarde son tour pour bondir sur sa cible alors qu'elle entreprend une action. Si la contre-attaque est un succès, la cible échoue automatiquement, et elle est aussitôt sujette à un jet de Volonté(CON) pour ne pas tomber hors combat, assomé."
      },
      "Acharnement": {
        caracteristic: "force",
        value: 40,
        description: "Une série de coups violents et brutaux pour achever la cible. Si celle si était victime de saignement abondants, le malus double suite à un Acharnement réussi."
      }
    },
    loots: {
      dice: "6",
      result: {
        6: "La magie de la créature s'est condensée en une orbe d'ectoplasme.",
        5: "Un œil de la créature s'est solidifié en un rubis parfait.",
        4: "Le cœur de la créature s'est cristallisé en un sapphir parfait.",
        3: "De la poudre ",
        1: "Des restes démoniaques inutiles."
      }
    }
  }
]
