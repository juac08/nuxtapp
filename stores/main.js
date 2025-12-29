import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    projectList: [
      {
        id: 1,
        title: "this is the marketing department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "12 Feb, 2018",
        cat: "marketing",
        url: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        completed: true,
        tags: ["#maleek", "#junaid"],
        user: "maleek",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 2,
        title: "this is the the design department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "design",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1408&q=80",
        completed: false,
        tags: ["#maleek", "#junaid"],
        user: "junaid",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 3,
        title: "this is the the design department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "design",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1408&q=80",
        completed: false,
        tags: ["#maleek", "#junaid"],
        user: "junaid",
        approved: false,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 4,
        title: "this is the the design department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "design",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1408&q=80",
        completed: true,
        tags: ["#maleek", "#junaid"],
        user: "junaid",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 5,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: true,
        tags: ["#maleek", "#junaid"],
        user: "junaid",
        approved: false,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 6,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: false,
        tags: ["#maleek", "#junaid"],
        user: "junaid",
        approved: false,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 7,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: true,
        tags: ["#maleek", "#junaid"],
        user: "maleek",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 8,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: false,
        tags: ["#maleek", "#junaid"],
        user: "maleek",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 9,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: true,
        tags: ["#maleek", "#junaid"],
        user: "maleek",
        approved: false,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
      {
        id: 10,
        title: "this is the the devops department project ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. MollitiaLorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia",
        date: "10 Feb, 2019",
        cat: "devops",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80",
        completed: false,
        tags: ["#maleek", "#junaid"],
        user: "maleek",
        approved: true,
        comments: [{ date: "10 Feb,2021", comment: "Hi...." }],
      },
    ],
    name: "maleek",
    userEmail: "maleek@gmail.com",
    search: "",
    selectFilter: "",
    modal: false,
    selected: null,
    file: null,
  }),

  getters: {
    // Get project list
    pList: (state) => state.projectList,

    // Get user name
    setName: (state) => state.name,

    // Get user email
    setUserEmail: (state) => state.userEmail,

    // Get search query
    sSearch: (state) => state.search,

    // Get select filter
    sFilter: (state) => state.selectFilter,

    // Get modal state
    popup: (state) => state.modal,

    // Get selected project
    selectedProject: (state) => {
      return state.projectList.find((item) => item.id === state.selected);
    },
  },

  actions: {
    // Set search query
    setSearch(payload) {
      this.search = payload;
    },

    // Set select filter
    setSelectFilter(payload) {
      this.selectFilter = payload;
    },

    // Set modal state
    setModal(payload) {
      this.modal = payload;
    },

    // Set selected project
    setSelected(payload) {
      this.selected = payload;
    },

    // Set file
    setFile(payload) {
      this.file = payload;
    },

    // Add new project
    setProject(payload) {
      this.projectList.push(payload);
    },

    // Set comment
    setComment(payload) {
      const project = this.projectList.find((item) => item.id === payload.id);
      if (project) {
        project.comments.push({
          comment: payload.comment,
          date: payload.date,
        });
      }
    },

    // Remove project
    remove(payload) {
      const index = this.projectList.findIndex((item) => item.id === payload);
      if (index !== -1) {
        this.projectList.splice(index, 1);
      }
    },

    // Add tag to project
    setTag(payload) {
      const project = this.projectList.find((item) => item.id === payload.id);
      if (project) {
        project.tags.push(payload.tag);
      }
    },

    // Set project approval
    setApprove(payload) {
      const project = this.projectList.find((item) => item.id === payload);
      if (project) {
        project.approved = true;
      }
    },
  },
});
