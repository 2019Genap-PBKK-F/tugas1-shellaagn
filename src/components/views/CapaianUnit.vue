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

var host = 'http://localhost:8021/api/CapaianUnit/'
var dropdownDataDasar = 'http://localhost:8021/api/DataDasar/nama/'
var dropdownSatuanKerja = 'http://localhost:8021/api/SatuanKerja/nama/'

export default {
  // name: 'App',
  data() {
    return {
      capaianUnit: [],
      form: {
        id_satker: 'aff',
        id_datadasar: 1,
        capaian: 0.0
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host).then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          // onbeforechange: this.oldRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'dropdown', title: 'Satuan Kerja', url: dropdownSatuanKerja, width: '120px' },
            { type: 'dropdown', title: 'Data Dasar', url: dropdownDataDasar, width: '120px' },
            { type: 'text', title: 'Waktu', width: '200px', readOnly: true },
            { type: 'text', title: 'Capaian', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host, this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host).then(res => {
        var index = Object.values(res.data[row])
        var old = Object.values(res.data[row])
        index[columns] = value
        console.log(old[0] + ' ' + old[1])
        console.log(index[0] + ' ' + index[1])
        axios.put(host + old[0] + '&' + old[1], {
          DataDasar_id: index[0],
          Unit_id: index[1],
          waktu: index[2],
          capaian: index[3]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host).then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + index[0] + '&' + index[1])
      })
    },
    oldRow(instance, cell, columns, row, value) {
      console.log('lama ' + value)
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