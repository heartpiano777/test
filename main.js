window.onload = function(){
    smoothScroll();

    const year = new Date().getFullYear();
    console.log(year);
    const month = new Date().getMonth();
    console.log(month + 1);
    const day = new Date().getDate();
    console.log(day);
    Todayp.innerHTML = '<ul id="nav-menu"><li class="nav-menu-items"><a href="#' + new Date(year, month, day-1) + '">Today</a></li></ul>';

    tate.style.visibility = "hidden";
    calendar.style.visibility = "hidden";
    Todayp.style.visibility = "hidden";
}

const smoothScroll = () => {
    const smooth = 10;
    const warukazu = 8;
    const hanni = (warukazu / 2) + 1;
    const links = document.querySelectorAll('a[href^="#"]');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
            
            e.preventDefault();
            let moveY;
            let currentY = window.pageYOffset;
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            const position = target.getBoundingClientRect();
            const targetY = position.top + currentY;

            (scroll = () => {
                moveY = currentY + Math.round((targetY - currentY) / warukazu);
                window.scrollTo(0, moveY);
                currentY = moveY;
                
                if (document.body.clientHeight - window.innerHeight < moveY) {
                    window.scrollTo(0, document.body.clientHeight);
                    return;
                }
                if (moveY >= targetY + hanni || moveY <= targetY - hanni) {
                    window.setTimeout(scroll, smooth);
                }else{
                    window.scrollTo(0, targetY);
                }

            })();
        });
    }

}



const reset = document.querySelector("#reset");
    reset.addEventListener("click", function(){
        localStorage.clear();
    });

const sakujo = document.querySelector("#sakujo");
    sakujo.addEventListener("click", function(){
        const sakujosuru = document.getElementById("hyouiti");
        sakujosuru.remove();
        document.getElementById("calendar").insertAdjacentHTML('afterend', '<div id = "hyouiti">');
        jikkoukaisuu = 0;
        hikisuu = 0;
        tate.style.visibility = "hidden";
        calendar.style.visibility = "hidden";
        Todayp.style.visibility = "hidden";
 });

let Today;
const Todayp = document.querySelector("#Today");

let jikkoukaisuu = 0;
console.log(jikkoukaisuu);
let hyou_shurui = 1;

const tate = document.querySelector("#tate");
    tate.addEventListener("click", function(){
        hyou_shurui = 1;
        if(jikkoukaisuu == 1){
            const sakujosuru = document.getElementById("hyouiti");
            sakujosuru.remove();
            document.getElementById("calendar").insertAdjacentHTML('afterend', '<div id = "hyouiti">');
            hyousakusei();
        }
 });

 const calendar = document.querySelector("#calendar");
    calendar.addEventListener("click", function(){
        hyou_shurui = 2;
        if(jikkoukaisuu == 1){
            const sakujosuru = document.getElementById("hyouiti");
            sakujosuru.remove();
            document.getElementById("calendar").insertAdjacentHTML('afterend', '<div id = "hyouiti">');
            hyousakusei();
        }
});

let begin;
let days;
let subjects;
let subjects2;
let hiduke;
let newpnumber = 0;
let hikisuu = 0;

