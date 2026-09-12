# Lokale controle — 12 september 2026

Beurswatcher draait op http://localhost:5186/. Poorten 5173 en 5175 behoren tot andere lokale projecten; die processen zijn niet gestopt. De productiepreview gebruikt de bestaande lokale D1-opslag.

## Gecontroleerd

- TypeScript, lint en productiebuild slagen.
- Bestaande financiële controles (18 grensgevallen), uitbreiding en verfijning slagen; Instagram-parsercontrole controleert accounteigendom, video-URL-validatie, dubbele items en ontbrekende videobestanden.
- 320px: navigatie, archief, Beleggen, ETF-thema, ETF-artikel, Events, ETF-kosten, Box 3 en ineens/gespreid hebben geen horizontale paginaoverloop.
- 390px: alle drie homepagehoofdstukken met eigen visual en uitleg zichtbaar; stapankers werken. Grafieklabels en invoervelden zijn leesbaar. Een hoger doelbedrag verandert de maandinleg; identieke fondskosten leveren nul verschil op.
- 768px: tabletindeling zonder paginaoverloop. Gekozen partner blijft open na scrollen.
- 844×390: mobiel menu begint onder de werkelijke header, kan intern scrollen en de laatste link blijft bereikbaar. Sluiten werkt.
- 1366×768: het hele verhaal blijft in de normale paginastroom zichtbaar.
- 1440×1000: vaste visual schakelt bij scrollen achtereenvolgens tussen Begrijpen, Berekenen en Afwegen, ook na wijzigen van schermformaat.
- Acht hoofdonderwerpen klappen open; doorklik naar ETF-hub werkt. Blogzoekopdracht pensioen geeft één passend artikel.
- Markthub toont alle vijf ankermenu-items. Beide officiële widgets leveren echte gegevens in de browser; indexgrafiek is volledig zichtbaar. Home plaatst de mini-hub na eigen artikelen en Reels.
- Reels-knop opent een dialoog op de eigen site. In deze browser gaf Instagram geen afspeelbare embed terug: de timeoutmelding, originele bronlink, passende dialoogbreedte en sluitknop zijn gecontroleerd. Automatisch ophalen en native hover/tap-weergave wachten op accounttoegang; werkelijk afspelen met Daniëls bestanden is nog niet te verifiëren.
- API /api/instagram/reels geeft status waiting en zes opgeslagen echte Reels. Nieuwe Beginnen- en Vermogen-routes antwoorden met 200.
- Geen browserconsolefouten tijdens de laatste controle van de productieversie.

## Telefoonpreview

De tijdelijke beveiligde brug op 172.20.10.2:5174 is via de browser op deze computer gecontroleerd: de toegangscode zet een tijdelijke cookie en opent de juiste Beurswatcher-homepage. De QR-code staat buiten versiebeheer. Laptop en telefoon moeten hetzelfde wifi-/hotspotnetwerk gebruiken; beide processen en de laptop moeten aanblijven. Een fysieke telefoon is nog niet getest. De code verloopt twaalf uur na het starten. Er is niets gepubliceerd of geüpload.

## Vervangen door scrollanimatie op alle schermen — vervolgcontrole

De eerdere mobiele weergave met drie losse kaarten en het desktopminimum van 1100×800 zijn vervallen. De homepage gebruikt nu overal één sticky paneel. De scrollpositie bestuurt opacity, verticale positie, schaal en voortgang; de scène heeft leesruimte vóór elke overgang. Knoppen en directe stapankers verwijzen naar de overeenkomstige scrollposities. Geen wheel/touch-interceptie of geneste scrollcontainer.

Gecontroleerd in de productiepreview op 5186:
- 390×844: paneel past onder de header, juiste visual en uitleg verschijnen samen. Een tussenliggende scrollpositie geeft daadwerkelijk gedeeltelijke opacity/translation, dus de beweging volgt scrollvoortgang.
- 320×568: alle drie stappen bereikt met gewone scrolltoetsen; hoge inhoud schuift tijdens de leesfase omhoog zodat de onderkant bereikbaar is. Terugscrollen wisselt terug naar Berekenen. Geen horizontale overloop.
- 844×390: tweekolomsindeling en bereikbare inhoud, zonder horizontale overloop.
- 1366×768: scrollen schakelt van Begrijpen naar Berekenen en Afwegen. Het paneel blijft daarbij onder de header staan en laat na de laatste stap los. Ook terugscrollen getest.
- TypeScript, lint en productiebuild slagen. Zonder JavaScript blijft de inhoud leesbaar. Verminderde beweging gebruikt directe scèneovergangen; de browserinstelling is in code verwerkt, niet fysiek op een telefoon getest.
