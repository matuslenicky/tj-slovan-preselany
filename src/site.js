// Statický generátor webu TJ Slovan Preseľany: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Švajčiarska mriežka“: prísna mriežka, veľa bieleho priestoru, tenké linky. Úvod: veľký titulok s krátkou
// vetou a štyri údaje áčka v mriežke, pod tým tri stĺpce (najbližší zápas, výsledky, program) a celá tabuľka.
// Biela, tmavomodrá, nebeská modrá z dresu len ako akcent. Písmo Instrument Serif (titulky) a Geist (text, čísla).
const SKIN = {
  nav: 'bar', theme: '#16294d', brand: 'TJ Slovan Preseľany', brandSub: '',
  fonts: ['instrument-serif-400.woff', 'geist-400.woff', 'geist-600.woff'],
  sources: 'Obec a štadión podľa webu obce Preseľany.',
  adminHero: 'Futbal pri stanici v Preseľanoch',
  adminFacts: club.obec.fakty,
  links: [[club.obecWeb, 'Web obce Preseľany']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže. Majster VII. ligy ObFZ Topoľčany 2022/23, od roku 2025 v krajskej VI. lige.`;

add('', {
  title: 'futbal v Preseľanoch', active: '', bodyClass: 'home',
  body: (R) => {
    const n = nextA;
    const row = A.table?.rows.find((r) => r.our);
    const wl = winterLine();
    return `<section class="sw-hero"><div class="wrap sw-grid">
  <div class="sw-title">
    <h1 class="h1">TJ Slovan <em>Preseľany</em></h1>
    <p class="sw-p">Majster VII. ligy ObFZ Topoľčany 2022/23. Od roku 2025 hrá áčko krajskú VI. ligu, štadión stojí pri železničnej stanici.</p>
  </div>
  ${row ? `<dl class="sw-stats">
    <div><dt>Miesto</dt><dd>${A.pos}.<small>${zo(A.of)}</small></dd></div>
    <div><dt>Body</dt><dd>${row.pts}<small>${row.played} ${pw(row.played, 'zápas', 'zápasy', 'zápasov')}</small></dd></div>
    <div><dt>Skóre</dt><dd>${row.gf}:${row.ga}<small>${row.won}–${row.draw}–${row.lost}</small></dd></div>
    <div><dt>Forma</dt><dd class="sw-form">${formHtml(A.slug)}</dd></div>
  </dl>` : ''}
</div></section>
<section class="sec"><div class="wrap sw-cols">
  <section aria-labelledby="nx-h">
    <h2 class="label" id="nx-h">Najbližší zápas</h2>
    ${n ? `<p class="sw-next">${n.home ? 'Preseľany – ' : ''}${esc(n.opponent)}${n.home ? '' : ' – Preseľany'}</p>
    <p class="sw-meta"><time datetime="${n.date}">${dLong(n.date)}</time>, ${esc(n.time || '')} · ${n.home ? 'doma' : 'vonku'}</p>
    <p class="sw-meta">${wl || `<span class="cd" data-kickoff="${isoLocal(n.date, n.time)}" hidden></span>`}</p>
    <p class="btns"><a class="btn" href="${R}kalendar/zapas-${n.id}.ics" download>${I.cal}Do kalendára</a></p>` : '<p>Zatiaľ bez programu.</p>'}
  </section>
  <section aria-labelledby="res-h"><h2 class="label" id="res-h">Výsledky</h2>${fxList(homeRes(5), R)}${more(`${R}zapasy/#z-vys`, 'Všetky')}</section>
  <section aria-labelledby="prog-h"><h2 class="label" id="prog-h">Program</h2>${homeUp(5).length ? fxList(homeUp(5), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}${more(`${R}zapasy/`, 'Všetky')}</section>
</div></section>
${A.table ? `<section class="sec sec--line" aria-labelledby="t-h"><div class="wrap sw-split">
  <div><h2 class="label" id="t-h">Tabuľka</h2><p class="sw-meta">${esc(A.leagueName)}</p>${more(`${R}tabulky/`, 'Všetky tabuľky')}</div>
  <div>${tableHtml(A.table, R)}</div>
</div></section>` : ''}`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: ročníky áčka od 2014/15, titul v VII. lige ObFZ Topoľčany 2022/23, štadión pri stanici a obec Preseľany.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}. Klubové farby: ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap sw-split">
  <div><h2 class="label">Ročníky áčka</h2><p class="sw-meta">Od V. ligy cez okres späť do kraja.</p></div>
  <div>${seasonsTable(club.rocniky.zoznam)}<p class="note">Rok založenia a staršiu históriu klubu sme vo verejných zdrojoch nenašli.</p></div>
</div></section>
<section class="sec sec--line"><div class="wrap sw-split">
  <div><h2 class="label">Úspechy</h2></div>
  <div>${facts(club.uspechy.map((u) => ({ k: u.rok, t: u.text })))}</div>
</div></section>
<section class="sec sec--line"><div class="wrap sw-split">
  <div><h2 class="label">${esc(ST.nazov)}</h2></div>
  <div>${facts(ST.fakty)}</div>
</div></section>
<section class="sec sec--line"><div class="wrap sw-split">
  <div><h2 class="label">Preseľany</h2></div>
  <div>${facts(club.obec.fakty)}<p class="note">Zdroje: web obce Preseľany, Wikipédia, Sportnet.</p></div>
</div></section>`,
});
