<template>
  <div id="project">
    <h1>{{ project.name }} :</h1>
    <div id="container" v-if="project">
      <div id="desc">
        <div v-html="project.content" class="content"></div>
      </div>
      <div id="infos">
        <h3>Project :</h3>
        <div v-if="project.name">
          <p class="key">Name:</p>
          <p>{{ project.name }}</p>
        </div>

        <div v-if="date">
          <p class="key">Date:</p>
          <p>{{ date }}</p>
        </div>
        <h3>Infos :</h3>

        <div v-if="project.version">
          <p class="key">Version:</p>
          <p>{{ project.version }}</p>
        </div>
        <div>
          <p class="key" v-if="project.license">License:</p>
          <p>{{ project.license }}</p>
        </div>
        <div v-if="project.category">
          <p class="key">Category:</p>
          <p>{{ project.category }}</p>
        </div>
        <h3>Links :</h3>
        <div v-if="project.github">
          <p class="key">Github:</p>
          <a :href="project.github">Click here</a>
        </div>
        <div v-if="project.bugs">
          <p class="key">Bugs:</p>
          <a :href="project.bugs">Click here</a>
        </div>
        <div v-if="project.link">
          <p class="key">Link:</p>
          <a :href="project.link">Click here</a>
        </div>
        <h3 v-if="project.source_code">Code source</h3>
        <div v-if="project.source_code">
          <p class="key">Code source:</p>
          <a :href="source_code">Click here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      project: {},
      host: this.$store.state.host,
      date: "",
      source_code: "",
    };
  },
  beforeMount() {
    const projectId = window.location.href.split("/").reverse()[0];
    fetch(`${this.$store.state.host}api/v1/project/${projectId}`).then(
      (responce) => {
        responce.json().then((result) => {
          this.project = result.result;
          if (result.result && result.result.date_insert) {
            const date = new Date(parseInt(result.result.date_insert));
            const months = [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ];
            const year = date.getFullYear();
            const month = months[date.getMonth()];
            const day = date.getDate();
            this.date = `${day}/${month}/${year}`;
          }
          if (result.result && result.result.source_code) {
            this.source_code = `${this.$store.state.host}api/v1/download/archive/${result.result.source_code}`;
          }
        });
      }
    );
  },
};
</script>
<style lang="scss" scopped>
@import "../../public/scss/theme-variables";
#project {
  width: 90%;
  margin: auto;
  margin-top: 100px;
  h1 {
    text-align: start;
  }
}
#container {
  display: flex;
  flex-wrap: wrap;
}
#desc {
  width: 70%;
  text-align: start;
  line-height: 30px;
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
#infos {
  width: 25%;
  min-width: 200px;
  padding-left: 30px;
  h3 {
    text-align: start;
  }
  div {
    width: 100%;
    height: 2.5em;
    margin: auto;
    background-color: $background-element;
    border: 2.5px solid black;
    padding: 1%;
    display: flex;
    justify-content: space-around;
    .key {
      font-weight: 650;
    }
  }
}
@media screen and (max-width: 400px) {
  #desc {
    min-width: none;
    width: 95%;
  }
  #infos {
    width: 90%;
    padding-left: 0px;
  }
}
</style>