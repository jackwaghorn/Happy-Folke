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
    await $fetch("https://contact-form-worker.jack-waghorn.workers.dev/", {
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

definePageMeta({ navTheme: "white", cta: false });
</script>

<template>
  <main
    class="relative w-full px-4 mx-auto max-w-7xl sm:px-6 min-h-full bg-white h-full z-1"
  >
    <section class="w-full pt-24 md:pt-60 pb-10">
      <div class="grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          class="flex flex-col gap-4 md:gap-6 items-start justify-center md:justify-start"
        >
          <h2 class="text-dark-brown text-start text-heading">
            {{ contact.title }}
          </h2>
          <div class="text-brown text-start text-body-lg-sans">
            <SanityContent :value="contact?.contactText" />
          </div>
        </div>
        <div class="">
          <form class="space-y-4" @submit.prevent="submitForm">
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
              class="w-full border-b border-brown px-0 pb-2 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white transition-colors"
            />

            <!-- Email -->
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="Email address*"
              class="w-full border-b border-brown px-0 pt-0 pb-2 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white transition-colors"
            />

            <!-- Phone -->
            <input
              v-model="form.phone"
              type="tel"
              placeholder="Phone number"
              class="w-full border-b border-brown px-0 pt-0 pb-2 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white transition-colors"
            />

            <!-- Message -->
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Message"
              class="w-full border-b border-brown px-0 py-1 pb-2 mb-2 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white resize-none transition-colors"
            ></textarea>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
            >
              <p v-if="status === 'error'" class="text-red-600 text-sm">
                {{ errorMessage }}
              </p>
              <p
                v-else-if="status === 'success'"
                class="text-green-700 text-sm font-medium"
              >
                Message sent — thanks! We'll be in touch soon.
              </p>
            </Transition>

            <div class="flex w-full justify-end">
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="bg-yellow text-brown hover:bg-brown hover:text-white font-bold text-small hover:cursor-pointer rounded-full px-5 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="inline-flex items-center gap-2">
                  <svg
                    v-if="status === 'sending'"
                    class="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  {{ status === "sending" ? "Sending..." : "Submit" }}

                    <svg
                class="w-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path v-if="status !== 'sending'"
                  d="M6.6229e-08 6.75758L0 5.24242H9.09091L4.92424 1.07576L6 0L12 6L6 12L4.92424 10.9242L9.09091 6.75758H6.6229e-08Z"
                  fill="currentColor"
                />
              </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
