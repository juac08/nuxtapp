import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useMainStore = defineStore("main", {
  state: () => ({
    // Loading State
    isLoading: true,
    loadingMessage: "Loading your workspace...",

    // User Profile
    currentUser: {
      name: "Natalie Smith",
      email: "natalie.smith@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=5",
    },

    // Notifications & Messages
    notifications: {
      messages: 5,
      alerts: 2,
    },

    // Messages List
    messagesList: [
      {
        id: 1,
        sender: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "Hey! Can you review the marketing proposal I sent?",
        time: "5 min ago",
        read: false,
      },
      {
        id: 2,
        sender: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?img=2",
        text: "The design mockups are ready for your feedback.",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        sender: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=3",
        text: "Meeting rescheduled to 3 PM tomorrow.",
        time: "2 hours ago",
        read: true,
      },
      {
        id: 4,
        sender: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=4",
        text: "Great job on the presentation today!",
        time: "Yesterday",
        read: true,
      },
      {
        id: 5,
        sender: "Anna Martinez",
        avatar: "https://i.pravatar.cc/150?img=6",
        text: "Can we schedule a quick call about the project timeline?",
        time: "Yesterday",
        read: false,
      },
    ],

    // Notifications List
    notificationsList: [
      {
        id: 1,
        type: "task",
        text: "Task 'Create social media content calendar' was assigned to you",
        time: "10 min ago",
        read: false,
      },
      {
        id: 2,
        type: "team",
        text: "David Brown joined your Marketing team",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        type: "task",
        text: "Task 'Write an article about design trends' is due tomorrow",
        time: "3 hours ago",
        read: true,
      },
      {
        id: 4,
        type: "info",
        text: "Weekly team meeting starts in 15 minutes",
        time: "Yesterday",
        read: true,
      },
    ],

    // Stats
    stats: {
      completed: 12,
      todo: 22,
      allCompleted: 243,
    },

    // Projects/Categories
    categories: [
      {
        id: "marketing",
        name: "Marketing",
        color: "#ff6b9d",
      },
      {
        id: "design",
        name: "Design",
        color: "#9b59b6",
      },
      {
        id: "development",
        name: "Development",
        color: "#ff9f43",
      },
      {
        id: "management",
        name: "Management",
        color: "#00d2d3",
      },
    ],

    // Team Members
    teamMembers: [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        departments: ["marketing", "design"],
      },
      {
        id: 2,
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?img=2",
        departments: ["development", "management"],
      },
      {
        id: 3,
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=3",
        departments: ["design", "marketing"],
      },
      {
        id: 4,
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=4",
        departments: ["development"],
      },
      {
        id: 5,
        name: "Anna Martinez",
        avatar: "https://i.pravatar.cc/150?img=6",
        departments: ["management", "marketing"],
      },
      {
        id: 6,
        name: "David Brown",
        avatar: "https://i.pravatar.cc/150?img=7",
        departments: ["development", "design"],
      },
      {
        id: 7,
        name: "Lisa Anderson",
        avatar: "https://i.pravatar.cc/150?img=8",
        departments: ["marketing"],
      },
      {
        id: 8,
        name: "Robert Taylor",
        avatar: "https://i.pravatar.cc/150?img=9",
        departments: ["management"],
      },
    ],

    // Selected Category for Filtering
    selectedCategory: null,

    // Task List
    projectList: [
      {
        id: 1,
        title: "Create social media content calendar",
        description:
          "Develop a comprehensive social media content calendar for Q1 2024. Include post ideas, scheduling times, and content themes for all major platforms including Facebook, Instagram, Twitter, and LinkedIn.",
        date: "12 Feb, 2024",
        cat: "marketing",
        completed: true,
        tags: ["#socialmedia", "#content"],
        assignedTo: 1,
        approved: true,
        comments: [
          {
            date: "10 Feb, 2024",
            comment: "Great work on the initial draft!",
            user: "Sarah Johnson",
          },
        ],
        activities: [
          {
            type: "assigned",
            user: "Sarah Johnson",
            date: "5 Feb, 2024",
          },
          {
            type: "added",
            user: "Michael Chen",
            date: "3 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "1 Feb, 2024",
          },
        ],
      },
      {
        id: 2,
        title: "Design new landing page",
        description:
          "Create wireframes and mockups for the new product landing page. Focus on modern design trends, mobile responsiveness, and clear call-to-action buttons.",
        date: "15 Feb, 2024",
        cat: "design",
        completed: false,
        tags: ["#ui", "#ux"],
        assignedTo: 2,
        approved: true,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Michael Chen",
            date: "12 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "6 Feb, 2024",
          },
        ],
      },
      {
        id: 3,
        title: "User research interviews",
        description:
          "Conduct user interviews with 10-15 participants to gather insights about the current product experience and identify pain points.",
        date: "18 Feb, 2024",
        cat: "design",
        completed: false,
        tags: ["#research", "#user"],
        assignedTo: 3,
        approved: false,
        comments: [
          {
            date: "14 Feb, 2024",
            comment: "Need to finalize the interview script",
            user: "Emily Davis",
          },
        ],
        activities: [
          {
            type: "assigned",
            user: "Emily Davis",
            date: "13 Feb, 2024",
          },
          {
            type: "created",
            user: "Sarah Johnson",
            date: "10 Feb, 2024",
          },
        ],
      },
      {
        id: 4,
        title: "Brand style guide update",
        description:
          "Update the brand style guide with new color palette, typography rules, and component library documentation.",
        date: "20 Feb, 2024",
        cat: "design",
        completed: true,
        tags: ["#branding", "#guidelines"],
        assignedTo: 2,
        approved: true,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Michael Chen",
            date: "16 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "14 Feb, 2024",
          },
        ],
      },
      {
        id: 5,
        title: "Implement authentication system",
        description:
          "Build secure user authentication with JWT tokens, password reset functionality, and social login options (Google, GitHub).",
        date: "22 Feb, 2024",
        cat: "development",
        completed: true,
        tags: ["#backend", "#security"],
        assignedTo: 4,
        approved: true,
        comments: [
          {
            date: "20 Feb, 2024",
            comment: "Authentication working perfectly!",
            user: "James Wilson",
          },
        ],
        activities: [
          {
            type: "assigned",
            user: "James Wilson",
            date: "15 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "21 Feb, 2024",
          },
        ],
      },
      {
        id: 6,
        title: "API integration for payment gateway",
        description:
          "Integrate Stripe payment gateway API for subscription management and one-time payments. Include webhook handling for payment events.",
        date: "25 Feb, 2024",
        cat: "development",
        completed: false,
        tags: ["#api", "#payments"],
        assignedTo: 4,
        approved: false,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "James Wilson",
            date: "20 Feb, 2024",
          },
          {
            type: "created",
            user: "Michael Chen",
            date: "24 Feb, 2024",
          },
        ],
      },
      {
        id: 7,
        title: "Database optimization",
        description:
          "Optimize database queries and add proper indexing to improve application performance. Target 50% reduction in query response time.",
        date: "28 Feb, 2024",
        cat: "development",
        completed: true,
        tags: ["#performance", "#database"],
        assignedTo: 5,
        approved: true,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Anna Martinez",
            date: "22 Feb, 2024",
          },
          {
            type: "created",
            user: "James Wilson",
            date: "26 Feb, 2024",
          },
        ],
      },
      {
        id: 8,
        title: "Setup CI/CD pipeline",
        description:
          "Configure automated testing and deployment pipeline using GitHub Actions. Include automated tests, linting, and deployment to staging/production.",
        date: "1 Mar, 2024",
        cat: "development",
        completed: false,
        tags: ["#devops", "#automation"],
        assignedTo: 5,
        approved: true,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Anna Martinez",
            date: "25 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "23 Feb, 2024",
          },
        ],
        attachments: [],
      },
      {
        id: 9,
        title: "Q1 project planning",
        description:
          "Create comprehensive project roadmap for Q1 2024 including milestones, resource allocation, and risk assessment.",
        date: "5 Mar, 2024",
        cat: "management",
        completed: true,
        tags: ["#planning", "#roadmap"],
        assignedTo: 1,
        approved: true,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Sarah Johnson",
            date: "28 Feb, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "26 Feb, 2024",
          },
        ],
      },
      {
        id: 10,
        title: "Team performance reviews",
        description:
          "Conduct individual performance reviews with all team members. Discuss goals, achievements, and development opportunities.",
        date: "8 Mar, 2024",
        cat: "management",
        completed: false,
        tags: ["#hr", "#reviews"],
        assignedTo: 1,
        approved: false,
        comments: [],
        activities: [
          {
            type: "assigned",
            user: "Sarah Johnson",
            date: "1 Mar, 2024",
          },
          {
            type: "created",
            user: "Natalie Smith",
            date: "3 Mar, 2024",
          },
        ],
      },
    ],
    search: "",
    selectFilter: "",
    modal: false,
    selected: null,
    file: null,

    // App Settings
    settings: {
      showCompleted: true,
      compactView: false,
      taskReminders: true,
      teamUpdates: true,
      defaultPriority: "medium",
      sortBy: "date",
    },
  }),

  getters: {
    // Get loading state
    isAppLoading: (state) => state.isLoading,
    getLoadingMessage: (state) => state.loadingMessage,

    // Get project list
    pList: (state) => state.projectList,

    // Get current user
    getCurrentUser: (state) => state.currentUser,

    // Get notifications
    getNotifications: (state) => state.notifications,

    // Get stats (dynamically calculated from projectList)
    getStats: (state) => {
      // Filter tasks by selected category if one is selected
      const filteredTasks = state.selectedCategory
        ? state.projectList.filter(
            (task) => task.cat === state.selectedCategory
          )
        : state.projectList;

      const completed = filteredTasks.filter((task) => task.completed).length;
      const todo = filteredTasks.filter((task) => !task.completed).length;
      return {
        completed,
        todo,
        allCompleted: completed + todo, // Total tasks
      };
    },

    // Get computed stats progress
    getStatsProgress: (state) => {
      // Filter tasks by selected category if one is selected
      const filteredTasks = state.selectedCategory
        ? state.projectList.filter(
            (task) => task.cat === state.selectedCategory
          )
        : state.projectList;

      const completed = filteredTasks.filter((task) => task.completed).length;
      const todo = filteredTasks.filter((task) => !task.completed).length;
      const total = completed + todo;
      return total > 0 ? Math.round((completed / total) * 100) : 0;
    },

    // Get categories/projects
    getCategories: (state) => state.categories,

    // Get team members (all)
    getTeamMembers: (state) => state.teamMembers,

    // Get filtered team members based on selected category
    getFilteredTeamMembers: (state) => {
      if (!state.selectedCategory) {
        return state.teamMembers; // Show all if no category selected
      }
      return state.teamMembers.filter((member) =>
        member.departments.includes(state.selectedCategory)
      );
    },

    // Get team member by ID
    getTeamMemberById: (state) => (id) => {
      return state.teamMembers.find((member) => member.id === id);
    },

    // Get user name
    setName: (state) => state.currentUser.name,

    // Get user email
    setUserEmail: (state) => state.currentUser.email,

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

    // Get selected category
    getSelectedCategory: (state) => state.selectedCategory,

    // Get settings
    getSettings: (state) => state.settings,

    // Get messages list
    getMessages: (state) => state.messagesList,

    // Get notifications list
    getNotificationsList: (state) => state.notificationsList,

    // Get unread messages count
    getUnreadMessagesCount: (state) => {
      return state.messagesList.filter((m) => !m.read).length;
    },

    // Get unread notifications count
    getUnreadNotificationsCount: (state) => {
      return state.notificationsList.filter((n) => !n.read).length;
    },
  },

  actions: {
    // Get toast instance
    getToast() {
      if (typeof window !== "undefined") {
        return useToast();
      }
      return null;
    },

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

    // Set selected category for filtering
    setSelectedCategory(payload) {
      this.selectedCategory = payload;

      // Automatically select the first task of the selected category
      if (payload === null) {
        // If "All Projects" is selected, show the first task overall
        if (this.projectList.length > 0) {
          this.selected = this.projectList[0].id;
        }
      } else {
        // Filter tasks by the selected category and select the first one
        const filteredTasks = this.projectList.filter(
          (task) => task.cat === payload
        );
        if (filteredTasks.length > 0) {
          this.selected = filteredTasks[0].id;
        } else {
          // If no tasks in this category, clear selection
          this.selected = null;
        }
      }
    },

    // Set file
    setFile(payload) {
      this.file = payload;
    },

    // Add new project
    setProject(payload) {
      this.projectList.push(payload);
      const toast = this.getToast();
      if (toast) {
        toast.success("Task added successfully!");
      }
    },

    // Update existing task
    updateTask(payload) {
      const task = this.projectList.find((item) => item.id === payload.id);
      if (task) {
        task.title = payload.title;
        task.description = payload.description;
        task.cat = payload.cat;
        task.assignedTo = payload.assignedTo;
        task.priority = payload.priority;
        task.date = payload.date;

        const toast = this.getToast();
        if (toast) {
          toast.success("Task updated successfully!");
        }
      }
    },

    // Set comment
    setComment(payload) {
      const project = this.projectList.find((item) => item.id === payload.id);
      if (project) {
        project.comments.push({
          comment: payload.comment,
          user: payload.user,
          date: payload.date,
        });
        const toast = this.getToast();
        if (toast) {
          toast.success("Comment added!");
        }
      }
    },

    // Remove project
    remove(payload) {
      const index = this.projectList.findIndex((item) => item.id === payload);
      if (index !== -1) {
        this.projectList.splice(index, 1);
        const toast = this.getToast();
        if (toast) {
          toast.info("Task deleted");
        }
        // Select first task after deletion
        if (this.projectList.length > 0) {
          this.selected = this.projectList[0].id;
        } else {
          this.selected = null;
        }
      }
    },

    // Add tag to project
    setTag(payload) {
      const project = this.projectList.find((item) => item.id === payload.id);
      if (project) {
        project.tags.push(payload.tag);
        const toast = this.getToast();
        if (toast) {
          toast.success("Tag added!");
        }
      }
    },

    // Set project approval
    setApprove(payload) {
      const project = this.projectList.find((item) => item.id === payload);
      if (project) {
        project.approved = true;
        const toast = this.getToast();
        if (toast) {
          toast.success("Task approved!");
        }
      }
    },

    // Toggle task completion
    toggleTaskCompletion(taskId) {
      const task = this.projectList.find((item) => item.id === taskId);
      if (task) {
        task.completed = !task.completed;

        const toast = this.getToast();
        if (toast) {
          if (task.completed) {
            toast.success("Task completed! 🎉");
          } else {
            toast.info("Task marked as incomplete");
          }
        }
      }
    },

    // Add team member
    addTeamMember(payload) {
      const newMember = {
        id: this.teamMembers.length + 1,
        name: payload.name,
        avatar: payload.avatar,
        departments: payload.departments,
      };
      this.teamMembers.push(newMember);
      const toast = this.getToast();
      if (toast) {
        toast.success(`${payload.name} added to the team!`);
      }
    },

    // Delete team member
    deleteTeamMember(memberId) {
      const index = this.teamMembers.findIndex((m) => m.id === memberId);
      if (index !== -1) {
        const memberName = this.teamMembers[index].name;
        this.teamMembers.splice(index, 1);
        const toast = this.getToast();
        if (toast) {
          toast.info(`${memberName} removed from the team`);
        }
      }
    },

    // Add department
    addDepartment(payload) {
      const newDept = {
        id: payload.id,
        name: payload.name,
        color: payload.color,
      };
      this.categories.push(newDept);
      const toast = this.getToast();
      if (toast) {
        toast.success(`${payload.name} department added!`);
      }
    },

    // Delete department
    deleteDepartment(deptId) {
      const index = this.categories.findIndex((c) => c.id === deptId);
      if (index !== -1) {
        const deptName = this.categories[index].name;
        this.categories.splice(index, 1);
        const toast = this.getToast();
        if (toast) {
          toast.info(`${deptName} department removed`);
        }
      }
    },

    // Update user profile
    updateUserProfile(payload) {
      if (payload.name) {
        this.currentUser.name = payload.name;
      }
      if (payload.email) {
        this.currentUser.email = payload.email;
      }
    },

    // Update settings
    updateSettings(payload) {
      this.settings = { ...this.settings, ...payload };
    },

    // Mark message as read
    markMessageAsRead(messageId) {
      const message = this.messagesList.find((m) => m.id === messageId);
      if (message) {
        message.read = true;
        // Update badge count
        this.notifications.messages = this.messagesList.filter(
          (m) => !m.read
        ).length;
      }
    },

    // Mark all messages as read
    markAllMessagesAsRead() {
      this.messagesList.forEach((m) => (m.read = true));
      this.notifications.messages = 0;
      const toast = this.getToast();
      if (toast) {
        toast.success("All messages marked as read");
      }
    },

    // Mark notification as read
    markNotificationAsRead(notificationId) {
      const notification = this.notificationsList.find(
        (n) => n.id === notificationId
      );
      if (notification) {
        notification.read = true;
        // Update badge count
        this.notifications.alerts = this.notificationsList.filter(
          (n) => !n.read
        ).length;
      }
    },

    // Clear all notifications
    clearAllNotifications() {
      this.notificationsList = [];
      this.notifications.alerts = 0;
      const toast = this.getToast();
      if (toast) {
        toast.success("All notifications cleared");
      }
    },

    // Initialize app (simulate loading data)
    async initializeApp() {
      this.isLoading = true;
      this.loadingMessage = "Loading your workspace...";

      try {
        // Simulate fetching data from an API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Data is already in state, but in a real app you would fetch it here
        // Example:
        // const response = await fetch('/api/tasks');
        // this.projectList = await response.json();

        this.isLoading = false;
      } catch (error) {
        console.error("Error initializing app:", error);
        this.isLoading = false;
        const toast = this.getToast();
        if (toast) {
          toast.error("Failed to load data. Please refresh the page.");
        }
      }
    },

    // Set loading state manually
    setLoading(status, message = "Loading...") {
      this.isLoading = status;
      this.loadingMessage = message;
    },
  },
});
