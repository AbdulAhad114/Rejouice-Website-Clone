function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locoScroll()

function cursorEffect(){
    const heroContent = document.querySelector('#hero-content');
    const cursor = document.querySelector("#cursor");

    heroContent.addEventListener("mousemove", (move)=>{
        gsap.to(cursor,{
            x:move.x,
            y:move.y
        }) 
    })

    heroContent.addEventListener('mouseenter', function(){
        gsap.to(cursor,{
            scale:1,
            opacity:1
        })
    })

    heroContent.addEventListener('mouseleave', function(){
        gsap.to(cursor,{
            scale:0,
            opacity:0
        })
    })
}
cursorEffect()  

function section2Animation(){
    const ventureH1s = gsap.utils.toArray(".venture-h1");
    
    ventureH1s.forEach(ventureH1 => {
        gsap.from(ventureH1,{
            y:120,
            opacity: 0,
            stagger:0.25,
            duration:1,
            // ease: "power3.out",
            scrollTrigger:{
                trigger: ventureH1,
                scroller: "#main",
                start: "top 40%",
                end: "top 37%",
                scrub: 2,
            }
        })
    })
}
section2Animation()


function circleAnimation(){
    const movingCircle = document.getElementById("movingCircle");
    const numberText = document.getElementById("numberText");
    const radius = 49; // Radius of the circular path
    const centerX = 50; // Center X of the circular path
    const centerY = 50; // Center Y of the circular path
    const duration = 2800; // Total animation duration in milliseconds
    const percentage = 0.60; // Percentage of the circle to animate (60%)
    const startNumber = 8; // Starting number
    const endNumber = 2; // Ending number
    
    // Calculate the total animation duration based on the desired percentage
    const animationDuration = duration * percentage;
    
    let animationFrameId;
    let startTime = null;
    
    // Function to start the animation
    function startAnimation() {
      // Initialize the start time and set the initial position
      startTime = performance.now();
      // Set the circle to start at the top of the path (12 o'clock)
      const initialAngle = -Math.PI / 2; // Angle for 12 o'clock position
      const initialX = centerX + radius * Math.cos(initialAngle);
      const initialY = centerY + radius * Math.sin(initialAngle);
      movingCircle.setAttribute("cx", initialX);
      movingCircle.setAttribute("cy", initialY);
      numberText.textContent = startNumber; // Initialize number text
      animationFrameId = requestAnimationFrame(animateCircle);
    }
    
    // Function to stop the animation
    function stopAnimation() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
    
    // Function to animate the circle and number
    function animateCircle(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
    
      // Calculate the progress as a percentage of time elapsed (0 to 1)
      const progress = Math.min(elapsed / animationDuration, 1);
    
      // Calculate the angle in radians (from 12 o'clock position for percentage of 2 * PI)
      const angle = -Math.PI / 2 + progress * (2 * Math.PI * percentage);
    
      // Update the `cx` and `cy` of the circle to move it in a circular path
      const cx = centerX + radius * Math.cos(angle);
      const cy = centerY + radius * Math.sin(angle);
    
      // Apply the new `cx` and `cy` to the circle
      movingCircle.setAttribute("cx", cx);
      movingCircle.setAttribute("cy", cy);
    
      // Calculate and update the number
      const currentNumber = startNumber - (progress * (startNumber - endNumber));
      numberText.textContent = Math.round(currentNumber);
    
      // Continue animating if the duration isn't over
      if (elapsed < animationDuration) {
        animationFrameId = requestAnimationFrame(animateCircle);
      }
    }
    
    // IntersectionObserver to detect when the SVG is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation(); // Start animation when in view
        } else {
          stopAnimation(); // Stop animation when out of view
        }
      });
    }, { threshold: [0.5] }); // Adjust threshold based on when you want the animation to trigger
    
    // Observe the SVG element
    const svgElement = document.getElementById("circleClock");
    observer.observe(svgElement);
    
}
circleAnimation()

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
  });

var t1 = gsap.timeline()

t1.from("#loader h3",{
    x:40,
    opacity:0,
    duration:1,
    stagger:0.1
})
t1.to("#loader h3",{
    opacity:0,
    x:-10,
    duration:1,
    stagger:0.1
})
t1.to("#loader",{
    opacity:0
})
t1.from("#hero-content h1 span",{
    y:100,
    stagger:0.2,
    opacity:0,
    duration:0.5,
    delay:-0.1
})
t1.to("#loader",{
    display:"none"
})

