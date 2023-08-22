// isElementLoaded('.goog-te-combo').then((selector) => {
//     try {
//         let selectElement = document.querySelector(".goog-te-combo");
//         // selectElement.addEventListener('change', (event) => {
//         //     loadVoices()
//         // })
//         console.log(this)
//     } catch (error) {
//         console.error(error);

//     }

// });

// setTimeout(() => {
//     let selectElement = document.querySelector(".goog-te-combo");

//     function sortOptions() {
//         var options = selectElement.options;

//         var optionsArray = [];
//         for (var i = 0; i < options.length; i++) {
//             optionsArray.push(options[i]);
//         }


//         // filter common languages to seperate array

//         let commonLanguages = optionsArray.filter(x => x.value === 'hy' || x.value === 'en' || x.value === 'es')
//         console.log(commonLanguages[1].value)
//         selectElement = commonLanguages

//         // commonLanguages = optionsArray.sort(function (a, b) {
//         //     return a.innerHTML.toLowerCase().charCodeAt(0) - b.innerHTML.toLowerCase().charCodeAt(0);
//         // });

//         // for (var i = 0; i <= options.length; i++) {
//         //     options[i] = optionsArray[i];
//         // }
//         // options[0].selected = true;
//     }

//     sortOptions();
// }, 1000);
