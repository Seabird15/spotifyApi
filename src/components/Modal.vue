<template>
  <transition name="modal-animation">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="p-4 bg-white rounded-lg shadow-lg">
        <!-- Modal Content -->
        <slot />
        <button
          class="p-2 mt-4 text-white rounded-lg bg-spotifyGreen"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

// Define props and emits
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    default: "Modal",
  },
  content: {
    type: String,
    default: "This is a modal",
  },
});

const emit = defineEmits(["update:showModal"]);

const closeModal = () => {
  emit("update:showModal", false);
};
</script>

<style >
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.15s linear;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
</style>