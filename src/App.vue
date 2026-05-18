<script setup>
import SiteHeader from './components/SiteHeader.vue'
import CountdownSection from './components/CountdownSection.vue'
import AudienceSection from './components/AudienceSection.vue'
import InProgramSection from './components/InProgramSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProgramSection from './components/ProgramSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import LocationSection from './components/LocationSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import PartnersSection from './components/PartnersSection.vue'
</script>

<template>
  <div class="site">
    <SiteHeader />

    <HeroSection />
    <CountdownSection />
    <AudienceSection />
    <InProgramSection />
    <SpeakersSection />
    <ProgramSection />
    <LocationSection />
    <PartnersSection/>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site {
  width: 100%;
  min-height: 100vh;
  overflow-x: clip;
  background: var(--color-bg);
  color: var(--color-text);
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}
</style>