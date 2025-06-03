// JavaScript
let check1 ;
let check2 ;
let check3 ;
let table ;
let etat;

if(localStorage.info != null){
     table = JSON.parse(localStorage.info)
}
else{
    table = [];
}

// check if password field and confirm_password field are matching
function checkPass(){
    let mot1 = document.getElementById("pwd1").value;
    let mot2 = document.getElementById("pwd2").value;
    let phrase = document.getElementById('valid1');

    if (mot1.length > 0) {
        if (mot1 != mot2) {
            phrase.classList.remove('hide');
            phrase.innerText = '✘ Les mots de passe doivent être identiques';
            check1 = 0;
        } else {
            phrase.classList.add('hide');
            phrase.innerText = '✓ Les mots de passe sont identiques';
            check1 = 1;
        }
    }
    else{
        phrase.classList.remove('hide');
        phrase.innerText = '✘ Les mots de passe doivent être identiques';
        check1 = 0;
    }
}

// check if password is valid
function passLength(){
    let pass = document.getElementById('pwd1').value;
    let phrase = document.getElementById('valid2');

    if(pass.length < 8){
        phrase.classList.remove('hide');
        phrase.innerText = '✘ Le mot de passe doit contenir au moins 8 caractères';
        check2 = 0;
    }
    else {
        phrase.classList.add('hide');
        phrase.innerText = '✓ Le mot de passe contient au moins 8 caractères';
        check2 = 1;
    }
}

// check if email is valid
function EmailForm(){
    let email = document.getElementById('email').value;
    let phrase = document.getElementById('valid3');
    
    if(!email.match(/^[a-z]+[0-9]*[@][a-z]+[.][a-z]{2,3}$/)){
        phrase.classList.remove('hide');
        phrase.innerText = '✘ Email invalide';
        check3 = 0;
    }
    else{
        phrase.classList.add('hide');
        phrase.innerText = '✓ Email valide';
        check3 = 1;
    }
}

// check if all information are valid
function checkInfo(){
    let form = document.getElementById('form');
    form.addEventListener('submit',(event) => {
        if(check1 === 0 || check2 === 0 || check3 === 0){
        event.preventDefault();
        }
    });
    if(check1 === 1 && check2 === 1 && check3 === 1){
        saveData();
    }
}

//save data in local storage
function saveData(){
    let adress = document.getElementById("email").value;
    let motPass = document.getElementById("pwd1").value; 
    let form = document.getElementById('form');
    let pg = document.getElementById('pg');
    let info = {
        email : adress,
        password : motPass,
    };
    if(table.length > 0){
        for(let i=0 ; i<table.length; i++){
            if(info.email === table[i].email){
                etat = 1;
                break;
            }
            else{
                etat = 0;
            }
       }
       if(etat == 0){
        table.push(info);
        localStorage.setItem('info',JSON.stringify(table));
       }
    }
    else{
        table.push(info);
        localStorage.setItem('info',JSON.stringify(table));
    }
        form.addEventListener('submit',(event) => {
            if(etat == 1){
            pg.style.display = 'block';    
            pg.innerText = `✘ Email déja existe ! S'il vous plait utilisez un autre email `;
            event.preventDefault();
            }
        });
    
}

//check Data's user
function dataUser(){
    let adress = document.getElementById("self1").value;
    let motPass = document.getElementById("self2").value; 
    table = JSON.parse(localStorage.info);
    for(let i=0 ; i<table.length; i++){
         if(adress === table[i].email && motPass === table[i].password){
             return 1;
         }
    }
    return 0;
}

// checkdata in login form
let d = 0;
function checkData(){
    let form = document.getElementById('num1');
    let p = document.getElementById('para');
    let adress = document.getElementById("self1");
    let motPass = document.getElementById("self2"); 
    if(adress.value.length > 0 && motPass.value.length > 0){
        form.addEventListener('submit', (e)=> {
            let cas = dataUser();
            if(cas === 0){
                p.style.display = 'block';
                p.innerText = `Email or password invalid ! Please try again . `;
                adress.classList.add('error');
                d++;
                e.preventDefault();
             }
        });
    }
}

// Masquer le message d'erreur lorsqu'on remplit les champs
function hideError(){
    let input = document.getElementById('para');
    if(d > 0){
        input.style.display = 'none';
    }
}

// click on annuler botton
function annuler(){
    let pg = document.getElementById('pg');
    let email = document.getElementById("email");
    let motPass = document.getElementById("pwd1");
    let motPass_confirm = document.getElementById("pwd2");
    pg.style.display = 'none';
    email.value = "";
    motPass.value = "";
    motPass_confirm.value = "";
    checkPass();
    EmailForm();
    passLength();
}

