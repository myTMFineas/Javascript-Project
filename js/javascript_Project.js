/*
 Hieronder vindt u een paar links dat ik het meest gebruikt heb
- https://stackoverflow.com/questions
- https://www.w3schools.com/
*/


// Dit is de array waarin alle errors worden gezet, 
let arrayErrors = [];


// Yikes errors, Goed gedaan, en de Betalingzwijze verbergen totdat iemand ze opgraagt
document.getElementById('idErrors').classList.add('hidden');
document.getElementById('idCorrect').classList.add('hidden');
document.getElementById("betalingswijze").classList.add("hidden");

// Het functie validataitieForm is de principale functie in het project.

document.getElementById('btnClick').addEventListener('click', ValidatieForm);

function ValidatieForm() {

        arrayErrors = [];



        // Nog is alles verbergen voor de zekerheid
        document.getElementById('idErrors').classList.add('hidden');
        document.getElementById('idCorrect').classList.add('hidden');
        document.getElementById("betalingswijze").classList.add("hidden");



        // De errors die de gebruiker ziet als hij niets invult
        checkEmptyField(document.forms["formID"]["achternaam"].value, "-Het veld achternaam is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["voornaam"].value, "-Het veld voornaam is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inlineFormInputGroupUsername2"].value, "-Het veld gebruikersnaam is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputAddress"].value, "-Het veld adres is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputZip"].value, "-Het veld postcode is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputPassword5"].value, "-Het veld wachtwoord is vereist!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputPassword6"].value, "-Het veld herhaal wachtwoord is vereist!" + "<br/>");



        // De 2 wachtwoorden vergelijken om te zien als ze overeen komen met elkaar
        controleWachtwoord(document.forms["formID"]["inputPassword5"].value);
        if (document.forms["formID"]["inputPassword5"].value != document.forms["formID"]["inputPassword6"].value) {
                arrayErrors.push("-De wachtwoorden komen niet overeen!" + "<br/>");
        }



        // validatieEmail aanroepen om de e-mail na te kijken als het voldoet, deze functie staat meer naar onder gedeclareerd
        validateEmail(document.forms["formID"]["inputEmail4"].value);



        // Controleren of dat de klant een betaalwijze aangeduid heeft
        let option = document.getElementsByName('yesno');
        if (!(option[0].checked || option[1].checked || option[2].checked || option[3].checked)) {
                arrayErrors.push("-Selecteer een betalingswijze!" + "<br/>");

        }


        // checkPC wordt aangeroepen, deze functie wordt vanonder gedeclareerd
        checkPC(document.forms["formID"]["inputZip"].value);



        // checken als de gebruiker akkoord is met de algemene voorwaarden
        if (document.getElementById('idakoord').checked == false) {
                arrayErrors.push("-Je moet akoord gaan met de algemeene voorwarden!" + "<br/>");
        }



        // errors displayen
        if (Array.isArray(arrayErrors) && arrayErrors.length) {


                document.getElementById("idErrors").classList.remove('hidden');
                // Eerst de kommas weg doen
                document.getElementById('errors').innerHTML = arrayErrors.join(" ");


                console.log(arrayErrors.length);

        } else {

                // Als er geen foutmeldingen zijn 
                document.getElementById("idCorrect").classList.remove("hidden");
                document.getElementById("betalingswijze").classList.remove("hidden");
                // Wanneer de gebruiker een betalingswijze kiest.

                document.getElementById("idInfo").innerHTML = "Je betalingswijze is " + document.forms["formID"]["betaling"].value;

        }


};



// Hier maak ik de functie ControleWachtwoord, deze functie controleert of dat de wachtwoord meer dan 7 karakters heeft
function controleWachtwoord(veld) {
        if (veld.length < 7) {
                arrayErrors.push("-Het wachtwoord moet meer dan 7 karacters bevatten!" + "<br/>");
        }
}



// Hier maak ik een functie om de email notatie te checken, ik heb de regex code van w3resource genomen, hieronder staat de link
//https://www.w3resource.com/javascript/form/email-validation.php
function validateEmail(emailadress) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (regex.test(emailadress) === false) {
                arrayErrors.push("-E-mailadress is niet correct!" + "<br/>");
        }
        return regex.test(String(emailadress).toLowerCase());
}



// met de functie checkEmptyField kijken we of dat de velden ingevuld zijn, als ze niet ingevuld zijn wordt er een melding gestuurd naar arrayErrors
function checkEmptyField(veld, melding) {
        if (veld < 1) {
                arrayErrors.push(melding);
                return true;
        } else {
                return false;
        }
}



// Hier checken we of dat de Postcode tussen 1000 en 9999 is met behulp van de functie checkPC

function checkPC(veld) {
        // contorleren als postcode numeriek is
        if (Number.isInteger(Number(veld)) == false) {
                arrayErrors.push("-Postcode dient met getalen ingevult te worden!" + "<br/>");
        }
        // error wordt laten zien als de waarde van de postcode uit de range is
        else if (veld < 1000 || veld > 9999) {
                arrayErrors.push("-De waarde van postcode moet tussen 1000 en 9999 liggen." + "<br/>");
        }


}