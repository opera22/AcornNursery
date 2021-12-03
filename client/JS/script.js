const survey_fields = document.getElementById('features');
const add_more_features = document.getElementById('add_more_features');
const remove_features = document.getElementById('remove_features');
var count = 0;

const form = document.getElementById("form")
const project_title = document.getElementById('project_title');
const project_description = document.getElementById('project_des');
const project_catagory = document.getElementById('catagory');
const project_manager = document.getElementById('PM');

const title_feature = document.getElementById('feature_titles');
const description_feature = document.getElementById('feature_description');

var feature_items = [];

add_more_features.onclick = function () {
	var newTitle = document.createElement('input');
	count++;

	newTitle.type = "text";
	newTitle.id = "uniID" + count;
	newTitle.name = "sponser_input";
	newTitle.size = 50;
	newTitle.placeholder = "Feature Title";
	survey_fields.appendChild(newTitle);

	var newFeature = document.createElement('textarea');
	newFeature.id = "uniID2" + count;
	newFeature.name = "survey_options[]";
	newFeature.className = "spacing_support";
	newFeature.size = 50;
	newFeature.cols = 50;
	newFeature.rows = 5;
	newFeature.placeholder = "  Feature Description";
	survey_fields.appendChild(newFeature);

	feature_items.push([newTitle.id, newFeature.id]);
}

remove_features.onclick = function () {
	var input_tags = survey_fields.getElementsByTagName('input');
	if (input_tags.length > 0) {
		survey_fields.removeChild(input_tags[(input_tags.length) - 1]);
		feature_items.pop()
	}

	var textarea_tags = survey_fields.getElementsByTagName('textarea');
	if (textarea_tags.length > 0) {
		survey_fields.removeChild(textarea_tags[(textarea_tags.length) - 1]);
	}
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	if (checkInputs()) {
		var features = new Object();
		var jsonObject = new Object();

		var pm_logic = document.getElementById("Pm").checked;
		var catagory = document.getElementById("catagory").value;
		var title = document.getElementById("project_title").value;
		var description = document.getElementById("project_des").value;
		var feature_title = document.getElementById("feature_titles").value
		var feature_description = document.getElementById("feature_description").value

		jsonObject["Title"] = title;
		jsonObject["Description"] = description;
		jsonObject["PM"] = pm_logic;
		jsonObject["Catagory"] = catagory;
		features[feature_title] = feature_description

		for (let i = 0; i < feature_items.length; i++) {
			var dynamic_title = document.getElementById(feature_items[i][0]).value
			var dynamic_description = document.getElementById(feature_items[i][1]).value

			features[dynamic_title] = dynamic_description;
		}
		jsonObject["features"] = features;
		// console.log(jsonObject);

		const res = await axios.post("/api/project/create", jsonObject);
		console.log(res.data);
	}
});

function checkInputs() {
	let allGood = true;

	if (project_title.value.trim() === "") {
		setErrorFor(project_title, "Project Title cannot be blank");
		allGood = false;
	} else {
		setSuccessFor(project_title);
	}

	if (project_description.value.trim() === "") {
		setErrorFor(project_description, "Project Description cannot be blank");
		allGood = false;
	} else {
		setSuccessFor(project_description);
	}

	if (title_feature.value.trim() === "") {
		setErrorFor(title_feature, "Feature Title cannot be blank");
		allGood = false;
	} else {
		setSuccessFor(title_feature);
	}

	if (description_feature.value.trim() === "") {
		setErrorFor(description_feature, "Feature Description cannot be blank");
		allGood = false;
	} else {
		setSuccessFor(description_feature);
	}

	return allGood;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	formControl.className = "form-control error";
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}
