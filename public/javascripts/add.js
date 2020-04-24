$('#editResidentForm').submit(function(e) {
    e.preventDefault();
});

$('#searchmarcetForm').submit(function(e) {
    e.preventDefault();
    var $form = $('#searchmarcetForm'), // береш форму
        formData = new FormData(),
        data = $form.serializeArray(); // вибираєш з неї данні
        
    data.forEach(function(element, index) {
        formData.append(element.name, element.value); // додаєш їх для відправки з більш крутого типу (тут і файли можна закидати і додаткові - свої змінні)
    });
     $.ajax({ // відправляєш на сервак                     
        url: '/marcetfiler', // урл
        method: 'POST', // метод відправки
        dataType: 'json', // тип кодування для сервака
        contentType: false, // для фоток
        processData: false, // тож для фоток
        data: formData, // данні що відправляєш
        beforeSend: function() { // до відправки що робити
            $('button[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) { // у разі відповіді від сервака ( приймає калбек )
            console.log('success send to the server');
        },
        complete: function() { // коли успішно завершено
            $('button[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false); // перезагрузка сторінки
        }
    });
});

function editInfo(form, residentId) { // правка інфи про користувача
    var $form = form, // береш форму
        formData = new FormData(),
        data = $form.serializeArray(); // вибираєш з неї данні
        
    data.forEach(function(element, index) {
        formData.append(element.name, element.value); // додаєш їх для відправки з більш крутого типу (тут і файли можна закидати і додаткові - свої змінні)
    });
        
    formData.append('residentId', residentId); // додаєш айдішник користувача
    
    formData.append('picture', $('#picture_upload')[0].files[0]); // додаєш його картиночку
        
    $.ajax({ // відправляєш на сервак                     
        url: '/editResident', // урл
        method: 'POST', // метод відправки
        dataType: 'json', // тип кодування для сервака
        contentType: false, // для фоток
        processData: false, // тож для фоток
        data: formData, // данні що відправляєш
        beforeSend: function() { // до відправки що робити
            $('button[type="submit"]', $form).addClass('disabled'); 
        },
        success: function(data) { // у разі відповіді від сервака ( приймає калбек )
            console.log('success send to the server');
        },
        complete: function() { // коли успішно завершено
            $('button[type="submit"]', $form).removeClass('disabled');
            window.location.reload(false); // перезагрузка сторінки
        }
    });
}    //спасибі звісно але мені так в загальному що функції роблять і все

$('#addResidentForm').submit(function(e) { // заборона стандартної відправки форми
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