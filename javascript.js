/* ==========
  Secondary Nav 2.1.4
  A Secondary Nav Plugin for Squarespace 7.1 Websites
  Copyright Will Myers 
========== */
(function(){

  function buildSecondaryNav(settingsEl){

    // Build Element and Append to Nav
    const settings = settingsEl,
          secondaryWrapper = document.createElement('div'),
          secondaryStickyWrapper = document.createElement('div'),
          secondaryContainer = document.createElement('div'),
          secondaryMobileWrapper = document.createElement('div'),
          secondaryMobileContainer = document.createElement('div'),
          secondaryDropdownListWrapper = document.createElement('div'),
          secondaryDropdownListContainer = document.createElement('div'),
          mobileRootFolder = document.querySelector('[data-folder="root"] > .header-menu-nav-folder-content'),
          body = document.querySelector('body'),
          header = document.querySelector('#header'),
          socialIconHtml = {
            facebook: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Facebook</title><path data-name="layer1" d="M39.312 13.437H47V2h-9.094C26.938 2.469 24.688 8.656 24.5 15.125v5.719H17V32h7.5v30h11.25V32h9.281l1.781-11.156H35.75v-3.469a3.714 3.714 0 0 1 3.562-3.938z" fill="#000000" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            linkedIn: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Linkedin</title><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M3.078 22.331h12.188v36.844H3.078z" stroke-linejoin="round"></path> <path data-name="layer2" d="M46.719 21.112c-5.344 0-8.531 1.969-11.906 6.281v-5.062H22.625v36.844h12.281V39.206c0-4.219 2.156-8.344 7.031-8.344s7.781 4.125 7.781 8.25v20.063H62V38.269c0-14.532-9.844-17.157-15.281-17.157z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer1" d="M9.219 4.425C5.188 4.425 2 7.331 2 10.894s3.188 6.469 7.219 6.469 7.219-2.906 7.219-6.469-3.188-6.469-7.219-6.469z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            twitter: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Twitter</title><path data-name="layer1" d="M60.448 15.109a24.276 24.276 0 0 1-3.288.968.5.5 0 0 1-.451-.853 15.146 15.146 0 0 0 3.119-4.263.5.5 0 0 0-.677-.662 18.6 18.6 0 0 1-6.527 2.071 12.92 12.92 0 0 0-9-3.75A12.363 12.363 0 0 0 31.25 20.994a12.727 12.727 0 0 0 .281 2.719c-9.048-.274-19.61-4.647-25.781-12.249a.5.5 0 0 0-.83.073 12.475 12.475 0 0 0 2.956 14.79.5.5 0 0 1-.344.887 7.749 7.749 0 0 1-3.1-.8.5.5 0 0 0-.725.477 11.653 11.653 0 0 0 7.979 10.567.5.5 0 0 1-.09.964 12.567 12.567 0 0 1-2.834 0 .506.506 0 0 0-.536.635c.849 3.282 5.092 7.125 9.839 7.652a.5.5 0 0 1 .267.87 20.943 20.943 0 0 1-14 4.577.5.5 0 0 0-.255.942 37.29 37.29 0 0 0 17.33 4.266 34.5 34.5 0 0 0 34.687-36.182v-.469a21.11 21.11 0 0 0 4.934-4.839.5.5 0 0 0-.58-.765z" fill="#000000" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            pinterest: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Pinterest</title><path data-name="layer1" d="M32 1.994a30.016 30.016 0 0 0-11.906 57.563 24.712 24.712 0 0 1 .563-6.844c.563-2.437 3.844-16.406 3.844-16.406a12.129 12.129 0 0 1-.938-4.781c0-4.5 2.625-7.781 5.813-7.781 2.719 0 4.031 2.063 4.031 4.5 0 2.719-1.781 6.844-2.625 10.688a4.677 4.677 0 0 0 4.781 5.813c5.719 0 9.563-7.312 9.563-16.031 0-6.562-4.406-11.531-12.563-11.531-9.094 0-14.812 6.844-14.812 14.437a8.6 8.6 0 0 0 1.969 5.906 1.505 1.505 0 0 1 .469 1.687c-.188.562-.469 1.875-.656 2.437a1.04 1.04 0 0 1-1.5.75c-4.219-1.687-6.188-6.281-6.188-11.531 0-8.531 7.219-18.844 21.563-18.844 11.531 0 19.031 8.344 19.031 17.25 0 11.812-6.562 20.625-16.219 20.625-3.281 0-6.281-1.781-7.312-3.75 0 0-1.781 6.938-2.156 8.25a26.631 26.631 0 0 1-3 6.375A26.63 26.63 0 0 0 32 61.994a30 30 0 1 0 0-60z" fill="#000000" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            instagram: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Instagram</title> <path data-name="layer2" d="M44.122 2H19.87A17.875 17.875 0 0 0 2 19.835v24.2a17.875 17.875 0 0 0 17.87 17.834h24.252A17.875 17.875 0 0 0 62 44.034v-24.2A17.875 17.875 0 0 0 44.122 2zM55.96 44.034a11.825 11.825 0 0 1-11.838 11.812H19.87A11.825 11.825 0 0 1 8.032 44.034v-24.2A11.825 11.825 0 0 1 19.87 8.022h24.252A11.825 11.825 0 0 1 55.96 19.835zm0 0" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer1" d="M32 16.45a15.484 15.484 0 1 0 15.514 15.484A15.519 15.519 0 0 0 32 16.45zm0 24.95a9.461 9.461 0 1 1 9.482-9.461A9.472 9.472 0 0 1 32 41.4zm19.263-24.834a3.719 3.719 0 1 1-3.719-3.711 3.714 3.714 0 0 1 3.719 3.711zm0 0" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> </svg>'
            },
            igdirect: {
              html:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Instagram Direct</title>
  <path data-name="layer2"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" 
        d="M28 26L60 4"
  stroke-linejoin="round" stroke-linecap="round"></path>
  <path data-name="layer1" fill="none" stroke="#202020" stroke-miterlimit="10"
  stroke-width="2" d="M4 4 L60 4 36 60 28 26 4 4z" stroke-linejoin="round"
  stroke-linecap="round"></path>
</svg>`
            },
            linkedin: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Linkedin</title><path data-name="layer1" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M3.078 22.331h12.188v36.844H3.078z" stroke-linejoin="round"></path> <path data-name="layer2" d="M46.719 21.112c-5.344 0-8.531 1.969-11.906 6.281v-5.062H22.625v36.844h12.281V39.206c0-4.219 2.156-8.344 7.031-8.344s7.781 4.125 7.781 8.25v20.063H62V38.269c0-14.532-9.844-17.157-15.281-17.157z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer1" d="M9.219 4.425C5.188 4.425 2 7.331 2 10.894s3.188 6.469 7.219 6.469 7.219-2.906 7.219-6.469-3.188-6.469-7.219-6.469z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            venmo: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.33" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><g fill-rule="nonzero" style="transform: translate(-25% ,-25%) scale(1.4);"><path d="M995.24 271.32c28.68 47.29 41.55 96.05 41.55 157.62 0 196.38-167.62 451.42-303.67 630.49H422.45L297.88 314.34 570 288.5l66.17 530.15c61.5-100.31 137.55-257.93 137.55-365.32 0-58.84-10.08-98.84-25.84-131.78l247.36-50.23z" fill="#fff"></path></g></svg>'
            },
            youtube: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Youtube</title> <path data-name="layer1" d="M49.539 12H14.461A12.4 12.4 0 0 0 2 24.327v17.346A12.4 12.4 0 0 0 14.461 54h35.078A12.4 12.4 0 0 0 62 41.673V24.327A12.4 12.4 0 0 0 49.539 12z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer2" d="M41.111 33.844L24.7 41.585a.658.658 0 0 1-.938-.585V25.031a.659.659 0 0 1 .956-.581l16.407 8.225a.649.649 0 0 1-.014 1.169z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path></svg>'
            },
            phone: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Calls</title> <desc>A line styled icon from Orion Icon Library.</desc> <path data-name="layer1" d="M58.9 47l-10.4-6.8a4.8 4.8 0 0 0-6.5 1.3c-2.4 2.9-5.3 7.7-16.2-3.2S19.6 24.4 22.5 22a4.8 4.8 0 0 0 1.3-6.5L17 5.1c-.9-1.3-2.1-3.4-4.9-3S2 6.6 2 15.6s7.1 20 16.8 29.7S39.5 62 48.4 62s13.2-8 13.5-10-1.7-4.1-3-5z" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path> </svg>'
            },
            email: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Mail</title> <desc>A line styled icon from Orion Icon Library.</desc> <path data-name="layer2" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M2 12l30 29 30-29M42 31.6L62 52M2 52l20-20.4" stroke-linejoin="round" stroke-linecap="round"></path> <path data-name="layer1" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M2 12h60v40H2z" stroke-linejoin="round" stroke-linecap="round"></path> </svg>'
            },
            spotify: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Spotify</title> <desc>A line styled icon from Orion Icon Library.</desc> <path data-name="layer2" d="M32 2a30 30 0 1 0 30 30A29.968 29.968 0 0 0 32 2z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer1" d="M43.531 46.25a2.488 2.488 0 0 1-1.313-.469 30.038 30.038 0 0 0-15.562-4.031 45.077 45.077 0 0 0-9.469 1.031 10.354 10.354 0 0 1-1.5.281 1.879 1.879 0 0 1-1.875-1.875 1.978 1.978 0 0 1 1.594-2.063 50.53 50.53 0 0 1 11.25-1.313 33.55 33.55 0 0 1 17.437 4.5 2 2 0 0 1 1.219 1.969 1.73 1.73 0 0 1-1.781 1.97zm3.281-7.969a2.657 2.657 0 0 1-1.5-.562 38.834 38.834 0 0 0-19.031-4.781 40.6 40.6 0 0 0-9.75 1.219 4.413 4.413 0 0 1-1.5.375 2.321 2.321 0 0 1-2.344-2.344 2.44 2.44 0 0 1 1.875-2.531 41.027 41.027 0 0 1 11.813-1.687A41.912 41.912 0 0 1 47.75 33.5a2.421 2.421 0 0 1 1.406 2.344 2.344 2.344 0 0 1-2.344 2.437zm3.75-9.187a2.833 2.833 0 0 1-1.5-.469c-5.531-3.281-13.969-5.062-22.031-5.062a46.712 46.712 0 0 0-12 1.406 8.442 8.442 0 0 1-1.5.281 2.842 2.842 0 0 1-2.812-2.906 3.012 3.012 0 0 1 2.062-2.906 52.412 52.412 0 0 1 14.25-1.875c8.812 0 18.094 1.781 24.844 5.813a2.836 2.836 0 0 1 1.5 2.719 2.867 2.867 0 0 1-2.813 2.999z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> </svg>'
            },
            apple: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Apple</title> <desc>A line styled icon from Orion Icon Library.</desc> <path data-name="layer2" d="M48.334 33.875c-.093-7.593 6.169-11.249 6.45-11.436a13.669 13.669 0 0 0-10.936-5.906c-4.674-.469-9.067 2.718-11.5 2.718-2.337 0-5.982-2.718-9.908-2.625a14.765 14.765 0 0 0-12.339 7.5C4.868 33.313 8.794 47 13.935 54.4c2.524 3.656 5.515 7.78 9.441 7.593 3.832-.187 5.235-2.437 9.815-2.437S39.08 62 43.1 61.9c4.113-.094 6.637-3.75 9.16-7.405a29.782 29.782 0 0 0 4.113-8.53 13.082 13.082 0 0 1-8.039-12.09z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10"  stroke-width="2" stroke-linejoin="round"></path> <path data-name="layer1" d="M40.762 11.565A13.423 13.423 0 0 0 43.847 2a13.194 13.194 0 0 0-8.787 4.5c-1.963 2.25-3.645 5.812-3.178 9.28 3.365.284 6.824-1.68 8.88-4.215z" fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path> </svg>'
            },
            messaging: {
              html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Message</title>
  <path data-name="layer1"
  d="M5 59l18.8-6.9a37.1 37.1 0 0 0 8.2.9c16.6 0 30-10.7 30-24S48.6 5 32 5 2 15.7 2 29c0 6.7 3.5 12.8 9.1 17.2z"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"
  stroke-linecap="round"></path>
</svg>`
            },
            tiktok: {
              html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"/></svg>'
            }, 
            whatsapp: {
              html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>WhatsApp</title>
  <desc>WhatsApp</desc>
  <path data-name="layer2"
  d="M30.287 2.029A29.769 29.769 0 0 0 5.223 45.266L2.064 60.6a1.158 1.158 0 0 0 1.4 1.361L18.492 58.4A29.76 29.76 0 1 0 30.287 2.029zm17.931 46.2"
  fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10"
  stroke-width="2" stroke-linejoin="round"></path>
  <path data-name="layer1" d="M46.184 38.205l-5.765-1.655a2.149 2.149 0 0 0-2.126.561l-1.41 1.436a2.1 2.1 0 0 1-2.283.482c-2.727-1.1-8.463-6.2-9.927-8.754a2.1 2.1 0 0 1 .166-2.328l1.23-1.592a2.148 2.148 0 0 0 .265-2.183l-2.424-5.485a2.149 2.149 0 0 0-3.356-.769c-1.609 1.361-3.517 3.428-3.749 5.719-.409 4.039 1.323 9.13 7.872 15.242 7.566 7.063 13.626 8 17.571 7.04 2.238-.542 4.026-2.714 5.154-4.493a2.15 2.15 0 0 0-1.218-3.221z"
  fill="none" stroke="#202020" stroke-linecap="round" stroke-miterlimit="10"
  stroke-width="2" stroke-linejoin="round"></path>
</svg>`
            },
            search: {
              html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Search</title>
  <path data-name="layer2"
  fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M39.049 39.049L56 56"
  stroke-linejoin="round" stroke-linecap="round"  style="stroke-width:8px;"></path>
  <circle data-name="layer1" cx="27" cy="27" r="17" fill="none" stroke="#202020"
  stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" style="fill:none; stroke-width:8px;"></circle>
</svg>`
            },
            patreon: {
              html: `<svg height="546px" version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <title>Patreon Icon</title>
  <g>
    <circle cx="42" cy="22" data-fill="1" r="22"></circle>
    <rect data-fill="1" height="64" width="11" x="0" y="0"></rect>
  </g>
</svg>`
            }
          }
    let placement = settingsEl.getAttribute('data-position') || 'top',
        setup = settingsEl.getAttribute('data-nav-setup') || 'custom',
        sticky = settings.getAttribute('data-sticky') || 'false';

    placement = placement.toLowerCase();
    placement = placement.trim();
    setup = setup.toLowerCase();
    setup = setup.trim();
    sticky= sticky.toLowerCase();
    sticky = sticky.trim();

    // Declare Vars
    let placementReferenceEl,
        subNavDropdownListIcon = document.createElement('div'),
        svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Angle Down</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer1"fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M 0 32 l 32 22 L 64 32"stroke-linejoin="round" stroke-linecap="round"></path></svg>'
    
    //Add Classes
    secondaryWrapper.id = 'wm-subnav';
    secondaryWrapper.style.opacity = "0";
    secondaryWrapper.classList += 'wm-secondary-nav';
    secondaryStickyWrapper.classList += 'wm-secondary-sticky-wrapper';
    secondaryContainer.classList.add('wm-secondary-container')

    secondaryMobileWrapper.classList += 'wm-secondary-mobile-nav';
    secondaryMobileWrapper.style.opacity = "0";
    secondaryMobileContainer.classList += 'wm-secondary-mobile-container';
    
    secondaryDropdownListWrapper.classList += 'wm-secondary-dropdown-list-wrapper';
    secondaryDropdownListContainer.classList += 'wm-secondary-dropdown-list-container header-nav-folder-content header-nav-wrapper';
    subNavDropdownListIcon.classList += 'wm-dropdown-list-icon';
    secondaryDropdownListContainer.style.maxHeight = "0px";
    
    //Setup HTML Structure
    secondaryWrapper.append(secondaryStickyWrapper);
    secondaryStickyWrapper.append(secondaryContainer);
    secondaryMobileWrapper.append(secondaryMobileContainer);

    subNavDropdownListIcon.append(stringToHTML(svg));
    secondaryDropdownListWrapper.append(subNavDropdownListIcon);
    secondaryContainer.append(secondaryDropdownListContainer);

    //Set Desktop Placement -- Top
    if (placement.includes('top')) {
      placementReferenceEl = document.querySelector('.header-announcement-bar-wrapper');
      let parentNode = placementReferenceEl.parentElement;
      parentNode.insertBefore(secondaryWrapper, placementReferenceEl);
      body.classList.add('tweak-wm-secondary-nav--top')
    }
    //Set Desktop Placement -- Bottom
    else if (placement.includes('bottom')) {
      placementReferenceEl = document.querySelector('.header-announcement-bar-wrapper');
      insertAfter(secondaryWrapper, placementReferenceEl);
      body.classList.add('tweak-wm-secondary-nav--bottom')
    } 
    //Set Desktop Placement -- Center
    else if (placement.includes('center')) {
      placementReferenceEl = document.querySelector('.header-display-desktop');
      placementReferenceEl.append(secondaryWrapper);
      body.classList.add('tweak-wm-secondary-nav--center');
    } 
    //Set Desktop Placement -- Section
    else if (placement.includes('section')) {
      placementReferenceEl = settings;
      body.classList.add('tweak-wm-secondary-nav--section');
      settingsEl.closest('.page-section').classList.add('sticky-page-section');
      insertAfter(secondaryWrapper, placementReferenceEl)
    }
    
    //Set Mobile Placement -- Menu
    mobileRootFolder.append(secondaryMobileWrapper);

    //Build Out Nav Items 
    let linkArr,
        linkCta = settings.querySelector('.cta') || null,
        socialArr = settings.querySelectorAll('[data-wm-social]'),
        subNavHeader = settings.querySelector('h1, h2, h3, h4, p, img');
    
    //If Custom Setup
    if (setup == "custom") {
      linkArr = settings.querySelectorAll('a:not(.cta):not([data-wm-social])')
    } 
    //If Simple Setup
    else {
      let linksDesktopEl = document.querySelector('.header-nav-list .header-nav-folder-title[href="/secondary-nav"]'),
          linksMobileEl = document.querySelector('[data-folder="root"] [data-folder-id="/secondary-nav"]');
      linkArr = linksDesktopEl.nextElementSibling.querySelectorAll('a');
      linksDesktopEl.closest('.header-nav-item--folder').classList.add('hide-nav-item');
      linksDesktopEl.closest('.header-nav-item--folder').style.display = 'none';
      linksMobileEl.closest('.header-menu-nav-item').classList.add('hide-nav-item');
      linksMobileEl.closest('.header-menu-nav-item').style.display = 'none';
    }

    if (subNavHeader) {
      let subNavHeaderEl = document.createElement('div'),
          link = subNavHeader.getAttribute('href');
      subNavHeaderEl.classList += 'wm-subnav-header';
      subNavHeaderEl.append(subNavHeader)
      if (link) {
        let a = document.createElement('a');
        a.href = subNavHeader.getAttribute('href');
        subNavHeaderEl.append(a);
        a.append(subNavHeader);
      }
      secondaryContainer.append(subNavHeaderEl);
    }
    
    //Add Link Items
    if (linkArr) { 
      let subNavDesktopList,
          subNavMobileList,
          subNavDropdownList;
      //Build Desktop Container
      if (!document.querySelector('.wm-subnav-nav-list')){
        subNavDesktopList = document.createElement('nav');
        subNavDesktopList.setAttribute("role", "navigation");
        subNavDesktopList.setAttribute("aria-label", "Secondary Navigation");
        subNavDesktopList.classList.add('wm-subnav-nav-list','header-nav-wrapper');
        secondaryContainer.append(subNavDesktopList);
        secondaryContainer.append(secondaryDropdownListWrapper);
        subNavDesktopList = document.querySelector('.wm-subnav-nav-list');
      } else {
        subNavDesktopList = document.querySelector('.wm-subnav-nav-list');
      }
      //Build Mobile Menu Container
      if (!document.querySelector('.wm-subnav-mobile-list')){
        subNavMobileList = document.createElement('div');
        subNavMobileList.classList.add('wm-subnav-mobile-list');
        secondaryMobileContainer.append(subNavMobileList);
        subNavMobileList = document.querySelector('.wm-subnav-mobile-list');
      } else {
        subNavMobileList = document.querySelector('.wm-subnav-mobile-list');
      }
      linkArr.forEach(linkMain => {
        let desktopLink = buildDesktopMainLink(linkMain),
            mobileLink = buildMobileMainLink(linkMain.cloneNode(true)),
            dropdownListLink = buildDropdownListMainLink(linkMain.cloneNode(true));
        if (document.querySelector('[href="#sqsp-account"]')) addAccountEventListener();
        subNavDesktopList.append(desktopLink);
        subNavMobileList.append(mobileLink);
        secondaryDropdownListContainer.append(dropdownListLink);
      })
    }

    //Social Links
    if (socialArr.length) {
      let socialContainer = buildSocialContainer();
      socialArr.forEach(social => {
        let iconName = social.getAttribute('data-wm-social').toLowerCase();
        try {
          social.classList.add('wm-social-icon');
          social.innerHTML = socialIconHtml[iconName].html
          socialContainer.append(social);
        } catch {
          console.log(iconName + " doesn't exist as a social option");
        }
      })
    }

    //Add CTA
    if (linkCta) {
      let newLinkCta = buildDesktopCtaLink(linkCta),
          ctaNavItem = document.createElement('div'),
          subNavMobileList = document.querySelector('.wm-subnav-mobile-list');
      ctaNavItem.classList.add('wm-subnav-cta-container');
      ctaNavItem.append(newLinkCta)
      secondaryContainer.append(ctaNavItem)
      
      if (subNavMobileList) {
        let ctaMobile = ctaNavItem.cloneNode(true);
        subNavMobileList.append(ctaMobile);
      }
    }

    //Set Sticky Class To Header
    if (sticky !== 'false') {
      let secondaryHeaderPos,
          secondaryHeaderHeight,
          checkIfScrollPastMainHeader = function() {
            secondaryHeaderPos = secondaryWrapper.getBoundingClientRect().top;
            secondaryHeaderHeight = secondaryWrapper.getBoundingClientRect().height;
            if (0 >= secondaryHeaderPos) {
              document.querySelector('#header').classList.add('sticky-second-nav')
              secondaryWrapper.style.height = secondaryHeaderHeight + 'px';
            } else {
              secondaryWrapper.style.height = 'auto';
              document.querySelector('#header').classList.remove('sticky-second-nav')
            }
          }
      window.addEventListener('scroll', checkIfScrollPastMainHeader);
      header.addEventListener('transitionend', checkIfScrollPastMainHeader)
    }
    
    //FUNCTIONS
    // Get Nav Height
    let secondNavHeight;
    let getSubNavHeight = function(){
      secondNavHeight = secondaryContainer.getBoundingClientRect().height;
      header.style.setProperty('--wM-secondNavHeight', secondNavHeight + 'px');
    }
    window.addEventListener('resize', getSubNavHeight);
    
    
    //Add Account Event Listner
    function addAccountEventListener() {
      let accountBtns = document.querySelectorAll('[href="#sqsp-account"]'),
          accountPanelBtn = document.querySelector('.user-accounts-text-link');

      function openAccountPanel(){
        if (accountPanelBtn) accountPanelBtn.click();
      }
      
      accountBtns.forEach(btn => {
        btn.addEventListener('click', openAccountPanel);
      });
    }

    //Get SidePadding
    let headerSidePadding;
    let getHeaderSidePadding = function(){
      headerSidePadding = Static.SQUARESPACE_CONTEXT.tweakJSON.pagePadding;
      body.style.setProperty('--headerSidePadding', headerSidePadding);
    }
    window.addEventListener('resize', getHeaderSidePadding);
    
    //Open DropdownList
    let container,
        height;
    let openDropdownList = function(){
      container = document.querySelector('.wm-secondary-dropdown-list-container');
      secondaryDropdownListWrapper.classList.toggle('open');
      container.classList.toggle('open');
      if (secondaryDropdownListWrapper.classList.contains('open')){
        height = container.scrollHeight;
        container.style.maxHeight = height + "px";
      } else {
        container.style.maxHeight = "0px";
      }
    }
    secondaryDropdownListWrapper.addEventListener('click', openDropdownList);
    window.addEventListener('scroll', function(){
      if (secondaryDropdownListWrapper.classList.contains('open')){
        secondaryDropdownListWrapper.classList.remove('open');
        container.classList.remove('open');
        height = container.scrollHeight;
        container.style.maxHeight = height + "px";
      }
    });

    // Timer to fire until Secondary Nav has padding Loaded
    let paddingLoadedTimer = setInterval(checkPaddingLoad, 250);
    function checkPaddingLoad() {
      if (headerSidePadding == undefined) {
        getHeaderSidePadding()
      } else {
        stopPaddingTimer()
      }
    }
    function stopPaddingTimer() {
      clearInterval(paddingLoadedTimer);
    }
    
    let url = window.location.pathname,
        links = document.querySelectorAll('.wm-subnav-nav-list.header-nav-wrapper a');
    links.forEach(link => {
      if (link.href.split('.com')[1] == url){
        link.closest('.header-nav-item').classList.add('header-nav-item--active')
      }
    });

    function buildSocialContainer() {
      let socialContainer = document.createElement('div');
      socialContainer.classList.add('wm-social-icon-container');
      secondaryContainer.append(socialContainer)
      return socialContainer;
    }

    body.classList.add('wm-secondary-nav-loaded');
    let event = new Event('secondaryNavLoaded');
    window.dispatchEvent(event);
  }

  //Init Build
  if (document.querySelectorAll('[data-wm-plugin="subnav"]').length !== 0){
    if (document.querySelectorAll('head link[href*="WMSecondNav92220v2"]').length == 0){
      let head = document.getElementsByTagName('head')[0],
          link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/secondaryNav@2.2.003/styles.min.css';
      head.appendChild(link);
      link.onload = function() {
        let event = new Event('secondaryNavCSSLoaded');
        window.dispatchEvent(event);
      };
    }
    let settingsEl = document.querySelector('[data-wm-plugin="subnav"]');
    buildSecondaryNav(settingsEl);
  }

  //DOM Functions 
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }
  function buildDesktopMainLink(el) {
    let linkEl = document.createElement('div');
    linkEl.classList.add('header-nav-item', 'wm-subnav-item');
    linkEl.append(el);
    el.classList.add('wm-subnav-link');
    return linkEl;
  }
  function buildMobileMainLink(el) {
    let linkEl = document.createElement('div');
    linkEl.classList.add('header-menu-nav-item', 'container', 'wm-menu-subnav-item');
    linkEl.append(el);
    return linkEl;
  }
  function buildDropdownListMainLink(el){
    let linkEl = document.createElement('div');
    linkEl.classList.add('header-nav-list-item', 'wm-subnav-item');
    linkEl.append(el);
    el.classList.add('wm-subnav-link');
    return linkEl;
  }
  function buildDropdownLink(el) {
    /*On Hold For Now*/
  }
  function buildSocialLink(el) {
    /*On Hold For Now*/
  }
  function buildDesktopCtaLink(el) {
    let ctaEl = document.createElement('div');
    ctaEl.classList.add('wm-subnav-cta')
    el.classList.add('btn', 'btn--border', 'sqs-block-button-element');
    ctaEl.append(el);
    return ctaEl;
  }
  function stringToHTML(str) {
    // If DOMParser is supported, use it
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body.childNodes[0];
  };
}());




