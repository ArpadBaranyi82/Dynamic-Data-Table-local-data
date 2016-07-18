
var xhr = new XMLHttpRequest();
var selection = [];
xhr.open('GET','persons.json', true);
xhr.send(null);
var responseObject;

xhr.onload = function () {
    if (xhr.status === 200) {
        responseObject = JSON.parse(xhr.responseText);
        localStorage.setItem('lStorage', JSON.stringify(responseObject));
        for (var i = 0; i < responseObject.length; ++i) {
       
            if (selection.length <= responseObject.length) {
                selection.push(responseObject[i]);
            }
        }
        // Set table with second parameter per pages setup
        createTable(selection, 10);
    }
};

// Build data-table dynamically from list of values return from xhr
function createTable(listOfData, dataPerPages) {
    // Create groups to divide list of data into number of pages
	var numberOfPages = Math.ceil(listOfData.length / dataPerPages);
	var group = {};
	var counter = 0;
	var id = 0;
	
		for(var p = 1;  p < numberOfPages+1;p++){
			group[p] = [];
			for(counter; counter < listOfData.length;counter++){
			if(group[p].length < dataPerPages){
				group[p].push(listOfData[counter]);
			}else{
				break;
			}
		}
		}
	
    // Dynamically build menu for paginator and filters
		var mainDiv = document.createElement('div');
		mainDiv.id = "mainDiv";
		var menu = document.createElement('div');
		var subMenu = document.createElement('div');
		var addBtn = document.createElement('button');
		var graphBtn = document.createElement('button');
		graphBtn.id = "graphBtn";
		graphBtn.textContent = "Graph";
		addBtn.id = "addBtn";
		addBtn.textContent = "Add";
        menu.id = "menu";
	    menu.classList.add('paginate');
	    menu.classList.add('paginate-dark');
	    menu.classList.add('wrapper');
	    var title = document.createElement('h3');
	    title.id = "title";
	    title.textContent = "Dynamic Data Table";
	    menu.appendChild(title);

	    subMenu.id = "Submenu";
	    subMenu.classList.add('paginate');
	    subMenu.classList.add('paginate-dark');
	    subMenu.classList.add('wrapper');

	var pager = document.createElement('ul');
		pager.id = 'pager';
		for(var i = 1; i <= numberOfPages;i++)
		{
			var page = document.createElement('li');
			page.className = 'pages';
			var pageLink = document.createElement('a');
			pageLink.innerHTML = i;
			pageLink.classList.add(i);
			page.appendChild(pageLink);
			pager.appendChild(page);
			subMenu.appendChild(pager);
			subMenu.appendChild(graphBtn);
			subMenu.appendChild(addBtn);
		}
		
		mainDiv.appendChild(menu);
		mainDiv.appendChild(subMenu);

	addBtn.onclick = function () {
	    openForm();
	}

	graphBtn.onclick = function () {
	    showChart();
	}
	
	for(var j = 1; j <= numberOfPages; j++)
	{
		var div = document.createElement('div');
		div.id = j;
		div.classList.add('page');
		
			// Create table for each page with selected items per page controlled by group object
		var newTable = document.createElement('table');
		newTable.id = "mainTable";
		var currentList = group[j];
				for (i = 0; i < currentList.length; i++) 
				{
				    if (i == 0) {
				        var tableRowFirst = document.createElement('tr');
				        tableRowFirst.id = "tableRowFirst";
				        createTableData('ID', tableRowFirst, "text");
				        createTableData('NAME', tableRowFirst, "text");
				        createTableData('JOB', tableRowFirst, "text");
				        createTableData('AGE', tableRowFirst, "text");
				        createTableData('NICKNAME', tableRowFirst, "text");
				        createTableData('EMPLOYEE', tableRowFirst, "text");
				        createTableData('REMOVAL', tableRowFirst, "text");

				        newTable.appendChild(tableRowFirst);
				    }

				var tableHeading  = i+1;			
				var tableHeader = document.createElement('th');
			
				//Create table rows
				var tableRow = document.createElement('tr');
				var tableRowFirstHead = document.createElement('th');
				tableRow.appendChild(tableRowFirstHead);

				var deleteTD = document.createElement('td');
				var deleteBtn = document.createElement('button');
				deleteBtn.classList.add("deleteBtn");
				deleteBtn.textContent = "delete";
				deleteTD.appendChild(deleteBtn);

				//create table data
				var name = createTableData(currentList[i].name, tableRow, "text");
				var job = createTableData(currentList[i].job, tableRow, "text");
				var age = createTableData(currentList[i].age, tableRow, "text");
				var nick = createTableData(currentList[i].nick, tableRow, "text");
				var employee = createTableData(currentList[i].employee, tableRow, "check");

				tableRow.appendChild(deleteTD);
					
				// Add classes to table lements
				newTable.classList.add('jsTable');
				tableHeader.classList.add('jsTableHead');
				tableRowFirstHead.classList.add('jsTableRowHead');
				tableRow.classList.add('jsRow');
				tableRow.classList.add('row' + i);

				//Add text content and colspan attribute to tableHeader
				tableHeader.textContent = tableHeading;
				tableHeader.setAttribute("colspan", "4");

				tableRowFirstHead.textContent = id;
				id++;

				//append dom with table
				newTable.appendChild(tableRow);
				};
				// add table to each page div
				div.appendChild(newTable);
				mainDiv.appendChild(div);
				document.body.appendChild(mainDiv);
	}

	var dataLabel = document.createElement('h3');
	dataLabel.id = "dataLabel";
	dataLabel.textContent = "Data dump";
	var dataDump = document.createElement('div');
	var datafield = document.createElement('textarea');
	datafield.id = "textarea";
	dataDump.id = "dataDump";
	dataDump.appendChild(datafield);
	mainDiv.appendChild(dataLabel);
	mainDiv.appendChild(dataDump);
	
	// Set button and checkbox functionalities
	var pages = document.getElementsByClassName('page');
			for(var i = 0; i < pages.length;i++){
				pages[i].style.display = "none";
			}
			document.getElementById('1').style.display = "block";
	
	var buttons = document.getElementsByTagName('a');
	for(var x = 0; x <= buttons.length-1;x++){
		buttons[x].onclick = function(){
			var pages = document.getElementsByClassName('page');
			for(var i = 0; i < pages.length;i++){
				pages[i].style.display = "none";
			}
			document.getElementById(this.className).style.display = "block";
		}
	}

	var btnDelete = document.getElementsByClassName('deleteBtn');
	var checkboxes = document.getElementsByClassName('checkbox');
	for (var x = 0; x <= btnDelete.length - 1; x++) {
	    btnDelete[x].onclick = function () {
	        var name = this.parentElement.parentElement.childNodes[1].textContent;
	        console.log(responseObject);
	        for (var x in responseObject) {
	            if (responseObject[x].name == name) {
	                responseObject.remove(x);
	            }
	        }
	        localStorage.setItem('lStorage', JSON.stringify(responseObject));
	        newResponseObject = JSON.parse(localStorage.getItem('lStorage'));
	        var node = document.getElementById('mainDiv');
	        if (node.parentNode) {
	            node.parentNode.removeChild(node);
	        }
	        createTable(newResponseObject, 10);
	        document.getElementById('textarea').textContent = "";
	        for (var x in newResponseObject) {
	            var str = JSON.stringify(newResponseObject[x], undefined, 4);
	            document.getElementById('textarea').textContent += str;
	        }
	        this.parentNode.parentNode.remove();
	    }
	}

	for (var x = 0; x <= checkboxes.length - 1; x++) {
	    checkboxes[x].onchange = function () {
	        console.log(this.checked);
	        var name = this.parentElement.parentElement.childNodes[1].textContent;
	        for (var x in responseObject) {
	            if (responseObject[x].name == name) {
	                responseObject[x].employee = this.checked;
	            }
	        }
	        localStorage.setItem('lStorage', JSON.stringify(responseObject));
	        newResponseObject = JSON.parse(localStorage.getItem('lStorage'));
	        var node = document.getElementById('mainDiv');
	        if (node.parentNode) {
	            node.parentNode.removeChild(node);
	        }
	        createTable(newResponseObject, 10);
	        document.getElementById('textarea').textContent = "";
	        for (var x in newResponseObject) {
	            var str = JSON.stringify(newResponseObject[x], undefined, 4);
	            document.getElementById('textarea').textContent += str;
	        }
	        this.parentNode.parentNode.remove();
	    }
	}
}

