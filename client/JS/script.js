const survey_fields = document.getElementById('features');
const add_more_features = document.getElementById('add_more_features');
const remove_features = document.getElementById('remove_features');
var count = 0;

const form = document.getElementById("form")
const project_title = document.getElementById('project_title');
const project_description = document.getElementById('project_des');
const project_catagory = document.getElementById('catagory');
const project_manager = document.getElementById('PM');

add_more_features.onclick = function () {
	var newTitle = document.createElement('input');
	count++;

	newTitle.type = "text";
	newTitle.id = "uniID" + count;
	newTitle.name = "sponser_input";
	newTitle.class = "sponser_fields";
	newTitle.size = 50;
	newTitle.placeholder = "Feature Title";
	survey_fields.appendChild(newTitle);

	var newFeature = document.createElement('textarea');
	newFeature.id = "uniID2" + count;
	newFeature.name = "survey_options[]";
	newFeature.class = "feature_items";
	newFeature.size = 50;
	newFeature.cols = 50;
	newFeature.rows = 5;
	newFeature.placeholder = "Feature Description";
	survey_fields.appendChild(newFeature);
}

remove_features.onclick = function () {
	var input_tags = survey_fields.getElementsByTagName('input');
	if (input_tags.length > 0) {
		survey_fields.removeChild(input_tags[(input_tags.length) - 1]);
	}

	var textarea_tags = survey_fields.getElementsByTagName('textarea');
	if (textarea_tags.length > 0) {
		survey_fields.removeChild(textarea_tags[(textarea_tags.length) - 1]);
	}
}

form.addEventListener("submit", async (e) => {
	
	for (let i = 0; i < survey_fields.childNodes.length; i++){
		var textField = survey_fields.childNodes[i];
		console.log(textField);
	}


	// var object = {};
	// form.forEach((value, key) => {
	// 	// Reflect.has in favor of: object.hasOwnProperty(key)
	// 	if (!Reflect.has(object, key)) {
	// 		object[key] = value;
	// 		return;
	// 	}
	// 	if (!Array.isArray(object[key])) {
	// 		object[key] = [object[key]];
	// 	}
	// 	object[key].push(value);
	// });
	// var json = JSON.stringify(object);
});