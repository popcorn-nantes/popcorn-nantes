# POPCORN

## Inscription

- Forker ce dépôt
- Installer le projet en local ( instructions ci-dessous)
- Ajouter sa fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`
- Ajouter sa photo dans le dossier `/static/images` : **la photo doit faire 100ko maximum.**
- Vérifier que ça fonctionne en local en utilisant la commande `npm run cc` pour compiler le nouveau fichier markdown. La nouvelle fiche doit être visible sur la page d'accueil en lançant le site avec `npm run dev`
- Faire une _pull request_ avec pour titre "Nouvelle personne : {votre prénom}"
- Bienvenue sur POPCORN ! ✨ Tu recevras un mail à l'adresse indiquée pour t'inviter sur le slack de PopCorn, qui et là en cas de question, de suggestion ou si tu as besoin d'aide sur quelque chose concernant ta fiche. 

## Doc technique

## installation

cloner ce dépôt puis

```sh
npm install
```

démarrer le serveur de dev

```sh
npm run dev
```

Parser les markdowns du dossier `content` en JSON :

```sh
npm run cc
```

## déployer

```sh
./deploy.sh
```
