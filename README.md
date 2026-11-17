# TJ Slovan Preseľany – návrh webu

Návrh nového webu futbalového klubu TJ Slovan Preseľany (Telovýchovná jednota Slovan Preseľany). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/tj-slovan-preselany/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/tj-slovan-preselany/admin/

## Vzhľad

**„Polmesiac a hviezda“.** Erb obce má v červenom štíte strieborný polmesiac a zlatú osemcípu hviezdu, klub hrá v nebesky modrej a bielej.

- nebesky modro-biele **pruhy dresu** v hlavičke, na kartách a v päte,
- úvod ako **nočná obloha** s polmesiacom, osemcípou hviezdou a erbom klubu (SVG),
- program ako **osemcípe hviezdy s dňom v mesiaci**: doma zlatá, vonku nebeská,
- výsledky ako **fázy mesiaca**: výhra spln, remíza polmesiac, prehra nov, skóre v poradí naše:súper,
- **súhvezdie ročníkov**: každý ročník jedna hviezda, výška podľa úrovne súťaže (V. – VII. liga), veľkosť podľa miesta, titul 2022/23 ako zlatá osemcípa hviezda,
- menu na telefóne ako **nočná obloha cez celú obrazovku**,
- písmo **Josefin Sans** (nadpisy a čísla) a **Mulish** (text).

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 4 tímov (áčko, U13, U11, U9) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2014/15 – 2025/26 z konečných tabuliek na Sportnete, titul v VII. lige ObFZ Topoľčany 2022/23 (`data/klub.json`).
- Štadión pri železničnej stanici a kolkáreň z roku 1966 podľa webu obce (stránka Kolkársky klub). Obec podľa webu obce (História, Symboly obce, Kostolík sv. Anny) a Wikipédie.
- Rok založenia a staršiu históriu klubu sme vo verejných zdrojoch nenašli (17. 11. 2026), na webe je to tak uvedené. E-mail zo Sportnetu.
- Erb klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Josefin Sans a Mulish, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5430 # náhľad na http://127.0.0.1:5430/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po sezóne doplniť ručne.
