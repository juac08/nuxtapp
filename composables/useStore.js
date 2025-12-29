export const useStore = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$store || null;
};
