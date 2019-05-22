<template>
  <div class="edit-mix container" v-if="mix">
    <h2>Edit {{mix.title}}</h2>
    <form @submit.prevent="editMix">
      <div class="field title">
        <label for="title">Название микса::</label>
        <input type="text" name="title" v-model="mix.title">
      </div>
      <div v-for="(ing, index) in mix.ingredients" :key="index" class="field">
        <label for="ingredient">Ингредиент:</label>
        <input type="text" name="ingredient" v-model="mix.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field edit-ingredient">
        <label for="edit-ingredient">Изменить название:</label>
        <input type="text" name="edit-ingredient" @keydown.enter.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Обновить микс</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditMix",
  data() {
    return {
      mix: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editMix() {
      if (this.mix.title) {
        this.feedback = null;
        this.mix.slug = slugify(this.mix.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("mixes")
          .doc(this.mix.id)
          .update({
            title: this.mix.title,
            ingredients: this.mix.ingredients,
            slug: this.mix.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "Введите название микса";
      }
    },
    addIng() {
      if (this.another) {
        this.mix.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Введите название ингредиента";
      }
    },
    deleteIng(ing) {
      this.mix.ingredients = this.mix.ingredients.filter(ingredient => {
        return ingredient !== ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("mixes")
      .where("slug", "==", this.$route.params.mix_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.mix = doc.data();
        this.mix.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-mix {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-mix h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-mix .field {
  margin: 20px auto;
}

.edit-mix .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

.field {
  position: relative;
}
</style>
