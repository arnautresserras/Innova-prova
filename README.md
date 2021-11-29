
# Prova Innovamat Arnau Tresserras

## Com executar

Clonar o descarregar el repositori, dins de la carpeta es pot cridar:
### `npm i`
### `npm start`

Executarem l'aplicació en mode development.\
Obrir [http://localhost:3000](http://localhost:3000) per a navegar.

## Documentació

He procurat evitar afegir llibreries components externs, tot i això vaig crear l'app amb l'eina:

### `npx create-react-app my-app --template typescript`

He afegit també la llibreria [React PDF](https://www.npmjs.com/package/react-pdf) per a mostrar els detalls dels recursos dins de l'aplicació.

Pel que fa a l'estructura de l'aplicació he creat una SPA amb tres grans components:

 1. Barra superior de cerca
 2. Barra lateral de menú
 3. Cos de l'aplicació on mostrem els recursos

Alguns d'aquests components estan compostos d'altres de més petits com poden ser els llistats de filtres o cadascun dels recursos que rebem del backend.

He procurat centralitzar tota la funcionalitat de l'aplicació en un sol component pare i mantenir tots els fills com a components HOC. D'aquesta manera els manteniments futurs serien més senzills i no hem de remenar tots els fitxers quan volem canviar la lògica d'alguna part de l'aplicació.

Donades les quatre categories de recursos, associades amb les urls de la api i als filtres, he decidit crear enumerables tant per a les categories com per als altres filtres que ens permeten mapejar les dades de forma ràpida i senzilla.

Veureu ràpidament que ha passat alguna cosa estranya amb els colors. Me n'he adonat i he decidit deixar-ho malament perquè m'ha semblat més interessant per a fer una reflexió.

Soc daltònic, i la tonalitat de verd i gris que s'ha triat al figma són, als meus ulls, idèntiques. És per això que veureu que en un inici vaig crear un efecte de item de menú actiu diferent al del figma(jo els veia tots quatre iguals) i també de hover.

No va ser fins que vaig ensenyar l'aplicació a una altra persona, que em va preguntar pels colors, que em vaig adonar que eren colors diferents. Soc conscient que és una aplicació de prova, però crec que és interessant saber que probablement molts dels usuaris reals d'una aplicació com la vostra es trobarien en una situació semblant a la meva.

Seguint amb el tema dels estils, he decidit fer CSS natiu, tot i que crec que per a una aplicació més gran segurament valdria la pena fer servir algun preprocessador com SASS, veureu que els noms de les classes que he fet servir segueixen aquesta idea.

Pel que fa a les funcionalitats de l'aplicació, he implementat tant els requeriments com els opcionals:

 - Mostrar contingut de cada categoria.
 - Mostrar missatge d'error quan no podem mostrar cap element
 - Gestió de "favoritos": per a la gestió dels elements preferits, he decidit identificar cada element pel seu ID, com veureu, alguns dels IDs estan repetits i a vegades preferim més d'un element. He pensat que en cas que un element pertanyés a diverses categories seria interessant que l'alumne que el marca com a preferit també veies l'indicador a altres instàncies de l'element. També m'ha semblat raonable pensar que es tracta d'un conjunt de dades de test i que en un cas real no tindríem elements diferents amb un mateix ID.
 - Pàgina de detall: Per a la pàgina de detall he assumit que tots els recursos que rebem serien en format PDF (no n'he trobat cap que no ho fos), així que els mostro en pantalla fent servir la llibreria prèviament esmentada. Si es donés el cas que tinguem fitxers de vídeo, imatges o altres recursos hauríem de validar el format del recurs per a mostrar el component adient a cada cas.
 - Versió mobile
 - Cerca i filtrat