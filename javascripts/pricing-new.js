(function(){
  
   $('.onoffswitch').on('click',function(){
        $('.pr-package').removeClass('active');
        if ($('input#pricing_switch').is(':checked')){
          $('.pr-annual').addClass('active');
          $('.pr-plan-list').not('.pr-plan-list.pr-plan-free').each(function(){
            var annualPrice = $(this).find('.plans').data('plan-annual');
            $(this).find('.plans').text(annualPrice);
          });
        }else{
          $('.pr-month').addClass('active'); 
          $('.pr-plan-list').not('.pr-plan-list.pr-plan-free').each(function(){
            var monthlyPrice = $(this).find('.plans').data('plan-monthly');
            $(this).find('.plans').text(monthlyPrice);
          });
        }
    });
  
 }());