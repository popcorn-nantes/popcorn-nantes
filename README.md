# POPCORN 🍿

_Popcorn_ est une plateforme open source et (vraiment) sans frais ni commission qui aide les développeur-e-s freelance de Nantes à trouver des projets : [Voir le site](https://popcorn-nantes.github.io/)

Les objectifs de _Popcorn_ pour les développeurs freelances :

- 📈 Etre un canal pour trouver des affaires à Nantes sans commission ni intermédiaire
- 💪 Offrir une alternative open source, sans frais d'intermédiation et locale à aux _market places_ de freelances centralisées et rémunérées à la commission
- 💬 Faire circuler les tuyaux boulot entre freelances via le tchat.

## Créer son profil

- Fork ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour créer l'url de ton profil.
- Ajoute ta photo dans le dossier `/public/images` : **la photo doit faire 100ko maximum ⚠️**
- Fait une _pull request_ avec pour titre _Nouveau profil : {ton prénom}_ .
- Bienvenue sur _Popcorn_ ! ✨ Tu recevras également un mail pour t'inviter sur le tchat de _Popcorn_.

Pour soumettre une suggestion, signaler un bug, demander de l'aide, tu peux aussi tout simplement [ouvrir une issue sur ce repo](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## FAQ

### Quelle est la différence avec des plateformes comme Malt ou Comet ?

- _Popcorn_ est une [association à but non-lucratif](https://opencollective.com/popcorn) et ne prélève pas de commission.
- _Popcorn_ est réservé aux **développeur·e·s de la région nantaise**.
- _Popcorn_ est développé et maintenu par les développeur(e)s freelances eux-mêmes.
- _Popcorn_ n'est **pas** un intermédiaire ou une entreprise: les clients entrent directement en contact avec les freelances. _Popcorn_ ne joue aucun rôle dans les échanges qui suivent ensuite entre les deux parties.

## Pourquoi Popcorn ?

Il existe de plus en plus de plateformes ou _places de marché_ centralisées pour mettre en relation freelances et entreprises, moyennant une commission plus ou moins élevée pour apport d'affaire et mise en relation. Il y a aujourd'hui au moins une trentaine de plateformes qui se disputent ce marché, soutenues par d'importantes levée de fonds, dans un contexte de mutation profonde du monde du travail, avec une explosion du nombre de freelance et d'entrepreneurs.

Leur pari c'est d'avoir la plus grande part de marché possible dans ce secteur, voire d'obtenir un monopole national ou international à terme; comme ont su le faire d'autres plateformes dans d'autres secteurs, comme _booking_ pour la réservation d'hôtel, _blablacar_ pour le co-voiturage, _airbnb_ pour l'hébergment chez des particuliers etc

Popcorn se donne pour objectif de défendre dès à présent notre visibilité à **une échelle locale** (Nantes en l'occurence) sur ce marché des "places de marché de freelance" en proposant une alternative non-centralisée et open-source dédiée aux développeurs freelances.

Les développeurs freelance ont une place très spéciale dans cette équation des plateformes numériques puisque leurs profils sont très recherchés et qu'ils sont en mesure de développer eux-même leur plateforme. Bien sûr, nous ne pouvons pas rivaliser commercialement avec des entreprises qui lèvent des millions; néanmoins en restant concentrés sur le local, nous pouvons obtenir une très importante visibilité locale, qui est de grande valeur; notamment parce que nous sommes favorisés très fortement par la pénurie actuelle des développeurs par rapport aux très nombreux besoins numériques et logiciels des entreprises et collectives.

Plus qu'un simple annuaire, la réunion des développeurs freelances locaux autour de valeurs fortes et qui nous ressemblent (transparence, partage dans la gratuité) a fait rapidement émerger un véritable réseau qui renforce collectivement notre visibilité, nous permet de faire circuler des affaires rapidement entre nous voire de collaborer sur un même projet.

## Documentation technique

Il s'agit d'un site généré statiquement par notre [machine à Popcorn](https://github.com/popcorn-nantes/popcorn-machine) qui repose sur [Nuxt.js](https://nuxtjs.org/).

## Philosophie de Popcorn

Le mantra de Popcorn pourrait être:

> Dis moi ce dont tu as besoin, je te dirai comment t'en passer

Il s'agit de faire une seule chose mais très bien, et l'ADN du site c'est d'être _le plus simple et efficace possible_ : Son objectif est de permettre à son visiteur de trouver rapidement et facilement la personne qui correspond à son besoin puis de la contacter. La mise en contact effectuée est sa mesure de réussite.

Si une fonctionnalité n'est pas indispensable à cet objectif, c'est probablement qu'il faut l'enlever.

Popcorn n'est pas conçu pour "scaler" à l'infini mais pour fonctionner sans qu'aucune maintenance ne soit nécessaire et pour être dupliqué très facilement dans d'autres localités qui seraient intéressées par son principe. Il est conçu pour se concentrer sur **l'économie locale** et améliorer le maillage entre entreprises, start-ups, collectivités locales et les développeurs freelances locaux.

### Pourquoi un site statique et sans serveur ?

L'idée expérimentée par _Popcorn_ est d'avoir un site aussi léger techniquement que possible, sans serveur et base de données **afin qu'il ne requiert quasiment aucune maintenance et intervention de notre part ni aucun frais, parce que :**

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

Générer la version statique du site

```sh
npm run generate
```

### Déployer

1. merger la branche `master` dans la branche `published`
2. `git push`

Le déploiement du site est déclenché automatiquement par _Travis_ lors d'un _push_ sur la branche `published`. Il peut prendre quelques minutes avant d'être visible en production.
