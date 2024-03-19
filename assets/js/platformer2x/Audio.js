//Audio when Goomba Dies
function playGoombaDeath() {
    const goombaDeathSound = document.getElementById("goomba-death");
    goombaDeathSound.play();
  }
  
  /*To Add Other Audio Functions:
    function soundFunction() {
      const soundVariable = document.getElementById("soundID");
      soundVariable.play();
    }
  */
  
  
  //Export Sound
  export default playGoombaDeath