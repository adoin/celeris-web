<script lang="ts" setup name="warnOnDoubleApple">
import { useMessage } from "naive-ui";
import type { Apple, Cart } from "~/pages/bugs/types";

const cart = reactive<Cart>({
  items: [],
  price: 0,
});
const lastApple = ref<Apple | null>(null);
const message = useMessage();
function createRandomApple(): Apple {
  return {
    sweetness: Math.random(),
    quality: {
      weight: Math.random() * 100,
      isBad: Math.random() > 0.9,
    },
    color: Math.random() > 0.5 ? "red" : "green",
  };
}
function createBadApple(): Apple {
  return {
    sweetness: Math.random(),
    color: Math.random() > 0.5 ? "red" : "green",
    quality: {
      isBad: true,
      weight: Math.random() * 100,
    },
  };
}
function addRandom() {
  const apple = createRandomApple();
  // 最多买两个苹果
  if (cart.items.length < 2) {
    cart.items.push(apple);
  } else {
    cart.items = [cart.items[1], apple];
  }

  lastApple.value = apple;
}
function addBad() {
  const apple = createBadApple();
  // 最多买两个苹果
  if (cart.items.length < 2) {
    cart.items.push(apple);
  } else {
    cart.items = [cart.items[1], apple];
  }
  lastApple.value = apple;
}
function empty() {
  cart.items = [];
  lastApple.value = null;
}
// 仅当购物车内“刚刚”加入两个坏果时警告：好好->好坏不警告 好坏->坏坏警告 坏坏->坏坏不警告
watch(() => cart, (crt, pre) => {
  if (crt.items.length === 2 && crt.items.every(e => e.quality.isBad) && (pre.items.length === 1 || pre.items.some(s => !s.quality.isBad))) {
    message.warning("连续两个坏果了！");
  }
}, { deep: true });
</script>

<template>
  <div class="size-full">
    <NCard title="当连续两个苹果为坏果时警告">
      <div class="flex justify-between">
        <div class="gap-1 flex">
          <NButton @click="addRandom">
            添加苹果
          </NButton>
          <NButton @click="addBad">
            添加坏苹果
          </NButton>
        </div>
        <div>
          <NButton @click="empty">
            清空
          </NButton>
        </div>
      </div>
      <div class="w-full flex flex-wrap gap-1 pt-2">
        <div
          v-for="(app, idx) in cart.items" :key="idx" class="" :class="{
            'color-red-5': app.color === 'red',
            'color-emerald-5': app.color === 'green',
            'i-mdi:food-apple': !app.quality.isBad,
            'i-mdi:apple': app.quality.isBad,
          }"
        />
      </div>
      <article class="chinese">
        <h3 class="flex-y-center">
          <span>似乎并没有生效，为什么，并在PR中提供解决方案</span>
          <NTooltip trigger="hover">
            <template #trigger>
              <div class="i-mdi-info" />
            </template>
            此为模拟业务场景，监听对象相当于当前的cart，请保持与业务贴近
          </NTooltip>
        </h3>
        <p>答：</p>
      </article>
    </NCard>
  </div>
</template>
