// not sure what lal this stuff does
// $(document).ready(function () {
//     $("#keydownTip").click(function () {
//       $('#tooltip_template').toggleClass("toast_close");
//     });
//   });

//   https://stackoverflow.com/questions/13936865/jquery-save-checkbox-state-on-click-in-cookie
// $(document).ready(function () {


//   // read the current/previous setting
//   $("input.switch-input[type=checkbox]").each(function () {
//     //get name of input
//     var name = $(this).attr('name');
//     if ($.cookie(name) && $.cookie(name) == "true") {
//       $(this).prop('checked', $.cookie(name));
//       $("body").addClass(name);
//       //If ToggleTTS_click is checked
//       if ($('[id="ToggleTTS_click"]').is(':checked')) {
//         $("body").addClass("TTS_click_enabled");
//       }

//       //If ToggleSeizure is checked add name value to html, not body
//       if ($('[id="ToggleSeizure"]').is(':checked')) {
//         $("html").addClass(name);
//         $("body").removeClass(name);
//       }

//       //If ToggleReadingMask is checked
//       if ($('[id="ToggleReadingMask"]').is(':checked')) {
//         $("body").addClass(name);
//         $("body").addClass("ReadingMask_ON");
//         $("#top_mask").fadeIn('slow')
//         $("#bottom_mask").fadeIn('slow')
//       }

//       //If ToggleReadingGuide is checked
//       if ($('[id="ToggleReadingGuide"]').is(':checked')) {
//         $("body").addClass(name);
//       }
//       //If ToggleTextMagnifier is checked
//       if ($('[id="ToggleTextMagnifier"]').is(':checked')) {
//         $("body").addClass(name);
//         $("body").addClass("TextMagnifier");
//         $('[id="ToggleZoom"]').prop('checked', false);
//         $('#text_magnify').attr('style', 'display: block!important');
//         $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *').hover(
//           function (e) {
//             //do the mouseenter things here...
//             //Gets text inside element tag and copies into #text_magnify div
//             var TextMagnify = $(this).text();
//             $("#text_magnify").text(TextMagnify);
//             //$("body").addClass("TextMagnifier");
//             $('#text_magnify').fadeIn('quick')
//             /*$("#text_magnify").css({
//               "display": "block",
//               "opacity": "1"});
//               */
//             //If #text_magnify is empty, hide
//             if (TextMagnify === '') {
//               $('#text_magnify').attr('style', 'display: none!important');
//             }
//             if ($('#text_magnify').is(':empty')) {

//               $('#text_magnify').attr('style', 'display: none!important');
//             }
//           },
//           function (e) {
//             //do the mouseleave things here...
//             $('#text_magnify').attr('style', 'display: none!important');
//           }

//         );//end of hover
//         $(window).scroll(function () {
//           $('#text_magnify').attr('style', 'display: none!important');
//         });
//       }// if not checked
//       else {
//         $("body").removeClass("TextMagnifier");
//         $('#text_magnify').attr('style', 'display: none!important');
//       }
//     }// end of if
//   });//end of each
//   // event management
//   $("input.switch-input[type=checkbox]").change(function () {
//     var name = $(this).attr("name");
//     $.cookie(name, $(this).prop('checked'), { path: '/', })
//   });
// });

