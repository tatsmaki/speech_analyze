export type Record = {
  key: number
  person: string
  voice: Blob
  histogram: Array<number>
  value: number
}

export interface RootStoreInterface {
  records: Array<Record>
  histogram: Array<number>
  value: number
  createRecord: (newRecord: Record) => void
  setHistogram: (histogram: number[]) => void
  setValue: (value: number) => void
}

export type RecordedDataType = {
  record: Blob
  histogram: Array<number>
  value: number
}

export interface RecorderInterface {
  start: (stream: MediaStream) => void
  stop: () => Promise<RecordedDataType>
}