function hyousakusei(){
    const hyouiti = document.getElementById('hyouiti');
            let newelement = 0;
            let elementnumber = 0;
            let elementid = 0;
            let gyousuu = 0;
            let placenumber = -1;
            let subject = 0;
            let subjectnumber = 0;
            let hyou_hiduke = begin;
            let i;
            
            if(hyou_shurui == 1){
                for (i = 0; i < days; i++) {
                hyouiti.insertAdjacentHTML('beforeend', '<div id = "newdiv">');
                    newelement = document.getElementById("newdiv");
                    //挿入したdivを取得
                    elementnumber += 1;
                    //○○個目のdiv
                    elementid = ("newdivid" + elementnumber);
                    //付与するidの決定
                    newelement.id = elementid;
                    //新しいdivにidを付与
                    document.getElementById(elementid).classList.add("hyou");
                    //新しいdivにclassを付与
                    elementid = document.getElementById(elementid);
        
                    //日付の追加
                    elementid.insertAdjacentHTML('afterbegin', '<p id = "hiduke">');
                    //新しいdivの中にpを追加
                    newelement = document.getElementById("hiduke");
                    elementid = ("hiduke" + elementnumber);
                    newelement.id = elementid;
                    
                    newelement.innerHTML = (hyou_hiduke.getFullYear()+ "年" + (hyou_hiduke.getMonth() + 1) + "月" + hyou_hiduke.getDate() + "日");
                    
                    
                    document.getElementById(elementid).classList.add("hiduke");
                    if(hyou_hiduke.getDay() == 0){
                        document.getElementById(elementid).classList.add("Sunday");
                    }
                    if(hyou_hiduke.getDay() == 6){
                        document.getElementById(elementid).classList.add("Saturday");
                    }
                    newelement.insertAdjacentHTML('afterend', '<hr id="' + hyou_hiduke + '">');
                    hyou_hiduke.setDate(hyou_hiduke.getDate() + 1);
                    
                    //科目の文字の追加
                    
                    for (let j = 0; j < 2; j++){
                    hikisuu += 1;
                    document.getElementById("newdivid" + elementnumber).insertAdjacentHTML('beforeend', '<button id = "newp">');
                    newelement = document.getElementById("newp");
                    newpnumber += 1;
                    elementid = ("newp" + newpnumber);
                    newelement.id = elementid;
                    placenumber += 1;
                    subjectnumber = subjects2[placenumber];
                    subject = subjects[subjectnumber];
                    newelement.innerHTML = subject;
                    newelement.value = subject;
                        

                    document.getElementById(elementid).classList.add("nakami");
                    if(subject == "国語"){
                        document.getElementById(elementid).classList.add("Japanese");
                    }
                    if(subject == "数学"){
                        document.getElementById(elementid).classList.add("Math");
                    }
                    if(subject == "理科"){
                        document.getElementById(elementid).classList.add("Science");
                    }
                    if(subject == "社会"){
                        document.getElementById(elementid).classList.add("Social_studies");
                    }
                    if(subject == "英語"){
                        document.getElementById(elementid).classList.add("English");
                    }
                    }
                }
                begin.setDate(begin.getDate() - days);
            }else if(hyou_shurui = 2){
                if(!(hyou_hiduke.getDay() == 0)){
                    hyouiti.insertAdjacentHTML('beforeend', '<div id = "gyoudiv">');
                    newelement = document.getElementById("gyoudiv");
                    gyousuu += 1;
                    elementid = ("gyoudivid" + gyousuu);
                    newelement.id = elementid;
                    document.getElementById(elementid).classList.add("retu");
                    for (i = 0; i < (7 - (6 - hyou_hiduke.getDay() + 1)); i++){
                        document.getElementById("gyoudivid" + gyousuu).insertAdjacentHTML('beforeend', '<div id = "newdiv">');
                        newelement = document.getElementById("newdiv");
                        elementnumber += 1;
                        elementid = ("newdivid" + elementnumber);
                        newelement.id = elementid;
                        document.getElementById(elementid).classList.add("hyou2");
                    }
                }
                for (i = 0; i < days; i++) {
                    if(hyou_hiduke.getDay()==0){
                        hyouiti.insertAdjacentHTML('beforeend', '<div id = "gyoudiv">');
                        newelement = document.getElementById("gyoudiv");
                        gyousuu += 1;
                        elementid = ("gyoudivid" + gyousuu);
                        newelement.id = elementid;
                        document.getElementById(elementid).classList.add("retu");
                    }

                    document.getElementById("gyoudivid" + gyousuu).insertAdjacentHTML('beforeend', '<div id = "newdiv">');
                    newelement = document.getElementById("newdiv");
                    elementnumber += 1;
                    elementid = ("newdivid" + elementnumber);
                    newelement.id = elementid;
                    document.getElementById(elementid).classList.add("hyou2");
                    elementid = document.getElementById(elementid);
        
                    //日付の追加
                    elementid.insertAdjacentHTML('afterbegin', '<p id = "hiduke">');
                    newelement = document.getElementById("hiduke");
                    elementid = ("hiduke" + elementnumber);
                    newelement.id = elementid;
                    newelement.innerHTML = (hyou_hiduke.getFullYear()+ "年" + (hyou_hiduke.getMonth() + 1) + "月" + hyou_hiduke.getDate() + "日");
                    
                    document.getElementById(elementid).classList.add("hiduke");
                    if(hyou_hiduke.getDay() == 0){
                        document.getElementById(elementid).classList.add("Sunday");
                    }
                    if(hyou_hiduke.getDay() == 6){
                        document.getElementById(elementid).classList.add("Saturday");
                    }
                    
                    hyou_hiduke.setDate(hyou_hiduke.getDate() + 1);
                    document.getElementById(elementid).classList.add("hiduke2");

                    //科目の文字の追加
                    for (let j = 0; j < 2; j++){
                    document.getElementById("newdivid" + elementnumber).insertAdjacentHTML('beforeend', '<p id = "newp">');
                    newelement = document.getElementById("newp");
                    newpnumber += 1;
                    elementid = ("newp" + newpnumber);
                    newelement.id = elementid;
                    placenumber += 1;
                    subjectnumber = subjects2[placenumber];
                    subject = subjects[subjectnumber];
                    newelement.innerHTML = subject;
                    document.getElementById(elementid).classList.add("nakami2");
                    if(subject == "国語"){
                        document.getElementById(elementid).classList.add("Japanese");
                    }
                    if(subject == "数学"){
                        document.getElementById(elementid).classList.add("Math");
                    }
                    if(subject == "理科"){
                        document.getElementById(elementid).classList.add("Science");
                    }
                    if(subject == "社会"){
                        document.getElementById(elementid).classList.add("Social_studies");
                    }
                    if(subject == "英語"){
                        document.getElementById(elementid).classList.add("English");
                    }
                    }
                }
                hyou_hiduke.setDate(hyou_hiduke.getDate() - 1);
                if(!(hyou_hiduke.getDay() == 6)){
                    for (i = 0; i < (6 - hyou_hiduke.getDay()); i++){
                        document.getElementById("gyoudivid" + gyousuu).insertAdjacentHTML('beforeend', '<div id = "newdiv">');
                        newelement = document.getElementById("newdiv");
                        elementnumber += 1;
                        elementid = ("newdivid" + elementnumber);
                        newelement.id = elementid;
                        document.getElementById(elementid).classList.add("hyou2");
                        //elementid = document.getElementById(elementid);

                    }
                }
                begin.setDate(begin.getDate() - days  +1);
            }
            tate.style.visibility = "visible";
            calendar.style.visibility = "visible";
            Todayp.style.visibility = "visible";
}

