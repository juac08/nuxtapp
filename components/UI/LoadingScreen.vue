<template>
  <div class="loading-screen">
    <div class="loading-content">
      <!-- Logo/Brand -->
      <div class="loading-brand">
        <div class="brand-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M9 11l3 3L22 4"></path>
            <path
              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            ></path>
          </svg>
        </div>
        <h1 class="brand-title">TaskFlow</h1>
      </div>

      <!-- Loading Spinner -->
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>

      <!-- Loading Message -->
      <p class="loading-message">{{ message }}</p>

      <!-- Loading Progress Bar -->
      <div class="loading-progress">
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    message: {
      type: String,
      default: "Loading your workspace...",
    },
  },
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.loading-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.brand-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(14, 165, 233, 0.35);
  }
}

.brand-icon svg {
  color: white;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.5px;
}

.loading-spinner {
  margin: 1rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0f2fe;
  border-top: 4px solid #0ea5e9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-message {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  animation: fadeInOut 2s ease-in-out infinite;
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

.loading-progress {
  width: 240px;
  height: 4px;
  background: #e0f2fe;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 2px;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    transform: translateX(0);
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .brand-icon {
    width: 64px;
    height: 64px;
  }

  .brand-icon svg {
    width: 32px;
    height: 32px;
  }

  .brand-title {
    font-size: 1.75rem;
  }

  .loading-message {
    font-size: 0.9rem;
  }

  .loading-progress {
    width: 200px;
  }
}
</style>
