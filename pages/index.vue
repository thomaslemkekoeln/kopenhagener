<template>
  <div>
    <nav class="border-b border-gray-200 p-4">
      <NuxtLink
        to="/users"
        class="m-2 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
        >Neue Spieler</NuxtLink
      >
      <NuxtLink
        to="/counter"
        class="m-2 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
        >Neues Spiel</NuxtLink
      >
    </nav>
    <NuxtPage />
  </div>
</template>