const settei = document.querySelector("#btn");
    settei.addEventListener("click", function(){

        const hukugen = document.getElementById("hukugen");
        if(jikkoukaisuu == 0){
            if(hukugen.checked){
                subjects2 = JSON.parse(localStorage.getItem("subjects2"));
                subjects = JSON.parse(localStorage.getItem("subjects"));
                hiduke = JSON.parse(localStorage.getItem("hiduke"));
            if(subjects2 == null){
                alert("復元するものがありません。");
            }else{

                const year = hiduke[0];
                const month = hiduke[1];
                const day = hiduke[2];
                const year2 = hiduke[3];
                const month2 = hiduke[4];
                const day2 = hiduke[5];
                
        
                begin = new Date(year, month - 1, day);
                const finish = new Date(year2, month2 - 1, day2);
                const calc = finish.getTime() - begin.getTime();
                days = Math.floor(calc / (1000 * 60 * 60 * 24) + 1);

                hyousakusei();                      
            
                localStorage.setItem("subjects", JSON.stringify(subjects));
                localStorage.setItem("subjects2", JSON.stringify(subjects2));
                localStorage.setItem("hiduke", JSON.stringify(hiduke));
                jikkoukaisuu = 1;
            }
            }else{
            const elements = document.getElementsByName("subject");

            subjects = [];
                for (let i = 0; i < elements.length; i++){
                    if (elements[i].checked) {
                        let checkbox = (elements[i].value);
                        if (checkbox == 1){
                            subjects.push('国語');
                        }
                        if (checkbox == 2){
                            subjects.push('数学');
                        }
                        if (checkbox == 3){
                            subjects.push('理科');
                        }
                        if (checkbox == 4){
                            subjects.push('社会');
                        }
                        if (checkbox == 5){
                            subjects.push('英語');
                        }
                    }

                    
                
                }// チェックボックスからの取得
        
            const year = document.getElementById("year").value;
            const month = document.getElementById("month").value;
            const day = document.getElementById("day").value;
            const year2 = document.getElementById("year2").value;
            const month2 = document.getElementById("month2").value;
            const day2 = document.getElementById("day2").value;
            const hiduke = [];
            hiduke.push(year, month, day, year2, month2, day2);

                if(month=="-----" || day=="-----" || month2=="-----" || day2=="-----"){
                    alert("日付を選択してください。");
                }else{
                begin = new Date(year, month - 1, day);
                const finish = new Date(year2, month2 - 1, day2);
                const calc = finish.getTime() - begin.getTime();
                days = Math.floor(calc / (1000 * 60 * 60 * 24) + 1);
                //日数取得
                if(days<0){
                    alert("日付を選択しなおしてください。");
                }else{
                let random = 0;
                subjects2 = [];
                if (subjects.length == 0){
                    alert("科目を選んでください");
                }else{
                    for(i = 0; subjects2.length < (days*2); i++){ 
                        random = Math.floor(Math.random() * subjects.length);
                        //if(!random == subjects2[subjects2.length]){
                        subjects2.push(random);
                        //}
                    } //ランダム処理
                
                    hyousakusei();
                    
                    localStorage.setItem("subjects", JSON.stringify(subjects));
                    localStorage.setItem("subjects2", JSON.stringify(subjects2));
                    localStorage.setItem("hiduke", JSON.stringify(hiduke));
                    jikkoukaisuu = 1;
                }
                }
    
                }
            }
        }else{
            alert("リセットしてください。");
        }
    
});

let btnid;