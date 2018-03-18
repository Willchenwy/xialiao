import { ref, wilddogAuth } from 'config/constants'

export function signUpUser (email, password, displayName, photoURL) {
  return wilddogAuth.createUserWithEmailAndPassword(email, password)
    .then(currentUser => currentUser.updateProfile(
      {
        'displayName': displayName,
        'photoURL': photoURL,
        'email': email,
      }
    ))
}

export function loginUser (email, password) {
  return wilddogAuth.signInWithEmailAndPassword(email, password)
}

export function logoutUser () {
  return wilddogAuth.signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}
