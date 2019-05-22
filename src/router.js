import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import AddMix from '@/components/AddMix.vue';
import EditMix from '@/components/EditMix.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      path: '/add-mix',
      name: 'AddMix',
      component: AddMix
    },
    {
      path: '/edit-mix/:mix_slug',
      name: 'EditMix',
      component: EditMix
    }
  ]
});
