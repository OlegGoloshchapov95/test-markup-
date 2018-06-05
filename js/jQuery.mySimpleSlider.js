(function($){
    jQuery.fn.mySimpleSlider = function(options){
        options = $.extend({
            nextBtn:null,        // Селектор кнопки "следующий"
            prevBtn:null,       // Селектор кнопки "предыдущий"
            playBtn:true,       //Автопереключение 
            selectors:null,       // Селектор "переключателей"
            selectorsActiveClass:null,//название класса активного переключателя
            delay:4000,          // Интервал между авто пролистыванием
            duration:500,        // Скорость переключения слайдов
            animationType:"fade" //Тип анимации.  
            },options);

        var slider = this;  // Объект, к которому применен плагин
     
        var intervalID;     // Указатель таймера
        togglePag(0);
        function start(){
          if(options.nextBtn){ 
            $(options.nextBtn).on("click", next);
          }
          if(options.prevBtn){ 
            $(options.prevBtn).on("click", prev);
          }

          $(options.selectors).on("click",selectors);

          if(options.playBtn){ 
          	intervalID = setInterval(intervalNext,options.delay);
          }
        }
       
        function stop(){
          if(options.nextBtn){ 
            $(options.nextBtn).unbind(); 
          }
          if(options.prevBtn){ 
            $(options.prevBtn).unbind();
          }
          $(options.selectors).unbind();
          clearInterval(intervalID);
        } 
        function intervalNext(){
          if(togglePag()<options.selectors.length-1){
            togglePag(togglePag()+1);
          }else{
            togglePag(0);
          }   
        }
        function selectors(){
          options.playBtn = false;
          var ind = $(this).index();
          togglePag(ind);
        }
        function next(){
          options.playBtn = false;
          if(togglePag()<options.selectors.length-1){
            togglePag(togglePag()+1);
          }else{
            togglePag(0);
          }  
        }
        function prev(){
          options.playBtn = false; 
          if(togglePag()>0){
            togglePag(togglePag()-1);
          }else{
            togglePag(options.selectors.length-1);
          }  
        }
        function togglePag(n){
          if(n!==undefined){
              stop();
              var curSlide = togglePag(); 
              $(options.selectors).removeClass(options.selectorsActiveClass);
              $(options.selectors).eq(n).addClass(options.selectorsActiveClass);
              slider.hide();

              if(options.animationType=="fade"){
                if(curSlide!==n){
                  slider.eq(curSlide).show();
                  slider.eq(curSlide).fadeOut(options.duration/2,function(){
                     slider.eq(n).fadeIn(options.duration/2,function(){
                        start();
                     });
                  });
                }else{
                  slider.eq(n).show();
                  start();
                } 
              } else if(options.animationType=="slideTowards"){
                if(curSlide!==n){
                  slider.css("float","left");
                  var wrap=slider.wrapAll("<div class='slideWrap'></div>");
                  var width = slider.eq(curSlide).innerWidth();
                  slider.css("width",width+"px");
                  var length = slider.length;
                  $(".slideWrap").css("width",(length*width)+"px");
                  $(".slideWrap").css("position","relative");
                  $(".slideWrap").css("right",curSlide*width+"px");// n*width+"px"  curSlide*width+"px"
                  slider.show();
                  $(".slideWrap").animate({"right":n*width+"px"},options.duration,function(){
                     slider.hide(); slider.unwrap(); slider.css("width","100%"); slider.css("float",""); slider.eq(n).show();
                     start(); 
                  });
                }else{
                  slider.eq(n).show();
                  start();     
                }
              }else{
                slider.eq(n).show();
                start();
              }
          }else{
              for(var i=0; i<options.selectors.length; ++i){
                if($(options.selectors).eq(i).hasClass(options.selectorsActiveClass)){
                    return i;
                } 
              } 
          }
        } 
    }
})(jQuery);
