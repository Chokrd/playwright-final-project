Feature: Parcours client complet sur SauceDemo

  Scenario: Achat réussi puis test de suppression et erreur serveur
    Given Je suis sur la page de connexion SauceDemo
    When Je me connecte avec "standard_user" et "secret_sauce"
    And J'effectue un premier achat de sac et de lampe
    And Je retourne au catalogue pour ajouter un "sauce-labs-bolt-t-shirt"
    And Je supprime le "sauce-labs-bolt-t-shirt" depuis le panier
    And Je simule une maintenance serveur
    And Je force le retour au catalogue
    Then Je devrais voir le message "Service Unavailable"