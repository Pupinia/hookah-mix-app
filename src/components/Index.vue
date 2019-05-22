<template>
  <div class="index container">
    <div class="card" v-for="mix in mixes" :key="mix.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteMix(mix.id)">delete</i>
        <h2 class="indigo-text">{{ mix.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in mix.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditMix', params: {mix_slug: mix.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      mixes: []
    };
  },
  methods: {
    deleteMix(id) {
      db.collection("mixes")
        .doc(id)
        .delete()
        .then(() => {
          this.mixes = this.mixes.filter(mix => {
            return mix.id !== id;
          });
        });
    }
  },
  created() {
    db.collection("mixes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let mix = doc.data();
          mix.id = doc.id;
          this.mixes.push(mix);
        });
      });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px !important;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>