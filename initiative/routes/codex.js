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

router.get('/bestiaire/:entryName', function(req, res, next) {
  let entry = getBestiaryEntry(req.params.entryName);
  if (entry) {
    let page = converter.makeHtml(entry.page.trim());
    return res.render('bestiary', { title: entry.name, nav_active: 'nav-codex-bestiary', content: page });
  } else {
    return res.render('bestiary', { title: 'Bestiaire', nav_active: 'nav-codex-bestiary', error: { code: "404", message: `${req.params.entryName} n'existe pas dans le Bestiaire du Codex.`} })
  }
});

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
  }
]
