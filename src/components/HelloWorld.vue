<template>
  <div class="hello">
        <!-- Button trigger modal -->
    <header>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
           <h3 class="navbar-brand">Arounder</h3>
          </a>
         <div class="ml-auto d-flex">
           <button  class="btn btn-primary my-2 bg-light" id="logbtn"  data-toggle="modal" data-target="#exampleModal">Login</button>
           <button class="btn btn-primary my-2 bg-dark nav-link" data-toggle="modal" data-target="#exampleModal">Join Free</button>
         </div>
        </div>
      </div>
    </header>

      <section class="jumbotron text-center">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <div class="div">
                <h1 class="jumbotron-heading">Around The World</h1>
                <p>“I haven't been everywhere, but it's on my list.” “Traveling—it leaves you speechless, then turns you into a storyteller.” "Do not go where the path may lead, go instead where there is no path and leave a trail."</p>
                <p>
                  <button data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-primary my-2" id="btn">Add Place Visited</button>
                  
                </p>
            </div>
            <div>
              <img src="../assets/world.svg" width="500px" alt="" srcset="">
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="form-group">
              <h1>Arounder</h1>
              <h6>Discover places around the world</h6>
                <div class="input-group mb-3">
                <input type="text" class="form-control fa fa-search" id="search" placeholder="Discover places around you"  aria-label="Username" aria-describedby="basic-addon1">
                <div class="input-group-prepend">
                  <span class="input-group-text fa fa-search"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
        <div class="row">
        
          <div class="col-md-4" v-for="(place, index) in places" :key="index.id">
            <div class="card mb-4 shadow-sm">
                <div v-for="(photo, index) in place.photos" :key="index.id">
                    <img :src="photo" class="card-img-top">
                </div>
              <div class="card-body">
               <div class="d-flex justify-content-between align-items-center">
                  <div class="card-title"><h5>{{place.name}} </h5></div>
                <small class="text-muted"><h6>Upload By:  {{place.username}}</h6></small>
               </div>
                <p class="card-text" v-html="place.content"></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary bg-dark" data-toggle="modal" data-target="#mapModel">Map</button>
                  </div>
                  <small class="text-muted">{{place.date}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--Login Modal-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" >Login</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" >Sign Up</a>
                      </li>
                  </ul>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="modal-body">
                                <div class="form-group">
                                  <input type="email" placeholder="Email" v-model="sign.email" class="form-control">
                                </div>
                                 <div class="form-group">
                                  <input type="password" placeholder="Password" v-model="sign.password" class="form-control">
                                </div>
                          </div>
                          <div class="modal-footer">
                            <button  class="btn btn-primary form-control" @click="login">Login</button>
                          </div>
                        </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <div class="modal-body">
                        <div class="form-group">
                                  <input type="text" v-model="name" placeholder="Name" class="form-control">
                            </div>
                            <div class="form-group">
                                  <input type="email" v-model="email" placeholder="Email" class="form-control">
                            </div>
                                 <div class="form-group">
                                  <input type="password" v-model="password" placeholder="Password" class="form-control">
                                </div>
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-primary form-control" @click="signup">Sign Up</button>
                          </div>
                    </div>
                   
                  </div>
              </div>
            </div>
      </div>
    <!--End login modal-->
      <!-- Place Modal -->
      <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Place Visited</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="place.name" placeholder="Place Name">
                  </div>
                  <div class="form-group">
                    <input type="date" v-model="place.date" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="file" name="" @change="uploadimage" class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="place.username" placeholder="Enter yourname">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <vue-editor v-model="place.content" ></vue-editor>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addPlace">Save changes</button>
            </div>
          </div>
        </div>
      </div>

  <!--Map popup model-->
        <div class="modal fade" id="mapModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Map Location</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127046.19162411857!2d-0.058683249990899196!3d5.685153829998383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102078a5400d3e29%3A0xccdf4b5d4026488b!2sTema!5e0!3m2!1sen!2sgh!4v1601924759799!5m2!1sen!2sgh" width="760" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
              </div>
            </div>
          </div>
        </div>
    <!--End popup model-->
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {fb,db} from '../firebase'
export default {
  name: 'HelloWorld',
  components: {
    VueEditor
  },
  data:() => ({
    places:[],
    search:'',
    place:{
      username:null,
      name: null,
      content: null,
      date:null,
      photos:[]
    },
    sign:{
      email:null,
      password:null
    },
      name:null,
      email:null,
      password:null
  }),
  methods:{
    // addPlace(){
    //   // Add a new document in collection "cities"
    //   db.collection('place').add(this.place)
    //   .then(()=> {
    //       this.$toasted.show('Place added succefully',{
    //         duration:3000,
    //         icon:"check-circle",
    //         type:"success"
    //       })
    //       this.place.username = "",
    //       this.place.name = "",
    //       this.place.content = "",
    //       this.place.date = ""
    //       $('#exampleModal').modal('hide')
    //   })
    //   .catch(function(error) {
    //       this.$toasted.show('Problem with your internet connection',{
    //         duration:3000,
    //         icon:"exclamation-circle",
    //         type:"error"
    //       })
    //         this.place.username = "",
    //       this.place.name = "",
    //       this.place.content = "",
    //       this.place.date = ""
    //   });
    // },
  //  uploadimage(e){
  //        if(e.target.files[0]){
  //           let file = e.target.files[0];
  //           // Create a root reference
  //           var storageRef = fb.storage().ref('place/' + file.name);
  //           let uploadTask = storageRef.put(file);
  //           uploadTask.on('state_changed', (snapshot)=>{
        
  //               }, (error)=> {
  //                 // Handle unsuccessful uploads
  //               }, ()=> {
  //                 // Handle successful uploads on complete
  //                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //                 uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
  //                   this.place.photos.push(downloadURL);
  //                   console.log('File available at', downloadURL);
  //                 });
  //               });
  //        }
  //     },
signup(){
  fb.auth().createUserWithEmailAndPassword(this.email, this.password)
  .then((user)=>{
     db.collection("users").doc(user.user.uid).set({
                        name: this.name
            })
      this.$toasted.show('account created successfully',{
            duration:3000,
            type:"success"
          })
          $('#exampleModal').modal('hide')
          this.$router.replace('profile/addplace');
          this.credential.email = "",
          this.credential.password = ""
  }).catch((error)=>{
      this.$toasted.show('Email already exits',{
            duration:3000,
            type:"error"
          })
          this.name = "",
          this.email = "",
          this.password = ""
  })
},
login(){
  fb.auth().signInWithEmailAndPassword(this.sign.email, this.sign.password).then(()=>{
    this.$toasted.show('Login Successfully',{
      duration:3000,
      type:"success"
    })
    $('#exampleModal').modal('hide')
    this.$router.replace('profile/addplace');
    this.sign.email = "",
    this.sign.password = ""
  }).catch((err)=>{
    this.$toasted.show('Incorrect email or password',{
      duration:3000,
      type:"error"
    })
    this.sign.email = "",
    this.sign.password = ""
  })
}
 },

   created(){
       db.collection("place").get()
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
          //  this.foods = doc.data();
          this.places.push(doc.data());
          // console.log(doc.id, " => ", doc.data());
          });
        });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
 font-family: 'Montserrat Alternates', sans-serif;
}
h6{
  color: brown;
}
#btn{
  background-color: #00b0ff;
  color: #fff;
  box-shadow: none;
  border-radius: 0px;
  border: none;
  padding: 10px;
}
#search{
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
#map{color: #fff;}
#logbtn{
  color: #000;
  border-radius: 0px;
  box-shadow: none;
}
</style>
