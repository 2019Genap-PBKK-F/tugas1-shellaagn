<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input class="btn btn-primary styles" type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input class="btn btn-primary styles" type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var host = 'http://localhost:8021/'
var dropdownMasterIndikator = 'http://localhost:8021/api/MasterIndikator/nama/'
var dropdownPeriode = 'http://localhost:8021/api/Periode/nama/'

export default {
  // name: 'App',
  data() {
    return {
      masterIndikator: [],
      form: {
        id_master: 1,
        id_periode: 2020,
        bobot: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/IndikatorPeriode/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'dropdown', title: 'Master Indikator', url: dropdownMasterIndikator, width: '120px' },
            { type: 'dropdown', title: 'Periode', url: dropdownPeriode, width: '120px' },
            { type: 'text', title: 'Bobot', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/IndikatorPeriode/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/IndikatorPeriode/').then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        console.log(old[0] + ' ' + old[1])
        console.log(index[0] + ' ' + index[1])
        axios.put(host + 'api/IndikatorPeriode/' + old[0] + '&' + old[1], {
          id_master: index[0],
          id_periode: index[1],
          bobot: index[2]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/IndikatorPeriode/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/IndikatorPeriode/' + index[0] + '&' + index[1])
      })
    }
  }
}
</script>
<style>
  .styles {
    margin-top: 10pt;
    margin-bottom: 10pt;
    margin-left: 10pt;
    }
</style>