$(document).ready(function () {
    //initialize fullPage.js
    $('#fullpage').fullpage({
        //options here
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        autoScrolling: true,
        scrollOverflow: true,
        navigation: true,
        slidesNavigation: true,
        fitToSection: true,
        lazyLoading: false,
        normalScrollElements: ".bioText, .form-control",
        //anchors must be labeled with page1, 2, etc.
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
    });

    //initialize masonry
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });

    //makes landing page video play
    var vid = document.getElementById("bgVideo");

    function playVid() {
        vid.play();
    };
    playVid();

    //change navbar's logo img file on hover
    $("#logo").on("mouseenter", function () {
        $(this).attr("src", "images/logo-hover.png")
    }).on("mouseout", function () {
        $(this).attr("src", "images/logo-white.png")
    })

    //close expanded menu when navbar logo img and anchor links are clicked
    $("#logo, #menuAnchorHome, #menuAnchorBiography, #menuAnchorDiscography, #menuAnchorJournal, #menuAnchorContactUs").click(function () {
        $("#header").removeClass("menuBarBgColored");
        //jQuery to hide svg layers not working, dunno why. Using javascript instead. 
        document.getElementById("expandedMenu").style.display = "none";
        //restore hamburger menu to original state (from close to 3 lines)
        $(".ham3").removeClass('active');
        return fullpage_api.setAllowScrolling(true, "all");
    });

    //hamburger menu icon trigger expandsion of fullpage menu with animate css fadein effect
    //and locks scrolling capability
    $(".hamburgerMenuIcon").click(function () {
        $("#expandedMenu").toggle().animateCss("fadeIn");
        $("#header").toggleClass("menuBarBgColored");
        setTimeout(function(){
            //set logo and hamburger color to white upon expansion of menu page
            //and hard set hover effect as well (:hover in css is broken somehow, dunno why)
            var logo = $("#logo");
            var burger = $(".line");
            logo.attr("src", "images/logo-white.png");
            burger.css("stroke", "#F4F4F4");
            $(".hamburgerMenuIcon").mouseenter(function(){
                burger.css("stroke", "#BC3445");
            })
            $(".hamburgerMenuIcon").mouseleave(function(){
                burger.css("stroke", "#F4F4F4");
            })
        }, 100);
        //lock scrolling capability 
        //!!DISABLE/COMMENT OUT THESE TO ALLOW SCROLLING IN EXPANDED MENUBAR; ALTERNATIVE NAVIGATION EFFECT!!
        //unintended effect, but could make it work properly if you can store previous hash location somehow (perhaps in a variable), and call it upon close btn is clicked.
        //keep it on for now until you have spare time to figure ^ out. 
            //look up methods in fullpage.js doc, could have solution
        let scrollToggle;
        if ($(expandedMenu).css("display") == "block") {
            scrollToggle = false;
        } else {
            scrollToggle = true;
        }
        return fullpage_api.setAllowScrolling(scrollToggle, "all");
    })

    /// expanded menu: hover effects that changes the background image within the blob and the bg color outside the blob:
    //1. expanded menu: mouse enter effects
    $("#menuAnchorHome").on("mouseenter", function () {
        //mouse enter will change the svg bg image and bg color if and only if this condition is met:
        //that the current svg's bg image is NOT the same as it currently is, 
        //so as to prevent the mouse enter effect from occuring again when you have the same svg image and bg color. 
        if ($("#blobBg").attr("xlink:href") != "images/menu-home-bg.jpg") {
            $("#blobBg").animateCss("fadeOut", function () {
                $("#blobBg").attr("xlink:href", "images/menu-home-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#0B0305");
            });
        };
    });
    $("#menuAnchorBiography").on("mouseenter", function () {
        if ($("#blobBg").attr("xlink:href") != "images/menu-biography-bg.jpg") {
            $("#blobBg").animateCss("fadeOut", function () {
                $("#blobBg").attr("xlink:href", "images/menu-biography-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#595858");
            });
        }
    });
    $("#menuAnchorDiscography").on("mouseenter", function () {
        if ($("#blobBg").attr("xlink:href") != "images/menu-discography-bg.jpg") {
            $("#blobBg").animateCss("fadeOut", function () {
                $("#blobBg").attr("xlink:href", "images/menu-discography-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#A5A5A5");
            });
        }
    });
    $("#menuAnchorJournal").on("mouseenter", function () {
        if ($("#blobBg").attr("xlink:href") != "images/menu-journal-bg.jpg") {
            $("#blobBg").animateCss("fadeOut", function () {
                $("#blobBg").attr("xlink:href", "images/menu-journal-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#BF9862");
            });
        }
    });
    $("#menuAnchorContactUs").on("mouseenter", function () {
        if ($("#blobBg").attr("xlink:href") != "images/menu-contact-us-bg.jpg") {
            $("#blobBg").animateCss("fadeOut", function () {
                $("#blobBg").attr("xlink:href", "images/menu-contact-us-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#BC3445");
            });
        }
    });

    //2. expanded menu: mouseleave effects - restores the svg bg and color to the active page's state
    $(".pageAnchors").each(function(){
        $(this).mouseleave(function(){
            if ($("#menuAnchorHome").hasClass("active") && !$(this).hasClass("active")){
                $("#blobBg").attr("xlink:href", "images/menu-home-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#0B0305");
            } else if ($("#menuAnchorBiography").hasClass("active") && !$(this).hasClass("active")){
                $("#blobBg").attr("xlink:href", "images/menu-biography-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#595858");
            } else if ($("#menuAnchorDiscography").hasClass("active") && !$(this).hasClass("active")){
                $("#blobBg").attr("xlink:href", "images/menu-discography-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#A5A5A5");
            } else if ($("#menuAnchorJournal").hasClass("active") && !$(this).hasClass("active")){
                $("#blobBg").attr("xlink:href", "images/menu-journal-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#BF9862");
            } else if ($("#menuAnchorContactUs").hasClass("active") && !$(this).hasClass("active")){
                $("#blobBg").attr("xlink:href", "images/menu-contact-us-bg.jpg").animateCss("fadeIn");
                $("#header").removeClass("menuBarBgColored");
                $("#header").addClass("menuBarBgColored").css("background", "#BC3445");
            } 
        })
    });

    //3. expanded menu: active anchor class highlight & default SVG/BG change
    $(window).on('hashchange load', function () {
        var hashTag = window.location.hash;
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        switch (hash) {
            case "":
                $("#menuAnchorHome").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-home-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#0B0305");
                break;
            case "page1":
                $("#menuAnchorHome").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-home-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#0B0305");
                break;
            case "page2":
                $("#menuAnchorBiography").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-biography-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#595858");
                break;
            case "page3":
            case "page3/1":
            case "page3/2":
            case "page3/3":
            case "page3/4":
            case "page3/5":
            case "page3/6":
            case "page3/7":
                $("#menuAnchorDiscography").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-discography-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#A5A5A5");
                //changes the discography menu anchor link to the last visited discography slide:
                $("#menuAnchorDiscography").attr("href", `#${hash}`);
                break;
            case "page4":
            case "page4/1":
                $("#menuAnchorJournal").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-journal-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#BF9862");
                //changes the journal menu anchor link to the last visited journal slide:
                $("#menuAnchorJournal").attr("href", `#${hash}`);
                break;
            case "page5":
                $("#menuAnchorContactUs").addClass("active").siblings().removeClass("active");
                $("#blobBg").attr("xlink:href", "images/menu-contact-us-bg.jpg");
                $("#header").toggleClass("menuBarBgColored").css("background", "#BC3445");
                //remember to change hover color of logo and hamburger menu; currently same as bg color of this menu page
                break;
        }
    });

    // iframe tracker plugin - tracks events within gear player iframe
    var gearPlayer = $('iframe#gearPlayer')
    gearPlayer.iframeTracker({
        blurCallback: function (event) {
            //maximize iframe when mini player is clicked
            gearPlayer.contents().find('.gearMini').click(function () {
                gearPlayer.attr("height", "100%").attr("width", "100%");
            });
            //minimize iframe when close btn of gearplayer is clicked
            gearPlayer.contents().find('.gearWrap .close').click(function () {
                gearPlayer.attr("height", "60").attr("width", "500");
            })
        }
    });
    //iframe tracker for article lightbox pages
    var articleLightBox = $('iframe.articles');
    articleLightBox.iframeTracker({
        blurCallback: function (event) {
            //close iframe when overlay is clicked
            articleLightBox.contents().find('.overlay').click(function () {
                articleLightBox.css("display", "none");
            });
            //close iframe when back btn inside lightbox is clicked
            articleLightBox.contents().find('a.entryKillBtn').click(function () {
                articleLightBox.css("display", "none");
            });
        }
    });

    //Calling each album withing iframe
    //on clicking the album anchor, "button.album"
    var callAlbumPlayer = $("div.album").click(function () {
        //gearPlayer iframe is maximized, then 
        gearPlayer.attr("height", "100%").attr("width", "100%");
        //the album anchor's parent slide's index is stored (0 indexed, so need to + 1)
        let albumIndex = $(this).closest(".slide").index() + 1;
        //the index is then fed into the iframe's DOM function "callAlbum", 
        //which will then call a click event to be registered on the #album(n) element (see script section of discography html sheet)
        //for some reason, gotta use classic javascript id selector, wont work with jQuery selector - dunno why, pending investigation. 
        document.getElementById('gearPlayer').contentWindow.callAlbum(albumIndex);
    });

    //change logo and hamburger menu color on respective section/slides

        //don't forget nav dots and arrows too!

    $(window).on('hashchange load', function () {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        var logo = $("#logo");
        var burger = $(".line");
        switch (hash) {
            //black
            case "page2":
                setTimeout(function(){
                    logo.attr("src", "images/logo-black.png");
                    burger.css("stroke", "#000");
                    //set vertical nav dot color
                    $("#fp-nav span").css("background", "#000").each(function(){
                        $(this).mouseenter(function(){
                            $(this).css("background", "#BC3445");
                         })
                         .mouseleave(function(){
                            $(this).css("background", "#000");
                         });
                    })    
                    $(".hamburgerMenuIcon").mouseenter(function(){
                        burger.css("stroke", "#BC3445");
                    })
                    $(".hamburgerMenuIcon").mouseleave(function(){
                        burger.css("stroke", "#000");
                    })
                }, 700);
                logo.mouseleave(function(){
                    if ($("#expandedMenu").css("display") == "none") {
                        logo.attr("src", "images/logo-black.png");
                    }
                    else if ($("#expandedMenu").css("display") == "block") {
                        logo.attr("src", "images/logo-white.png");
                    };
                })
                //reset logo & burger color to that page/slide's default after menu is closed
                $(".hamburgerMenuIcon").on("click", function(){
                    if (!$(".ham3").hasClass("active")) {
                        setTimeout(function(){
                            logo.attr("src", "images/logo-black.png");
                            burger.css("stroke", "#000");
                            $(".hamburgerMenuIcon").mouseenter(function(){
                                burger.css("stroke", "#BC3445");
                            })
                            $(".hamburgerMenuIcon").mouseleave(function(){
                                burger.css("stroke", "#000");
                            })
                        }, 100);
                    };
                })
                break;
            //default: white
            default:
                setTimeout(function(){
                    logo.attr("src", "images/logo-white.png");
                    burger.css("stroke", "#F4F4F4");
                    //set vertical nav dot color
                    $("#fp-nav span").css("background", "#F4F4F4").each(function(){
                        $(this).mouseenter(function(){
                            $(this).css("background", "#BC3445");
                         })
                         .mouseleave(function(){
                            $(this).css("background", "#F4F4F4");
                         });
                    })      
                    $(".hamburgerMenuIcon").mouseenter(function(){
                        burger.css("stroke", "#BC3445");
                    })
                    $(".hamburgerMenuIcon").mouseleave(function(){
                        burger.css("stroke", "#F4F4F4");
                    })
                }, 700);
                logo.mouseleave(function(){
                    logo.attr("src", "images/logo-white.png");
                })
                //reset logo & burger color to that page/slide's default after menu is closed
                $(".hamburgerMenuIcon").on("click", function(){
                    if (!$(".ham3").hasClass("active")) {
                        setTimeout(function(){
                            logo.attr("src", "images/logo-white.png");
                            burger.css("stroke", "#F4F4F4");
                            $(".hamburgerMenuIcon").mouseenter(function(){
                                burger.css("stroke", "#BC3445");
                            })
                            $(".hamburgerMenuIcon").mouseleave(function(){
                                burger.css("stroke", "#F4F4F4");
                            })
                        }, 100);
                    };
                })
                break;
        }
    });


    //settings for discography page

    //change vertical dot position on load
    $(window).on('hashchange load resize', function () {
        var hashTag = window.location.hash;
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        if (
            hash == "page3" ||
            hash == "page3/1" ||
            hash == "page3/2" ||
            hash == "page3/3" ||
            hash == "page3/4" ||
            hash == "page3/5" ||
            hash == "page3/6" || 
            hash == "page3/7" 
            ) {
                if (window.matchMedia('(max-width: 576px)').matches) {
                    setTimeout(function(){
                        // $("#fp-nav").css("top", "80%"); //change position here
                        $("#fp-nav").css("top", "50%"); //change position here
                    }, 700);
                } else {
                    $("#fp-nav").css("top", "50%");
                }
        } else {
            $("#fp-nav").css("top", "50%");
        }
    });

    //settings for journal page

    //disable horizontal scroll when current slide is on first or last, based ON hash change & ON load. 
    $(window).on('hashchange load', function () {
        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        if (hash == "page4") {
            //disable left horizontal scroll
            fullpage_api.setAllowScrolling(false, "left");
            //hide left arrow
            $(".fp-controlArrow.fp-prev").css("display", "none");
            //hide right arrow
            $(".fp-controlArrow.fp-next").css("display", "none");
        } else {
            //restore left horizontal scroll
            fullpage_api.setAllowScrolling(true, "left");
            //restore left arrow
            $(".fp-controlArrow.fp-prev").css("display", "block");
            //restore right arrow
            $(".fp-controlArrow.fp-next").css("display", "block");
        }
        if (hash == "page4/1") {
            //disable right horizontal scroll and vertical scroll
            fullpage_api.setAllowScrolling(false, "up, down, right");
            //hide right arrow
            $(".fp-controlArrow.fp-next").css("display", "none");
            //change left arrow position
            $(".fp-controlArrow.fp-prev").css("left", "1vw");
        } else {
            //restore right horizontal scroll and vertical scroll
            fullpage_api.setAllowScrolling(true, "up, down, right");
            //restore right arrow
            // $(".fp-controlArrow.fp-next").css("display", "block");
            //restore left arrow position
            // $(".fp-controlArrow.fp-prev").css("left", "50px");
        }
        //stops arrow from showing up when sliding to another section
        if (hash != "page4") {
            //hide left arrow
            $(".section4").find(".fp-controlArrow.fp-prev").css("display", "none");
            //hide right arrow
            $(".section4").find(".fp-controlArrow.fp-next").css("display", "none");
        }
        //show left arrow if in inner page
        if (hash == "page4/1") {
            $(".section4").find(".fp-controlArrow.fp-prev").css("display", "block");
        }
    });

    //clicks the hidden right arrow when h1 is clicked
    $("h1#journalPageTrigger").on("click", function () {
        $(".fp-controlArrow.fp-next")[1].click();
    })

    //individual journal settings/lightbox
    
    $("a.entryReadMore").each(function(){
        $(this).click(function(){
            var articleNumber = $(this).attr("data-article");
            for(i = 0; i < 9; i++) {
                if (i = articleNumber) {
                    $("iframe.articles").attr("src", `article${articleNumber}.html`);
                    $("iframe.articles").css("display", "block");
                } 
            }
        })
    })
        
});