/**
 * Returns a user-friendly error message based on the provided authentication error code.
 *
 * @param {string} errorCode - The authentication error code.
 * @return {string} A descriptive error message corresponding to the error code.
 * If the error code is not recognized a generic error message is returned.
 */
export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/credential-already-in-use': 'Cette adresse email est déjà utilisée',
    'auth/invalid-email': 'Adresse email invalide',
    'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
    'auth/network-request-failed': 'Problème de connexion réseau',
    'auth/user-not-found': 'Aucun compte avec cet email',
    'auth/wrong-password': 'Mot de passe incorrect',
    'auth/too-many-requests': 'Trop de tentatives, réessayez plus tard',
    'auth/weak-password': 'Mot de passe trop faible',
    'auth/popup-closed-by-user': 'Fenêtre de connexion fermée',
    'auth/operation-not-allowed': 'Opération non autorisée',
    'auth/account-exists-with-different-credential':
      'Un compte existe déjà avec une autre méthode de connexion',
    'auth/invalid-credential': 'Email ou mot de passe incorrect',
    'auth/user-disabled': 'Ce compte a été désactivé',
    'auth/requires-recent-login': 'Veuillez vous reconnecter',
    'auth/provider-already-linked': 'Ce fournisseur est déjà lié',
    'auth/invalid-verification-code': 'Code de vérification invalide',
    'auth/invalid-verification-id': 'Identifiant de vérification invalide',
    'auth/captcha-check-failed': 'Échec de la vérification captcha',
    'auth/failed-to-add-user': 'Impossible de créer le compte',
  }

  return errorMessages[errorCode] || "Une erreur inattendue s'est produite. Veuillez réessayer"
}
