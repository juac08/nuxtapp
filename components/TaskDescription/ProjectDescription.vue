<template>
  <div class="project" v-if="selectedProject">
    <div item-1>
      <div v-html="$feathericons['check'].toSvg()" class="icon"></div>
      <div class="container">
        <div class="head item">
          <h3>{{ selectedProject.title }}</h3>
          <div class="date">
            <span v-html="$feathericons['clock'].toSvg()" />
            <p>{{ selectedProject.date }}</p>
            <span
              class="tag-user"
              v-for="tag in selectedProject.tags"
              :key="tag"
            >
              <p>{{ tag }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div class="description item-2 message">
        <p>{{ selectedProject.description }}</p>
        <br />
        <hr />
        <br />
        <div class="tag">
          <input type="text" placeholder="Tag User" v-model.trim="newTag" />
          <button
            v-html="$feathericons['plus'].toSvg()"
            class="t"
            @click="addTag"
          ></button>
        </div>

        <div class="comments item-3">
          <div
            class="comment"
            v-for="(c, i) in selectedProject.comments"
            :key="i"
          >
            <h5>
              {{ setName }}: <span>{{ c.comment }}</span>
            </h5>
            <p>{{ c.date }}</p>
          </div>
        </div>
        <div>
          <p>{{ fileobj.name }}</p>
        </div>
      </div>
    </transition>

    <div class="item-4 input">
      <div class="custom-btn">
        <form @submit.prevent="addComment" class="form">
          <input
            type="text"
            placeholder="Write a comment"
            class="text"
            v-model="comment"
          />
        </form>
        <div>
          <input id="custom" type="file" @change="selectedFile" />
          <div class="f-label">
            <label for="custom" class="file">
              <div v-html="$feathericons['paperclip'].toSvg()"></div>
            </label>
          </div>
        </div>
        <button class="btn-submit" @click="upload">
          <div v-html="$feathericons['share'].toSvg()"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      comment: null,
      fileobj: {},
      newTag: "",
    };
  },
  computed: {
    ...mapGetters(["selectedProject", "setName"]),
    comments() {
      return this.$store.getters.setComments;
    },
    projects() {
      return this.$store.getters.pList;
    },
  },
  methods: {
    addComment() {
      this.$store.dispatch("setComment", {
        comment: this.comment,
        date: new Date().toDateString(),
        id: this.selectedProject.id,
      });
      this.comment = "";
    },
    selectedFile(e) {
      return (this.fileobj = e.target.files[0]);
    },
    upload() {
      return console.log(this.fileobj);
    },
    addTag() {
      if (this.newTag) {
        this.$store.dispatch("setTag", {
          id: this.selectedProject.id,
          tag: this.newTag,
        });
      }
      this.newTag = "";
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.icon {
  background: rgb(80, 120, 254);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 50px;
  border: 1px solid rgb(122, 121, 121);
  color: white;
  position: absolute;
  margin-top: 1.5rem;
  margin-left: 1rem;
  text-align: center;
}
.input {
  display: flex;
  align-items: center;
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(234, 229, 229);
  align-self: stretch;
  height: 5rem;
  margin-top: 6rem;
}
.text {
  width: 100%;
  height: 5.3rem;
  padding: 30px;
  border: none;
  background: rgb(241, 242, 247);
}
.project {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.date {
  display: flex;
  justify-content: left;
  align-content: center;
  gap: 1rem;
}
.form {
  width: 100%;
}

.container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.description {
  max-width: 42rem;
  min-height: 23.7rem;
  line-height: 2rem;
  margin: 10px auto;
  text-align: left;
}
.comments {
  max-width: 37rem;
  text-align: left;
  margin: 10px auto;
  line-height: 1.3rem;
}
.comment {
  display: flex;
  gap: 2rem;
}

input[type="file"] {
  display: none;
}

.custom-btn {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.btn-submit {
  color: white;
  padding: 25px;
  background: rgb(80, 120, 254);
}

input:focus {
  outline: none;
}
input::placeholder {
  font-size: 1rem;
}

.f-label {
  border-left: 1px solid rgb(219, 214, 214);
  padding: 28px;
  background: rgb(241, 242, 247);
}
.message {
  max-height: 380px;
  overflow: auto;
}
.message::-webkit-scrollbar {
  width: 5px;
}
.message::-webkit-scrollbar-track {
  background: rgb(241, 242, 247);
}
.message::-webkit-scrollbar-thumb {
  background: rgb(209, 207, 207);
}
button {
  box-shadow: var(--light-shadow);
  transition: all 0.3s;
}
button:hover {
  background: blue;
  transform: translateY(-2px);
}
button:active {
  transform: translateY(2px);
}
.tag {
  display: flex;
  justify-content: baseline;
  align-items: center;
  text-align: center;
  margin-left: 2rem;
}
.tag input[type="text"] {
  border: none;
  background: rgb(241, 242, 247);
  border-radius: 20px;
  padding: 5px 10px;
  width: 30%;
  box-shadow: var(--light-shadow);
  transition: var(--transition);
  height: 2rem;
  margin-block: 1rem;
}

.tag-user p {
  background: rgb(80, 120, 254);
  display: inline-block;
  border-radius: var(--radius);
  color: white;
  letter-spacing: var(--spacing);
  box-shadow: var(--light-shadow);
}
.t {
  background: rgb(80, 120, 254);
  color: white;
  border-radius: 50%;
  text-align: center;
  border: none;
}
</style>