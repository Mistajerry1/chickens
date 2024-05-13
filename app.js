$( function() {
    $slider = $("#slider");
    var myLogo = [".redColor", ".yellow1", ".strokYellow1", ".yellow2", ".strokYellow2", 
  ".yellow3", ".strokYellow3", ".yellow4", ".strokYellow4", ".yellow5", ".strokYellow5"];
  
  
    TweenMax.set(".container", {
      position: 'absolute',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: "70%",
      height: "70%"
    })
  
    TweenMax.set("#slider", {
      position: 'absolute',
      bottom: '5%',
      left: '50%',
      xPercent: -50,
      yPercent: -50
    })
  
    TweenMax.set('svg', {
      visibility: 'visible'
    })
  
    var tl = new TimelineMax({onUpdate:updateSlider});
  
    tl
    .staggerFrom(".line", 0.5 , {
      autoAlpha: 0,
      ease: Elastic.easeOut.config(1, 1),
      cycle: {
        x: [100,-100],
        y: [100, -100]
      }
    }, 0.1)
    .from(".coverPath", 1.2, {
      drawSVG:"0%"
    }, 1.5)
    .from(myLogo, 0.5, {
      autoAlpha: 0
    })
    .to(".line", 0.4 , {
      autoAlpha: 0
    },tl.recent().startTime() + 0);
    
    // ** general control
    tl.timeScale(1.5);
  
    // JQuery UI : slider
    $slider.slider({
      range: false,
      min: 0,
      max: 100,
      step: 0.01,
      slide: function ( event, ui ) { 
        tl.progress( ui.value / 100 ).pause();
      },
      stop: function( event, ui ) {
        tl.play()
      }
    });
    
    function updateSlider() {
      $slider.slider("value", tl.progress() * 100);
    }
  });