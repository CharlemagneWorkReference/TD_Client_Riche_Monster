/**
 * Created by cyprien on 09/02/16.
 */
var monster = {
    modules: {}
};

monster.modules.actions = (function () {
    var name, life, money, awake;
    return {
        showMe: function () {
            monster.modules.app.log("Nom : " + name + ". Vie : " + life + ". Argent : " + money + ". Réveillé : " + awake);
            alert('Nom: ' + name + ". Vie: " + life + ". Argent: " + money + ". Reveillé: " + awake);
            monster.modules.app.displayStatus(life,money,awake);
        },
        init: function (n, l, m, a) {
            name = n;
            life = l;
            money = m;
            awake = a;
            monster.modules.app.displayStatus(life,money,awake);
            monster.modules.app.log("Hello !");
            this.regular();
        },
        run : function(){
            if((life > 1) && awake){
                life--;
                monster.modules.app.log("Running");
                monster.modules.app.displayStatus(life,money,awake);
            }else if((life <= 1) && awake){
                this.die();
            }else if(!awake && life > 0){
                monster.modules.app.log("Is sleeping");
            }else{
                monster.modules.app.log("Is dead");
            }
        },
        fight : function(){
            if((life > 3) && awake){
                life -= 3;
                monster.modules.app.log("Fighting");
                monster.modules.app.displayStatus(life,money,awake);
            }else if((life <= 3) && awake){
                this.die();
            }else if(!awake && life > 0){
                monster.modules.app.log("Is sleeping");
            }else{
                monster.modules.app.log("Is dead");
            }
        },
        work : function () {
            if(life > 1 && awake){
                life--;
                money += 2;
                monster.modules.app.log("Working");
                monster.modules.app.displayStatus(life,money,awake);
            }else if(life <= 1 && awake){
                this.die();
            }else if(!awake && life > 0){
                monster.modules.app.log("Is sleeping");
            }else{
                monster.modules.app.log("Is dead");
            }
        },
        eat : function () {
            if(life >= 1 && awake && money >= 3){
                life += 2;
                money -= 3;
                monster.modules.app.log("Eating");
                monster.modules.app.displayStatus(life,money,awake);
            }else if(!awake && life > 0){
                monster.modules.app.log("Is sleeping");
            }else{
                monster.modules.app.log("Is dead");
            }
        },
        sleep : function () {
            if(life > 0 && awake){
                awake = false;
                monster.modules.app.log("Is sleeping");
                monster.modules.app.displayStatus(life,money,awake);
                setTimeout(function(){
                    awake = true;
                    monster.modules.app.log("Is awake");
                    monster.modules.app.displayStatus(life,money,awake);
                },10000);
            }else{
                monster.modules.app.log("Is dead");
            }
        },
        die : function(){
            if(life == 1){
                monster.modules.app.log("Is dead");
            }
            awake = false;
            money = 0;
            life = 0;
            monster.modules.app.displayStatus(life,money,awake);
        },
        regular : function(){
            setInterval(function(){
                life--;
                var action = getRandomIntInclusive(1,5);
                console.log("Random action : " + action);
                switch (action){
                    case 1:
                        monster.modules.actions.run();
                        break;
                    case 2:
                        monster.modules.actions.fight();
                        break;
                    case 3:
                        monster.modules.actions.work();
                        break;
                    case 4:
                        monster.modules.actions.sleep();
                        break;
                    case 5:
                        monster.modules.actions.eat();
                        break
                }
            },2000);
        }
    };
})();

monster.modules.app = (function () {
    var buttonRun;
    var buttonFight;
    var buttonWork;
    var buttonSleep;
    var buttonEat;
    var buttonShow;

    var buttonKill;
    var buttonNewLife;

    var logBox;

    var stats;

    return {
        run : function(){

            buttonRun = document.querySelector("#b2");
            buttonFight = document.querySelector("#b3");
            buttonWork = document.querySelector("#b7");
            buttonSleep = document.querySelector("#b4");
            buttonEat = document.querySelector("#b5");
            buttonShow = document.querySelector("#b6");

            buttonKill = document.querySelector("#k");
            buttonNewLife = document.querySelector("#b1");

            logBox = document.querySelector("#actionbox");
            stats = document.querySelector("#status");

            monster.modules.actions.init("Jean-Michel",10,20,true);
            buttonShow.onclick = function(){
                monster.modules.actions.showMe();
            };

            buttonRun.onclick = function(){
                monster.modules.actions.run();
            };

            buttonFight.onclick = function(){
                monster.modules.actions.fight();
            };

            buttonWork.onclick = function(){
                monster.modules.actions.work();
            };

            buttonEat.onclick = function(){
                monster.modules.actions.eat();
            };

            buttonSleep.onclick = function () {
                monster.modules.actions.sleep();
            };

            buttonKill.onclick = function(){
                monster.modules.actions.die();
            };

            buttonNewLife.onclick = function(){
                location.reload();
            };
        },
        log : function(text){
            var lastElem = logBox.getElementsByTagName("p")[0];
            var newElem = document.createElement("p");
            newElem.appendChild(document.createTextNode(text));
            logBox.insertBefore(newElem,lastElem);
        },
        displayStatus : function(life,money,awake) {
            var monster = document.getElementById("monster");

            if(life < 5){
                monster.style.backgroundColor = "red";
            }
            if(life >= 5 && life < 10){
                monster.style.backgroundColor = "orange";
            }
            if(life >= 10 && life < 15){
                monster.style.backgroundColor = "blue";
            }
            if(life >= 15 && life < 20){
                monster.style.backgroundColor = "green";
            }

            monster.style.borderStyle = "solid";
            monster.style.borderColor = "black";
            monster.style.borderWidth = money + "px";

            var statLife = stats.getElementsByTagName("li")[0];
            var newLife = document.createElement("li");
            newLife.appendChild(document.createTextNode("life:" + life));
            stats.replaceChild(newLife,statLife);

            var statMoney = stats.getElementsByTagName("li")[1];
            var newMoney = document.createElement("li");
            newMoney.appendChild(document.createTextNode("money:" + money));
            stats.replaceChild(newMoney,statMoney);

            var statAwake = stats.getElementsByTagName("li")[2];
            var newAwake = document.createElement("li");
            if(awake == true){
                newAwake.appendChild(document.createTextNode("awake:yes"))
            }else{
                newAwake.appendChild(document.createTextNode("awake:no"))
            }
            stats.replaceChild(newAwake,statAwake);
        }
    };
}) ();

window.onload = function(){
    monster.modules.app.run();
};

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}
