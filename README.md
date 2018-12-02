# POPCORN 🍿

_Popcorn_ est une plateforme qui permet de trouver des développeurs freelance de Nantes avec (vraiment) 0% de commission. Elle est développée et maintenue par les développeurs freelances eux-mêmes. [Voir le site](https://popcorn-nantes.github.io/)

Les objectifs de _PopCorn_ pour les développeurs freelances :

- 📈 Devenir un canal pour trouver des affaires à Nantes sans commission ni intermédiaire.
- 📗 Open source : on maîtrise les fonctionnalités de la plateforme, tel que les résultats de recherche et l'ordre dans lequel sont affichés nos profils.
- 💬 Faire circuler les tuyaux boulot entre freelances via le tchat.

## Créer son profil

- Fork ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour créer l'url de ton profil.
- Ajoute ta photo dans le dossier `/static/images` : **la photo doit faire 100ko maximum ⚠️**
- Fait une _pull request_ avec pour titre _Nouveau profil : {ton prénom}_ .
- Bienvenue sur _Popcorn_ ! ✨ Tu recevras également un mail pour t'inviter sur le slack de _Popcorn_ si tu veux trouver ou transmettre des plans boulot, poser des questions ou faire des suggestions d'améliorations pour la plateforme.

Pour soumettre une suggestion, signaler un bug, demander de l'aide, tu peux aussi tout simplement [ouvrir une issue sur ce repo](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## FAQ

### Quelle est la différence avec des plateformes comme Malt ou Comet ?

- _Popcorn_ est une association à but lucratif et pas une entreprise
- _Popcorn_ est développé et maintenu par les développeurs freelances.
- _Popcorn_ est réservé aux **développeur·e·s de la région nantaise**.
- _Popcorn_ n'est **pas** un intermédiaire ou une entreprise: le ou la client(e) entre directement en contact avec le ou la freelance. _Popcorn_ ne joue aucun rôle dans les échanges qui suivent ensuite entre les deux parties.

## Documentation technique

Il s'agit d'une site généré statiquement avec [Nuxt](https://github.com/nuxt). Le répertoire `content` contient les fichiers markdown qui servent à produire les profils et les contenus du site. Ils sont transformés en fichiers JSON dans le dossier `/static/api/` via la commande `npm run cc`. Ce sont ces fichiers JSON qui sont ensuite consommés par les composants Vue.js, via un simple import webpack.

## Pourquoi un site statique ("_serverless_") ?

L'idée expérimentée par _Popcorn_ est d'avoir un site aussi léger techniquement que possible, sans serveur et base de données, afin qu'il ne requiert quasiment aucune maintenance et intervention de notre part, parce que :

- On est déjà tous "sous l'eau", ce site ne doit pas être une charge de travail supplémentaire.
- On ne veut pas que le site reste 48 heures en rade parce qu'il ya un truc qui déconne et que tout le monde est trop occupé pour intervenir dessus.
- On ne veut pas qu'au fil du temps une personne devienne "responsable" du site, qu'elle soit la seule à piger comment tout fonctionne et qu'elle parte à Barcelone ou quitte _Popcorn_ en laissant aux autres un truc compliqué qu'ils et elles ne maitrisent pas
- On veut bien être hébergé pour 0 euros chez Github ^^
- On veut bien un site qui soit capable de supporter un fort pic de charge sans broncher : évitons le cas du site qui tombe pile au moment où un article de presse le mentionne 😅
- On veut bien un moteur de recherche super-rapide et un site qui s'affiche super vite
- On veut bien que des gens puissent tout simplement forker ce dépôt pour créer leur propre annuaire 💚

## Installation

cloner ce dépôt puis

```sh
npm install
```

démarrer le serveur de dev

```sh
npm run dev
```

Parser les markdowns du dossier `content` en fichiers JSON.

```sh
npm run cc
```

### Déployer

```sh
./deploy.sh
```
