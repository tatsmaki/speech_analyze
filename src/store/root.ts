import { makeObservable, observable, action } from 'mobx'

import { RootStoreInterface, Record } from 'types'

class RootStore implements RootStoreInterface {
  public records: Array<Record>

  constructor() {
    makeObservable(this, {
      records: observable,
      createRecord: action
    })

    this.records = []
  }

  public createRecord = (newRecord: Record) => {
    this.records.push(newRecord)
  }
}

export { RootStore }
