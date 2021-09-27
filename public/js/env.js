// For socket
let socket = io();

socket.on('datetime', (msg) => {
  document.querySelector('p.date-time').innerHTML = msg
})

const testButtonFunction = () => {
  alert('Thank you for clicking, sign up button is not yet active!')
}
const addProjectToApp = (project) => {
  $.ajax({
    url: '/users',
    data: project,
    type: 'POST',
    success: (result) => {
      alert(result.message);
      location.reload();

    }
  })
}

const submitForm = () => {
  const formData = {};

  const title = $('#titlePet').val();
  console.log(title)

  formData.title = title;
  formData.image = $('#image').val();
  formData.link = $('#link').val();
  formData.description = $('#description').val();

  console.log("form data: ", formData)
  // console.log("type of form data: ", typeof formData)


  addProjectToApp(formData)

}

const getProjects = () => {
  $.get('/users', (response) => {
    if (response.statusCode == 200) {
      console.log(response)
      addcard(response.data);
    }
    else {
      console.log(response)
    }
  })
}

const addcard = (items) => {
  items.forEach(item => {
    let itemToAppend =
      '<div class="col s4 " id ="' + item._id + '" >' +
      '<a class="waves-effect waves-light btn delete">' +
      '<i class="material-icons ">delete</i>' +
      'delete</a>' +
      ' <div class="card medium">' +
      '<div class="card-image waves-effect waves-block waves-light">' +
      '<img class="activator" src="' + item.image + '"></div>' +
      '<div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span>' +
      '<p>'+ item.description +'</p>'+
      '<br>'+
      '<p><a href="' + item.link + '">about</a></p>' +
      '</div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">Edit Card' +
      '<i class="material-icons right">close</i>' +
      '</span>' +
      '<form class="col s12">' +
      '<div class="row">' +
      '<div class="input-field col s6">' +
      '<input id="updatetitlePet'+item._id + '" name="title" type="text" value="' + item.title + '" class="validate">' +
      '<label class="active" for="title">Title</label>' +
      '</div>' +
      '<div class="input-field col s6">' +
      '<input id="updateimage'+item._id +'" name ="image" type="text" value="' + item.image + '" class="validate">' +
      '<label class="active" for="image">Image</label>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="input-field col s12">' +
      '<input id="updatelink'+item._id +'" type="text" value="' + item.link + '" class="validate">' +
      '<label class="active" for="link">Link</label>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="input-field col s12">' +
      '<input id="updatedescription'+item._id +'" name ="description" type="text" value="' + item.description + '" class="validate">' +
      '<label class="active" for="description">Description</label>' +
      '</div>' +
      '</div>' +
      '<div class="row center">' +
      '<a class="waves-effect waves-light btn submit" id="formUpdate">Submit</a>' +
      '</div>' +
      '</form>'
    '</div>';
    $('#card-section').append(itemToAppend)
  });
}
$('div').on("click", "a.waves-effect.waves-light.btn.submit", function () {
  const id = $(this).parent().parent().parent().parent().parent().attr('id');
  console.log(id)
  updateRecord(id)
})
const updateRecord = (id) => {
  const title = $('#updatetitlePet'+id).val();
  const image = $('#updateimage'+id).val();
  const link = $('#updatelink'+id).val();
  const description = $('#updatedescription'+id).val();

  const newData = {
    id: id,
    title: title,
    image: image,
    link: link,
    description: description
  };
  console.log(newData)

  $.ajax({
    url: "/users/upload",
    data: newData,
    type: "PUT",
    success: (result) => {
      alert(result.msg);
      location.reload();

    }
  })

}



$(document).ready(function () {
  console.log('Ready')
  $('#formSubmit').click(() => {
    submitForm();
  })


  getProjects();
  $('.modal').modal();




})
// Handling dynamically created items
$('div').on("click", "a.waves-effect.waves-light.btn.delete", function () {
  const id = $(this).parent().attr('id')
  console.log(id)
  deletRecord(id);

})

const deletRecord = (id) => {

  const projectData = {
    id: id
  }
  $.ajax({
    url: "/users/delete",
    data: projectData,
    type: "DELETE",
    success: (result => {
      console.log(result);
      location.reload();
    })
  })
}
