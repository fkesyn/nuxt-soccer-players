<template>
    <div>
        <h1 class="title">{{$t('forms.welcome')}}</h1>

        <b-carousel :indicator-inside="false">
            <b-carousel-item :key="item" :src="item.src" v-for="item in items">
            <span class="image">
              <img :src="item.src">
            </span>
            </b-carousel-item>
            <template slot="indicators" slot-scope="props">
            <span class="al image">
                <img :src="items[props.i].src" :title="items[props.i].name">
            </span>
            </template>
        </b-carousel>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            name: 'Lionel Messi',
            src: '/images/messi.jpg'
          },
          {
            name: 'Sergio Aguero',
            src: '/images/aguero.jpg'
          },
          {
            name: 'Mou Salah',
            src: '/images/salah.jpg'
          }

        ]
      }
    }
  }
</script>

<style>
    .title {
        text-align: center;
        color: #7957D6;
        margin: 15px;
    }

    .is-active .al img {
        height: 50%;
        width: 50%;
        filter: grayscale(0%);
    }

    .al img {
        height: 50%;
        width: 50%;
        filter: grayscale(100%);
    }
</style>
