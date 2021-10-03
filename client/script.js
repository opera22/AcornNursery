var survey_fields = document.getElementById('sponsor_fields');
var add_more_features = document.getElementById('add_more_features');
var remove_features = document.getElementById('remove_features');

add_more_features.onclick = function(){
	var newField = document.createElement('input');
	newField.setAttribute('type','text');
	newField.setAttribute('name','sponser_input');
	newField.setAttribute('class','sponser_fields');
	newField.setAttribute('siz',50);
	newField.setAttribute('placeholder','Feature Description');
	survey_fields.appendChild(newField);
}

remove_features.onclick = function(){
	var input_tags = survey_fields.getElementsByTagName('input');
	if(input_tags.length > 3) {
		survey_fields.removeChild(input_tags[(input_tags.length) - 1]);
	}
}