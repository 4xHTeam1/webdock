<template>
<div id="menu" class="col-md-3 col-lg-2 d-md-block  sidebar">
  <div class="row">
    <nav id="sidebar">
      <div class="position-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <p class="nav-link active">
              Users
            </p>
          </li>
          <li class="nav-item">
            <p class="nav-link">
              Nye Opslag
            </p>
          </li>
          <li class="nav-item">
            <p class="nav-link">
              Gemte Opslag
            </p>
          </li>
          <li class="nav-item">
            <p class="nav-link">
              Slettede Opslag
            </p>
          </li>
          <li class="nav-item">
            <p class="nav-link">
              Opslag til Trello
            </p>
          </li>
          <li class="nav-item">
            <p class="nav-link">
              IDK Yet
            </p>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
</template>

<script>
// Hent alle menu-links
var navLinks = document.querySelectorAll('.nav-link');

// Tilføj en klikhåndtering til hver link
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    // Fjern .active fra alle links
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    // Tilføj .active til det klikkede link
    this.classList.add('active');
  });
});
</script>

<style>
body {
    background-image: url("../Assets/webdock-baggrund.jpg");
    background-size: cover; /* Justerer størrelsen af baggrundsbilledet */
    background-repeat: no-repeat;
  }
 .nav-item{
  margin-top: 3px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid #fcfcfc;
  width: 180px;
  z-index: 10;
  
 }
 
.nav-item:hover{
  background-color:  #0E6666;
  
}
.nav-link{
  color: azure;
  height: 20px;
  text-align:left;
  cursor: pointer;
  justify-content: center;
}
.nav-link:hover{
  color: #fcfcfc;
}
 

</style>