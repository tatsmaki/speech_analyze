export type Record = {
  key: number
  person: string
  voice: Blob
  signal: Array<number>
}

export interface RootStoreInterface {
  records: Array<Record>
  createRecord: (newRecord: Record) => void
}

export type RecordedDataType = {
  record: Blob
  signal: Array<number>
}

export interface RecorderInterface {
  start: (stream: MediaStream) => void
  stop: () => Promise<RecordedDataType>
}
