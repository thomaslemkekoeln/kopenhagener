<script setup lang="ts">
const nameInput = ref("");
const handicapCheckboxes = ref([]);
const handicap = ref([]);
const users = <any>ref([]);
users.value = await $fetch("/api/getUsers");
function updateHandicap(index: number) {
  if (handicap.value.includes(index)) {
    handicap.value = handicap.value.filter((item) => item !== index);
  } else {
    handicap.value.push(index);
  }
}
function submit() {
  const result = [];
  for (let i = 0; i < 18; i++) {
    result.push({ [i + 1]: 0 });
  }
  if (nameInput.value.length > 0) {
    $fetch("/api/addUser", {
      method: "POST",
      body: {
        name: nameInput.value,
        handicap: JSON.stringify(handicap.value),
        result,
      },
    }).then(async () => {
      users.value = await $fetch("/api/getUsers");
      nameInput.value = "";
      handicap.value = [];
      handicapCheckboxes.value.forEach((item) => {
        item.checked = false;
      });
    });
  }
}
function clearUser(userName: string) {
  $fetch("/api/deleteUser", {
    method: "POST",
    body: { name: userName },
  }).then(async () => {
    users.value = await $fetch("/api/getUsers");
  });
}
</script>

<template>
  <div class="text-center">
    <nav class="border-b border-gray-200 p-4">
      <NuxtLink
        to="/counter"
        class="m-2 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
        >Neues Spiel</NuxtLink
      >
    </nav>
    <div class="mb-4 p-2">
      <label for="name" class="block text-gray-700 text-lg m-2"
        >Gib einen Namen ein</label
      >
      <input
        type="text"
        v-model="nameInput"
        id="name"
        class="w-full border border-gray-300 p-2 rounded text-center"
      />
      <p class="block text-gray-700 text-lg m-2">Wähle die Vorgabe</p>
      <div class="flex flex-wrap">
        <div v-for="index in 18" :key="index" class="w-1/6">
          <div>
            <input
              ref="handicapCheckboxes"
              type="checkbox"
              class="hidden peer"
              @click="updateHandicap(index)"
              :id="`handicap-${index}`"
              name="handicap"
            />
            <label
              class="cursor-pointer flex items-center justify-center rounded-lg border-2 border-gray-200 py-3 px-6 text-gray-700 transition-colors duration-200 ease-in-out peer-checked:bg-green-500 peer-checked:text-white"
              :for="`handicap-${index}`"
              >{{ index }}</label
            >
          </div>
        </div>
      </div>
      <button
        @click="submit"
        class="mb-4 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Spieler hinzufügen
      </button>
    </div>
    <table class="w-full table-auto border-collapse text-sm">
      <thead>
        <tr>
          <th
            class="border-b border-gray-200 p-2 font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            Name
          </th>
          <th
            class="border-b border-gray-200 p-2 font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            Vorgabe
          </th>

          <th
            class="border-b border-gray-200 p-2 font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td
            class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
          >
            {{ user.Name }}
          </td>
          <td
            class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
          >
            {{
              user.Handicap.toString()
                .replace("[", "")
                .replace("]", "")
                .replaceAll(",", " ")
            }}
          </td>
          <td
            class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
          >
            <button
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              @click="clearUser(user.Name)"
            >
              x
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
