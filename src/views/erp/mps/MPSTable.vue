<template>
  <div class="mps-table">
    <a-table
      bordered
      :columns="sideColumns"
      :locale="locale">
      <div slot="title" class="table-title">
        PA26-50 的MPS
      </div>
    </a-table>

    <a-table
      bordered
      :columns="mainColumns"
      :data-source="mainData"
      :pagination="false">
    </a-table>
  </div>
</template>

<script>
  import EmptyNone from '../components/EmptyNone.vue'

  // eslint-disable-next-line
  const mainColumns = [{
    title: '时区',
    children: [{
      title: '时段',
      dataIndex: 'title'
    }]
  }, {
    title: '当期',
    dataIndex: 'current_zone'
  }, {
    title: '需求时区',
    children: [{
      title: '1',
      dataIndex: 'zone_1'
    }, {
      title: '2',
      dataIndex: 'zone_2'
    }]
  }, {
    title: '计划时区',
    children: [{
      title: '3',
      dataIndex: 'zone_3'
    }, {
      title: '4',
      dataIndex: 'zone_4'
    }, {
      title: '5',
      dataIndex: 'zone_5'
    }, {
      title: '6',
      dataIndex: 'zone_6'
    }]
  }, {
    title: '预测时区',
    children: [{
      title: '7',
      dataIndex: 'zone_7'
    }, {
      title: '8',
      dataIndex: 'zone_8'
    }, {
      title: '9',
      dataIndex: 'zone_9'
    }, {
      title: '10',
      dataIndex: 'zone_10'
    }]
  }]
  // eslint-disable-next-line
  const sideColumns = [{
    title: '编制日期'
  }, {
    title: '2023/10/2'
  }, {
    title: '安全库存'
  }, {
    title: '20'
  }, {
    title: '生产批量'
  }, {
    title: '160'
  }]
  const mainData = [{
    key: '1',
    title: '预测量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '2',
    title: '订单量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '3',
    title: '计划接受量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '4',
    title: '毛需求量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '5',
    title: 'PAB初值',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '6',
    title: '净需求量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '7',
    title: '计划产出量',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '8',
    title: 'PAB',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '9',
    title: '计划投入',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }, {
    key: '10',
    title: 'ATP',
    current_zone: '',
    zone_1: '',
    zone_2: '',
    zone_3: '',
    zone_4: '',
    zone_5: '',
    zone_6: '',
    zone_7: '',
    zone_8: '',
    zone_9: '',
    zone_10: ''
  }]
  export default {
    data () {
      this.locale = { emptyText: <EmptyNone /> }
      return {
        mainColumns,
        sideColumns,
        mainData
      }
    },
    method: {
      /**
       * calculate master production schedule
       * @param {number[][]} matrix mps data matrix
       * @param {number[]} TFL timeFenceList an array for mps time fence
       * @returns an matrix which is calculated correctly
       */
      calMPS (matrix, TFL) {
        for (let r = 3; r < matrix.length; r++) {
          switch (r) {
            case 3:// GR
              this.calGR(matrix[0], matrix[1], TFL)
              break
            case 4:
          }
        }
        return null
      },
      /**
       * calculate gross requirement
       * @param {number[]} PVList predicted volume
       * @param {number[]} OVList orderVolume
       * @param {number} [CT=1] currentTime
       * @param {number[]} TFL timeFenceList
       * @returns {number[]} an array of gross requirment
       */
      calGR (PVList, OVList, TFL, CT = 1) {
        const GRList = this.initArrayZero(PVList.length)
        for (CT; CT < PVList.length; CT++) {
          let v = 0
          CT <= TFL[0]
          ? v = PVList[CT]
          : CT <= TFL[2]
            ? v = Math.max(PVList[CT], OVList[CT])
            : v = OVList[CT]
          GRList[CT] = v
        }
        return GRList
      },
      /**
       * calculate initial projected available
       * @param {number[]} IPABList previous zone initial projected available
       * @param {number[]} STARList schedule the amount received
       * @param {number[]} GRList gross requirement
       * @param {number} CT current time
       * @returns {number[]} an array of initial projected available balance
       */
      calInitPAB (IPABList, STARList, GRList, CT = 1) {
        const PABList = this.initArrayZero(IPABList.length)
        for (CT = 2; CT < STARList.length; CT++) {
          PABList[CT] = IPABList[CT - 1] + STARList[CT] - GRList[CT]
        }
        return PABList
      },
      /**
       * calculate net requirement
       * @param {number[]} IPABList initial projected available
       * @param {number} SSA safety stock amount
       * @param {number} [CT=1] current time
       * @returns {number[]} an array of net requirement
       */
      calNR (IPABList, SSA, CT = 1) {
        const NRList = this.initArrayZero(IPABList.length)
        for (CT; CT < IPABList.length; CT++) {
          let v = 0
          IPABList[CT] >= SSA ? v = 0 : v = (SSA - IPABList[CT])
          NRList[CT] = v
        }
        return NRList
      },
      /**
       * calculate planned order receipts
       * @param {number[]} NRList net requirement
       * @param {number} PB production batch
       * @param {number} [CT=1] current time
       */
      calPORece (NRList, PB, CT = 1) {
        const POReceList = this.initArrayZero(NRList.length)
        for (CT; CT < NRList.length; CT++) {
          let n = 0
          const NR = NRList[CT]
          while (true) {
            if (n * PB >= NR && NR > (n - 1) * PB) break
            n++
          }
          POReceList[CT] = n * PB
        }
      },
      /**
       * calculate projected available balance
       * @param {number[]} PABList previous projected availabled balance
       * @param {number[]} STARList schedule the amount received
       * @param {number[]} GRList gross requirement
       * @param {number[]} PORList planned order receipts
       * @param {number} [CT=1] current time
       */
      calPAB (PABList, STARList, GRList, PORList, CT = 1) {
        const _PABlist = this.initArrayZero(PABList.length)
        for (CT; CT < PABList.length; CT++) {
          _PABlist[CT] = PABList[CT - 1] + STARList[CT] - GRList[CT] + PORList[CT]
        }
        return _PABlist
      },
      /**
       * calculate planed order releases
       * @param {number[]} POReceList planed order receipts array
       * @param {number} LT lead time
       * @param {number} [CT=1] current time
       * @returns {number[]} TODO
       */
      calPORele (POReceList, LT, CT = 1) {
        const POReleList = this.initArrayZero(POReceList.length)
        while (CT < POReceList.length) {
          if (LT + CT < POReceList.length) POReleList[CT] = POReceList[LT + CT]
          CT++
        }
        return POReleList
      },
      calATP (POReceList, STARList, OVList, CT = 1) {
        const ATPList = this.initArrayZero(POReceList.length)
        for (CT; CT < POReceList.length; CT++) {
          let i = CT
          let ATP = POReceList[CT] + STARList[CT]
          for (i; i < OVList.length; i++) if (POReceList.length > 0) break
          for (i; i > CT + 1; i--) ATP -= OVList[i - 1]
          ATPList[CT] = ATP
        }
        return ATPList
      },
      initArrayZero (length) {
        return Array(length).map(() => 0)
      }
    }
  }
</script>

<style>
.table-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ant-table-wrapper:first-child .ant-table-placeholder {
  padding: unset;
}

.ant-table-wrapper:first-child .ant-table-thead > tr > th {
  border-bottom: none;
}
</style>
