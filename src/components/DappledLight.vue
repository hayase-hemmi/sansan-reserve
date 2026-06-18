<template>
  <div class="dappled-light">
    <video
      src="../assets/img/leaves.mp4"
      autoplay
      muted
      loop
      playsinline
      class="dl-video"
    />
  </div>
</template>

<style scoped>
.dappled-light {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  mix-blend-mode: multiply;
  opacity: var(--dl-opacity);
  transition: opacity 700ms cubic-bezier(0.23, 1, 0.32, 1);
}

.dl-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
