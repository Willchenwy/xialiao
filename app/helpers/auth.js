import { ref, firebaseAuth, wilddogAuth } from 'config/constants'

export function authWithThirdParty (authType) {
  switch (authType) {
    case 'FACEBOOK_AUTH':
      return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
    case 'GOOGLE_AUTH':
    default:
      return firebaseAuth().signInWithPopup(new firebaseAuth.GoogleAuthProvider())
  }
}

export function authWithXialiao (email, password) {
  return wilddogAuth.signInWithEmailAndPassword(email, password)
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}

export function logout () {
  return wilddogAuth.signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

export function signUpUser (email, password, displayName) {
  return wilddogAuth.createUserWithEmailAndPassword(email, password)
    .then((currentUser) => currentUser.updateProfile({
      'displayName': displayName,
    }))
}
