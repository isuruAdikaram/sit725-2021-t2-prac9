const itemsList =[
  {
    title:"Cowardly-cat",
    image:"assets/cat-1.jpg",
    link:"stupidcats.com",
    description:"wacked birds all day"
  },
  {
    title:"Enlightened-cat",
    image:"assets/cat-2.jpg",
    link:"evenstupidercats.com",
    description:"harased dogs all day"
  }
]

// For socket
let socket = io();

socket.on('datetime',(msg)=>{
    document.querySelector('p.date-time').innerHTML =msg
})

const testButtonFunction=()=>{
  alert('Thank you for clicking, sign up button is not yet active!')
}
const addProjectToApp =(project)=>{
  $.ajax({
    url: '/api/projects',
    data: project,
    type: 'POST',
    success: (result) => {
        alert(result.message);
        location.reload();
        
    }
})
}

const submitForm = ()=>{
  const formData ={}
  formData.title = $('#title').val()
  formData.image = $('#image').val()
  formData.link = $('#link').val()
  formData.description = $('#description').val()

  console.log("form data: ",formData)
  console.log("type of form data: ", typeof formData)
  
  // let array =[]
  // array.push(formData)
  // console.log(array)
  // addcard(array)
  addProjectToApp(formData)
}

const getProjects = () => {
  $.get('/api/projects',(response) => {
      if(response.statusCode==200){
          console.log(response)
          addcard(response.data);
      }
      else {
          console.log(response)
      }
  })
}

const addcard =(items)=>{
  items.forEach(item => {
    let itemToAppend = 
    '<div class="col s4">'+
    ' <div class="card medium">'+
    '<div class="card-image waves-effect waves-block waves-light">'+
    '<img class="activator" src="'+item.image+'"></div>'+
    '<div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span>'+
    '<p><a href="#">about</a></p>'+
    '</div>'+
    '<div class="card-reveal">'+
    '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
    '<p>Here is some more information about this product that is only revealed once clicked on.</p>'+
    ' </div></div></div></div>';
    $('#card-section').append(itemToAppend)
  });
}

$(document).ready(function(){
  console.log('Ready')
  $('#formSubmit').click(()=>{
    submitForm();
  })
  //bind the button
  // $('#testButton').click(testButtonFunction)

  //test get call
  // $.get('/test?user_name="Fantastic User"',(result)=>{
  //   console.log(result)
  // })
  // addcard(itemsList);
  getProjects();
  $('.modal').modal();
  
  


})
