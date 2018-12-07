(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.visualChanges = {
    attach: function (context, settings) {

      // add readmore.js to long descriptions.
      $('.is-expandable').readmore({
        collapsedHeight:  150,
        heightMargin:     25,
        moreLink: '<a class="card-btn" href="#">Expand</a>',
        lessLink: '<a class="card-btn" href="#">Collapse</a>',
      });

      // change the flag icon based on whether on the flag action.
      $('.flag-favourite.action-unflag').siblings().find('i.material-icons').text('favorite');
      $('.flag-favourite.action-flag').siblings().find('i.material-icons').text('favorite_border');
      $('.flag-favourite.action-unflag').hover(
        function(){
          $(this).siblings().find('i.material-icons').text('favorite_border').css('color','red');
        },
        function(){
          $(this).siblings().find('i.material-icons').text('favorite').css('color','unset');
        }
      );
      $('.flag-favourite.action-flag').hover(
        function(){
          $(this).siblings().find('i.material-icons').text('favorite').css('color','blue');
        },
        function(){
          $(this).siblings().find('i.material-icons').text('favorite_border').css('color','unset');
        }
      );

      // collapse event for content blocks
      $('a.content-block-collapse').on('click', function() {
        $('.paragraph .card-richmedia').slideToggle();
      });

    }
  };

  Drupal.behaviors.offCanvasRegion = {
    attach: function (context, settings) {
      
      // show off canvas nav when button clicked
      $('.navbar-toggle-offcanvas').on('click', function() {
        $('body').addClass('off-canvas-active');
        $('body').css('overflow', 'hidden');
      });

      // close off canvas nav when clicked away
      $('#offcanvas-overlay').on('click', function() {
        $('body').removeClass('off-canvas-active');
        $('body').css('overflow', 'auto');
      });

      $('.nav-with-icons .navbar-nav > li > a[material-icon]').once().map(function() {
        $(this).prepend('<i class="material-icons">' + $(this).attr('material-icon') + '</i>');
      });

    }
  };


  Drupal.behaviors.navMinimize = {
    attach: function (context, settings) {

      // h5p library name from library id
      // used when displaying the type of h5p content

      var h5pLibID;
      var h5pLibName;

      $('.h5p-library-name').each(function(){
        h5pLibID = $(this).attr('data-h5plibid');
        geth5pLibName(h5pLibID);
        $(this).text(h5pLibName);
      });

      function geth5pLibName(libid) {
        switch (libid) {
          case '25':
            h5pLibName = 'Interactive Video';
            break;
          case '32':
            h5pLibName = 'Single Choice Set';
            break;
          case '59':
            h5pLibName = 'Interactive Presentation';
            break;
        }
      }

    }
  };


})(jQuery, Drupal, drupalSettings);


(function ($) {

  // handles minimization of main sidebar nav on non-mobile screens

  var cookieSparkNavMinimize = $.cookie('sparknavminimize'); 

  if (cookieSparkNavMinimize == 1) {
    $('body').addClass('menu-minimize');
    $('.toggle-menu-minimize').addClass('is-active');
  } else {
    $('body').removeClass('menu-minimize');
    $('.toggle-menu-minimize').removeClass('is-active');
  }

  $('.toggle-menu-minimize').on('click', function() {
    if ( $(this).hasClass('is-active') ) {
      $(this).removeClass('is-active');
      $('body').removeClass('menu-minimize');
      $.removeCookie('sparknavminimize');
    } else {
      $(this).addClass('is-active');
      $('body').addClass('menu-minimize');
      $.cookie('sparknavminimize', 1, {
        expires: 100,
        path: '/',
      });
    }
  });

  
})(jQuery);

