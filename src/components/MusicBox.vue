<template>
  <div id="box">
    <h1>Upload song</h1>
    <div id="uploader">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input type="file" multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange(
              $event.target.name,
              $event.target.files
            );
            fileCount = $event.target.files.length"
            accept="audio/*"
            class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Separating song...
            </p>
        </div>
      </form>
    </div>
    <div v-if="isSuccess">
      <h2>Separate song successfully.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
    </div>
    <div v-if="isFailed">
      <h2>Upload failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
    <div id="player">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            Bass
          </b-col>
          <b-col>
            <button
              @click="play_sound_bass()"
              class="bg-blue rounded font-bold hover:bg-blue-dark px-4 py-2">
              Play
            </button>
          </b-col>
          <b-col cols="8">
            Seeker
          </b-col>
        </b-row><b-row>
          <b-col>
            Guitar
          </b-col>
          <b-col>
            <button
              @click="play_sound_guitars()"
              class="bg-blue rounded font-bold hover:bg-blue-dark px-4 py-2">
              Play
            </button>
          </b-col>
          <b-col cols="8">
            Seeker
          </b-col>
        </b-row><b-row>
          <b-col>
            Vocal
          </b-col>
          <b-col>
            <button
              @click="play_sound_vocals()"
              class="bg-blue rounded font-bold hover:bg-blue-dark px-4 py-2">
              Play
            </button>
          </b-col>
          <b-col cols="8">
            Seeker
          </b-col>
        </b-row><b-row>
          <b-col>
            Mixture
          </b-col>
          <b-col>
            <button
              @click="play_sound_mixture()"
              class="bg-blue rounded font-bold hover:bg-blue-dark px-4 py-2">
              Play
            </button>
          </b-col>
          <b-col cols="8">
            Seeker
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { upload } from '../script/file-upload.service'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'app',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'audios'
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    play_sound_bass () {
      const myTrack = new Audio(require('../../separated_song/bass.wav'))
      myTrack.setAttribute('crossorigin', 'anonymous')
      myTrack.load()
      console.log('start play_sound()')
      myTrack.play().then(function () {
        // Automatic playback started!
        console.log('its played')
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        console.log(error)
      })
    },
    play_sound_guitars () {
      const myTrack = new Audio(require('../../separated_song/guitars.wav'))
      myTrack.setAttribute('crossorigin', 'anonymous')
      myTrack.load()
      console.log('start play_sound()')
      myTrack.play().then(function () {
        // Automatic playback started!
        console.log('its played')
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        console.log(error)
      })
    },
    play_sound_vocals () {
      const myTrack = new Audio(require('../../separated_song/vocals.wav'))
      myTrack.setAttribute('crossorigin', 'anonymous')
      myTrack.load()
      console.log('start play_sound()')
      myTrack.play().then(function () {
        // Automatic playback started!
        console.log('its played')
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        console.log(error)
      })
    },
    play_sound_mixture () {
      const myTrack = new Audio(require('../../uploaded_song/mixture.wav'))
      myTrack.setAttribute('crossorigin', 'anonymous')
      myTrack.load()
      console.log('start play_sound()')
      myTrack.play().then(function () {
        // Automatic playback started!
        console.log('its played')
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        console.log(error)
      })
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array.from(
        Array(fileList.length).keys()
      ).map(x => {
        formData.append(
          fieldName,
          fileList[x],
          fileList[x].name
        )
      })
      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  height: 175px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

#uploader {
  margin: 50px;
}
</style>
