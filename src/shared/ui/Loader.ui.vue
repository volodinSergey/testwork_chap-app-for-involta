<template>
    <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
    position: relative;
    width: 10.125rem;
    aspect-ratio: 1;
    font-size: 1.875rem;
    border-radius: 50%;
    background-color: blue;


    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 7.125rem;
        border-radius: 50%;
        aspect-ratio: 1;
        background-color: tomato;

    }
}
</style>