(function ($) {
  
  // render license info with link to license deed

  $(document).ready(function() {

    var licenseSelected;
    var licenseAuthorsObj;
    var licenseDeedHTML;
    var licenseBadges;
    var licenseVersion;

    $('.license-info-block').each(function(){

      licenseSelected = $(this).attr('data-license');
      licenseAuthorsObj = jQuery.parseJSON($(this).attr('data-license-authors'));
      licenseVersion = $(this).attr('data-license-version');
      
      if (licenseAuthorsObj.length) {
        $('.lic-authors').text('');
        var authorNames = licenseAuthorsObj.map(function(obj) { return obj.name; }).join(', ').replace(/,(?!.*,)/gmi, ' and');
        $('.lic-authors').append(authorNames);
      }

      getLicenseDeed(licenseSelected, licenseVersion);
      
      $('.lic-deed').text('');
      $('.lic-deed').append(licenseDeedHTML);
      $('.license-badges').append(licenseBadges);

    });

    function getLicenseDeed(licenseName, licenseVer){
      switch (licenseName) {
        case 'U':
          $('.license-tag').text('Undefined');
          licenseDeedHTML = ' does not include license information. <a href="/help/licenses" target"_blank" alt="Read the help documentation for licenses">Read more</a>';
          break;
        case 'CC BY':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" />';
          break;
        case 'CC BY-ND':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by-nd/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution-NoDerivs</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" /><img alt="Creative Commons No-Derivs" src="/themes/custom/sparkmtl/assets/cc-icons/nd.svg" />';
          break;
        case 'CC BY-SA':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by-sa/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution-ShareAlike</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" /><img alt="Creative Commons ShareAlike" src="/themes/custom/sparkmtl/assets/cc-icons/sa.svg" />';
          break;
        case 'CC BY-NC':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by-nc/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution-NonCommercial</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" /><img alt="Creative Commons NonCommercial" src="/themes/custom/sparkmtl/assets/cc-icons/nc.svg" />';
          break;
        case 'CC BY-NC-SA':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by-nc-sa/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution-NonCommercial-ShareAlike</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" /><img alt="Creative Commons NonCommercial" src="/themes/custom/sparkmtl/assets/cc-icons/nc.svg" /><img alt="Creative Commons ShareAlike" src="/themes/custom/sparkmtl/assets/cc-icons/sa.svg" />';
          break;
        case 'CC BY-NC-ND':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/licenses/by-nc-nd/' + licenseVer + '/" target="_blank" alt="Open license deed in a separate tab">Creative Commons Attribution-NonCommercial-NoDerivs</a> license.';
          licenseBadges = '<img alt="Creative Commons" src="/themes/custom/sparkmtl/assets/cc-icons/cc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/by.svg" /><img alt="Creative Commons NonCommercial" src="/themes/custom/sparkmtl/assets/cc-icons/nc.svg" /><img alt="Creative Commons Attribution" src="/themes/custom/sparkmtl/assets/cc-icons/nd.svg" />';
          break;
        case 'CC0 1.0':
          licenseDeedHTML = ' is licensed under the <a href="https://creativecommons.org/share-your-work/public-domain/cc0/" target="_blank" alt="Read more about the Creative Commons CC0 license">Creative Commons No Copyright</a> license.';
          licenseBadges = '<img alt="Creative Commons CC0" src="/themes/custom/sparkmtl/assets/cc-icons/zero.svg" />';
          break;
        case 'CC PDM':
          licenseDeedHTML = ' is provided with <a href="https://creativecommons.org/share-your-work/public-domain/pdm/" target="_blank" alt="Read more about the Creative Commons Public Domain Mark">Creative Commons Public Domain Mark</a>.';
          licenseBadges = '<img alt="Creative Commons PDM" src="/themes/custom/sparkmtl/assets/cc-icons/publicdomain.svg" />';
          break;
        case 'GNU GPL':
          licenseDeedHTML = ' is licensed under the <a href="https://www.gnu.org/licenses/gpl.txt" target="_blank" alt="Read the license in a separate window">GNU General Public License v3</a> (GNU GPL v3) license.';
          break;
        case 'PD':
          licenseDeedHTML = ' is licensed under Public Domain.';
          break;
        case 'ODC PDDL':
          licenseDeedHTML = ' is licensed under Open Data Commons <a alt="Read more about ODC PDDL license on their website" href="https://opendatacommons.org/licenses/pddl/1.0/">Public Domain Dedication and License</a>.';
          break;
      }
      
    }

  });



    
})(jQuery);