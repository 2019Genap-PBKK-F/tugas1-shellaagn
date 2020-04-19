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
var dropdownDataDasar = 'http://localhost:8021/api/DataDasar/nama/'

export default {
  // name: 'App',
  data() {
    return {
      masterIndikator: [],
      form: {
        id_pembilang: 1,
        id_penyebut: 1,
        nama: 'New Data',
        deskripsi: 'New Data',
        default_bobot: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/MasterIndikator/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'id', width: '10px' },
            { type: 'dropdown', title: 'Pembilang', url: dropdownDataDasar, width: '120px' },
            { type: 'dropdown', title: 'Penyebut', url: dropdownDataDasar, width: '120px' },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'Deskripsi', width: '120px' },
            { type: 'text', title: 'Default Bobot', width: '120px' },
            { type: 'text', title: 'Create Date', width: '160px', readOnly: true },
            { type: 'text', title: 'Last Update', width: '160px', readOnly: true },
            { type: 'text', title: 'Expired Date', width: '160px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/MasterIndikator/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/MasterIndikator/' + index[0], {
          id: index[0],
          id_pembilang: index[1],
          id_penyebut: index[2],
          nama: index[3],
          deskripsi: index[4],
          default_bobot: index[5]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/MasterIndikator/' + index[0])
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