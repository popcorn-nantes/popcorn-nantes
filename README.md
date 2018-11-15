# POPCORN

_Popcorn_ est une plateforme avec (vraiment) 0% de commission et sans intermédiaire pour que les **développeur·e·s freelance de Nantes** et alentours trouvent plus facilement du travail et des client·e·s : https://popcorn-nantes.github.io/.

Les avantages de _PopCorn_ pour les freelances :

- 💰 _Popcorn_ est une association à **but non-lucratif**, avec 0% de commission sur les affaires apportées par ce canal. C'est plus d'argent pour le freelance et le ou la client(e). Le gain pour nous c'est les affaires apportées par le site.
- 🔍 Une recherche très simple et rapide qui permet aux client(e)s de te trouver aussi bien par domaine métier ( applications, boutique en ligne, jeux vidéo etc ) que par technologie (JavaSCript, Wordpress etc)
- 💬 Un tchat qui permet d'échanger entre nous les plans boulots
- 📖 Le code est transparent, et donc l'ordre dans lequel sont affichés les profils aussi ( à ce jour, les profils sont affichés dans un ordre purement aléatoire sur le site )

## Quelle est la différence avec Malt ou Comet ?

- _Popcorn_ est une association et pas une start-up et ne prend pas de commission.
- _Popcorn_ est réservé aux **développeur·e·s** de _Nantes_ et alentours.
- _Popcorn_ n'est **pas** un intermédiaire ou une marque : le ou la client(e) rentre directement en contact avec le ou la freelance et _Popcorn_ n'a aucune responsabilité ni ne joue aucun rôle dans les échanges qui suivent entre les deux parties.
- Le code de la plateforme est open-source

## Créer son profil

- Forke ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour l'url de ton profil.
- Ajoute ta photo dans le dossier `/static/images` : **la photo doit faire 100ko maximum ⚠️**
- Fait une _pull request_ avec pour titre _Nouvelle personne : {votre prénom}_
- Bienvenue sur _Popcorn_ ! ✨ Tu recevras un mail à l'adresse indiquée pour t'inviter sur le slack de _Popcorn_ si tu as des questions ou envie d'échanger sur le projet.

Besoin d'aide, une question, un bug ? tu peux [ouvrir une issue](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## Documentation technique

Il s'agit d'une site généré statiquement avec Nuxt. Le répertoire `content` contient les fichiers markdown qui servent à produire les profils et les contenus du site. Ils sont transformés en fichiers JSON dans le dossier `/static/api/` via la commande `npm run cc`.

### Pourquoi un site statique ?

L'idée expérimentée par _Popcorn_ est d'avoir un site aussi léger techniquement, sans serveur afin qu'il ne requiert quasiment aucune maintenance et intervention de notre part, parce que :

- On est déjà toutes et tous "sous l'eau", ce site ne doit pas être une charge de travail supplémentaire...
- On ne veut pas que le site reste 48 heures en rade parce qu'il ya un truc qui déconne et que tout le monde est trop occupé pour intervenir dessus
- On ne veut pas qu'au fil du temps une personne devienne "responsable" du site, qu'elle soit la seule à piger comment tout fonctionne et qu'elle parte à Barcelone ou quitte _Popcorn_ en laissant aux autres un truc qu'ils et elles ne maitrisent pas
- On veut bien être hébergé pour 0 euros chez Github ^^
- On veut bien un site qui soit capable de supporter un fort pic de charge sans broncher : évitons le cas du site qui tombe pile au moment où un article de presse le mentionne 😅
- On veut bien un moteur de recherche super-rapide et un site qui s'affiche super vite
- On veut bien que des gens puissent tout simplement forker ce dépôt pour créer leur propre annuaire

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

### déployer

```sh
./deploy.sh
```
