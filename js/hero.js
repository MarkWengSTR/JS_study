class BaseCharactar {
  constructor (name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }
  attack (charactar, damage) {
    if (this.alive == false) {
      return;
    }
    charactar.getHurt(damage);
  }
  getHurt (damage) {
    if (this.hp <= 0) {
      this.die();
    }
    var _this = this;
    var i = 1;
    _this.id = setInterval(function(){
      if (i==1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = damage;
      }
      
      _this.element.getElementsByClassName("effect-image")[0].src = 'images/effect/blade/'+i+'.png';
        i++;

        if (i>8) {
          _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
          _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
          _this.element.getElementsByClassName("hurt-text")[0].textContent = "";
          clearInterval(_this.id);
        }
        
    },50);
    this.hp -= damage;

  }
  die () {
    this.alive = false;
  }
  updateHtml(hpElement, hurtElement) {
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 -this.hp / this.maxHp * 100) + "%";
  }

}

//招喚英雄
class Hero extends BaseCharactar {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("召喚英雄" + this.name + "!");
  }
  attack(charactar) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(charactar, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
  heroHeal(){
    document.getElementsByClassName("skill-block")[0].style.display = "none";
    var _this = this;
    var healcount = 1;
    _this.id = setInterval(function(){
      if (healcount == 1) {
        _this.element.getElementsByClassName("heal-effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("heal-text")[0].classList.add("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = "30"; 
      }
      _this.element.getElementsByClassName("heal-effect-image")[0].src = 'images/effect/heal/'+healcount+'.png';
      healcount++;
      
      if (healcount > 8) {
        _this.element.getElementsByClassName("heal-effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("heal-text")[0].classList.remove("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = "";
        clearInterval(_this.id); 
      }
    },50);

    this.hp += 30;
    if (this.hp >= this.maxHp) {
      this.hp = this.maxHp;
    }

    this.updateHtml(this.hpElement, this.hurtElement);

    setTimeout( function(){
        monster.element.classList.add("attacking");
        setTimeout(function(){
          monster.attack(hero);
          monster.element.classList.remove("attacking");
          endTurn();
          document.getElementsByClassName("skill-block")[0].style.display = "block";

        },500);
      },500 );

  }
}

//招喚怪獸
class Monster extends BaseCharactar {
  constructor(name, hp, ap) {
    super(name, hp, ap);
    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("有怪獸" + this.name + "!");
  }
  attack(charactar) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(charactar, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}

function addskillEvent() {
    var skill = document.getElementById("skill");
    skill.onclick = function() {
      heroAttack();
    }
    var heal = document.getElementById("heal");
    heal.onclick = function() {
      hero.heroHeal();
    }
    document.onkeydown = function(event) {
      var key = String.fromCharCode(event.keyCode);
      if (key == "A") {
        heroAttack();
      } else if (key == "D") {
        hero.heroHeal();
      }

    }

  }
addskillEvent();

var rounds = 10;
function endTurn(){
  rounds--;
  document.getElementById("round-num").textContent = rounds;
  if (rounds < 1){
    finish();
  }
}

function heroAttack() {
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  // Hero攻擊
  setTimeout( function(){
    hero.element.classList.add("attacking");
    setTimeout(function(){
      hero.attack(monster);
      hero.element.classList.remove("attacking");
    },500);
   },100 );
  
  //怪獸攻擊
  
  setTimeout( function(){
    if (monster.alive) {
      monster.element.classList.add("attacking");
      setTimeout(function(){
        monster.attack(hero);
        monster.element.classList.remove("attacking");
        endTurn();
        if (hero.alive == false) {
          finish();
        }else{
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      },500);
     } else {
        finish();
     }
    },1100 );
    
}



function finish() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "block";
  if (monster.alive == false ) {
    dialog.classList.add("win");
  } else {
    dialog.classList.add("lose");
  }
}

var hero = new Hero("Mark",130, 30);
var monster = new Monster("SSS",130,30);
