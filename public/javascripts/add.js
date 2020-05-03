$('#editResidentForm').submit(function(e) {
    e.preventDefault();
});

$('#searchmarcetForm').submit(function(e) {
    e.preventDefault();
    var $form = $('#searchmarcetForm'), 
        formData = new FormData(),
        data = $form.serializeArray(); 
        
    data.forEach(function(element, index) {
        formData.append(element.name, element.value); 
    });
     $.ajax({                      
        url: '/marcetfiler', 
        method: 'POST', 
        dataType: 'json', 
        contentType: false, 
        processData: false, 
        data: formData, 
        beforeSend: function() { 
            $('button[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) { 
            console.log('success send to the server');
        },
        complete: function() { 
            $('button[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false); 
        }
    });
});

function editInfo(form, residentId) {
    var $form = form, 
        formData = new FormData(),
        data = $form.serializeArray(); 
        
    data.forEach(function(element, index) {
        formData.append(element.name, element.value); 
    });
        
    formData.append('residentId', residentId); 
    
    formData.append('picture', $('#picture_upload')[0].files[0]); 
        
    $.ajax({                     
        url: '/editResident', 
        method: 'POST', 
        dataType: 'json', 
        contentType: false, 
        processData: false, 
        data: formData, 
        beforeSend: function() { 
            $('button[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) { 
            console.log('success send to the server');
        },
        complete: function() { 
            $('button[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false); 
        }
    });
}    

$('#addResidentForm').submit(function(e) { 
    e.preventDefault();
});


    
$("#addMarcetForm").on("submit",function(e) {
    e.preventDefault()
    console.log($(this).serialize())

    $.ajax({
        url: '/b_marcet',
        method: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function() {
            $('button[type="submit"]', $(this)).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('button[type="submit"]', $(this)).removeClass('disabled');
            window.location.reload(false);
        }
    });
});

$("#addTorgoviyForm").on("submit",function(e) {
    e.preventDefault()
    console.log($(this).serialize())

    $.ajax({
        url: '/b_new_torgoviy',
        method: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function() {
            $('button[type="submit"]', $(this)).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('button[type="submit"]', $(this)).removeClass('disabled');
            window.location.reload(false);
        }
    });
});

$("#addTovarForm").on("submit",function(e) {
    e.preventDefault()
    console.log($(this).serialize())

    $.ajax({
        url: '/b_tovari',
        method: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function() {
            $('button[type="submit"]', $(this)).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('button[type="submit"]', $(this)).removeClass('disabled');
            window.location.reload(false);
        }
    });
});


$("#addZamovleniaForm").on("submit",function(e) {
    e.preventDefault()
    console.log($(this).serialize())
    var formData = new FormData();
        formData.append("admin",123456);

   let zamovlenia = {
      tochka:  document.querySelector('.maglabel>select').options[document.querySelector('.maglabel>select').selectedIndex].value,
      masivtov: maslist,
      torgo: document.querySelector('.torglist>select').options[document.querySelector('.torglist>select').selectedIndex].value
    };

    fetch('/b_zamovlenia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(zamovlenia)
    }).then(data => {
    window.location.replace("/feed");
    });

   });

$("#addPryxidForm").on("submit",function(e) {
    e.preventDefault()
    console.log($(this).serialize())

    $.ajax({
        url: '/b_pryxid',
        method: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        beforeSend: function() {
            $('button[type="submit"]', $(this)).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('button[type="submit"]', $(this)).removeClass('disabled');
            window.location.reload(false);
        }
    });
});




function addResident(form, buildingId) { // додати чувака
    var $form = form,
        formData = new FormData(),
        data = $form.serializeArray();
        
    data.forEach(function(element, index) {
        formData.append(element.name, element.value);
    });
        
    formData.append('buildingId', buildingId);
    
    formData.append('picture', $('#picture_upload')[0].files[0]);
        
    $.ajax({
        url: '/addResident',
        method: 'POST',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function() {
            $('button[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('button[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false);
        }
    });
}

$('#addBuildingForm').submit(function(e) { // додати будівлю
    e.preventDefault();
    var $form = $(this);
    
    $.ajax({
        url: '/addBuilding',
        method: 'POST',
        dataType: 'json',
        data: $form.serialize(),
        beforeSend: function() {
            $('input[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) {
            console.log('success send to the server');
        },
        complete: function() {
            $('input[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false);
        }
    });
});

changeImage($('#picture_upload'), function(e) { // показати яку ти картинку будеш ставити на аву, перед відправкою на сервак як в скайпі
    $('#addResidentForm .photo-box img').attr("src", e.target.result);
});


$('.knopka').on('click', function(e){
    e.preventDefault();
    
if (e.currentTarget.classList.contains('hidden')) {
    e.currentTarget.classList.remove('hidden');

} else {
    e.currentTarget.classList.add('hidden');
    document.querySelector('.labellist').classList.remove('hidden');
}
})

let maslist = []




$('.buttonlist').on('click', function(e){
    e.preventDefault();

    var poluchid = document.querySelector('.labellist>select').options[document.querySelector('.labellist>select').selectedIndex].value;
    var textspis = document.querySelector('.labellist>select').options[document.querySelector('.labellist>select').selectedIndex].textContent;
    var kilktov = document.querySelector('.inputlist').value || 0;

    document.querySelector('.spt').innerHTML = '';
    
    maslist.push({id: poluchid, text: textspis, count: kilktov});    
    maslist.forEach(item => {
        let li = document.createElement('li');
    
        li.textContent = item.text + ' Кількість: ' + item.count;
        document.querySelector('.spt').appendChild(li);
    });

    document.querySelector('.knopka').classList.remove('hidden');
    document.querySelector('.labellist').classList.add('hidden');
});