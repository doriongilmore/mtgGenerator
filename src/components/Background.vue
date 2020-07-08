<template>
  <div class="container">
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="900px">
      <defs>
        <radialGradient id="green" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
          <stop offset="0%" stop-color="#c4d3ca"/>
          <stop offset="50%" stop-color="#00733d"/>
          <stop offset="100%" stop-color="#00361c"/>
        </radialGradient>
        <radialGradient id="blue" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
          <stop offset="0%" stop-color="#b3ceea"/>
          <stop offset="50%" stop-color="#0e67ab"/>
          <stop offset="100%" stop-color="#073152"/>
        </radialGradient>
        <radialGradient id="red" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
          <stop offset="0%" stop-color="#eba082"/>
          <stop offset="50%" stop-color="#d32029"/>
          <stop offset="100%" stop-color="#6b1116"/>
        </radialGradient>
        <radialGradient id="white" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
          <stop offset="0%" stop-color="#faf1d9"/>
          <stop offset="50%" stop-color="#f8e7b9"/>
          <stop offset="100%" stop-color="#e0cf9f"/>
        </radialGradient>
        <radialGradient id="black" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
          <stop offset="0%" stop-color="#a69f9d"/>
          <stop offset="50%" stop-color="#141414"/>
          <stop offset="100%" stop-color="#000000"/>
        </radialGradient>
      </defs>
      <g>
        <circle cx="100" cy="40" r="20" fill="url(#white)"></circle>
        <circle cx="43" cy="81" r="20" fill="url(#green)"></circle>
        <circle cx="65" cy="149" r="20" fill="url(#red)"></circle>
        <circle cx="135" cy="149" r="20" fill="url(#black)"></circle>
        <circle cx="157" cy="81" r="20" fill="url(#blue)"></circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Background"
};
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(#a65734, #a3502e, #9e4c2b);
    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
