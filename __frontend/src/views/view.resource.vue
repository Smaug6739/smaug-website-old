<template>
  <div>
    <div v-if="resource" id="resource">
      <h1>{{ resource.name }}</h1>
      <hr />
      <div id="desc">
        <div v-html="resource.content" class="content"></div>
      </div>
      <hr />
      <p>
        {{ resource.author }}
      </p>
    </div>
    <div v-else>
      <Loader msg="Loading..." />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/common/loader.component.vue";
export default {
  name: "Resources",
  data() {
    return {
      resource: [],
      resourceId: window.location.href.split("/").reverse()[0],
    };
  },
  beforeMount() {
    this.fetchAPI();
  },
  methods: {
    fetchAPI() {
      fetch(
        `${this.$store.state.host}api/v1/resources/${this.resourceId}`
      ).then((responce) => {
        responce.json().then((result) => {
          this.resource = result.result;
        });
      });
    },
  },
  components: {
    Loader,
  },
};
</script>
<style scoped lang="scss">
@import "../../public/scss/theme-variables";
#resource {
  min-height: 350px;
  width: 70%;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 15%;
  padding: 15px;
  background-color: $background-element;
}
desc {
  .content {
    margin-bottom: 15px;

    * {
      max-width: 100%;
      white-space: initial;
    }
    table {
      display: inline-block;
      overflow: auto;
    }
    table,
    td {
      border: 1px solid white;
    }
    thead,
    tfoot {
      background-color: $background-element;
      color: white;
    }
    li {
      list-style: none;
    }
    pre,
    code {
      background-color: #2c2c32;
      border-radius: 3px;
      font-family: courier, monospace;
      padding: 0 3px;
      white-space: pre-line;
    }
    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #f0f0f0;
    }
    .hljs,
    .hljs-subst {
      color: #444;
    }
    .hljs-comment {
      color: #888;
    }
    .hljs-attribute,
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta-keyword,
    .hljs-name,
    .hljs-selector-tag {
      font-weight: 700;
    }
    .hljs-deletion,
    .hljs-number,
    .hljs-quote,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-string,
    .hljs-template-tag,
    .hljs-type {
      color: #800;
    }
    .hljs-section,
    .hljs-title {
      color: #800;
      font-weight: 700;
    }
    .hljs-link,
    .hljs-regexp,
    .hljs-selector-attr,
    .hljs-selector-pseudo,
    .hljs-symbol,
    .hljs-template-variable,
    .hljs-variable {
      color: #bc6060;
    }
    .hljs-literal {
      color: #78a960;
    }
    .hljs-addition,
    .hljs-built_in,
    .hljs-bullet,
    .hljs-code {
      color: #397300;
    }
    .hljs-meta {
      color: #1f7199;
    }
    .hljs-meta-string {
      color: #4d99bf;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }

    h1,
    h2 {
      border-bottom: 1px solid grey;
      padding: 10px;
      margin-bottom: 5px;
    }
  }
}
@media screen and (max-width: 800px) {
  #resource {
    width: 90%;
    padding: 5px;
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>