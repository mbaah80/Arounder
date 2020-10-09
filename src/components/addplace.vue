<template>
  <div class="container">
     <div class="form-group">
                   <h1>New Town/City</h1>
             </div>
            <div class="row">
                <div class="col-md-10">
                     <div class="form-grou">
                         <hr>
                     </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="place.name" placeholder="Place Name">
                  </div>
                  <div class="form-group">
                    <input type="date" v-model="place.date" class="form-control">
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <input type="file" name="" @change="uploadimage" class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="place.username" placeholder="Enter your name">
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="form-group">
                    <vue-editor v-model="place.content" ></vue-editor>
                  </div>
                  <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="addPlace" id="btn">Upload Now</button>
                  </div>
                </div>
              </div>    
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {fb,db} from '../firebase'
export default {
  name: 'profile',
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
    addPlace(){
        let user = fb.auth().currentUser;
        let uid = user.uid;
        console.log(uid)
  
    const ref = db.collection('place').add({...this.place, uid:user.uid})
      .then((docRef)=> {
        console.log(docRef.id)
          this.$toasted.show('Place added succefully',{
            duration:3000,
            icon:"check-circle",
            type:"success"
          })
          this.place.username = "",
          this.place.name = "",
          this.place.content = "",
          this.place.date = ""
          
          $('#exampleModal').modal('hide')
      })
      .catch((error)=> {
          this.$toasted.show('Problem with your internet connection',{
            duration:3000,
            icon:"exclamation-circle",
            type:"error"
          })
          this.place.username = "",
          this.place.name = "",
          this.place.content = "",
          this.place.date = ""
      });
    },
    logout(){
      fb.auth().signOut()
            .then((user)=>{
                this.$toasted.show('Logout Successfully',{
                    duration:3000,
                    icon:"check-circle",
                    type:'success'
                });
                this.$router.replace('/')
            })
            .catch((err)=>{
                this.$toasted.show(err);
            }); 
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
   created(){
        let user = fb.auth().currentUser;
        let uid = user.uid;
        this.email = user.email
        console.log(uid)
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
@import "../assets/admin.scss";
div{
  font-family: Georgia, 'Times New Roman', Times, serif;
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
  float: right;
}
#content{
    margin-top: 100px;
    margin-left: 50px;
}

#map{color: #fff;}
#user{
  font-size: 50px;
}
#user-info{
  margin-top: 10px;
}
h2{
  color: #fff;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px;
}
</style>
