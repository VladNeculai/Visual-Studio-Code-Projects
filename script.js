
function myFunction() {
    document.getElementById("titlu").innerHTML = "'Straya"}
 

 function arunca() {
    var elem = document.getElementById("boomerang"); 
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        
            pos++;  
            elem.style.left = pos + 'px'; 
        }
    }

    var para = document.createElement("p");
    var node = document.createTextNode("Despite the problems encountered with the cull, the farmers of the region once again requested military assistance in 1934, 1943, and 1948, only to be turned down by the government. Instead, the bounty system that had been instigated in 1923 was continued, and this proved to be effective: 57,034 bounties were claimed over a six-month period in 1934.");
    para.appendChild(node);
    
    var element = document.getElementById("div1");
    element.appendChild(para);

    var parent = document.getElementById("div1");
    var child = document.getElementById("p1");
    parent.removeChild(child);

    function bigImg(x) {
        x.style.height = "400px";
        x.style.width = "400px";
    }
    
    function normalImg(x) {
        x.style.height = "200px";
        x.style.width = "300px";
    }

    const list = document.getElementById('list');
    const formName = document.getElementById('formName');
    const formUrl = document.getElementById('formUrl');
    const addButton = document.getElementById('addButton');
    let updateButton = document.getElementById('updateButton');   
    // fetch the roo list
    function getRoos() {
        fetch('http://localhost:3000/roos')
            .then(function (response) {
                // Trasform server response to get the roos
                response.json().then(function (roos) {
                    appendRoosToDOM(roos);
                });
            });
    };
    
    // post roo
    function postRoo() {
        // creat post object
        const postObject = {
            name: formName.value,
            img: formUrl.value
        }
        // post roo
        fetch('http://localhost:3000/roos', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postObject)
        }).then(function () {
            // Get the new roo list
            getRoos();
            // Reset Form
            resetForm();
        });
    }
    
    // delete roo
    function deleteRoo(id) {
        // delete Roo
        fetch(`http://localhost:3000/roos/${id}`, {
            method: 'DELETE',
        }).then(function () {
            // Get the new roo list
            getRoos();
        });
    }
    
    // update roo
    function updateRoo(id) {
        // creat put object
        const putObject = {
            name: formName.value,
            img: formUrl.value
        }
        // update roo
        fetch(`http://localhost:3000/roos/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(putObject)
        }).then(function () {
            // Get the new roos list
            getRoos();
    
            // change button event from update to add
            addButton.disabled = false;
    
            // remove all event from update button
            clearUpdateButtonEvents();
    
            // Reset Form
            resetForm();
        });
    }
    
    // copy edited roo information to form and add event listener on update button
    function editRoo(roo) {
        // copy roo information to form
        formName.value = roo.name;
        formUrl.value = roo.img;
        
        // disable add button
        addButton.disabled = true;
    
        // clear all events update button events
        clearUpdateButtonEvents();
    
        // enable and add event on update button
        updateButton.disabled = false;
        updateButton.addEventListener('click', function () {
            updateRoo(roo.id)
        });
    
    }
    
    // Create and append img and name DOM tags
    function appendRoosToDOM(roos) {
        // remove roo list if exist
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        // create and append tags
        for (let i = 0; i < roos.length; i++) {
            // create image obj
            let img = document.createElement('img');
            img.src = roos[i].img;
            // create name obj
            let name = document.createElement('span');
            name.innerText = roos[i].name;
    
            // create button and event for edit and delete
            let editButton = document.createElement('button')
            // add event on btn and pass roo id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
            editButton.addEventListener('click', function () {
                editRoo(roos[i])
            });
            editButton.innerText = 'Edit';
            let deleteButton = document.createElement('button')
            // add event on btn and pass roo object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
            deleteButton.addEventListener('click', function () {
                deleteRoo(roos[i].id)
            });
            deleteButton.innerText = 'Delete';
            // create a container for img and name
            let container = document.createElement('div');
            // append elements to container
            container.appendChild(img);
            container.appendChild(name);
            container.appendChild(editButton);
            container.appendChild(deleteButton);
    
            // append container to DOM (list div)
            list.appendChild(container);
        }
    }
    
    // reset form
    function resetForm() {
        formName.value = '';
        formUrl.value = '';
    }
    //  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
    function clearUpdateButtonEvents() {
        let newUpdateButton = updateButton.cloneNode(true);
        updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
        updateButton = document.getElementById('updateButton');
    }
    // add event listener on add button
    addButton.addEventListener('click', postRoo);
    
    // get roos
    getRoos();