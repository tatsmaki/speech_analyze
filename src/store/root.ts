import { makeObservable, observable, action } from 'mobx'

import { RootStoreInterface, Record } from 'types'

class RootStore implements RootStoreInterface {
  public records: Array<Record>

  public histogram: Array<number>

  public value: number

  constructor() {
    makeObservable(this, {
      records: observable,
      histogram: observable,
      value: observable,
      createRecord: action,
      setHistogram: action,
      setValue: action
    })

    this.records = []
  }

  public createRecord = (newRecord: Record) => {
    this.records.push(newRecord)
    console.log(this.records)
  }

  public setHistogram = (histogram: number[]) => {
    this.histogram = histogram
  }

  public setValue = (value: number) => {
    this.value = value
  }
}

export { RootStore }
