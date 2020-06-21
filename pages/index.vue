<template>
    <b-carousel :indicator-inside="false">
        <b-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
            <span class="image">
              <img :src="item.src">
            </span>
        </b-carousel-item>
        <template slot="indicators" slot-scope="props">
            <span class="al image">
                <img :src="props.i" :title="props.i">
            </span>
        </template>
    </b-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/images/messi.jpg'
          },
          {
            src: '/images/aguero.jpg'
          },
          {
            src: '/images/salah.jpg'
          },

        ]
      }
    },
    methods: {
      getImgUrl(value) {
        return `https://picsum.photos/id/43${value}/1230/500`
      }
    }
  }
</script>

<style>
    .is-active .al img {
        filter: grayscale(0%);
    }
    .al img {
        filter: grayscale(100%);
    }
</style>
