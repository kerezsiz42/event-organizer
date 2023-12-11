# Eseményszervező webes alkalmazás - Specifikáció

## Kerezsi Zoltán - M0W4LW - 2023.11.05

### Technológiák

- **Frontend**: Angular a gyorsabb fejlesztésért az Androidos frontend fejlesztéhez képest
- **Backend**: Spring Boot Data JPA-val a Microsoft eszközöktől való függetlenség és a nagyobb industry adoption miatt
- **Adatbázis**: Postgres a nyílt forráskódja és verzitilitása miatt

A frontenden a mai industry standard Tailwind CSS megoldást fogom alkalmazni az egyedi dizájn eléréséhez.
A frontend és a backend összeköttetését OpenApi kódgeneráló eszközökkel könnyítem majd meg.
Az elkészült komponenseket konténerizált környezetben is lehet majd használni, illetve fejlesztés során nagyban támaszkodom majd a Docker Compose-ra, hogy ez után már csak egy lépés legyen egy Kubernetes clusterbe való kitelepítés.

### Működés

A feladat egy webes alkalmazás készítése, mely elősegíti baráti társaságoknak a hétvégi kiruccanások megszervezését. A rendszer segítséget fog nyújtani a kiírt tételek közötti szavazásban, így demokratikussá és követhetővé lehet tenni a részletek szervezését. Amikor a szavazást egy részvevő lezárja, akkor a frontenden megjelenik, hogy kinek mennyit kell fizetnie összesített formában.

A felhasználók nem lesznek autentikálva, azaz bárki beírhat bármilyen nevet és ezt nem ellenőrizzük jelszóvalidációval. Ezt a nevet a sütikben tároljuk, hogy minden http híváskor automatikusan küldésre kerüljenek. Nem teszünk különbséget a konkrét felhasználók között, entitásként nem fog szerepelni az adatbázisban.

### Tervezett entitások:

- **Poll**: a szavazást jelképező objektum, címmel és egy rövid leírással
- **Option**: egy poll-hoz tartozó választási lehetőség, címmel, leírással és árral
- **Vote**: egy felhasználó neve, a poll objektum és a kiválasztott opció

### Eszközök:

- OpenApiv3 to Markdown: https://swagger-markdown-ui.netlify.app/
- Markdown to PDF: https://cloudconvert.com/md-to-pdf
