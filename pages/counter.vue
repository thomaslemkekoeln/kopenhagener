<script setup lang="ts">
import useGetStrokeResult from "../composables/useGetStrokeResult";
import useGetKopenhagenResults from "../composables/useGetKopenhagenResults";
import useLocalStore from "../composables/useLocalStore";
import { useCounterStore } from "~/stores/counter";
import mappPlayers from "../mapper/mappPlayers";
const selectedPlayers = ref([]);
const users = <any>ref([]);
const selectedPlayersCheckboxes = [];
const players = ref([]);
const showScores = ref(false);
users.value = useCounterStore().getUsers();
onMounted(async () => {
  const localStore = await useLocalStore("get");
  useCounterStore().updateUsers(localStore);
  useCounterStore().$subscribe((mutation, state) => {
    useLocalStore("set", state.users);
  });
  users.value = useCounterStore().getUsers();
});
function getTotalPoints(name) {
  let points = 0;
  useGetKopenhagenResults(players.value).forEach((player) => {
    if (player.name === name) {
      points = points + player.points;
    }
  });
  return points;
}
function selectPlayer(name: string) {
  if (selectedPlayers.value.includes(name)) {
    selectedPlayers.value = selectedPlayers.value.filter(
      (item) => item !== name
    );
    useCounterStore().updateSelection(name, false);
  } else {
    useCounterStore().updateSelection(name, true);
    selectedPlayers.value.push(name);
  }
}
async function getPlayers() {
  const players = useCounterStore().getPlayers();
  return mappPlayers(players);
}
async function startGame() {
  players.value = await getPlayers();
  showScores.value = true;
}
async function resetScores() {
  useCounterStore().resetPlayers();
  selectedPlayersCheckboxes.forEach((item) => {
    item.checked = false;
  });
}

function getPlayerResult(player, index) {
  const result = player.result[index - 1][index];
  return result > 0 ? result : "";
}
async function updateScore(event, index, player) {
  const result = player.result;
  result[index - 1] = { [index]: parseInt(event.target.value) };
  useCounterStore().updateScore(player);
  players.value = await getPlayers();
}
</script>
<template>
  <div class="text-center">
    <nav class="border-b border-gray-200 p-4">
      <NuxtLink
        to="/users"
        class="m-2 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
        >Neue Spieler</NuxtLink
      >
    </nav>
    <div class="mb-4 p-2" v-show="!showScores">
      <table class="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th
              class="border-b border-gray-200 p-2 font-medium text-gray-600 dark:border-gray-600 dark:text-gray-400"
            >
              Name
            </th>
            <th
              class="border-b border-gray-200 p-2 font-medium text-gray-600 dark:border-gray-600 dark:text-gray-400"
            >
              Vorgabe
            </th>

            <th
              class="border-b border-gray-200 p-2 font-medium text-gray-600 dark:border-gray-600 dark:text-gray-400"
            >
              Select
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <td
              class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              {{ user.name }}
            </td>
            <td
              class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              {{
                user.handicap
                  .toString()
                  .replace("[", "")
                  .replace("]", "")
                  .replaceAll(",", " ")
              }}
            </td>
            <td
              class="border-b border-gray-100 p-2 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              <div>
                <input
                  type="checkbox"
                  ref="selectedPlayersCheckboxes"
                  class="hidden peer"
                  @click="selectPlayer(user.name)"
                  :id="`selected-${user.name}`"
                  name="handicap"
                />
                <label
                  class="cursor-pointer flex items-center justify-center rounded-lg border-2 border-gray-200 py-3 px-6 text-gray-700 transition-colors duration-200 ease-in-out peer-checked:bg-green-500 peer-checked:text-white"
                  :for="`selected-${user.name}`"
                  >select</label
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="startGame()"
        class="mb-4 mt-4 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
      >
        Spiel
      </button>
      <button
        @click="resetScores()"
        class="mb-4 mt-4 bg-green-500 text-white px-4 py-2 block w-full rounded hover:bg-green-600"
      >
        ResetPlayers
      </button>
    </div>
    <div class="mb-4 p-2 pt-6 pb-8" v-show="showScores">
      <table class="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th
              class="border-b border-gray-200 p-1 font-medium text-gray-600 dark:border-gray-600 dark:text-gray-400"
            >
              Loch
            </th>
            <th
              v-for="player in players"
              class="border-b border-gray-200 p-1 font-medium text-gray-600 dark:border-gray-600 dark:text-gray-400"
            >
              {{ player.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 18" :key="index">
            <td class="border-3 text-lg border-gray-300 rounded text-center">
              {{ index }}
            </td>

            <td
              v-for="player in players"
              :class="`text-gray-500 dark:text-gray-400 relative`"
            >
              <input
                @blur="
                  (event) => {
                    updateScore(event, index, player);
                  }
                "
                :value="getPlayerResult(player, index)"
                type="number"
                class="border-3 text-lg w-full border-gray-300 rounded text-center"
              />
              <div
                v-show="player.handicap.indexOf(index + 1) > -1"
                class="absolute right-0 h-full border-r-8 border-gray-700'"
              ></div>
            </td>
          </tr>
          <tr>
            <td
              class="bg-green-200 border-3 border-gray-100 text-lg text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              R:
            </td>
            <td
              v-for="player in players"
              class="bg-green-200 border-3 border-gray-100 text-lg text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              {{ useGetStrokeResult(player) }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="w-full table-auto border-collapse text-sm fixed top-0 left-0"
      >
        <tbody>
          <tr class="">
            <td
              class="bg-green-200 border-3 text-lg border-gray-500 text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              Pts:
            </td>
            <td
              v-for="player in players"
              class="bg-green-200 border-2 border-gray-500 text-lg text-gray-500 dark:border-gray-700 dark:text-gray-400 p-1"
            >
              <span>
                {{ `${player.name}:` }}
                <br />
                <span> {{ getTotalPoints(player.name) }} </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="
          () => {
            showScores = false;
          }
        "
        class="mb-4 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        zurück
      </button>
    </div>
  </div>
</template>
<style scope></style>
