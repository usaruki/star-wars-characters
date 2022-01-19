<template>
  <div class="paginator">
    <div :class="{'paginator-viewport': true, 'perfers-3d': perspective === '3D'}">
      <slot/>
    </div>  
    <ul class="pages-listing" v-if="pageCount > 0">
      <li :class="{'page-item': true, 'overflow-page': pageSet[0] > 2, 'viewing-page': currentPage == 1}">
        <router-link v-if="currentPage != 1" :to="`/search/${urlQuery}/1`">1</router-link>
        <template v-else>{{1}}</template>
      </li>
      <li :class="{'page-item': true, 'viewing-page': currentPage == i }" v-for="i in pageSet" :key="`page-list__${i}`">
        <router-link v-if="currentPage != i" :to="`/search/${urlQuery}/${parseInt(i)}`">{{parseInt(i)}}</router-link>
        <template v-else>{{i}}</template>
      </li>
      <li v-if="pageCount >= maxPages" :class="{'page-item': true, 'overflow-page': pageSet[2] < pageCount-1, 'viewing-page': currentPage == pageCount}">
        <router-link v-if="currentPage != pageCount" :to="`/search/${urlQuery}/${pageCount}`">{{pageCount}}</router-link>
        <template v-else>{{pageCount}}</template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Paginator',
  props: {
    urlQuery:{
      default: ''
    },
    pageCount:{
      default: 1
    },
    currentPage: {
      default: 1
    }
  },
  data() {
    return {
      maxPages: 5,
      maxBase: 4,
      dynamicPages: 3
    }
  },
  computed: {
    ...mapGetters('local', { perspective: 'getUserMode' }),
    pageSet() {
      let baseSet = [2,3,4];
      let setLength = Math.min(this.dynamicPages, this.pageCount - 1);
      let setTransform = Math.max(this.currentPage - this.dynamicPages, 0);
      let setTransformLimit = Math.max(this.pageCount - this.maxBase - 1, 0);
      let set = [];
      for(let i = 0; i < setLength; i++) {
        set.push(baseSet[i] + Math.min(setTransform, setTransformLimit));
      }
      return set;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.paginator-viewport {
  padding-block: 1.5rem;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 300ms ease;

  &.perfers-3d {
    transform-origin: 50% 100%;
    transform: perspective(300px) rotateX(20deg) translateY(-50%);
  }
}

.paginator {
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.pages-listing {
  margin-inline: auto;
  list-style: none;
  display: flex;

  .page-item {
    color: var(--text-color);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 2.25rem;
    padding: 1rem 0;
    margin-left: .25rem;
    margin-right: .25rem;

    &.viewing-page {
      color: var(--scroll-color);
    }

    >a {
      color: inherit;
    }

    &.overflow-page {

      @mixin overflowLike {
        content: '...';
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        color: inherit;
        margin-left: inherit;
        margin-right: inherit;
      }

      &:first-child {
        &::after {
          @include overflowLike();
        }
      }

      &:last-child {
        &::before {
          @include overflowLike();
        }
      }
    }
  }

}

</style>