/*Global Vars*/
//Set Header Height & Bottom Pos
(function(){
  if (typeof window.wM == 'undefined'){
    window.wM = {}
  } 
  let wM = window.wM;
  let version = 1.0;
  if (document.getElementById('header')){
    wM.header = wM.header || {};
    wM.header.version = typeof wM.header.version == 'undefined' ? version : (wM.header.version < version ? version : wM.header.version);
    if (wM.header.version == version){
      initHeaderLogic();
    }
  }

  function initHeaderLogic(){
    let headerObj = wM.header;
    let $header = document.getElementById('header');
    let root = document.documentElement;
    headerObj.headerElem = $header;

    headerObj.setHeaderCSS = function setHeight(){
      headerObj.headerBottom = headerObj.headerElem.getBoundingClientRect().bottom;
      headerObj.headerBottom =  headerObj.headerBottom < 0 ? 0 : headerObj.headerBottom;
      headerObj.headerHeight = headerObj.headerElem.getBoundingClientRect().height;
      root.style.setProperty('--wM-headerBottom', headerObj.headerBottom + 'px');
      root.style.setProperty('--wM-headerHeight', headerObj.headerHeight + 'px');
    }
    headerObj.setHeaderCSS();

    headerObj.headerElem.addEventListener('transitionend', () => {
      headerObj.setHeaderCSS();
    });
    window.addEventListener('scroll', () => {
      setTimeout(function(){
        headerObj.setHeaderCSS();
      }, 150);
    });
  }
}());
