<script setup lang="ts">
import { contactQuery } from "~/sanity/queries";
const { data: contact } = await useSanityQuery(contactQuery);
</script>
<template>
  <main class="relative w-full min-h-full bg-off-white h-full z-1">
    <section class="w-full pt-30 md:pt-40">
      <div class="md:mx-50 p-4 grid md:grid-cols-2 gap-12">
        <div class="flex flex-col gap-8 items-center md:items-start justify-center md:justify-start">
          <h2 class="text-brown text-center md:text-start text-large-2 font-bold">{{contact.title}}</h2>
          <div class="md:text-mid text-brown text-start">
           <SanityContent :value="contact?.contactText" />
          </div>
        </div>
        <div class="max-w-xl mx-auto p-0 md:p-6 pt-0">
          <form class="space-y-4">
            <!-- Name -->
            <input
              type="text"
              required
              placeholder="Name*"
              class="w-full bg-[#ffffff84] px-4 py-3 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Email -->
            <input
              type="email"
              required
              placeholder="Email address*"
              class="w-full bg-[#ffffff84] px-4 py-3 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Phone -->
            <input
              type="tel"
              placeholder="Phone number"
              class="w-full bg-[#ffffff84] px-4 py-3 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white"
            />

            <!-- Message -->
            <textarea
              rows="5"
              placeholder="Message"
              class="w-full bg-[#ffffff84] px-4 py-3 text-brown placeholder-[#6d34097a] focus:outline-none focus:border-white resize-none"
            ></textarea>

            <div class="flex w-full justify-end">
              <button
                type="submit"
                class="bg-yellow text-brown font-bold px-5 py-3 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
