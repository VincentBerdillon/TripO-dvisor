   const app = {
       //variables
       newsletterLink: document.querySelector('#newsletter-link'),
       newsletterCloseButton: document.querySelector('.newsletter__close'),
       newsletterContainer: document.querySelector('.newsletter'),
       newsletterForm: document.querySelector('#newsletter-form'),
       slider: document.querySelector('.slider'),
       imagesContainer: document.querySelector(".slider__images"),
       prevBtn: document.querySelector(".slider__btn[aria-label='Précédent']"),
       nextBtn: document.querySelector(".slider__btn[aria-label='Suivant']"),
       currentIndex: 0,

       // liste extentions mail jetables 

       forbiddenDomains: [
           '@yopmail.com',
           '@yopmail.fr',
           '@yopmail.net',
           '@cool.fr.nf',
           '@jetable.fr.nf',
           '@courriel.fr.nf',
           '@moncourrier.fr.nf',
           '@monemail.fr.nf',
           '@monmail.fr.nf',
           '@hide.biz.st',
           '@mymail.infos.st',
       ],

       //init
       init: function () {
           app.addListeners();
       },

       //méthodes
       addListeners: function () {

           //écouteur sur newsletter
           app.newsletterLink.addEventListener('click', app.toggleNewsletter);

           //écouteur sur button close newsletter
           app.newsletterCloseButton.addEventListener('click', app.removeNewsletter);

           //écouteur sur la window pour réagir au scroll
           window.addEventListener('scroll', app.handleScroll);

           //écouteur sur le boutton valider
           app.newsletterForm.addEventListener('submit', app.handleSubmit);

           //écouteur sur le boutton slider next
           app.nextBtn.addEventListener('click', app.handleNextBtn);

           //écouteur sur le boutton slider previous
           app.prevBtn.addEventListener('click', app.handlePrevBtn);

       },

       toggleNewsletter: function (event) {
           event.preventDefault();
           app.newsletterContainer.classList.toggle('newsletter--hidden');
       },

       removeNewsletter: function (event) {
           app.newsletterContainer.classList.add('newsletter--hidden');
           window.removeEventListener('scroll', app.handleScroll);
       },

       handleScroll: function (event) {
           if (window.scrollY >= 300) {
               app.newsletterContainer.classList.remove('newsletter--hidden');
           };
       },

       handleSubmit: function (event) {
           event.preventDefault();
           const mailInputValue = event.target[0].value;
           const domainValue = "@" + mailInputValue.split('@')[1]; //retourne un tableau avec 0 debut de mail, 1 fin de mail
           /*for (const mailTest of app.forbiddenDomains){                              //on peut l'inclure mais mieux vaut sortir la fonction si besoin de checker de mauvais email ailleurs
               if(domainValue===mailTest){
                   alert('adresse interdite');
                   break;
               };
           };*/
           const isBadEmail = app.checkBadEmail(domainValue);
           if (isBadEmail == true) {
               alert("Les adresses jetables sont interdites");
           } else {
               alert("Vous êtes inscrit à notre newsletter");
           };
       },

       checkBadEmail: function (emailExtension) {
           for (const extension of app.forbiddenDomains) {
               if (emailExtension.includes(extension)) {
                   return true;
               } else {
                   return false;
               };
           };

       },

       handleNextBtn: function () {
           if (app.currentIndex < app.imagesContainer.children.length - 1) {
               app.currentIndex++;
           } else {
               app.currentIndex = 0;
           }
           const translateValue = -app.currentIndex * 100 + "%";
           app.imagesContainer.style.transform = "translateX(" + translateValue + ")";
       },

       handlePrevBtn: function () {
           if (app.currentIndex > 0) {
               app.currentIndex--;
           } else {
               app.currentIndex = app.imagesContainer.children.length - 1;
           }
           const translateValue = -app.currentIndex * 100 + "%";
           app.imagesContainer.style.transform = "translateX(" + translateValue + ")";
       },


   }

   app.init();