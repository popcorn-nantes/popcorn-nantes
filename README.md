# POPCORN

## Créer son profil

- Forke ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour l'url de ton profil.
- Ajoute ta photo dans le dossier `/static/images` : **la photo doit faire 100ko maximum ⚠️**
- Faire une _pull request_ avec pour titre _Nouvelle personne : {votre prénom}_
- Bienvenue sur PopCorn ! ✨ Tu recevras un mail à l'adresse indiquée pour t'inviter sur le slack de PopCorn si tu as des questions ou envie d'échanger sur le projet.

Besoin d'aide, une question ? tu peux [ouvrir une issue](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## Documentation technique

Il s'agit d'une site généré statiquement avec Nuxt. Le répertoire `content` contient les fichiers markdown qui servent à produire les profils et les contenus du site. Ils sont transformés en fichiers JSON dans le dossier `/static/api/` via la commande `npm run cc`.

### Pourquoi un site statique ?

L'idée expérimentée par PopCorn est d'avoir un site aussi léger techniquement, sans serveur, qui ne requiert quasiment aucune maintenance et intervention de notre part, parce que :

- On est déjà toutes et tous très occupées, ce site ne doit pas être une charge travail supplémentaire
- On ne veut pas que le site reste 48 heures en rade parce qu'il ya un truc qui déconne et que tout le monde est trop "sous-l'eau" pour intervenir dssus.
- On ne veut pas avoir à consulter les logs serveurs pour savoir pourquoi le site est tombé subitement ce matin à 10h
- On ne veut pas qu'au fil du temps une personne devienne "responsable" du site, qu'elle soit la seule à piger comment tout fonctionne et qu'elle parte en vacances ou quitte PopCorn en laissant aux autres un truc qu'ils ne maitrisent pas.
- On veut bien être hébergé pour 0 euros chez Github ^^
- On veut bien un site qui soit capable de supporter un fort pic de charge sans broncher : évitons le cas du site qui tombe pile au moment où il a du succès ou qu'un article de presse le mentionne.
- On veut bien un moteur de recherche super-rapide et un site qui s'affiche super vite

### Installation

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

## déployer

```sh
./deploy.sh
```
