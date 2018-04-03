$('#sesion').on('click', function(event) {

alert('click')
    // autenticando al usuario con google
    var provider = new firebase.auth.GoogleAuthProvider();
    $('#button-google').on('click', function() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      });
    });
    // realizando acciones cuando el usuario este autenticado
    firebase.auth().onAuthStateChanged(function(user) {
      // si el usuario esta activo
      if (user) {
        document.getElementById('test4');
        console.log(user);
      } else {
        console.log('usuario no logeado');
      }
    });
});
