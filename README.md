# POPCORN

## Créer son profil

- Forke ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour l'url de ton profil.
- Ajoute ta photo dans le dossier `/static/images` : ** ⚠️ la photo doit faire 100ko maximum ⚠️ **
- Faire une _pull request_ avec pour titre "Nouvelle personne : {votre prénom}"
- Bienvenue sur POPCORN ! ✨ Tu recevras un mail à l'adresse indiquée pour t'inviter sur le slack de PopCorn, qui et là en cas de question, de suggestion ou si tu as besoin d'aide sur quelque chose concernant ta fiche.

Besoin d'aide, une question ? tu peux [ouvrir une issue](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## Documentation technique

Il s'agit d'une site généré statiquement avec Nuxt. Le répertoire `content` contient les fichiers markdown qui servent à produire les profils et les contenus du site. Ils sont transformés en fichiers JSON dans le dossier `/static/api/`, en utilisant la commande `npm run cc`.

## installation

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
