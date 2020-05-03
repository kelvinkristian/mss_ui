<template>
  <div id="home">
    <div id="headers">
      <Headers  />
    </div>
    <div id="musicbox">
      <MusicBox />
    </div>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import MusicBox from '@/components/MusicBox'

export default {
  name: 'Home',
  components: {
    Headers,
    MusicBox
  }
}
</script>

<style lang="scss">
#headers {
  text-align: center;
  color: #5DB9DE;
  margin: 50px;
  height: 410px;
}

#musicbox {
  background-image: url("../assets/blue.jpg");
  height: 600px;
  padding: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #042246;
}
</style>
