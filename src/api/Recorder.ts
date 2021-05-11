import { RecorderInterface, RecordedDataType } from 'types'

class Recorder implements RecorderInterface {
  private mediaRecorder: MediaRecorder

  private audioChunks: Array<Blob>

  private audioSnapshot: Array<number[]>

  constructor() {
    this.mediaRecorder = null
    this.clearData()
  }

  public start = (stream: MediaStream) => {
    this.clearData()

    this.mediaRecorder = new MediaRecorder(stream)
    this.mediaRecorder.start()

    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.audioChunks.push(event.data)
    }
  }

  public stop = () => {
    return new Promise((resolve: (result: RecordedDataType) => void, reject) => {
      try {
        this.mediaRecorder.onstop = () => {
          const record = new Blob(this.audioChunks)
    
          const audioURL: string = URL.createObjectURL(record)
          const audio = new Audio(audioURL)
  
          const context = new AudioContext()
          const analyser: AnalyserNode = context.createAnalyser()
          const source: MediaElementAudioSourceNode = context.createMediaElementSource(audio)
  
          source.connect(analyser)
          analyser.connect(context.destination)
  
          const frequencyArray = new Uint8Array(analyser.frequencyBinCount as number)
        
          let timeout: NodeJS.Timeout
  
          audio.oncanplay = () => {
            const getFrequency = () => {
              analyser.getByteFrequencyData(frequencyArray)
              this.audioSnapshot.push([ ...frequencyArray ])
  
              timeout = setTimeout(getFrequency, 5)
            }
  
            audio.play()
            getFrequency()
          }
  
          audio.onended = () => {
            clearTimeout(timeout)
            
            let value = 0
            const histogram: Array<number> = this.audioSnapshot.reduce((acc, cur) => {
              const peakFrequency: number = Math.max(...cur)
  
              acc.push(peakFrequency)
              if (peakFrequency > 100) {
                value += peakFrequency
              }
  
              return acc
            }, [])
  
            resolve({ record, histogram, value } as RecordedDataType)
          }
        }
      } catch(error) {
        reject(new Error(error))
      }
  
      this.mediaRecorder.stop()
    })
  }

  private clearData = () => {
    this.audioChunks = []
    this.audioSnapshot = []
  }
}

export const recorder = new Recorder()
