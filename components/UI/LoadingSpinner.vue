<template>
  <div class="spinner-wrapper" :class="{ overlay: overlay, inline: inline }">
    <div class="spinner-container">
      <div class="spinner" :class="size"></div>
      <p v-if="message" class="spinner-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    message: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "medium", // small, medium, large
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.spinner-wrapper.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 9998;
  padding: 0;
}

.spinner-wrapper.inline {
  position: relative;
  padding: 0.5rem;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  border-radius: 50%;
  border-style: solid;
  border-color: #e0f2fe;
  border-top-color: #0ea5e9;
  animation: spin 0.8s linear infinite;
}

.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner.medium {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

.spinner.large {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-message {
  margin: 0;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
  animation: fadeInOut 1.5s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* For overlay spinner */
.spinner-wrapper.overlay .spinner-container {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
</style>
