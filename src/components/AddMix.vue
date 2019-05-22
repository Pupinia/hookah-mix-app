<template>
  <div class="add-mix container">
    <h2 class="center-align indigo-text">Добавить новый микс</h2>
    <form @submit.prevent="addMix">
      <div class="field title">
        <label for="title">Название микса:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ингредиент:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Добавить табак:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.enter.prevent="addIng"
          v-model="another"
          placeholder="Нажмите enter что бы добавить"
        >
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Добавить микс</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddMix",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addMix() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        db.collection("mixes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Введите название ингредиента";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing;
      });
    }
  }
};
</script>

<style>
.add-mix {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-mix h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-mix .field {
  margin: 20px auto;
}

.add-mix .delete {
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