// Support functions...

// Find primes within post code vales and save them into array, if array length is greater than 1 return true
function createTableData(data, tableRow,type) {
    var newData = document.createElement('td');
    if (type == 'text') {      
        newData.textContent = data;      
    }
    if (type == 'check') {
        var checkbox = document.createElement('input');
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.value = data;
        checkbox.checked = data;
        newData.appendChild(checkbox);
    }
    tableRow.appendChild(newData);
}

function openForm() {
    var box = document.createElement("div");
    var modal = document.createElement("div");
    var breakLine = document.createElement("br");
    modal.classList.add("modal-content");
    box.classList.add('modal');
    var f = document.createElement("form");
    var title = document.createElement("h4");
    title.textContent = "Add Employee";
    f.appendChild(title);
    
    var nameField = createInputElement("Name","text");
    var jobField = createInputElement("Job","text");
    var AgeField = createInputElement("Age","text");
    var nickField = createInputElement("Nickname","text");
    var employeeField = createInputElement("Employee", "check");
    var cancelBtn = createInputElement("close", "button");
    var okBtn = createInputElement("ok", "button");
    
    f.appendChild(nameField);
    f.appendChild(jobField);
    f.appendChild(AgeField);
    f.appendChild(nickField);
    f.appendChild(employeeField);
    
    modal.appendChild(f);
    modal.appendChild(cancelBtn);
    modal.appendChild(okBtn);
    box.appendChild(modal);
    document.body.appendChild(box);

    box.style.display = 'block';

    okBtn.onclick = function () {
        var name = nameField.childNodes[1].value;
        var job = jobField.childNodes[1].value;
        var age = AgeField.childNodes[1].value;
        var nick = nickField.childNodes[1].value;
        var employee = employeeField.childNodes[1].value;
        addRow(name, job, age, nick, employee);
        document.body.removeChild(box);
    }
    cancelBtn.onclick = function () {
        document.body.removeChild(box);
    }
}

