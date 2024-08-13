## Äänestys-sovellus
>Käyttäjät:
>* käyttäjä
>* ylläpitäjä


#### Sivun toiminta:

* Aloitetaan sivulta jolla kaikki tapahtuu ja ilman kirjautumista
äänestys vaihtoehdot ovat esikatseltavissa.

* Headerin oikeassa reunassa on "kirjaudu" ja "rekisteröidy"-nappi, joita painamalla
käyttäjä avaa vastaavan laatikon.

* Rekisteröityessä henkilöllä on mahdollisuus valita onko hän käyttäjä vai ylläpitäjä.

* Kirjautessa sivu tunnistaa kirjautujan käyttöoikeudet ja avaa ylläpitäjälle
napin, josta hän voi lisätä tai poistaa kyselyitä.


#### Virheiden tunnistus

* Henkilö kirjoittaa tunnuksensa väärin.

* Henkilö yrittää äänestää liian monta kertaa.

* Ylläpitäjä yrittää poistaa olematonta kyselyä.

* Ylläpitäjä yrittää luoda alle kahden vaihtoehdon kyselyn.


#### Esimerkki käyttötapauksen kulusta
1. Henkilö luo tunnukset käyttäjänä.
    * Henkilö kirjautuu virheellisillä tunnuksilla.
        * Virheilmoitus.
    * Henkilö kirjautuu toimivilla tunnuksilla.
        * Henkilö on kirjautunut. Oikeudet äänestää on avattu.
    * Henkilö äänestää. Ääni lasketaan.
        * Henkilö äänestää uudelleen samaa. Ääntä ei lasketa.
    * Henkilö äänestää valitsemissaan kyselyissä ja kirjautuu ulos.
        * Käyttöoikeudet palautuvat vain esikatseluun

2. Henkiö luo tunnukset ylläpitäjänä.
    * Henkilö kirjautuu ylläpitäjänä.
    * Henkilöllä on oikeudet esikatsella, äänestää tai luoda uusi kysely.
    * Henkilö luo uuden kyselyn täyttäen kriteerit
    * Henkilö kirjautuu ulos.
        * Käyttöoikeudet palautuvat vain esikatseluun

#### Kyselyn luonti
1. Paina nappia "Luo kysely".
2. Anna kyselylle nimi.
    * 5-30 merkkiä.
3. Anna vaihtoehtoja.
    * 2-3
4. Julkaise kysely.

#### Sivun luomiseen käytetään Bootstrap-kirjastoa