// Se deconnecter function
function logOut(){
    location.replace('Login_page.html');
}

// validation des informations personneles d'étudiant
function validInfo(){
    let nom = document.getElementById('n1').value;
    let prenom = document.getElementById('n2').value;
    let cne = document.getElementById('n3').value;
    let a = 0;
    if(nom.match(/^[a-z A-Z]{1,}$/) && prenom.match(/^[a-z A-Z]{1,}$/) && cne.match(/^[A-Z][0-9]{9}$/)){
         a++;
    }
    return a;
}

// validation des notes 
function checkNote(){
    let notes = [];
    let index = 0;
    for(let i=1;i<=9;i++){
        notes[i]=document.getElementById('note'+i).value;
        if(notes[i]>20 || notes[i]<0 || notes[i].length == 0){
            index++;
        }
    }
    return index;
}

// Enregistrer les données du bulletin
function save_bul(){
    let nom = document.getElementById('n1').value;
    let prenom = document.getElementById('n2').value;
    let code_massar = document.getElementById('n3').value;
    let notes = [];
    for(let i=0;i<9;i++){
        notes[i]=document.getElementById('note'+(i+1)).value;
    }
    let Données = {
        Full_name : `${prenom} ${nom}`,
        code : code_massar,
        elements : notes,
    };
    localStorage.setItem('Données',JSON.stringify(Données));
}

// click event after validation
function ClickEvent(){
    let btn = document.getElementById('btn');
    btn.addEventListener('click', (e)=> {
    let remarque1=document.getElementById('inv_note');
    let remarque2=document.getElementById('inv_info');
    let index = checkNote();
    let a = validInfo();
    if(a==0){
        remarque2.style.display = 'block';
        remarque2.innerHTML = 'Vous devez remplir tous les champs !<br>Tous les informations doit etre correctes !';
        e.preventDefault();
    }
    else if(index > 0){
        remarque1.style.display = 'block';
        remarque1.innerHTML = 'Vous devez saisir tous les notes !<br>Chaque note doit etre compris entre 0 et 20 !';
        e.preventDefault();
    }
    else{
        remarque1.style.display = 'none';
        remarque2.style.display = 'none';
        save_bul();
    }
    });
}

// auto focus
function focusInput(i){
    let note1 = document.getElementById(`note${i}`);
    let note2 = document.getElementById(`note${i+1}`);
        if(note1.value.length == 2){
            note2.focus();    
         }
}

// affichage du bulletin
function aff_bul(){
    let donnée = JSON.parse(localStorage.Données);
    let name_complet = document.getElementById('name');
    let cne = document.getElementById('cm');
    let moyenne = document.getElementById('moy_gen');
    let matieres = [];
    let modules = [];
    let res1,res2,res3,res4,global_result;
    for(let i=0;i<9;i++){
        matieres[i] = document.getElementById('matiere'+(i+1));
        matieres[i].innerHTML = donnée.elements[i];
    }
    name_complet.innerHTML += donnée.Full_name;
    cne.innerHTML += donnée.code;
    for(let j=0;j<4;j++){
        modules[j] = document.getElementById('module'+(j+1));
    }
    modules[0].innerHTML = ((donnée.elements[0]*0.4)+(donnée.elements[1]*0.6)).toFixed(2);
    modules[1].innerHTML = ((donnée.elements[2]*0.6)+(donnée.elements[3]*0.4)).toFixed(2);
    modules[2].innerHTML = ((donnée.elements[4]*0.6)+(donnée.elements[5]*0.4)).toFixed(2);
    modules[3].innerHTML = ((donnée.elements[6]*0.4)+(donnée.elements[7]*0.2)+(donnée.elements[8]*0.4)).toFixed(2);
    //Le calcul du moyenne generale :
    res1 = ((donnée.elements[0]*0.4)+(donnée.elements[1]*0.6)).toFixed(2);
    res2 = ((donnée.elements[2]*0.6)+(donnée.elements[3]*0.4)).toFixed(2);
    res3 = ((donnée.elements[4]*0.6)+(donnée.elements[5]*0.4)).toFixed(2);
    res4 = ((donnée.elements[6]*0.4)+(donnée.elements[7]*0.2)+(donnée.elements[8]*0.4)).toFixed(2);
    global_result = (parseFloat(res1)+parseFloat(res2)+parseFloat(res3)+parseFloat(res4))/4;
    moyenne.innerHTML = global_result.toFixed(2);
}

// Fonction pour générer un fichier PDF à partir d'un bulletin
function generatePDF() {
    const element = document.getElementById("bulletin");
    const opt = {
        margin:       0.5,
        filename:     'bulletin_notes.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
}