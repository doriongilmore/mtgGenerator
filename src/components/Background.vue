<template>
  <div class="container">
    <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 640 640"
            width="640" height="640"
    >
      <defs>
        <path
          d="M360.95 121.47C360.95 144.48 342.6 163.17 320 163.17C297.4 163.17 279.05 144.48 279.05 121.47C279.05 98.45 297.4 79.76 320 79.76C342.6 79.76 360.95 98.45 360.95 121.47Z"
          id="white"
        ></path>
        <path
          d="M238.1 204.87C238.1 227.89 219.75 246.57 197.15 246.57C174.55 246.57 156.2 227.89 156.2 204.87C156.2 181.85 174.55 163.17 197.15 163.17C219.75 163.17 238.1 181.85 238.1 204.87Z"
          id="green"
        ><Green></Green></path>
        <path
          d="M279.05 332.89C279.05 355.9 260.7 374.59 238.1 374.59C215.5 374.59 197.15 355.9 197.15 332.89C197.15 309.87 215.5 291.19 238.1 291.19C260.7 291.19 279.05 309.87 279.05 332.89Z"
          id="red"
        ></path>
        <path
          d="M442.85 332.89C442.85 355.9 424.5 374.59 401.9 374.59C379.3 374.59 360.95 355.9 360.95 332.89C360.95 309.87 379.3 291.19 401.9 291.19C424.5 291.19 442.85 309.87 442.85 332.89Z"
          id="black"
        ></path>
        <path
          d="M478.22 204.87C478.22 227.89 459.87 246.57 437.27 246.57C414.67 246.57 396.32 227.89 396.32 204.87C396.32 181.85 414.67 163.17 437.27 163.17C459.87 163.17 478.22 181.85 478.22 204.87Z"
          id="blue"
        ></path>
      </defs>
      <g>
        <use xlink:href="#white" fill="#f2e796"></use>
        <use xlink:href="#green" fill="#50a750"></use>
        <use xlink:href="#red" fill="#e73e2e"></use>
        <use xlink:href="#black" fill="#0d0f0b"></use>
        <use xlink:href="#blue" fill="#119edd"></use>
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
    background-color: rgb(101, 72, 62);
    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