function showChart() {

    var firstLevel = 0;
    var secondLevel = 0;
    var thirdLevel = 0;
    var forthLevel = 0;
    var fifthLevel = 0;

    for (var i in responseObject) {
        if (responseObject[i].age >= 0 && responseObject[i].age <= 18) { firstLevel++; }
        if (responseObject[i].age >= 19 && responseObject[i].age <= 30) { secondLevel++; }
        if (responseObject[i].age >= 31 && responseObject[i].age <= 40) { thirdLevel++; }
        if (responseObject[i].age >= 41 && responseObject[i].age <= 50) { forthLevel++; }
        if (responseObject[i].age >= 51) { fifthLevel++; }
    }

    var box = document.createElement("div");
    var modal = document.createElement("div");
    modal.classList.add("modal-content");
    box.classList.add('modal');

    var chart = new CanvasJS.Chart(modal, {
        theme: "theme2",//theme1
        title: {
            text: "Basic Column Chart - CanvasJS"
        },
        animationEnabled: false,   // change to true
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: [
                { label: "0-18", y: firstLevel },
                { label: "19-30", y: secondLevel },
                { label: "31-40", y: thirdLevel },
                { label: "41-50", y: forthLevel },
                { label: "over 51", y: fifthLevel }
            ]
        }
        ]
    });
    chart.render();
    
    box.appendChild(modal);
    document.body.appendChild(box);

    box.style.display = 'block';

     box.onclick = function () {
        if(box.style.display != 'none')
        document.body.removeChild(box);   
    }
}

function createInputElement(name, type) {
    var nameField = document.createElement("p");
    if (type === 'text') {    
        var namelbl = document.createTextNode(name);
        var i = document.createElement("input"); //input element, text
        i.classList.add('input');
        i.setAttribute('type', "text");
        i.setAttribute('name', name);
        nameField.appendChild(namelbl);
        nameField.appendChild(i);
    }
    if (type === 'check') {
        var namelbl = document.createTextNode(name);
        var i = document.createElement("input"); //input element, text
        i.classList.add('input');
        i.id = "checkBtn";
        i.setAttribute('type', "checkbox");
        i.setAttribute('name', name);
        nameField.appendChild(namelbl);
        nameField.appendChild(i);
    }
    if (type === 'button') {
        var i = document.createElement("button"); //input element, text
        i.classList.add(name);
        i.textContent = name;
        i.id = name;
        nameField.appendChild(i);
    }

    return nameField;
}

function addRow(name, job, age, nick, employee) {
    var oldItems = responseObject;
    var object = { 'name': name, 'job': job, 'age': age, 'nick': nick, 'employee': employee };
    oldItems.push(object);
    localStorage.setItem('lStorage', JSON.stringify(oldItems));
    var node = document.getElementById('mainDiv');
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
    newResponseObject = JSON.parse(localStorage.getItem('lStorage'));
    createTable(newResponseObject, 10);
    document.getElementById('textarea').textContent = "";
    for (var x in newResponseObject) {
        var str = JSON.stringify(newResponseObject[x], undefined, 4);
        document.getElementById('textarea').textContent += str;
    }
    
}

Array.prototype.remove = function (index) { this.splice(index, 1); };






