<script setup>
import SiteHeader from './components/SiteHeader.vue'
import CountdownSection from './components/CountdownSection.vue'
import AudienceSection from './components/AudienceSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProgramSection from './components/ProgramSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>


<template>
  <div class="site">
    <SiteHeader />

   
    <HeroSection />
    <CountdownSection />
    <ProgramSection />
    <AudienceSection />
    <SiteFooter />
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  background: #050505;
  color: #ffffff;
}


</style>