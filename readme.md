# Voter

Kleines Web-Tool für gemeinsame Bewertungen.

Voter ermöglicht das Anlegen von Bewertungs-Sessions mit namentlicher Abstimmung. In jeder Session können mehrere Positionen zur Abstimmung kommen. Stimmberechtigte vergeben für jede Position eine Bewertung. Auf einer Übersichtsseite werden die Ergebnisse angezeigt, sowohl die einzelnen abgegebenen Bewertungen als auch ein Gesamtergebnis (Durchschnitt)

Die Abstimmungen können vorab angelegt werden und die Stimmberechtigten können über vorbereitete Links direkt zu den einzelnen Positionen gelangen (z.B. QR-Codes). Der Name der Stimmberechtigten wird über den Link verschlüsselt mit übergeben.

Es soll kein Benutzerkonto zur Nutzung nötig sein. Jede Session bekommt beim Anlegen eine ID über die der Zugriff möglich ist.

## Benötigte Elemente

- Startseite
- Abstimmseite (Standalone)
- Ergebnisseite (Standalone)
- Session anlegen (Navigation/Übersicht in linker Spalte, einzelne Features rechts)
- Abstimmungslinks (druckbar)
- Impressum/About/Contact
- NotFoundPage überarbeiten oder löschen

## ToDos

- @todo auth-modul aus store entfernen
- @todo aufrufe des auth-moduls im Router entfernen
- @todo store aufräumen
- @todo alte Transitions raus - schöne neue rein

## Features

- Begrenzte Lebenszeit der Abstimmsessions (Älter als einen Monat wird nicht geladen)
- Backend-Anbindung

## Wunschfeatures

- verschiedene Bewertungssysteme (Schulnoten, Punkte 1-10, Dafür/Dagegen/Enthaltung)
- CSV-Download der Ergebnisse
- verstecken der Ergebnisse bis alle Stimmen oder Stimmanteil abgegeben sind
- Erzeugung druckbarer/klickbarer Liste mit Links zu den einzelnen Positionen für jeden Stimmberechtigten
- Offene Abstimmung (kein vorheriges Anlegen der Stimmberechtigten)
- externe Profilbilder für die Stimmberechtigten
- Ersatz-"einloggen". Namen des Abstimmenden wird einmalig festgelegt und in einem Cookie gespeichert. Alle Abstimmenden können dann den selben Link zum abstimmen nutzen.
- Admin-Feature: Besitzer einer Session kann nachträglich Parameter ändern
- Admin-Feature: Mit firebase-Authentication übersicht über alle Votings, alte löschen

### Serverseitig

- (!) starke Limitierung der zu speichernden Daten. (API-Key zum schreiben ist in der App und keine Benutzer-Authentifizierung geplant!!)
- starke Längenbeschränkung, es dürfen nur bestimmte Felder angelegt werden. (NoSQL-DB)
- (!) serverseitige Prüfung und Validierung der ankommenden Daten
- serverseitige Berechnung der Ergebnisse (keine Einzelergebnisse an Client schicken)
- automatisches Aufräumen der DB
- nur Abruf einzelner Votings möglich
- Rate Limit beim Anlegen von Sessions
