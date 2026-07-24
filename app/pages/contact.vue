<script setup lang="ts">
import { contactQuery } from "~/sanity/queries";
const { data: contact } = await useSanityQuery(contactQuery);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "", // honeypot
});
const status = ref<"idle" | "sending" | "success" | "error">("idle");
const errorMessage = ref("");

async function submitForm() {
  status.value = "sending";
  errorMessage.value = "";

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: { ...form },
    });
    status.value = "success";
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";
  } catch (err) {
    status.value = "error";
    errorMessage.value = "Something went wrong. Please try again.";
  }
}
</script>

<template>
  <main class="relative w-full min-h-full bg-off-white h-full z-1">
    <section class="w-full pt-24 md:pt-40">
      <div class="md:mx-50 p-4 grid md:grid-cols-2 gap-6 md:gap-12">
        <div
          class="flex flex-col gap-4 md:gap-6 items-start justify-center md:justify-start"
        >
          <h2 class="text-brown text-start text-large md:text-large-2 font-bold">
            {{ contact.title }}
          </h2>
          <div class="md:text-mid text-brown text-start">
            <SanityContent :value="contact?.contactText" />
          </div>
        </div>
        <div class="max-w-xl mx-auto p-0 md:p-6 md:pt-4">
          <form class="space-y-3" @submit.prevent="submitForm">
            <input
              v-model="form.company"
              type="text"
              name="company"
              autocomplete="off"
              tabindex="-1"
              aria-hidden="true"
              class="absolute left-[-9999px] w-px h-px overflow-hidden"
            />
            <!-- Name -->
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Name*"
              class="w-full bg-[#ffffff84] px-4 py-3 rounded-xl text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Email -->
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="Email address*"
              class="w-full bg-[#ffffff84] px-4 py-3 rounded-xl text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Phone -->
            <input
              v-model="form.phone"
              type="tel"
              placeholder="Phone number"
              class="w-full bg-[#ffffff84] px-4 py-3 rounded-xl text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Message -->
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Message"
              class="w-full bg-[#ffffff84] px-4 py-3 mb-2 rounded-xl text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white resize-none"
            ></textarea>

            <p v-if="status === 'error'" class="text-red-600 text-sm">
              {{ errorMessage }}
            </p>
            <p v-if="status === 'success'" class="text-green-700 text-sm">
              Message sent — thanks!
            </p>

            <div class="flex w-full justify-end">
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="bg-yellow text-brown font-bold rounded-full px-5 py-3 transition disabled:opacity-50"
              >
                {{ status === "sending" ? "Sending..." : "Send Message" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
