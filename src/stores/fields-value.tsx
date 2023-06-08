import { action, makeAutoObservable, observable } from "mobx";

class FieldsValue {
  fields = [
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
  ];

  activeStage = 1
  withoutData = true
  showPreloader = false

  constructor() {
    makeAutoObservable(this);
  }

  addField = () => {
    this.fields.push({ id: this.fields.length + 1, value: "" });
  };

  updateField = (id: string, value: string) => {
    this.fields[Number(id)].value = value;
    if(this.fields[0].value && this.fields[1].value) {
      this.withoutData = false
    }
  };

  resetFields = () => {
    this.fields.forEach((field) => {
      field.value = ""
    })    
    this.withoutData = true
  }

  fullReset = () => {
    this.fields.forEach((field, index) => {
      if(index === 0 || index === 1) {
        field.value = ""
        return
      }else {
        this.fields.splice(index, 1)
      }
    })    
    this.withoutData = true
  }

  sortOfValue = (type: string) => {
    if (type === "default") {
      return this.fields.sort((itemX, itemY): number => {
        if (Number(itemX.value) > Number(itemY.value)) {
          return 1;
        }
        if (Number(itemX.value) < Number(itemY.value)) {
          return -1;
        }
        return 0;
      });
    } else {
      return this.fields.sort((itemX, itemY): number => {
        if (
          type === "ascending"
            ? Number(itemX.value) > Number(itemY.value)
            : Number(itemX.value) < Number(itemY.value)
        ) {
          return 1;
        }
        if (
          type === "ascending"
            ? Number(itemX.value) < Number(itemY.value)
            : Number(itemX.value) > Number(itemY.value)
        ) {
          return -1;
        }
        return 0;
      });
    }
  };

  getSum = () => {
    const arrayOfCounter:number[]= [] 
    this.fields.forEach(field => {
      arrayOfCounter.push(Number(field.value))
    })
    return arrayOfCounter.reduce(function(sum, elem) {
      return sum + elem;
    })
  }

  setActiveStage = (increment: boolean) => {
    if(increment) {
      if(this.activeStage === 3) {
        return this.activeStage
      }else
      return this.activeStage += 1
    }else {
      if(this.activeStage === 1) {
        return this.activeStage
      }
      return this.activeStage -= 1
    }
  }

  stateOfPreloader = (state: boolean) => {
    this.showPreloader = state
  }

}

export default new FieldsValue();
