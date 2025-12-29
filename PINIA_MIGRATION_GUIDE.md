# Migrating from Vuex to Pinia - Component Update Guide

## What Changed

We've migrated from Vuex 4 to Pinia (the official state management for Nuxt 3/4) because Vuex has compatibility issues with Nuxt 4.

## How to Update Components

### Old Way (Vuex):

```javascript
export default {
  computed: {
    projects() {
      return this.$store?.getters?.pList || [];
    },
  },
  methods: {
    setModal() {
      if (this.$store) {
        this.$store.dispatch("setModal", true);
      }
    },
  },
};
```

### New Way (Pinia):

```javascript
import { useMainStore } from "~/stores/main";

export default {
  computed: {
    projects() {
      const store = useMainStore();
      return store.pList; // Direct access to getters
    },
  },
  methods: {
    openModal() {
      const store = useMainStore();
      store.setModal(true); // Direct action call
    },
  },
};
```

## Key Differences:

1. **Import the store**: `import { useMainStore } from "~/stores/main";`
2. **Use the store**: `const store = useMainStore();`
3. **Access state/getters directly**: `store.pList` instead of `this.$store.getters.pList`
4. **Call actions directly**: `store.setModal(true)` instead of `this.$store.dispatch("setModal", true)`
5. **No null checks needed**: Pinia stores are always available

## Components That Need Updating:

### 1. components/SideBar/SideBarSection.vue

**Old:**

```javascript
computed: {
  setName() {
    return this.$store?.getters?.setName || '';
  },
  setUserEmail() {
    return this.$store?.getters?.setUserEmail || '';
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

computed: {
  setName() {
    const store = useMainStore();
    return store.setName;
  },
  setUserEmail() {
    const store = useMainStore();
    return store.setUserEmail;
  }
}
```

### 2. components/SideBar/Icons.vue

**Old:**

```javascript
computed: {
  selectedProject() {
    return this.$store?.getters?.selectedProject || {};
  }
},
methods: {
  openModal() {
    if (this.$store) {
      return this.$store.dispatch("setModal", true);
    }
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

computed: {
  selectedProject() {
    const store = useMainStore();
    return store.selectedProject;
  }
},
methods: {
  openModal() {
    const store = useMainStore();
    store.setModal(true);
  }
}
```

### 3. components/SideBar/TaskBar.vue

**Old:**

```javascript
computed: {
  projects() {
    if (!this.$store?.getters?.pList) return 0;
    return this.$store.getters.pList.length;
  },
  completed() {
    if (!this.$store?.getters?.pList) return 0;
    const list = this.$store.getters.pList;
    return list.filter((item) => item.completed).length;
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

computed: {
  projects() {
    const store = useMainStore();
    return store.pList.length;
  },
  completed() {
    const store = useMainStore();
    return store.pList.filter((item) => item.completed).length;
  }
}
```

### 4. components/TaskDescription/ProjectDescription.vue

**Old:**

```javascript
computed: {
  selectedProject() {
    return this.$store?.getters?.selectedProject || {};
  }
},
methods: {
  addComment() {
    if (this.$store) {
      this.$store.dispatch("setComment", {
        comment: this.comment,
        date: new Date().toDateString(),
        id: this.selectedProject.id,
      });
      this.comment = "";
    }
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

computed: {
  selectedProject() {
    const store = useMainStore();
    return store.selectedProject || {};
  }
},
methods: {
  addComment() {
    const store = useMainStore();
    store.setComment({
      comment: this.comment,
      date: new Date().toDateString(),
      id: this.selectedProject.id,
    });
    this.comment = "";
  }
}
```

### 5. components/TaskDescription/TaskListNav.vue

**Old:**

```javascript
methods: {
  remove() {
    if (this.$store) {
      return this.$store.dispatch("remove", this.selectedProject.id);
    }
  },
  approve() {
    if (this.$store) {
      this.$store.dispatch("setApprove", this.selectedProject.id);
    }
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

methods: {
  remove() {
    const store = useMainStore();
    store.remove(this.selectedProject.id);
  },
  approve() {
    const store = useMainStore();
    store.setApprove(this.selectedProject.id);
  }
}
```

### 6. components/Model/Model.vue

**Old:**

```javascript
computed: {
  popup() {
    return this.$store?.getters?.popup || false;
  }
},
methods: {
  setModal() {
    if (this.$store) {
      return this.$store.dispatch("setModal", false);
    }
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

computed: {
  popup() {
    const store = useMainStore();
    return store.popup;
  }
},
methods: {
  setModal() {
    const store = useMainStore();
    store.setModal(false);
  }
}
```

### 7. components/TaskList/SingleTask.vue

**Old:**

```javascript
methods: {
  done() {
    if (this.$store) {
      return this.$store.dispatch("setSelectFilter", this.project.id);
    }
  },
  select() {
    this.isDone = !this.isDone;
    if (this.$store) {
      this.$store.dispatch("setSelected", this.project.id);
    }
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

methods: {
  done() {
    const store = useMainStore();
    store.setSelectFilter(this.project.id);
  },
  select() {
    this.isDone = !this.isDone;
    const store = useMainStore();
    store.setSelected(this.project.id);
  }
}
```

### 8. components/TaskList/SelectForm.vue

**Old:**

```javascript
methods: {
  s() {
    if (this.$store) {
      this.$store.dispatch("setSelectFilter", this.name);
    }
    console.log(this.name);
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

methods: {
  s() {
    const store = useMainStore();
    store.setSelectFilter(this.name);
    console.log(this.name);
  }
}
```

### 9. components/TaskList/AddTask.vue

**Old:**

```javascript
methods: {
  add() {
    if (this.name && this.title && this.description && this.category) {
      if (this.$store) {
        this.$store.dispatch("setProject", {
          name: this.name,
          title: this.title,
          description: this.description,
          cat: this.category,
          id: Math.random(),
          date: new Date().toDateString(),
          completed: false,
        });
      }
    }
    this.$router.push("/");
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

methods: {
  add() {
    if (this.name && this.title && this.description && this.category) {
      const store = useMainStore();
      store.setProject({
        name: this.name,
        title: this.title,
        description: this.description,
        cat: this.category,
        id: Math.random(),
        date: new Date().toDateString(),
        completed: false,
      });
    }
    this.$router.push("/");
  }
}
```

### 10. components/NavBar/NavBar.vue

**Old:**

```javascript
methods: {
  searchProject() {
    // Search disabled
  }
}
```

**New:**

```javascript
import { useMainStore } from "~/stores/main";

methods: {
  searchProject() {
    const store = useMainStore();
    store.setSearch(this.search);
  }
}
```

## Summary

Pinia is much simpler and more reliable than Vuex with Nuxt 4:

- ✅ No need for defensive null checks
- ✅ Direct access to state and getters
- ✅ Actions called like regular methods
- ✅ Better TypeScript support
- ✅ Official Nuxt 3/4 state management solution

Update all components following the patterns above, and your app should work perfectly!
