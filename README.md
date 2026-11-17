# TJ Slovan Preseľany – návrh webu

Návrh nového webu futbalového klubu TJ Slovan Preseľany (Telovýchovná jednota Slovan Preseľany). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/tj-slovan-preselany/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/tj-slovan-preselany/admin/

## Vzhľad

**„Švajčiarska mriežka“ (dizajn v2, 17. 11. 2026).** Biela, tmavomodrá, nebeská modrá z dresu len ako akcent. Písmo Instrument Serif (titulky) a Geist (text, čísla).

- prísna mriežka, veľa bieleho priestoru a tenké linky; úvod: veľký titulok s krátkou vetou a štyri údaje áčka (miesto, body, skóre, forma),
- pod tým tri stĺpce (najbližší zápas, výsledky, program) a celá tabuľka s popisom vľavo,
- stránka Klub v rovnakej mriežke: ročníky áčka, úspechy, štadión pri stanici a obec,
- menu na telefóne je biela plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

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
