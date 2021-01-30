let active = $(".active");
let images = $(".img");

images.on("click", changePicture);

function changePicture(event) {
    if (event.target.closest(".img")){
        let target = event.target;
        let activeSrc = active.attr("src");
        active.attr("src", target.src);
        target.src = activeSrc;

        target.classList.add("fade-in");
        active.addClass("fade-in");

        setTimeout( () => {
            removeFadeIn(target, active);
        }, 500);
    };
    
};

function removeFadeIn(x, y) {
    x.classList.remove("fade-in");
    y.removeClass("fade-in");
};


let cardEl = $(".active");
let card = {};

function getCardDetails(target) {
    let currentCard = $(target).closest(".poke-card");
    let info = $(currentCard).find(".poke-info");
    let image = $(currentCard).find(".poke-image");
    card = {
        currentCard,
        info,
        image
    };

    return card;
};

$(cardEl).on("mouseenter", (e) => {
    let card = getCardDetails(e.target);
    $(card.currentCard).css("transition", "none");
});

$(cardEl).on('mousemove', (e) => {
    let center = {
        x: (e.target.offsetWidth)/2,
        y: (e.target.offsetHeight)/2
    };

    let mouse = {
        x: e.offsetX,
        y: e.offsetY
    }

    let x = (center.x - mouse.x) / 40;
    let y = (center.y - mouse.y) / 40;

    $(card.currentCard).css("transform", `rotateY(${-x}deg) rotateX(${y}deg)`);

    $(card.info).css("transform", "translateZ(40px)")
    $(card.image).css("transition", "transform .5s")
    $(card.image).css("transform", "translateZ(60px)")
});

$(cardEl).on("mouseleave", () => {
    $(card.currentCard).css("transition", "all .5s ease");
    $(card.currentCard).css("transform", "rotateY(0deg) rotateX(0deg)");

    $(card.info).css("transform", "translateZ(0px)");
    $(card.image).css("transform", "translateZ(0px) rotateZ(0deg)");
    card = {};
});

// function to download image as jpeg when button is clicked using html2canvas library

$("#download-jpeg").on("click", function() {
    window.scrollTo(0,0);
    
    html2canvas(document.getElementById("image-area"), {height: window.outerHeight + window.innerHeight,
        windowHeight: window.outerHeight + window.innerHeight,      width: window.outerWidth + window.innerWidth,
        windowWidth: window.outerWidth + window.innerWidth, scrollY: -window.scrollY, scrollX: -window.scrollX, allowTaint: true, useCORS: true}).then(canvas => {
        onrendered: document.body.appendChild(canvas);
        var a = document.createElement("a");
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg", 0.9).replace("image/jpeg", "image/octet-stream");
        a.download = "roster.jpeg";
        a.click();
        // clean up the canvas after
        document.body.removeChild(canvas);
      }
)});