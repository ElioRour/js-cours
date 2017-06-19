//                                      INITIALISATION DES MODELES

var nbMorts = 0;
var Personnage = {
    // Initialise le personnage de base, quel qu'il soit.
    initPerso: function (nom, sante, force) {
        this.nom = nom;
        this.sante = sante;
        this.force = force;
        this.alive = true;
    },
    attaquer: function (cible) {
        if (this.sante > 0) {
            if (cible.alive) {
                var degats = this.force;
                console.log(this.nom + " attaque " + cible.nom + " et lui fait " + degats + " points de dégats.");
                cible.sante = cible.sante - degats;
                if (cible.sante > 0) {
                    console.log(cible.nom + " a encore " + cible.sante + " points de vie.")
                } else {
                    cible.sante = 0;
                    console.log(cible.nom + " est mort !");
                    cible.alive = false;
                    nbMorts ++;
                }
                return true;
            } else {
                console.log(this.nom + " ne peut pas attaquer " + cible.nom + ", " + cible.nom + " est déja mort...");
                return false;
            }
        } else {
            console.log(this.nom + " ne peut pas attaquer, il est mort....");
            return false;
        }
    }
};
var Joueur = Object.create(Personnage); // Initialise le joueur sur base du personnage.
Joueur.initJoueur = function (nom, sante, force) {
    this.initPerso(nom, sante, force);
    this.xp = 0;
};
Joueur.decrire = function () {
    var description = this.nom + " a " + this.sante + " points de vie, " +

        this.force + " en force et " + this.xp + " points d'expérience";

    return description;
};
Joueur.combattre = function (adversaire) {
    if (this.attaquer(adversaire)) {
        if (!adversaire.alive) {
            console.log(this.nom + " a tué " + adversaire.nom + " et gagne " + adversaire.valeur + " points d'xp.");
            this.xp += adversaire.valeur;
        }
    }
}
var Adversaire = Object.create(Personnage);
Adversaire.initAdversaire = function (nom, sante, force, race, valeur) {
    this.initPerso(nom, sante, force);
    this.race = race;
    this.valeur = valeur;
};

//                                  LANCE LE JEU ET CREE LES PERSONNAGES


var joueur1 = Object.create(Joueur);
joueur1.initJoueur("Jean Luc Mélenchon", 150, 50);

var joueur2 = Object.create(Joueur);
joueur2.initJoueur("Emmanuel Macron", 150, 25);

var joueur3 = Object.create(Joueur); // Hamon
joueur3.initJoueur("Benoît Hamon", 150, 25);

console.log("Bienvenue dans cette campagne présidentielle, voici nos candidats :")
console.log(joueur1.decrire());
console.log(joueur2.decrire());
console.log(joueur3.decrire());

var adversaire1 = Object.create(Adversaire);
adversaire1.initAdversaire("Marine Le Pen", 150, 25, "connasse", 5);
var adversaire2 = Object.create(Adversaire);
adversaire2.initAdversaire("Nicolas Dupont Aignant", 150, 25, "lache", 5);

console.log("Oh non, un(e) candidat(e) d'extrême droite apparait ! Il s'agit de " + adversaire1.nom + ", une " + adversaire1.race + " !");

//                                          COMBAT

joueur1.combattre(adversaire1);
joueur1.combattre(adversaire1);
adversaire1.attaquer(joueur2);
joueur2.combattre(adversaire1);
joueur2.combattre(adversaire1);
console.log(joueur1.decrire());
console.log(joueur2.decrire());
console.log(joueur3.decrire());
console.log("Ce combat a fait " + nbMorts + " mort(s).");
joueur1.combattre(adversaire1);
joueur2.combattre(adversaire1);
joueur3.combattre(adversaire1);
joueur1.combattre(adversaire1);
joueur3.combattre(adversaire1);