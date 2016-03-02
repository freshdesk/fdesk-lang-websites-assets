(function( $ ){
  $.fn.ghostWriter = function( options ) {
    var settings = $.extend( {
       ghosttext: "",
       placeholder: "",
       infoclass: "ghostwriter_info",
       copyclass: "ghostwriter_hide"
    }, options);
    return (this.each(function(index, item) {
       var _element_id = $(item).attr("id") || "";
       item.ghostplaceholder = $(item).attr("data-placeholder") || settings.placeholder;
       item.ghosttext   = $(item).attr("data-ghost-text") || settings.ghosttext;
       item.ghosttextspan = $("<label />").text(item.ghostplaceholder);
       item.ghostCopy = $("<label />").addClass(settings.copyclass);
       item.ghostBox = $("<label />").attr("for", _element_id).addClass(settings.infoclass).append(item.ghostCopy).append(item.ghosttextspan);
       $(item).parent().prepend(item.ghostBox);
       $(item).bind("keyup keydown keypress change", 
               function(ev){
                  setTimeout(function(){
                    var placeholder_text = ($.trim($(item).val()) == "") ? item.ghostplaceholder : item.ghosttext
                    item.ghostCopy.text($(item).val());
                    item.ghosttextspan.text(placeholder_text);
                  }, 0)
               })
               .focusin(function(){
                  $(item).parent().addClass("active");
               })
               .focusout(function(){
                  $(item).parent().removeClass("active");
               });
               
    }));
  };
})(window.jQuery);
jQuery("[rel=ghostWriter]").ghostWriter()