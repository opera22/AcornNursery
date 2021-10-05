var survey_fields = document.getElementById('right');
var add_more_features = document.getElementById('add_more_features');
var remove_features = document.getElementById('remove_features');

add_more_features.onclick = function(){
	var newTitle = document.createElement('input');
	newTitle.setAttribute('type','text');
	newTitle.setAttribute('name','sponser_input');
	newTitle.setAttribute('class','sponser_fields');
	newTitle.setAttribute('size',50);
	newTitle.setAttribute('placeholder','Feature Title');
	survey_fields.appendChild(newTitle);

	var newFeature = document.createElement('input');
	newFeature.setAttribute('type','text');
	newFeature.setAttribute('name','sponser_input');
	newFeature.setAttribute('class','sponser_fields');
	newFeature.setAttribute('size',50);
	newFeature.setAttribute('placeholder','Feature Description');
	survey_fields.appendChild(newFeature);
}

remove_features.onclick = function(){
	var input_tags = survey_fields.getElementsByTagName('input');
	if(input_tags.length > 2) {
		survey_fields.removeChild(input_tags[(input_tags.length) - 1]);
		survey_fields.removeChild(input_tags[(input_tags.length) - 1]);
	}
}