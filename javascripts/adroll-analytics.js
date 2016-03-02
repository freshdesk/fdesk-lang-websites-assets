// Freshdesk session cookies
if(session){
	if(!($.cookie("fd_fr"))){$.cookie("fd_fr",session["current_session"]["referrer"],{expires:365});}
	if(!($.cookie("fd_flu"))){$.cookie("fd_flu",session["current_session"]["url"],{expires:365});}
	if(!($.cookie("fd_se"))){$.cookie("fd_se",session["current_session"]["search"]["engine"],{expires:365});}
	if(!($.cookie("fd_sq"))){$.cookie("fd_sq",session["current_session"]["search"]["query"],{expires:365});}

	var visits = ($.cookie("fd_vi"))||0;
	$.cookie("fd_vi", (parseInt(visits)+1),{expires:365});
}