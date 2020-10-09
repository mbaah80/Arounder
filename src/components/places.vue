<template>
  <div class="container h-100" id="place">
        <h1>Towns/Cities</h1>
        <div class="row">
          <div class="col-md-10">
              <hr class="py-2">
          </div>
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
                    <button type="button" class="btn btn-sm btn-outline-secondary bg-light" @click="editPlace(place)" data-toggle="modal" data-target=".bd-example-modal-lg">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary"  @click="deletePlace(place)">Delete</button>
                  </div>
                  <small class="text-muted">{{place.date}}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Update modal-->
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
              <button type="button" class="btn btn-primary"  @click="updatePlace(place)">Save changes</button>
            </div>
          </div>
        </div>
      </div>
        <!--End Update modal-->
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
  }),
  methods:{
    updatePlace(doc){
      db.collection('place').doc(doc.id).update(this.place)
      .then(()=>{
          this.place.username = "",
          this.place.name = "",
          this.place.content = "",
          this.place.date = ""
         $('#exampleModal').modal('hide')
        this.$toasted.show('Place updated successfully',{
          duration: 3000,
          icon:'check-circle',
          type:'success'
        })
      }).catch((error)=>{
        this.$$toasted.show('Place could not updated',{
          duration:3000,
          icon:'exclamation-circle',
          type:'error'
        })
      })
    },
    editPlace(place){
         this.place = place;
      },
    deletePlace(doc){
      if(confirm('Are you sure ?')){
      db.collection("place").doc(doc.id).delete()
      .then(()=> {
           this.$toasted.show('Place delete successfully',{
            duration:3000,
            icon:"check-circle",
            type:"success"
          })
      })
      }
    },
     uploadimage(e){
         if(e.target.files[0]){
            let file = e.target.files[0];
            // Create a root reference
            var storageRef = fb.storage().ref('place/' + file.name);
            let uploadTask = storageRef.put(file);
            uploadTask.on('state_changed', (snapshot)=>{
        
                }, (error)=> {
                  // Handle unsuccessful uploads
                }, ()=> {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                    this.place.photos.push(downloadURL);
                    console.log('File available at', downloadURL);
                  });
                });
         }
      }
 },
   firestore(){
       let user = fb.auth().currentUser;
        let uid = user.uid;
      return{
        places: db.collection('place').where("uid", "==", user.uid),
      }
    },
  
}
</script>
<style>
#place{
  margin-top: 10px;
}
</style>